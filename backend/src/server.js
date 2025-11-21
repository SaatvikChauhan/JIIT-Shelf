import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

import connectDB from "./config/db.js";
import driveRoutes from "./routes/driveRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";
import Message from "./models/Message.js";
import "./cron/clearOldClicks.js";

dotenv.config();

const app = express();
app.use(cors({
  origin: [
    process.env.CLIENT_URL,
  ],
  methods: ["GET", "POST"],
}));

app.use(express.json());

connectDB();

app.use("/api/drive", driveRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/stats", statsRoutes);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  },
});


// Socket
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join_room", (room) => {
    const allowedRooms = [
      "CSE Sem-1",
      "CSE Sem-2",
      "CSE Sem-3",
      "ECE Sem-1",
      "ECE Sem-2",
      "IT Sem-1",
      "IT Sem-2",
      "IT Sem-3",
      "Mathematics and Computing (M&C) Sem-1",
      "Mathematics and Computing (M&C) Sem-2",
      "Mathematics and Computing (M&C) Sem-3",
      "Robotics and Artificial Intelligence Sem-1",
      "Robotics and Artificial Intelligence Sem-2",
      "All-Years",
    ];

    if (!allowedRooms.includes(room)) {
      socket.emit("join_room_error", {
        room,
        message: "You are not allowed to join this room!",
      });
      return;
    }

    socket.join(room);
    console.log(`User ${socket.id} joined room ${room}`);
  });

  socket.on("send_message", async (data) => {
    const newMsg = await Message.create(data);
    io.to(data.room).emit("receive_message", newMsg);
  });

  socket.on("edit_message", async ({ messageId, newContent, room }) => {
    const updated = await Message.findByIdAndUpdate(
      messageId,
      { content: newContent, edited: true },
      { new: true }
    );
    io.to(room).emit("message_edited", updated);
  });

  socket.on("delete_message", async ({ messageId, room }) => {
    await Message.findByIdAndDelete(messageId);
    io.to(room).emit("message_deleted", messageId);
  });

  socket.on("toggle_like", async ({ messageId, clientId, room }) => {
    const msg = await Message.findById(messageId);
    if (!msg) return;
    
    if (msg.likes.includes(clientId)) {
      msg.likes = msg.likes.filter((id) => id !== clientId);
    } else {
      msg.likes.push(clientId);
    }

    await msg.save();
    io.to(room).emit("message_liked", msg);
  });

  socket.on("leave_room", (room) => {
    socket.leave(room);
    console.log(`User ${socket.id} left room ${room}`);
  });

  socket.on("typing", ({ room, senderName }) => {
    socket.to(room).emit("typing", { senderName });
  });

  socket.on("stop_typing", ({ room }) => {
    socket.to(room).emit("stop_typing");
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
