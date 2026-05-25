import { Github } from "lucide-react";
import { Link } from "react-router";
const Footer = () => {
  return (
    <footer id="footer">

      <div className="footer-center">
        <p className="footer-text">
          Crafted with
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="footer-heart" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
            2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09
            C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 
            22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          for JIITians
        </p>
      </div>

      <div className="footer-right">
        <nav className="footer-nav">
          <Link to="/about" className="footer-link">About</Link>
          <Link to="/privacy-policy" className="footer-link">Privacy Policy</Link>
          <Link to="/contact" className="footer-link">Contact</Link>
        </nav>
        <p className="footer-copy">
          © {new Date().getFullYear()} JIIT Shelf
        </p>
        <a
          href="https://github.com/SaatvikChauhan/JIIT-Shelf"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-github"
        >
          <Github className="icon-dim" size={18} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;