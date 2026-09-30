import { useRef } from "react";

const ChatInput = ({
  newMsg,
  setNewMsg,
  handleSend,
  handleKeyPress,
  typingTimeoutRef,
  socket,
  room,
  handle,
}) => {
  const lastTyping = useRef(0);
  return (
    <div className="chat-input">
      <input
        type="text"
        maxLength={2000}
        placeholder="Type a message..."
        value={newMsg}
        onChange={(e) => {
          setNewMsg(e.target.value);

          if (socket.connected && Date.now() - lastTyping.current > 1500) {
            socket.emit("typing", { room, senderName: handle });
            lastTyping.current = Date.now();
          }
          clearTimeout(typingTimeoutRef.current);
          typingTimeoutRef.current = setTimeout(() => {
            if (socket.connected) socket.emit("stop_typing", { room });
          }, 1000);
        }}
        onKeyDown={handleKeyPress}
      />

      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default ChatInput;
