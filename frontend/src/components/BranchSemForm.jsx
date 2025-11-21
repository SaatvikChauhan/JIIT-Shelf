import { useState } from "react";
import { branchSemMap } from "../data/data.js";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import JoinChatModal from "./JoinChatModal.jsx";

const BranchSemForm = ({ mode = "navigate", onSelect }) => {
  const navigate = useNavigate();
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");
  const [showChatModal, setShowChatModal] = useState(false);

  const handleBranchChange = (e) => {
    setBranch(e.target.value);
    setSemester("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!branch || !semester) {
      toast.error("All fields are required");
      return;
    }
    localStorage.setItem("selectedBranch", branch);
    localStorage.setItem("selectedSemester", semester);

    if (mode === "sg") {
      onSelect?.(branch, semester);
      return;
    }

    navigate(`/subjects/${semester}`);
  };

  const handleJoinChat = (e) => {
    e.preventDefault();
    if (!branch || !semester) {
      toast.error("All fields are required");
      return;
    }
    setShowChatModal(true);
  };

  const handleRoomEnter = (room, handle) => {
    localStorage.setItem("selectedBranch", branch);
    localStorage.setItem("selectedSemester", semester);
    localStorage.setItem("chatHandle", handle);
    setShowChatModal(false);
    navigate(`/chat/${room}`);
  };

  return (
    <>
      <form id="cta" onSubmit={handleSubmit} className="self-center">
        <div className="form-item">
          <div>Branch</div>
          <select
            id="branch-select"
            className="cta-select"
            value={branch}
            onChange={handleBranchChange}
          >
            <option value="" disabled hidden>
              Select Branch
            </option>
            {Object.keys(branchSemMap).map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        <div className="form-item">
          <div>Semester</div>
          <select
            id="semester-select"
            className="cta-select"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            disabled={!branch}
          >
            <option value="" disabled hidden>
              {branch ? "Select Semester" : "Select branch first"}
            </option>
            {branch &&
              branchSemMap[branch].map((sem) => (
                <option key={sem} value={sem}>
                  {sem}
                </option>
              ))}
          </select>
        </div>

        <div id="btn-container">
          <button type="submit" className="view-btn flex-grow">
            View Subjects
          </button>

          {mode !== "sg" && (
            <button className="view-btn" onClick={handleJoinChat}>
              Join Chat
            </button>
          )}
        </div>
      </form>

      {showChatModal && (
        <JoinChatModal
          branch={branch}
          semester={semester}
          onEnterChat={handleRoomEnter}
          onClose={() => setShowChatModal(false)}
        />
      )}
    </>
  );
};

export default BranchSemForm;
