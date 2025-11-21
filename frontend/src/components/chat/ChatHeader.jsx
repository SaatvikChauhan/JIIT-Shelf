import { UsersRound } from "lucide-react";

const ChatHeader = ({ room, navigate }) => {
  return (
    <div className="chat-header">
      <button onClick={() => navigate("/")} className="chat-change">
        ← Home
      </button>

      <h2 className="room-title">
        <UsersRound /> <span>{room}</span>
      </h2>
    </div>
  );
};

export default ChatHeader;
