import { Download } from "lucide-react";
import { trackEvent } from "../lib/analytics.js";

export default function CourseDesc({ cdURL }) {
  if (!cdURL) return null;

  return (
    <a
      href={`https://drive.google.com/file/d/${cdURL}/view`}
      target="_blank"
      rel="noopener noreferrer"
      id="cd"
      onClick={() => trackEvent("material_open")}
      onAuxClick={(event) => { if (event.button === 1) trackEvent("material_open"); }}
      title="Download"
    >
      <Download className="ac-icon" />
      Course Description
    </a>
  );
}
