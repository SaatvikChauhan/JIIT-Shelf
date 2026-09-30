import { useEffect, useState } from "react";
import { getDrive } from "../lib/driveCache.js";
import { Youtube as YoutubeIcon, ChevronDown } from "lucide-react";
import { parseYouTubeText } from "../lib/utils.js";
import Skeletons from "./Skeletons.jsx";

function Youtube({ fileId }) {
  return <YoutubeContent key={fileId} fileId={fileId} />;
}

function YoutubeContent({ fileId }) {
  const [open, setOpen] = useState(false);
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!fileId) return;
    const controller = new AbortController();

    async function fetchYT() {
      try {
        const res = await getDrive(fileId);
        if (controller.signal.aborted) return;

        if (res.data?.type === "file" && res.data?.content) {
          setChannels(parseYouTubeText(res.data.content));
        }
      } catch (err) {
        if (controller.signal.aborted) return;
        console.error("Error loading YouTube channels:", err);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    fetchYT();
    return () => controller.abort();
  }, [fileId]);

  return (
    <div className="material-section">
      <button className="material-dropdown-btn" aria-expanded={open} onClick={() => setOpen(!open)}>
        <span className="material-type">
          <YoutubeIcon className="icon-detail" />
          YouTube Resources
        </span>
        <ChevronDown className={`chevron-icon ${open ? "rotate" : ""}`} />
      </button>

      <div className={`material-content ${open ? "show" : ""}`}>
        {loading ? <Skeletons count={3} /> : channels.length === 0 ? (
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
