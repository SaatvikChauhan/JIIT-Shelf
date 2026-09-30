import { useEffect, useState } from "react";
import { Activity, ArrowLeft, BookOpen, Calculator, Eye, FileText, Users, RefreshCw, BarChart3 } from "lucide-react";
import { Link } from "react-router";
import api from "../lib/axios.js";
import Skeletons from "../components/Skeletons.jsx";

const number = (value) => new Intl.NumberFormat("en-IN").format(value);
const dateLabel = (date) => new Date(`${date}T00:00:00+05:30`).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kolkata" });
const metrics = [
  ["page_view", "Page views", Eye], ["visits", "Visits", Activity], ["browsers", "Unique browsers", Users],
  ["course_open", "Course opens", BookOpen], ["material_open", "Material clicks", FileText], ["sgpa_calculated", "SGPA calculations", Calculator],
];

export default function Stats() {
  const [days, setDays] = useState(30);
  return <main className="page-padding stats-page">
    <Link className="change" to="/"><ArrowLeft size={14} /> Home</Link>
    <header className="stats-heading"><span className="icon-tile"><BarChart3 size={24} /></span><h1>Stats for nerds</h1><span className="stats-tracking-chip">Tracking since September 2026</span></header>
    <div className="stats-toolbar"><span>Campus activity · IST</span><div className="stats-ranges" role="group" aria-label="Date range">{[7, 30, 90].map((value) => <button key={value} aria-pressed={days === value} onClick={() => setDays(value)}>{value} days</button>)}</div></div>
    <StatsContent key={days} days={days} />
  </main>;
}

function StatsContent({ days }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    let inFlight = false;
    async function load() {
      if (document.hidden || inFlight) return;
      inFlight = true;
      try {
        const response = await api.get(`/analytics/summary?days=${days}`, { signal: controller.signal, timeout: 15000 });
        if (!controller.signal.aborted) { setData(response.data); setError(false); }
      } catch { if (!controller.signal.aborted) setError(true); }
      finally { inFlight = false; }
    }
    load();
    const refresh = setInterval(load, 60000);
    document.addEventListener("visibilitychange", load);
    return () => { controller.abort(); clearInterval(refresh); document.removeEventListener("visibilitychange", load); };
  }, [days, attempt]);
  if (error) return <div className="stats-error" role="status"><p>Stats are taking a study break. Please try again.</p><button className="view-btn secondary" onClick={() => { setError(false); setAttempt((value) => value + 1); }}><RefreshCw size={15} /> Retry</button></div>;
  if (!data) return <div aria-busy="true"><Skeletons kind="courses" count={6} /><div className="stats-chart-loading skeleton" aria-label="Loading activity chart" /></div>;
  const peak = Math.max(1, ...data.daily.map((day) => day.page_view));
  return <>
    <div className="stats-metrics">{metrics.map((metric) => {
      const [key, label, Icon] = metric;
      return <article className="stats-metric" key={key}><Icon size={19} aria-hidden="true" /><span>{label}</span><strong>{number(data.totals[key])}</strong></article>;
    })}</div>
    <div className="stats-detail-grid">
      <section className="stats-panel"><div className="stats-panel-heading"><h2>Daily page views</h2><span>Last {days} days</span></div>
        {data.totals.page_view === 0 && <p className="stats-empty">No views recorded in this period yet.</p>}
        <div className="stats-chart" role="img" aria-label={`Daily page views over ${days} days. Exact values are in the table below.`}>
          {data.daily.map((day) => <div className="stats-bar-slot" key={day.date} title={`${dateLabel(day.date)}: ${number(day.page_view)} views`}><div className="stats-bar" style={{ height: `${day.page_view / peak * 100}%` }} /></div>)}
        </div>{data.daily.length > 0 && <div className="stats-axis"><span>{dateLabel(data.daily[0].date)}</span><span>{dateLabel(data.daily.at(-1).date)}</span></div>}
        <details className="stats-data-table"><summary>View daily numbers</summary><div><table><caption>Daily totals in IST</caption><thead><tr><th>Date</th><th>Views</th><th>Browsers</th><th>Course opens</th><th>Material clicks</th></tr></thead><tbody>{data.daily.map((day) => <tr key={day.date}><th scope="row">{dateLabel(day.date)}</th><td>{number(day.page_view)}</td><td>{number(day.browsers)}</td><td>{number(day.course_open)}</td><td>{number(day.material_open)}</td></tr>)}</tbody></table></div></details>
      </section>
      <section className="stats-panel"><div className="stats-panel-heading"><h2>Popular courses</h2><BookOpen size={17} /></div>
        {data.courses.length ? <ol className="stats-course-list">{data.courses.map((course, index) => <li key={`${index}-${course.name}`}><span className="stats-rank">{String(index + 1).padStart(2, "0")}</span><strong>{course.name}</strong><span>{number(course.opens)} opens</span></li>)}</ol> : <p className="stats-empty">The next course opened could start this list.</p>}
        <div className="stats-community"><Users size={19} /><span>Community visits</span><strong>{number(data.totals.community_join)}</strong></div>
      </section>
    </div>
  </>;
}
