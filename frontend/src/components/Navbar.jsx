import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import { ChevronDown, Calculator, Moon, Sun, Bug, Users, ChartNoAxesCombined, FileUp } from "lucide-react";
import CourseSearch from "./CourseSearch.jsx";
import CommunityModal from "./CommunityModal.jsx";

export default function Navbar(props) {
  const location = useLocation();
  return <NavbarContent key={location.pathname} {...props} />;
}

function NavbarContent({ theme, onToggleTheme }) {
  const [showTools, setShowTools] = useState(false);
  const [community, setCommunity] = useState(false);
  const closeCommunity = useCallback(() => setCommunity(false), []);
  const toolsRef = useRef(null);
  const trigger = useRef(null);
  useEffect(() => {
    const close = (event) => {
      if (event.type === "keydown") {
        if (event.key === "Escape") {
          setShowTools(false);
          if (toolsRef.current?.contains(document.activeElement)) trigger.current?.focus();
        }
      } else if (!toolsRef.current?.contains(event.target)) setShowTools(false);
    };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", close);
    };
  }, []);

  return <header className="site-header">
    <div id="navbar">
      <Link to="/" className="brand" aria-label="JIIT Shelf home">JIIT <span>Shelf</span></Link>
      <nav id="nav-options" aria-label="Main navigation">
        <button className="community-trigger" onClick={() => setCommunity(true)}><Users size={17} /> Community</button>
        <CourseSearch />
        <div className="tools" ref={toolsRef} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setShowTools(false); }}>
          <button ref={trigger} id="tools-primary" aria-expanded={showTools} aria-controls="tools-menu" onClick={() => setShowTools((value) => !value)}>Tools <ChevronDown size={15} className={showTools ? "rotate" : ""} /></button>
          {showTools && <div id="tools-menu" className="tools-secondary"><Link to="/sgestimator" onClick={() => setShowTools(false)}><Calculator size={17} /> SGPA Estimator</Link><Link to="/contribute" onClick={() => setShowTools(false)}><FileUp size={17} /> Contribute Material</Link><Link to="/report-bug" onClick={() => setShowTools(false)}><Bug size={17} /> Report a Bug</Link></div>}
        </div>
      </nav>
      <div className="nav-utilities">
        <Link to="/stats" className="stats-nav-button" aria-label="Stats for nerds" title="Stats for nerds"><ChartNoAxesCombined size={19} aria-hidden="true" /></Link>
        <button className="theme-switch" role="switch" aria-checked={theme === "dark"} onClick={onToggleTheme} aria-label="Dark theme">
          <span className="theme-switch-thumb" /><Sun size={16} aria-hidden="true" /><Moon size={16} aria-hidden="true" />
        </button>
      </div>
    </div>
    {community && <CommunityModal onClose={closeCommunity} />}
  </header>;
}
