import { getDateLabel } from "../../lib/utils";
import MessageItem from "./MessageItem";

const MessageGroup = ({
  dateKey,
  msgs,
  clientId,
  editingMsgId,
  editingText,
  setEditingText,
  startEditing,
  saveEdit,
  cancelEdit,
  toggleLike,
  handleDeleteClick,
}) => {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="date-divider">
        <span>{getDateLabel(dateKey)}</span>
      </div>

      {msgs.map((msg) => (
        <MessageItem
          key={msg._id}
          msg={msg}
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
    </div>
  );
};

export default MessageGroup;
