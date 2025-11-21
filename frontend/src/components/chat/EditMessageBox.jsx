const EditMessageBox = ({
  msgId,
  editingText,
  setEditingText,
  saveEdit,
  cancelEdit,
}) => {
  return (
    <div className="edit-container">
      <input
        type="text"
        value={editingText}
        onChange={(e) => setEditingText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && saveEdit(msgId)}
      />

      <div className="edit-container-actions">
        <button className="edit-save" onClick={() => saveEdit(msgId)}>
          Save
        </button>
        <button className="edit-cancel" onClick={cancelEdit}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditMessageBox;
