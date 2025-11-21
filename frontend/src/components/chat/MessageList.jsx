import MessageGroup from "./MessageGroup";

const MessageList = ({
  groupedMessages,
  loading,
  clientId,
  editingMsgId,
  editingText,
  setEditingText,
  startEditing,
  saveEdit,
  cancelEdit,
  toggleLike,
  handleDeleteClick,
  typingUser,
  scrollRef,
}) => {
  return (
    <div className="chat-messages">
      {loading && (
        <div className="loading loading-dots w-8 mx-auto my-auto"></div>
      )}

      {!loading && Object.keys(groupedMessages).length === 0 && (
        <div className="mx-auto my-auto">
          <p className="opacity-50">Chat is empty</p>
        </div>
      )}

      {!loading &&
        Object.entries(groupedMessages).map(([dateKey, msgs]) => (
          <MessageGroup
            key={dateKey}
            dateKey={dateKey}
            msgs={msgs}
            clientId={clientId}
            editingMsgId={editingMsgId}
            editingText={editingText}
            setEditingText={setEditingText}
            startEditing={startEditing}
            saveEdit={saveEdit}
            cancelEdit={cancelEdit}
            toggleLike={toggleLike}
            handleDeleteClick={handleDeleteClick}
          />
        ))}

      {typingUser && (
        <div className="typing-indicator">{typingUser} is typing...</div>
      )}

      <div ref={scrollRef}></div>
    </div>
  );
};

export default MessageList;
