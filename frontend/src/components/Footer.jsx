import { Link } from "react-router";

export default function Footer() {
  return <footer className="shelf-footer">
    <div className="footer-columns">
      <section><h2>Explore JIIT Shelf</h2><Link to="/">Home</Link><Link to="/#find-material">Study Material</Link><Link to="/contribute">Contribute Material</Link><Link to="/sgestimator">SGPA Estimator</Link></section>
      <section><h2>Information</h2><Link to="/#find-material">Getting Started</Link><a href="https://drive.google.com/file/d/1KUMLMqzIXm_IXX9PiZX5uPDNzWZ3Ct8A/view?usp=drive_link" target="_blank" rel="noopener noreferrer">Academic Calendar</a><Link to="/terms">Terms of Use</Link><Link to="/privacy">Privacy Policy</Link><a href="https://github.com/SaatvikChauhan/JIIT-Shelf" target="_blank" rel="noopener noreferrer">Github</a></section>
      <section><h2>Our Community</h2><span>CodeShelf <small>Coming soon</small></span><a href="mailto:jiitshelf@gmail.com">Contact Us</a><Link to="/report-bug">Report a Bug</Link></section>
      <section><h2>Socials</h2>{["WhatsApp", "Discord", "LinkedIn", "Instagram"].map((name) => <span key={name}>{name} <small>Coming soon</small></span>)}</section>
    </div>
    <div className="footer-bottom"><Link to="/" className="brand">JIIT <span>Shelf</span></Link><p>© {new Date().getFullYear()} JIIT Shelf. All rights reserved.</p></div>
  </footer>;
}
