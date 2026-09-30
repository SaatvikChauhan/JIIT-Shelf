import { useEffect, useId, useRef, useState } from "react";
import { Search, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router";
import { loadCourses } from "../lib/courseSearch.js";
import { matchesCourse } from "../lib/courseMatch.js";
import { parseSubjectName } from "../lib/utils.js";
import { writeJSON } from "../lib/storage.js";
import api from "../lib/axios.js";
import Skeletons from "./Skeletons.jsx";

export default function CourseSearch() {
  const [query, setQuery] = useState("");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [incomplete, setIncomplete] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const root = useRef(null);
  const mounted = useRef(true);
  const listId = useId();
  const navigate = useNavigate();
  const results = query.trim() ? courses.filter((course) => matchesCourse(course, query)).slice(0, 12) : [];
  useEffect(() => {
    mounted.current = true;
    const outside = (event) => { if (!root.current?.contains(event.target)) setOpen(false); };
    document.addEventListener("pointerdown", outside);
    return () => { mounted.current = false; document.removeEventListener("pointerdown", outside); };
  }, []);
  useEffect(() => {
    if (open && active >= 0) document.getElementById(`${listId}-${active}`)?.scrollIntoView({ block: "nearest" });
  }, [active, open, listId]);
  async function load() {
    if (loading) return;
    setLoading(true);
    try {
      const data = await loadCourses();
      if (mounted.current) { setCourses(data.courses); setIncomplete(data.incomplete); }
    } catch { if (mounted.current) setIncomplete(true); }
    finally { if (mounted.current) setLoading(false); }
  }
  function choose(course) {
    const { title } = parseSubjectName(course.name);
    writeJSON("selectedSubject", course);
    api.post("/stats/subject-click", { subjectId: course.id, title, semester: course.semester }).catch(() => {});
    setOpen(false); setQuery(""); setActive(-1);
    navigate(`/material/${course.id}`);
  }
  return <div className="course-search" ref={root} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}>
    <Search size={17} aria-hidden="true" />
    <input type="search" placeholder="Search course" aria-label="Search course" role="combobox" aria-autocomplete="list" aria-expanded={open} aria-controls={open ? listId : undefined} aria-activedescendant={open && active >= 0 ? `${listId}-${active}` : undefined}
      value={query} onFocus={() => { setOpen(true); if (!courses.length) load(); }}
      onChange={(event) => { setQuery(event.target.value); setActive(-1); setOpen(true); }}
      onKeyDown={(event) => {
        if (event.key === "Escape") { event.preventDefault(); setOpen(false); }
        if (event.key === "ArrowDown" || event.key === "ArrowUp") { event.preventDefault(); setOpen(true); if (results.length) setActive((index) => index < 0 ? (event.key === "ArrowDown" ? 0 : results.length - 1) : (index + (event.key === "ArrowDown" ? 1 : -1) + results.length) % results.length); }
        if (event.key === "Enter" && open && results[active]) { event.preventDefault(); choose(results[active]); }
      }} />
    {open && <div className="search-popover">
      {loading && <Skeletons count={3} />}
      {incomplete && !loading && <p role="status">Some courses couldn’t load. <button onClick={load}>Retry</button></p>}
      {!loading && !query.trim() && <p>Search by name, course code, or initials like SDF and DCD.</p>}
      <div id={listId} role="listbox" aria-label="Courses">
        {results.map((course, index) => { const { title, code } = parseSubjectName(course.name); return <div role="option" aria-selected={active === index} id={`${listId}-${index}`} key={course.id} className={`search-result ${active === index ? "active" : ""}`} onPointerDown={(event) => event.preventDefault()} onClick={() => choose(course)}>
          <div><strong>{title}</strong><span>{code} · {course.contexts.join(" / ")}</span></div><ArrowUpRight size={16} />
        </div>; })}
      </div>
      {!loading && query.trim() && !results.length && <p role="status">No matching courses found.</p>}
    </div>}
  </div>;
}
