import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router";
import { ChevronDown } from "lucide-react";
import { Sun, Moon } from "lucide-react";

const Navbar = ({ theme, onToggleTheme }) => {
  const [showTools, setShowTools] = useState(false);
  const location = useLocation();
  const toolsRef = useRef(null);

  useEffect(() => {
    setShowTools(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (toolsRef.current && !toolsRef.current.contains(e.target)) {
        setShowTools(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <header>
      <div id="navbar">
        <Link to="/">
          <h1 id="brand">
            JIIT <span className="to-accent">Shelf</span>
          </h1>
        </Link>

        <div id="nav-options">
          <div className="tools" ref={toolsRef}>
            <button id="tools-primary" onClick={() => setShowTools(!showTools)}>
              Tools{" "}
              <ChevronDown
                className={`chevron-icon icon-dim ${showTools ? "rotate" : ""}`}
              />
            </button>

            <div
              className={`tools-secondary ${
                showTools ? "tools-secondary-display" : ""
              }`}
            >
              <Link to="/sgestimator">SGPA Estimator</Link>
            </div>
          </div>

          <div
            id="theme-toggle"
            className="toggle-wrapper"
            onClick={onToggleTheme}
          >
            <div
              className={`toggle-switch ${theme === "dark" ? "dark" : "light"}`}
            >
              <div className="toggle-thumb">
                {theme === "dark" ? (
                  <Sun className="toggle-icon" size={14} />
                ) : (
                  <Moon className="toggle-icon" size={14} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
