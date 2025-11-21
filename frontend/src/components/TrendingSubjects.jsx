import { useEffect, useState } from "react";
import api from "../lib/axios";
import { Zap } from "lucide-react";

const TrendingSubjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await api.get("/stats/trending-today");
        setSubjects(res.data || []);
      } catch (err) {
        console.error("Failed to load trending:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  return (
    <div className="trending-box">
      <div className="trending-title">
        <Zap /> <span>Trending Today</span>
      </div>

      {loading ? (
        <div className="trend-placeholder">Loading...</div>
      ) : subjects.length === 0 ? (
        <div className="trend-placeholder">
          No one's trending yet
        </div>
      ) : (
        <div className="trending-list">
          {subjects.map((item) => (
            <div key={item.subjectName} className="trend-item">
              {item.subjectName}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrendingSubjects;
