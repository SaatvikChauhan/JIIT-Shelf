import { parseSubjectName } from "../lib/utils.js";
import * as Icons from "lucide-react";

const SubjectCard = ({ subject, onClick }) => {
  const { code, title, icon } = parseSubjectName(subject.name);
  const IconComponent = Icons[icon] || Icons.Folder;
  return (
    <div
      className="subject-card"
      onClick={() => onClick(subject)}
      style={{ cursor: "pointer" }}
    >
      <div className="subject-info">
        <IconComponent className="icon-detail" />

        <div>
          <h3>{title}</h3>
          <p>{code}</p>
        </div>
      </div>

      <button className="material-btn">View Material</button>
    </div>
  );
};

export default SubjectCard;
