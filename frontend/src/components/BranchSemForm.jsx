import { useCallback, useState } from "react";
import { branchSemMap } from "../data/data.js";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import CommunityModal from "./CommunityModal.jsx";
import { ArrowUpRight, BookOpen, History, MessagesSquare } from "lucide-react";
import Dropdown from "./Dropdown.jsx";
import { readStorage, writeStorage } from "../lib/storage.js";


const BranchSemForm = ({ mode = "navigate", onSelect }) => {
  const navigate = useNavigate();
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");
  const [showChatModal, setShowChatModal] = useState(false);
  const closeChatModal = useCallback(() => setShowChatModal(false), []);
  const [lastBranch] = useState(() => readStorage("selectedBranch") || "");
  const [lastSemester] = useState(() => readStorage("selectedSemester") || "");

  const handleBranchChange = (value) => {
    setBranch(value);
    setSemester("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!branch || !semester) {
      toast.error("All fields are required");
      return;
    }
    writeStorage("selectedBranch", branch);
    writeStorage("selectedSemester", semester);

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

  const handleGoToLastVisited = () => {
    if (lastBranch && lastSemester) {
      navigate(`/subjects/${encodeURIComponent(lastBranch)}/${lastSemester}`);
    }
  };

  return (
    <>
      <form id="cta" onSubmit={handleSubmit} className="self-center">
        <div className="selector-heading"><span className="icon-tile"><BookOpen size={21} /></span><div><h2>{mode === "sg" ? "Choose your semester" : "Find your study material"}</h2><p>Your branch. Your semester. Your shelf.</p></div></div>
        <div className="form-item">
          <label htmlFor="branch-select">Branch</label>
          <Dropdown id="branch-select" label="Branch" value={branch} onChange={handleBranchChange}
            placeholder="Select your branch" options={Object.keys(branchSemMap).map((name) => ({ value: name, label: name }))} />
        </div>

        <div className="form-item">
          <label htmlFor="semester-select">Semester</label>
          <Dropdown key={branch} id="semester-select" label="Semester" value={semester} onChange={setSemester}
            disabled={!branch} placeholder={branch ? "Select your semester" : "Select branch first"}
            options={(branchSemMap[branch] || []).map((sem) => ({ value: String(sem), label: `Semester ${sem}` }))} />
        </div>

        <div id="btn-container">
          <button type="submit" className="view-btn flex-grow">
            View Subjects <ArrowUpRight size={17} aria-hidden="true" />
          </button>

          {mode !== "sg" && (
            <button type="button" className="view-btn secondary" onClick={handleJoinChat}>
              <MessagesSquare size={17} aria-hidden="true" /> Join Chat
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
        <CommunityModal
          selectedBranch={branch}
          selectedSemester={semester}
          onClose={closeChatModal}
        />
      )}
    </>
  );
};

export default BranchSemForm;
