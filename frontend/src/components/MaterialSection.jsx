import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../lib/axios.js";
import { iconMap } from "../data/data.js";
import * as Icons from "lucide-react";
import { extractNumber } from "../lib/utils.js";
import toast from "react-hot-toast";

function MaterialSection({ type, folderId }) {
  const [show, setShow] = useState(false);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const cacheKey = `files_${folderId}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        setFiles(parsed);
      } catch (_) {}
    }

    const getFiles = async () => {
      try {
        const res = await api.get(`/drive/${folderId}`);
        let items = res.data || [];

        items.sort((a, b) => {
          const numA = extractNumber(a.name);
          const numB = extractNumber(b.name);

          if (numA !== null && numB !== null) return numA - numB;
          if (numA !== null) return -1;
          if (numB !== null) return 1;

          return a.name.localeCompare(b.name);
        });

        setFiles(items);
        localStorage.setItem(cacheKey, JSON.stringify(items)); // save cache
      } catch (err) {
        console.error(err);
        toast.error("Failed to get material");
      }
    };

    getFiles();
  }, [folderId]);

  const icon = iconMap[type];
  const IconComponent = Icons[icon] || Icons.Folder;

  return (
    <div className="material-section">
      <button className="material-dropdown-btn" onClick={() => setShow(!show)}>
        <span className="material-type">
          <IconComponent className="icon-detail" /> {type}
        </span>
        <ChevronDown className={`chevron-icon ${show ? "rotate" : ""}`} />
      </button>

      <div className={`material-content ${show ? "show" : ""}`}>
        {files.length === 0 && <p>No content available.</p>}

        {files.map((file, idx) => (
          <a
            key={idx}
            href={`https://drive.google.com/file/d/${file.id}/view`}
            className="material-link"
            target="_blank"
          >
            {file.name}
          </a>
        ))}
      </div>
    </div>
  );
}

export default MaterialSection;
