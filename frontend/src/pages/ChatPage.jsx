import { useCallback, useEffect, useLayoutEffect, useState, useRef, useMemo } from "react";
import { useParams, useNavigate } from "react-router";
import { io } from "socket.io-client";
import api, { API_ORIGIN } from "../lib/axios";
import { readStorage, writeStorage } from "../lib/storage.js";
import toast from "react-hot-toast";
import ChatLeftPanel from "../components/chat/ChatLeftPanel";
import ChatHeader from "../components/chat/ChatHeader";
import MessageList from "../components/chat/MessageList";
import ChatInput from "../components/chat/ChatInput";
import DeleteModal from "../components/chat/DeleteModal";

const ChatPage = () => {
  const { room } = useParams();
  const handle = readStorage("chatHandle");
  return <ChatRoom key={JSON.stringify([room, handle])} room={room} handle={handle} />;
};

const ChatRoom = ({ room, handle }) => {
  const [socket] = useState(() => io(API_ORIGIN || undefined, {
    autoConnect: false, transports: ["websocket", "polling"], tryAllTransports: true,
    reconnectionDelay: 2000, reconnectionDelayMax: 30000, reconnectionAttempts: 8,
  }));
  const navigate = useNavigate();
  const roomSelection = room?.match(/^(.*) Sem-(\d+)$/);
  const sem = roomSelection?.[2] || readStorage("selectedSemester");
  const branch = roomSelection?.[1] || readStorage("selectedBranch");

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [before, setBefore] = useState(null);
  const [loadingOlder, setLoadingOlder] = useState(false);
  const olderRequest = useRef(null);
  const olderEvents = useRef([]);
  const scrollContainer = useRef(null);
  const restoreScroll = useRef(null);
  const [newMsg, setNewMsg] = useState("");
  const [typingUser, setTypingUser] = useState("");
  const [canDeleteAny, setCanDeleteAny] = useState(false);

  const [editingMsgId, setEditingMsgId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteMsgId, setDeleteMsgId] = useState(null);

  const [navHeight, setNavHeight] = useState(0);

  const [clientId] = useState(() => {
    let id = readStorage("clientId");
    if (!id) {
      id =
        globalThis.crypto?.randomUUID?.() ||
        Date.now().toString(36) + Math.random().toString(36).slice(2);
      writeStorage("clientId", id);
    }
    return id;
  });

  const scrollRef = useRef();
  const typingTimeoutRef = useRef(null);
  const clearTypingTimer = useCallback(() => {
    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = null;
  }, []);

  const groupMessagesByDate = (msgs) => {
    const groups = {};
    msgs.forEach((msg) => {
      const dateKey = new Date(msg.createdAt).toDateString();
      if (!groups[dateKey]) groups[dateKey] = [];
      groups[dateKey].push(msg);
    });
    return groups;
  };

  useEffect(() => {
    const navbar = document.getElementById("navbar");
    if (!navbar) return;
    const measure = () => setNavHeight(navbar.offsetHeight);
    const frame = requestAnimationFrame(measure);
    const observer = new ResizeObserver(measure);
    observer.observe(navbar);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    let historyRequest;
    let historyLoading = false;
    let pendingEvents = [];
    let fallback;

    const load = async () => {
      olderRequest.current?.abort();
      olderRequest.current = null;
      setLoadingOlder(false);
      historyRequest?.abort();
      const request = new AbortController();
      historyRequest = request;
      historyLoading = true;
      pendingEvents = [];
      try {
        const res = await api.get(`/chat/${encodeURIComponent(room)}`, { signal: request.signal, timeout: 15000 });
        if (controller.signal.aborted || request.signal.aborted) return;
        setMessages(pendingEvents.reduce((messages, update) => update(messages), res.data.messages));
        setBefore(res.data.before);
      } catch {
        if (controller.signal.aborted || request.signal.aborted) return;
        toast.error("Failed to load messages");
      } finally {
        if (!controller.signal.aborted && !request.signal.aborted) {
          historyLoading = false;
          pendingEvents = [];
          setLoading(false);
        }
      }
    };
    const connected = () => {
      clearTimeout(fallback);
      socket.emit("join_room", { room, senderName: handle });
      load();
    };
    const applyUpdate = (update) => {
      if (historyLoading) pendingEvents.push(update);
      if (olderRequest.current) olderEvents.current.push(update);
      setMessages(update);
    };
    const recv = (m) => {
      if (m?.room !== room) return;
      applyUpdate((p) => p.some((message) => message._id === m._id) ? p : [...p, m]);
    };
    const edited = (u) =>
      u?.room === room && applyUpdate((p) => p.map((m) => (m._id === u._id ? u : m)));
    const deleted = (id) => applyUpdate((p) => p.filter((m) => m._id !== id));
    const liked = edited;
    const joinErr = ({ message }) => toast.error(message);
    const disconnected = reason => {
      setCanDeleteAny(false);
      if (reason === "io server disconnect") toast.error("Chat paused by server protection. Please wait a minute, then reload to reconnect.");
    };

    const typing = ({ senderName }) =>
      senderName !== handle && setTypingUser(senderName);
    const stopTyping = () => setTypingUser("");

    socket.on("receive_message", recv);
    socket.on("message_edited", edited);
    socket.on("message_deleted", deleted);
    socket.on("message_liked", liked);
    socket.on("join_room_error", joinErr);
    socket.on("moderator_status", setCanDeleteAny);
    socket.on("typing", typing);
    socket.on("stop_typing", stopTyping);
    socket.on("chat_error", joinErr);
    socket.on("connect", connected);
    socket.on("disconnect", disconnected);
    fallback = setTimeout(load, 1500);
    socket.connect();

    return () => {
      controller.abort();
      clearTimeout(fallback);
      olderRequest.current?.abort();
      historyRequest?.abort();
      if (socket.connected) {
        socket.emit("stop_typing", { room });
        socket.emit("leave_room", room);
      }
      socket.off("receive_message", recv);
      socket.off("message_edited", edited);
      socket.off("message_deleted", deleted);
      socket.off("message_liked", liked);
      socket.off("join_room_error", joinErr);
      socket.off("moderator_status", setCanDeleteAny);
      socket.off("typing", typing);
      socket.off("stop_typing", stopTyping);
      socket.off("chat_error", joinErr);
      socket.off("connect", connected);
      socket.off("disconnect", disconnected);
      socket.disconnect();
      clearTypingTimer();
    };
  }, [room, handle, socket, clearTypingTimer]);

  const previousLast = useRef(null);
  useEffect(() => {
    const last = messages.at(-1)?._id;
    if (last && last !== previousLast.current)
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    previousLast.current = last;
  }, [messages]);
  useLayoutEffect(() => {
    if (restoreScroll.current && scrollContainer.current) {
      const { top, height } = restoreScroll.current;
      scrollContainer.current.scrollTop = top + scrollContainer.current.scrollHeight - height;
      restoreScroll.current = null;
    }
  }, [messages]);
  const loadOlder = async () => {
    if (!before || olderRequest.current) return;
    const request = new AbortController();
    olderRequest.current = request;
    olderEvents.current = [];
    setLoadingOlder(true);
    try {
      const { data } = await api.get(`/chat/${encodeURIComponent(room)}`, { params: { before }, signal: request.signal, timeout: 15000 });
      if (request.signal.aborted) return;
      const element = scrollContainer.current;
      restoreScroll.current = element ? { top: element.scrollTop, height: element.scrollHeight } : null;
      const updates = [...olderEvents.current];
      setMessages(current => {
        const ids = new Set(current.map(message => message._id));
        return updates.reduce((items, update) => update(items), [...data.messages.filter(message => !ids.has(message._id)), ...current]);
      });
      setBefore(data.before);
    } catch {
      if (!request.signal.aborted) toast.error("Could not load older messages. Please try again.");
    } finally {
      if (!request.signal.aborted) { olderRequest.current = null; setLoadingOlder(false); }
    }
  };

  const handleSend = () => {
    if (!socket.connected) return toast.error("Chat is reconnecting. Please try again.");
    if (!handle) return toast.error("Choose a chat handle from the home page first.");
    if (!newMsg.trim()) return toast.error("Can't send empty messages");
    if (newMsg.length > 2000 || handle.length > 80) return toast.error("Use a handle up to 80 characters and a message up to 2,000 characters.");

    const msgData = {
      room,
      senderName: handle,
      senderId: clientId,
      content: newMsg,
    };

    socket.emit("send_message", msgData);
    clearTypingTimer();
    socket.emit("stop_typing", { room });
    setNewMsg("");
  };

  const handleKeyPress = (e) => e.key === "Enter" && !e.nativeEvent.isComposing && handleSend();

  const startEditing = (msg) => {
    setEditingMsgId(msg._id);
    setEditingText(msg.content);
  };

  const saveEdit = (id) => {
    if (!socket.connected) return toast.error("Chat is reconnecting. Please try again.");
    if (!editingText.trim()) return toast.error("Message cannot be empty");
    if (editingText.length > 2000) return toast.error("Messages can have up to 2,000 characters.");

    socket.emit("edit_message", {
      messageId: id,
      newContent: editingText,
      room,
    });

    setEditingMsgId(null);
    setEditingText("");
  };

  const cancelEdit = () => {
    setEditingMsgId(null);
    setEditingText("");
  };

  const handleDeleteClick = (id) => {
    setDeleteMsgId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (!socket.connected) return toast.error("Chat is reconnecting. Please try again.");
    socket.emit("delete_message", { messageId: deleteMsgId, room, clientId });
    setShowDeleteModal(false);
    setDeleteMsgId(null);
  };

  const toggleLike = (msg) => {
    if (!socket.connected) return toast.error("Chat is reconnecting. Please try again.");
    socket.emit("toggle_like", {
      messageId: msg._id,
      clientId,
      room,
    });
  };

  const groupedMessages = useMemo(
    () => groupMessagesByDate(messages),
    [messages]
  );

  return (
    <div
      className="chat-page-wrapper"
      style={{ height: `calc(100dvh - ${navHeight}px)` }}
    >
      <ChatLeftPanel room={room} sem={sem} branch={branch} />

      <div className="chat-container">
        <ChatHeader room={room} navigate={navigate} />

        <MessageList
          scrollContainer={scrollContainer}
          hasOlder={Boolean(before)}
          loadingOlder={loadingOlder}
          loadOlder={loadOlder}
          canDeleteAny={canDeleteAny}
          groupedMessages={groupedMessages}
          loading={loading}
          clientId={clientId}
          editingMsgId={editingMsgId}
          editingText={editingText}
          setEditingText={setEditingText}
          startEditing={startEditing}
          saveEdit={saveEdit}
          cancelEdit={cancelEdit}
          toggleLike={toggleLike}
          handleDeleteClick={handleDeleteClick}
          typingUser={typingUser}
          scrollRef={scrollRef}
        />

        <ChatInput
          newMsg={newMsg}
          setNewMsg={setNewMsg}
          handleSend={handleSend}
          handleKeyPress={handleKeyPress}
          typingTimeoutRef={typingTimeoutRef}
          room={room}
          handle={handle}
          socket={socket}
        />

        <DeleteModal
          show={showDeleteModal}
          onConfirm={confirmDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      </div>
    </div>
  );
};

export default ChatPage;
