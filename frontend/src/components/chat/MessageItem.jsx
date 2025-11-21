import { formatTime } from "../../lib/utils";
import { Heart, Pencil, Trash2 } from "lucide-react";
import EditMessageBox from "./EditMessageBox";

const MessageItem = ({
  msg,
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
  const isOwn = msg.senderId === clientId;

  return (
    <div className={`message ${isOwn ? "own" : ""}`}>
      <div className="flex items-center gap-2">
        <div className="msg-avatar">
          {msg.senderName?.charAt(0)?.toUpperCase()}
        </div>
        <span className="msg-handle">{msg.senderName}</span>
      </div>

      {editingMsgId === msg._id ? (
        <EditMessageBox
          msgId={msg._id}
          editingText={editingText}
          setEditingText={setEditingText}
          saveEdit={saveEdit}
          cancelEdit={cancelEdit}
        />
      ) : (
        <span className="msg-text">
          {msg.content}{" "}
          {msg.edited && <span className="edited-tag">(edited)</span>}
        </span>
      )}

      <div className="msg-actions">
        <div>
          {isOwn && editingMsgId !== msg._id && (
            <>
              <button onClick={() => startEditing(msg)}>
                <Pencil size={15} />
              </button>
              <button onClick={() => handleDeleteClick(msg._id)}>
                <Trash2 size={15} />
              </button>
            </>
          )}

          <button onClick={() => toggleLike(msg)}>
            <Heart fill="#E64E4E" strokeWidth={0} size={15} />
            {msg.likes?.length || 0}
          </button>
        </div>

        <span className="msg-time">{formatTime(msg.createdAt)}</span>
      </div>
    </div>
  );
};

export default MessageItem;
