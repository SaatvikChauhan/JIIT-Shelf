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
  return (
    <div className="chat-input">
      <input
        type="text"
        placeholder="Type a message..."
        value={newMsg}
        onChange={(e) => {
          setNewMsg(e.target.value);

          socket.emit("typing", { room, senderName: handle });
          clearTimeout(typingTimeoutRef.current);
          typingTimeoutRef.current = setTimeout(() => {
            socket.emit("stop_typing", { room });
          }, 1000);
        }}
        onKeyDown={handleKeyPress}
      />

      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default ChatInput;
