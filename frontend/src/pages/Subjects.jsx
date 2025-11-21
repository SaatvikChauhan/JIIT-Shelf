import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router";
import Footer from "../components/Footer";
import SubjectCard from "../components/SubjectCard";
import api from "../lib/axios.js";
import { semIdMap } from "../data/data.js";
import toast from "react-hot-toast";
import { parseSubjectName } from "../lib/utils.js";

const Subjects = () => {
  const { sem } = useParams();
  const navigate = useNavigate();
  const [branch, setBranch] = useState(
    localStorage.getItem("selectedBranch") || ""
  );
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const goBack = () => {
    if (location.state?.fromMaterial) {
      navigate("/");
      return;
    }
    navigate(-1);
  };

  useEffect(() => {
    if (!sem) return;

    const cacheKey = `subjects_${sem}`;
    const cached = localStorage.getItem(cacheKey);

    if (cached) {
      setSubjects(JSON.parse(cached));
      setLoading(false);
      return; // prevent API call
    }

    const fetchSubjects = async () => {
      const folderId = semIdMap[sem];
      if (!folderId) {
        setSubjects([]);
        setLoading(false);
        return;
      }
      try {
        const res = await api.get(`/drive/${folderId}`);

        const fetchedSubjects = res.data.map((file) => ({
          id: file.id,
          name: file.name,
        }));

        setSubjects(fetchedSubjects);

        localStorage.setItem(cacheKey, JSON.stringify(fetchedSubjects));
      } catch (error) {
        console.error("Error fetching subjects:", error);
        toast.error("Error fetching subjects");
        setSubjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, [sem]);

  const handleCardClick = (subject) => {
    localStorage.setItem("selectedSubject", JSON.stringify(subject));
    localStorage.setItem("sem", sem);
    const { code, title, icon } = parseSubjectName(subject.name);
    api.post("/stats/subject-click", { subjectId: subject.id, title });
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
        </div>

        <div className="subject-list">
          {loading ? (
            <div className="loading loading-dots w-8 mx-auto"></div>
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
      <Footer />
    </>
  );
};

export default Subjects;
