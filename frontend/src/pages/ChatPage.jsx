import { useEffect, useState, useRef, useMemo } from "react";
import { useParams, useNavigate } from "react-router";
import { io } from "socket.io-client";
import api from "../lib/axios";
import toast from "react-hot-toast";
import ChatLeftPanel from "../components/chat/ChatLeftPanel";
import ChatHeader from "../components/chat/ChatHeader";
import MessageList from "../components/chat/MessageList";
import ChatInput from "../components/chat/ChatInput";
import DeleteModal from "../components/chat/DeleteModal";

const socket = io(import.meta.env.VITE_API_URL);

const ChatPage = () => {
  const navigate = useNavigate();
  const sem = localStorage.getItem("selectedSemester");
  const { room } = useParams();
  const handle = localStorage.getItem("chatHandle");

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newMsg, setNewMsg] = useState("");
  const [typingUser, setTypingUser] = useState("");

  const [editingMsgId, setEditingMsgId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteMsgId, setDeleteMsgId] = useState(null);

  const [navHeight, setNavHeight] = useState(0);

  const [clientId] = useState(() => {
    let id = localStorage.getItem("clientId");
    if (!id) {
      id =
        crypto?.randomUUID?.() ||
        Date.now().toString(36) + Math.random().toString(36).slice(2);
      localStorage.setItem("clientId", id);
    }
    return id;
  });

  const scrollRef = useRef();
  const typingTimeoutRef = useRef(null);

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
    if (navbar) setNavHeight(navbar.offsetHeight);
  }, []);

  useEffect(() => {
    socket.emit("join_room", room);

    const load = async () => {
      try {
        const res = await api.get(`/chat/${room}`);
        setMessages(res.data);
      } catch (err) {
        toast.error("Failed to load messages");
      } finally {
        setLoading(false);
      }
    };
    load();

    const recv = (m) => setMessages((p) => [...p, m]);
    const edited = (u) =>
      setMessages((p) => p.map((m) => (m._id === u._id ? u : m)));
    const deleted = (id) => setMessages((p) => p.filter((m) => m._id !== id));
    const liked = (u) =>
      setMessages((p) => p.map((m) => (m._id === u._id ? u : m)));
    const joinErr = ({ message }) => toast.error(message);

    const typing = ({ senderName }) =>
      senderName !== handle && setTypingUser(senderName);
    const stopTyping = () => setTypingUser("");

    socket.on("receive_message", recv);
    socket.on("message_edited", edited);
    socket.on("message_deleted", deleted);
    socket.on("message_liked", liked);
    socket.on("join_room_error", joinErr);
    socket.on("typing", typing);
    socket.on("stop_typing", stopTyping);

    return () => {
      socket.emit("leave_room", room);
      socket.off("receive_message", recv);
      socket.off("message_edited", edited);
      socket.off("message_deleted", deleted);
      socket.off("message_liked", liked);
      socket.off("join_room_error", joinErr);
      socket.off("typing", typing);
      socket.off("stop_typing", stopTyping);
      clearTimeout(typingTimeoutRef.current);
    };
  }, [room]);

  const prevLen = useRef(messages.length);
  useEffect(() => {
    if (messages.length > prevLen.current)
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });

    prevLen.current = messages.length;
  }, [messages]);

  const handleSend = () => {
    if (!newMsg.trim()) return toast.error("Can't send empty messages");

    const msgData = {
      room,
      senderName: handle,
      senderId: clientId,
      content: newMsg,
      createdAt: new Date(),
    };

    socket.emit("send_message", msgData);
    setNewMsg("");
  };

  const handleKeyPress = (e) => e.key === "Enter" && handleSend();

  const startEditing = (msg) => {
    setEditingMsgId(msg._id);
    setEditingText(msg.content);
  };

  const saveEdit = (id) => {
    if (!editingText.trim()) return toast.error("Message cannot be empty");

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
    socket.emit("delete_message", { messageId: deleteMsgId, room });
    setShowDeleteModal(false);
    setDeleteMsgId(null);
  };

  const toggleLike = (msg) => {
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
      style={{ height: `calc(100vh - ${navHeight}px)` }}
    >
      <ChatLeftPanel room={room} sem={sem} />

      <div className="chat-container">
        <ChatHeader room={room} navigate={navigate} />

        <MessageList
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
