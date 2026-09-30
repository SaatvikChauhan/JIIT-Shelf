import { useEffect, useState } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router";
import { FileUp } from "lucide-react";
import Skeletons from "../components/Skeletons.jsx";
import SubjectCard from "../components/SubjectCard";
import api from "../lib/axios.js";
import { getDrive, peekDrive } from "../lib/driveCache.js";
import { getFolderId } from "../data/data.js";
import toast from "react-hot-toast";
import { isDriveItemList, parseSubjectName } from "../lib/utils.js";
import { writeJSON, writeStorage } from "../lib/storage.js";

const Subjects = () => {
  const { branch, sem } = useParams();
  return <SubjectsContent key={JSON.stringify([branch, sem])} branch={branch} sem={sem} />;
};

const SubjectsContent = ({ branch, sem }) => {
  const navigate = useNavigate();
  const folderId = getFolderId(branch, sem);
  const [cachedSubjects] = useState(() => {
    const cached = peekDrive(folderId);
    return folderId && isDriveItemList(cached) ? cached : null;
  });
  const [subjects, setSubjects] = useState(() => cachedSubjects || []);
  const [loading, setLoading] = useState(() => Boolean(folderId) && !cachedSubjects);

  const location = useLocation();
  const contributionSearch = new URLSearchParams({ branch, semester: String(sem) }).toString();
  const goBack = () => {
    if (location.state?.fromMaterial) {
      navigate("/");
      return;
    }
    navigate(-1);
  };

  useEffect(() => {
    if (!sem || !branch || !folderId) return;

    const controller = new AbortController();

    const fetchSubjects = async () => {
      try {
        const res = await getDrive(folderId);
        if (controller.signal.aborted) return;

        const fetchedSubjects = res.data.map((file) => ({
          id: file.id,
          name: file.name,
        }));

        setSubjects(fetchedSubjects);
      } catch (error) {
        if (controller.signal.aborted) return;
        console.error("Error fetching subjects:", error);
        toast.error("Error fetching subjects");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    fetchSubjects();
    return () => controller.abort();
  }, [branch, sem, folderId]);

  const handleCardClick = (subject) => {
    writeJSON("selectedSubject", subject);
    writeStorage("selectedSemester", sem);
    writeStorage("selectedBranch", branch);
    
    const { title } = parseSubjectName(subject.name);
    api.post("/stats/subject-click", { subjectId: subject.id, title, semester: sem }).catch(() => {
    });
    navigate(`/material/${subject.id}`);
  };

  return (
    <>
      <section className="page-padding">
        <div className="page-header">
          <button className="change" onClick={goBack}>
            ← Back
          </button>
          <h2 className="branch-sem">
            {branch} — Semester {sem}
          </h2>
          <Link className="context-contribute" to={`/contribute?${contributionSearch}`}><FileUp size={15} /> Contribute material</Link>
        </div>

        <div className="subject-list">
          {loading ? (
            <Skeletons kind="courses" count={6} />
          ) : subjects.length === 0 ? (
            <p>No subjects found for this semester.</p>
          ) : (
            subjects.map((subject) => (
              <SubjectCard
                key={subject.id}
                subject={subject}
                onClick={handleCardClick}
              />
            ))
          )}
        </div>
      </section>
    </>
  );
};

export default Subjects;
