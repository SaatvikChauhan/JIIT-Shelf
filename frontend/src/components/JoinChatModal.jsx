import { useState } from "react";
import { Globe, Users } from "lucide-react";
import toast from "react-hot-toast";

const JoinChatModal = ({ branch, semester, onEnterChat, onClose }) => {
  const [step, setStep] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [handle, setHandle] = useState("");

  const roomName = `${branch} Sem-${semester}`;

  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
    setStep(2);
  };

  const handleEnterChat = () => {
    if (!handle.trim()) {
      toast.error("Please enter a handle");
      return;
    }
    if(handle.length > 20) {
      toast.error("Handle too long");
      return;
    }
    onEnterChat(selectedRoom, handle.trim());
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        {step === 1 && (
          <>
            <h3>Select Chat Room</h3>
            <button
              className="chat-option"
              onClick={() => handleRoomSelect("All-Years")}
            >
              <Globe size="20" />
              All-Years Room
            </button>
            <button
              className="chat-option"
              onClick={() => handleRoomSelect(roomName)}
            >
              <Users size="20" />
              {roomName} Room
            </button>
            <button className="close-btn" onClick={onClose}>
              Cancel
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h3>Enter a handle to join</h3>
            <input
              type="text"
              placeholder="Your name"
              className="handle-input"
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleEnterChat();
              }}
            />
            <button className="chat-option" onClick={handleEnterChat}>
              Enter Chat
            </button>
            <button className="close-btn" onClick={onClose}>
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default JoinChatModal;
