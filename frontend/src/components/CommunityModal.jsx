import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router";
import { Globe, Users, X } from "lucide-react";
import Dropdown from "./Dropdown.jsx";
import { branchSemMap } from "../data/data.js";
import { readStorage, writeStorage } from "../lib/storage.js";

export default function CommunityModal({ onClose, selectedBranch = "", selectedSemester = "" }) {
  const navigate = useNavigate();
  const box = useRef(null);
  const [room, setRoom] = useState("");
  const [handle, setHandle] = useState(() => readStorage("chatHandle") || "");
  const [branch, setBranch] = useState(selectedBranch);
  const [semester, setSemester] = useState(String(selectedSemester));
  const [error, setError] = useState("");
  const validSelection = branchSemMap[branch]?.includes(Number(semester));
  const needsSelection = !branchSemMap[selectedBranch]?.includes(Number(selectedSemester));
  useEffect(() => {
    const previous = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    box.current?.focus();
    const keys = (event) => {
      if (event.key === "Escape" && !event.defaultPrevented) onClose();
      if (event.key !== "Tab") return;
      const controls = [...box.current.querySelectorAll('button:not(:disabled), input, a[href]')];
      const first = controls[0], last = controls.at(-1);
      if (event.shiftKey && (document.activeElement === first || document.activeElement === box.current)) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener("keydown", keys);
    return () => { document.body.style.overflow = overflow; document.removeEventListener("keydown", keys); previous?.focus(); };
  }, [onClose]);
  function join(event) {
    event.preventDefault();
    if (!handle.trim() || handle.trim().length > 80) return setError("Enter a handle of up to 80 characters.");
    if (room === "custom" && !validSelection) return setError("Choose your branch and semester.");
    writeStorage("chatHandle", handle.trim());
    onClose();
    navigate(`/chat/${encodeURIComponent(room === "all" ? "All-Years" : `${branch} Sem-${semester}`)}`);
  }
  return createPortal(<div className="modal-overlay" onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="modal-box community-dialog" ref={box} role="dialog" aria-modal="true" aria-labelledby="community-title" tabIndex={-1}>
      <button className="dialog-close" aria-label="Close community" onClick={onClose}><X size={19} /></button>
      <h3 id="community-title">Join the community</h3>
      {!room ? <div className="community-choices">
        <button onClick={() => setRoom("all")}><Globe size={23} /><strong>All years room</strong><span>Meet students across branches and semesters.</span></button>
        <button onClick={() => setRoom("custom")}><Users size={23} /><strong>{needsSelection ? "Custom room" : `${selectedBranch} Sem-${selectedSemester}`}</strong><span>Connect with your branch and semester.</span></button>
      </div> : <form onSubmit={join} className="community-form">
        <p>{room === "all" ? "All-Years" : validSelection ? `${branch} · Semester ${semester}` : "Your branch and semester room"}</p>
        <label htmlFor="community-handle">Your handle</label><input id="community-handle" value={handle} onChange={(event) => setHandle(event.target.value)} className="handle-input" autoComplete="nickname" />
        {room === "custom" && needsSelection && <>
          <label htmlFor="community-branch">Branch</label><Dropdown id="community-branch" label="Branch" value={branch} options={Object.keys(branchSemMap).map((value) => ({ value, label: value }))} onChange={(value) => { setBranch(value); setSemester(""); }} placeholder="Select branch" />
          <label htmlFor="community-semester">Semester</label><Dropdown key={branch} id="community-semester" label="Semester" value={semester} options={(branchSemMap[branch] || []).map((value) => ({ value: String(value), label: `Semester ${value}` }))} onChange={setSemester} disabled={!branch} placeholder="Select semester" />
        </>}
        {error && <p role="alert" className="form-error">{error}</p>}
        <button className="view-btn" type="submit">Join room</button><button className="close-btn" type="button" onClick={() => { setRoom(""); setError(""); }}>Back to rooms</button>
      </form>}
    </div>
  </div>, document.body);
}
