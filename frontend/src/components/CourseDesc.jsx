import { Download } from "lucide-react";

export default function CourseDesc({ cdURL }) {
  if (!cdURL) return null;

  return (
    <a
      href={`https://drive.google.com/file/d/${cdURL}/view`}
      target="_blank"
      rel="noopener noreferrer"
      id="cd"
      title="Download"
    >
      <Download className="ac-icon" />
      Course Description
    </a>
  );
}
