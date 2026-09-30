import { useEffect, useState } from "react";
import { BookOpen, Crown, Flame, GraduationCap, Trophy } from "lucide-react";
import api from "../lib/axios";

export default function TrendingSubjects() {
  const [data, setData] = useState({ courses: [], semester: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        const response = await api.get("/stats/popular-today", { signal: controller.signal });
        if (!controller.signal.aborted) setData(response.data);
      } catch {
        if (!controller.signal.aborted) setError(true);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    load();
    return () => controller.abort();
  }, [attempt]);

  return <section className="popular-card" aria-labelledby="popular-title" aria-busy={loading}>
    <div className="popular-heading">
      <span className="icon-tile"><Flame size={20} aria-hidden="true" /></span>
      <h2 id="popular-title">Popular Today</h2>
    </div>
    <p className="popular-caption">See what your campus is exploring.</p>
    {error ? <div className="popular-error" role="status">
      <p>Today’s activity couldn’t load.</p><button onClick={() => { setError(false); setLoading(true); setAttempt((value) => value + 1); }}>Try again</button>
    </div> : <>
      <div className="popular-section">
        <h3><GraduationCap size={15} aria-hidden="true" /> Semester <span>Top spot</span></h3>
        {loading ? <div className="skeleton semester-skeleton" /> : data.semester ? <div className="semester-winner">
          <span className="winner-badge"><Crown size={14} aria-hidden="true" /><strong>{data.semester.number}</strong></span>
          <div><strong>Semester {data.semester.number}</strong><span><Flame size={12} aria-hidden="true" /> {data.semester.count} material {data.semester.count === 1 ? "open" : "opens"}</span></div>
          <div className="activity-bars" aria-hidden="true"><i /><i /><i /><i /><i /></div>
        </div> : <div className="popular-empty"><Trophy size={19} aria-hidden="true" /><p>The top spot is waiting.<span>Explore a course to get things going.</span></p></div>}
      </div>
      <div className="popular-section courses-ranking">
        <h3><BookOpen size={14} aria-hidden="true" /> Courses <span>Top 2</span></h3>
        {loading ? <div className="popular-loading"><div className="skeleton" /><div className="skeleton" /><span className="sr-only" role="status">Loading popular activity</span></div>
          : data.courses.length ? <ol>{data.courses.slice(0, 2).map((course, index) => <li key={course.subjectId}>
            <span className={`rank-badge rank-${index + 1}`} aria-label={`Rank ${index + 1}`}><Trophy size={15} aria-hidden="true" /><small>0{index + 1}</small></span>
            <div><strong>{course.subjectName}</strong><span>{course.count} {course.count === 1 ? "open" : "opens"} today</span></div>
          </li>)}</ol>
          : <p className="empty-copy">Your next course could start the list.</p>}
      </div>
    </>}
  </section>;
}
