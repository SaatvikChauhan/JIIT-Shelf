import { useState, useEffect } from "react";
import { branchSemMap } from "../data/data.js";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import JoinChatModal from "./JoinChatModal.jsx";
import { History } from "lucide-react";


const BranchSemForm = ({ mode = "navigate", onSelect }) => {
  const navigate = useNavigate();
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");
  const [showChatModal, setShowChatModal] = useState(false);
  const [lastBranch, setLastBranch] = useState("");
  const [lastSemester, setLastSemester] = useState("");

  useEffect(() => {
    const b = localStorage.getItem("selectedBranch");
    const s = localStorage.getItem("selectedSemester");
    if (b && s) {
      setLastBranch(b);
      setLastSemester(s);
    }
  }, []);

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

    navigate(`/subjects/${encodeURIComponent(branch)}/${semester}`);
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

  const handleGoToLastVisited = () => {
    if (lastBranch && lastSemester) {
      navigate(`/subjects/${encodeURIComponent(lastBranch)}/${lastSemester}`);
    }
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

        {mode !== "sg" && lastBranch && lastSemester && (
          <button
            type="button"
            className="last-visited-btn"
            onClick={handleGoToLastVisited}
          >
            <History size={18} />
            Go to Last Visited: {lastBranch} (Sem {lastSemester})
          </button>
        )}
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
