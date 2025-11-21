import { useEffect, useState } from "react";
import api from "../lib/axios.js";
import { Youtube as YoutubeIcon, ChevronDown } from "lucide-react";
import { parseYouTubeText } from "../lib/utils.js";

function Youtube({ fileId }) {
  const [open, setOpen] = useState(false);
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    if (!fileId) return;

    async function fetchYT() {
      try {
        const res = await api.get(`/drive/${fileId}`);

        if (res.data?.type === "file" && res.data?.content) {
          setChannels(parseYouTubeText(res.data.content));
        }
      } catch (err) {
        console.error("Error loading YouTube channels:", err);
      }
    }

    fetchYT();
  }, [fileId]);

  return (
    <div className="material-section">
      <button className="material-dropdown-btn" onClick={() => setOpen(!open)}>
        <span className="material-type">
          <YoutubeIcon className="icon-detail" />
          YouTube Resources
        </span>
        <ChevronDown className={`chevron-icon ${open ? "rotate" : ""}`} />
      </button>

      <div className={`material-content ${open ? "show" : ""}`}>
        {channels.length === 0 ? (
          <p>No content available.</p>
        ) : (
          channels.map((ch, idx) => (
            <a
              key={idx}
              href={ch.link}
              className="material-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                className="yt-logo"
                style={{ backgroundImage: `url('${ch.logo}')` }}
              ></div>
              {ch.title}
            </a>
          ))
        )}
      </div>
    </div>
  );
}

export default Youtube;
