import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { getDrive, peekDrive } from "../lib/driveCache.js";
import { iconMap } from "../data/data.js";
import * as Icons from "lucide-react";
import { isDriveItemList } from "../lib/utils.js";
import { compareNames, materialLabel } from "../lib/materials.js";
import Skeletons from "./Skeletons.jsx";
import { trackEvent } from "../lib/analytics.js";
import toast from "react-hot-toast";

function MaterialSection({ type, folderId }) {
  return <MaterialSectionContent key={folderId} type={type} folderId={folderId} />;
}

function MaterialSectionContent({ type, folderId }) {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(() => !isDriveItemList(peekDrive(folderId)));
  const [error, setError] = useState(false);
  const [files, setFiles] = useState(() => {
    const cached = peekDrive(folderId);
    return isDriveItemList(cached) ? [...cached].sort(compareNames) : [];
  });

  useEffect(() => {
    const controller = new AbortController();

    const getFiles = async () => {
      try {
        const res = await getDrive(folderId);
        if (controller.signal.aborted) return;
        let items = [...res.data];

        items.sort(compareNames);

        setFiles(items);
      } catch (err) {
        if (controller.signal.aborted) return;
        console.error(err);
        toast.error("Failed to get material");
        setError(true);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    getFiles();
    return () => controller.abort();
  }, [folderId]);

  const icon = iconMap[type];
  const IconComponent = Icons[icon] || Icons.Folder;

  return (
    <div className="material-section">
      <button className="material-dropdown-btn" aria-expanded={show} onClick={() => setShow(!show)}>
        <span className="material-type">
          <IconComponent className="icon-detail" /> {type}
        </span>
        <ChevronDown className={`chevron-icon ${show ? "rotate" : ""}`} />
      </button>

      <div className={`material-content ${show ? "show" : ""}`}>
        {loading && <Skeletons count={3} />}
        {!loading && files.length === 0 && <p>{error ? "Could not load material. Please reload the page to try again." : "No content available."}</p>}

        {files.map((file) => (
          <a
            key={file.id}
            href={`https://drive.google.com/file/d/${file.id}/view`}
            className="material-link"
            onClick={() => trackEvent("material_open")}
            onAuxClick={(event) => { if (event.button === 1) trackEvent("material_open"); }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MaterialFileLabel name={file.name} isPyq={/pyq|past.*paper|previous.*year/i.test(type)} />
          </a>
        ))}
      </div>
    </div>
  );
}

export default MaterialSection;

export function MaterialFileLabel({ name, isPyq }) {
  const { title, type, year, credit } = materialLabel(name, isPyq);
  return <><span className="file-type-icon" aria-label={`${type} file`}><Icons.File size={23} aria-hidden="true" /><small>{type}</small></span><span className="file-title">{title}</span><span className="material-chips">{year && <span className="material-chip"><Icons.CalendarDays size={11} />{year}</span>}{credit && <span className="material-chip credit-chip" title={`Contributed by ${credit}`}><Icons.Award size={11} />{credit}</span>}</span></>;
}
