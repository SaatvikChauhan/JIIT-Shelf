const DeleteModal = ({ show, onConfirm, onCancel }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Delete this message?</h3>

        <div className="modal-actions">
          <button className="dlt-btn" onClick={onConfirm}>
            Delete
          </button>

          <button className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
