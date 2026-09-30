import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { CheckCircle2, FileUp, X } from "lucide-react";

export default function ContributionSuccessModal({ count, onAnother, onDone }) {
  const box = useRef(null);

  useEffect(() => {
    const previous = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    box.current?.focus();
    const keys = (event) => {
      if (event.key === "Escape") onDone();
      if (event.key !== "Tab") return;
      const controls = [...box.current.querySelectorAll("button:not(:disabled)")];
      const first = controls[0], last = controls.at(-1);
      if (event.shiftKey && (document.activeElement === first || document.activeElement === box.current)) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener("keydown", keys);
    return () => { document.body.style.overflow = overflow; document.removeEventListener("keydown", keys); previous?.focus(); };
  }, [onDone]);

  return createPortal(<div className="modal-overlay" onClick={(event) => { if (event.target === event.currentTarget) onDone(); }}>
    <div className="modal-box contribution-success-dialog" ref={box} role="dialog" aria-modal="true" aria-labelledby="contribution-success-title" tabIndex={-1}>
      <button className="dialog-close" aria-label="Close confirmation" onClick={onDone}><X size={19} /></button>
      <span className="success-modal-icon"><CheckCircle2 size={29} /></span>
      <h3 id="contribution-success-title">Submitted for review</h3>
      <p>{count === 1 ? "Your file has" : `${count} files have`} been sent to JIIT Shelf for review. {count === 1 ? "It" : "They"} will appear in the selected course if approved.</p>
      <div className="modal-actions contribution-success-actions"><button className="view-btn" onClick={onAnother}>Contribute another</button><button className="close-btn" onClick={onDone}>OK</button></div>
    </div>
  </div>, document.body);
}
