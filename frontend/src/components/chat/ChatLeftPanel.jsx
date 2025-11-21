import { Link } from "react-router";

const ChatLeftPanel = ({ room, sem }) => {
  return (
    <div className="chat-left-panel">
      <div className="left-content">
        <p>
          This is a public chat for <b>{room}</b> students — general discussions
          and community help. Share doubts, materials, updates, and collaborate
          with your batch here.
        </p>

        <ul className="rules-list">
          <li>Be respectful — no abusive or offensive language.</li>
          <li>Stay on topic and keep discussions relevant to academics.</li>
          <li>Avoid spamming or repeated texts.</li>
          <li>Don't share rumors or misleading updates.</li>
          <li>Don't share personal information.</li>
          <li>Share notes/resources only if allowed by college rules.</li>
        </ul>

        <Link to={`/subjects/${sem}`} className="mat-btn">
          View Your Material
        </Link>
      </div>
    </div>
  );
};

export default ChatLeftPanel;
