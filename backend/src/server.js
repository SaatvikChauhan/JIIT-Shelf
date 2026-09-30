import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

import connectDB from "./config/db.js";
import driveRoutes from "./routes/driveRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import contributionRoutes from "./routes/contributionRoutes.js";
import Message from "./models/Message.js";
import { startClickCleanup } from "./cron/clearOldClicks.js";
import { allowedRooms } from "./config/chatRooms.js";
import { isNonEmptyString, isObjectId } from "./lib/validation.js";
import { messageDeleteFilter } from "./lib/chatPermissions.js";
import { createProtection, limiter, positiveSetting } from "./lib/protection.js";
import { chatPayload } from "./lib/chatPayload.js";

dotenv.config();

const corsOptions = {
  origin: [process.env.CLIENT_URL, process.env.LOCAL_URL]
    .map((origin) => origin?.trim())
    .filter(Boolean),
  methods: ["GET", "POST"],
};

const app = express();
app.disable("x-powered-by");
const protection = createProtection();
app.get("/health", (req, res) => res.set("Cache-Control", "no-store").status(204).end());
app.use(protection.middleware);
app.use(cors(corsOptions));
app.use((req, res, next) => {
  const origin = req.get("origin");
  if (origin && !corsOptions.origin.includes(origin)) return res.status(403).end();
  next();
});

app.use("/api/analytics", analyticsRoutes);
app.use(express.json({ limit: "16kb" }));

await connectDB();
startClickCleanup();

app.use("/api/drive", driveRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/contributions", contributionRoutes);
app.use((req, res) => res.status(404).end());

app.use((error, req, res, next) => {
  if (res.headersSent) return next(error);
  if (error.type === "entity.parse.failed") {
    return res.status(400).json({ error: "Invalid JSON" });
  }
  if (error.type === "entity.too.large") {
    return res.status(413).json({ error: "Request body is too large" });
  }
  console.error("Request failed:", error.name);
  return res.status(500).json({ error: "Server error" });
});

const server = http.createServer(app);
server.headersTimeout = 15000;
server.requestTimeout = 70000;
const globalEngineLimit = limiter(6000);
const globalEvents = limiter(2000);
const io = new Server(server, {
  cors: corsOptions,
  serveClient: false,
  maxHttpBufferSize: 8192,
  connectTimeout: 10000,
  allowRequest: (req, callback) => {
    const allowed = corsOptions.origin.includes(req.headers.origin) && protection.spend(1024);
    protection.record("socket:handshake", allowed ? 1024 : 0, !allowed);
    callback(null, allowed);
  },
});
io.engine.use((req, res, next) => {
  if (!globalEngineLimit("all") || !protection.spend(256)) {
    protection.record("socket:transport", 0, true);
    res.writeHead(429, { "Retry-After": "60" }); res.end(); return;
  }
  protection.record("socket:transport", 256);
  next();
});
io.use((socket, next) => {
  if (io.of("/").sockets.size >= positiveSetting("MAX_CHAT_CONNECTIONS", 200)) return next(new Error("Chat is busy. Please try again later."));
  next();
});
function broadcast(room, event, value, except) {
  const recipients = io.sockets.adapter.rooms.get(room)?.size || 0;
  const bytes = (Buffer.byteLength(JSON.stringify(value ?? null)) + 128) * recipients;
  if (!protection.spend(bytes)) {
    protection.record("socket:broadcast", 0, true);
    io.in(room).disconnectSockets(true);
    return;
  }
  protection.record("socket:broadcast", bytes);
  const target = except ? io.to(room).except(except) : io.to(room);
  target.emit(event, value);
}


io.on("connection", (socket) => {
  if (io.of("/").sockets.size > positiveSetting("MAX_CHAT_CONNECTIONS", 200)) {
    socket.disconnect(true); return;
  }
  const allowEvent = limiter(120);
  const allowMutation = limiter(30);
  const allowTyping = limiter(2, 1000);
  socket.use(([event], next) => {
    if (!allowEvent("all") || !globalEvents("all") || !protection.spend(128)) {
      protection.record("socket:event", 0, true);
      socket.disconnect(true); return;
    }
    if (["send_message", "edit_message", "delete_message", "toggle_like"].includes(event) && !allowMutation("writes")) {
      socket.emit("chat_error", { message: "Too many chat actions. Please wait a minute." }); return;
    }
    if (["typing", "stop_typing"].includes(event) && !allowTyping("typing")) return;
    next();
  });
  const heartbeatBudget = setInterval(() => {
    if (!protection.spend(256)) socket.disconnect(true);
  }, 25000);
  heartbeatBudget.unref();

  socket.on("join_room", (room) => {
    if (!allowedRooms.has(room)) {
      socket.emit("join_room_error", {
        message: "You are not allowed to join this room!",
      });
      return;
    }

    for (const joined of socket.rooms) if (joined !== socket.id) socket.leave(joined);
    socket.join(room);
  });

  const onChatEvent = (event, handler) => {
    socket.on(event, async (data) => {
      try {
        if (!data || !allowedRooms.has(data.room) || !socket.rooms.has(data.room)) {
          socket.emit("chat_error", { message: "Join a valid room first." });
          return;
        }
        await handler(data);
      } catch (error) {
        console.error(`Chat event ${event} failed:`, error.name);
        socket.emit("chat_error", { message: "The chat action failed. Please try again." });
      }
    });
  };

  onChatEvent("send_message", async ({ room, senderName, senderId, content }) => {
    if (![senderName, senderId, content].every(isNonEmptyString) || senderName.length > 80 || senderId.length > 128 || content.length > 2000) {
      socket.emit("chat_error", { message: "A name, sender ID, and message are required." });
      return;
    }
    const newMsg = await Message.create({ room, senderName, senderId, content });
    broadcast(room, "receive_message", chatPayload(newMsg));
  });

  onChatEvent("edit_message", async ({ messageId, newContent, room }) => {
    if (!isObjectId(messageId) || !isNonEmptyString(newContent) || newContent.length > 2000) {
      socket.emit("chat_error", { message: "Invalid message or content." });
      return;
    }
    const updated = await Message.findOneAndUpdate(
      { _id: messageId, room },
      { content: newContent, edited: true },
      { new: true, runValidators: true, projection: { likes: { $slice: 100 } } }
    );
    if (updated) broadcast(room, "message_edited", chatPayload(updated));
  });

  onChatEvent("delete_message", async (data) => {
    const filter = messageDeleteFilter(data);
    if (!filter) {
      socket.emit("chat_error", { message: "Invalid message or client ID." });
      return;
    }
    const deleted = await Message.findOneAndDelete(filter);
    if (deleted) {
      broadcast(data.room, "message_deleted", data.messageId);
    } else {
      socket.emit("chat_error", { message: "Message not found or you cannot delete it." });
    }
  });

  onChatEvent("toggle_like", async ({ messageId, clientId, room }) => {
    if (!isObjectId(messageId) || !isNonEmptyString(clientId) || clientId.length > 128) return;
    const likes = { $slice: [{ $ifNull: ["$likes", []] }, 100] };
    const identity = { $literal: clientId };
    const msg = await Message.findOneAndUpdate(
      { _id: messageId, room },
      [{ $set: { likes: { $cond: [
        { $in: [identity, likes] },
        { $setDifference: [likes, [identity]] },
        { $cond: [{ $lt: [{ $size: likes }, 100] }, { $concatArrays: [likes, [identity]] }, likes] },
      ] } } }],
      { new: true }
    );
    if (msg) broadcast(room, "message_liked", chatPayload(msg));
  });

  socket.on("leave_room", (room) => {
    if (!allowedRooms.has(room)) return;
    socket.leave(room);
  });

  onChatEvent("typing", ({ room, senderName }) => {
    if (!isNonEmptyString(senderName) || senderName.length > 80) return;
    broadcast(room, "typing", { senderName }, socket.id);
  });

  onChatEvent("stop_typing", ({ room }) => {
    broadcast(room, "stop_typing", undefined, socket.id);
  });

  socket.on("disconnect", () => {
    clearInterval(heartbeatBudget);
  });
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
