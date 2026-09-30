import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, Award, FileUp, Info } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router";
import toast from "react-hot-toast";
import Dropdown from "../components/Dropdown.jsx";
import api from "../lib/axios.js";
import { branchSemMap, getFolderId } from "../data/data.js";
import { getDrive } from "../lib/driveCache.js";
import { parseSubjectName } from "../lib/utils.js";
import { MaterialFileLabel } from "../components/MaterialSection.jsx";
import ContributionSuccessModal from "../components/ContributionSuccessModal.jsx";

const materialTypes = [
  { value: "lec", label: "Lecture" },
  { value: "tut", label: "Tutorial" },
  { value: "pyq", label: "PYQ" },
  { value: "book", label: "Book" },
];

export default function ContributeMaterial() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const initialBranch = branchSemMap[params.get("branch")] ? params.get("branch") : "";
  const initialSemester = branchSemMap[initialBranch]?.includes(Number(params.get("semester"))) ? params.get("semester") : "";
  const [branch, setBranch] = useState(initialBranch);
  const [semester, setSemester] = useState(initialSemester);
  const [courseId, setCourseId] = useState(params.get("course") || "");
  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [type, setType] = useState("");
  const [credit, setCredit] = useState("");
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [successCount, setSuccessCount] = useState(0);
  const input = useRef(null);
  const selectedCourse = useMemo(() => courses.find(course => course.id === courseId), [courses, courseId]);

  useEffect(() => {
    if (!branch || !semester) return;
    const folderId = getFolderId(branch, semester);
    let active = true;
    async function load() {
      setLoadingCourses(true);
      try {
        const { data } = await getDrive(folderId);
        if (!active) return;
        const next = data.filter(item => item.type === "folder").map(item => {
          const parsed = parseSubjectName(item.name);
          return { id: item.id, name: item.name, code: parsed.code, title: parsed.title };
        }).filter(course => course.title);
        setCourses(next);
        setCourseId(current => next.some(course => course.id === current) ? current : "");
      } catch {
        if (active) { setCourses([]); setCourseId(""); toast.error("Courses could not be loaded"); }
      } finally {
        if (active) setLoadingCourses(false);
      }
    }
    load();
    return () => { active = false; };
  }, [branch, semester]);

  function chooseBranch(value) {
    setBranch(value);
    setSemester("");
    setCourseId("");
    setCourses([]);
  }

  function chooseFiles(event) {
    const selected = [...event.target.files];
    if (selected.length > 10) { toast.error("Choose up to 10 files in one submission"); event.target.value = ""; return; }
    const invalid = selected.find(file => !/\.(pdf|pptx)$/i.test(file.name) || file.size > 15 * 1024 * 1024);
    if (invalid) { toast.error("Each file must be a PDF or PPTX up to 15 MB"); event.target.value = ""; return; }
    setFiles(selected);
  }

  async function submit(event) {
    event.preventDefault();
    if (!branch || !semester || !selectedCourse || !type || !credit.trim() || !files.length) return toast.error("Complete every field and choose at least one file");
    setUploading(true);
    setProgress(0);
    const course = `${selectedCourse.code}${selectedCourse.code ? " - " : ""}${selectedCourse.title}`;
    let completed = 0;
    try {
      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        await api.post("/contributions", file, {
          params: { branch, semester, course, type, credit: credit.trim(), originalName: file.name },
          headers: { "Content-Type": file.type || "application/octet-stream" },
          timeout: 60000,
          onUploadProgress: ({ loaded, total }) => setProgress(Math.round(((index + (total ? loaded / total : 0)) / files.length) * 100)),
        });
        completed++;
      }
      setProgress(100);
      const submitted = files.length;
      setFiles([]);
      if (input.current) input.current.value = "";
      setSuccessCount(submitted);
    } catch (error) {
      const message = error.response?.data?.error || "Upload failed. Please try again.";
      if (completed) {
        setFiles([]);
        if (input.current) input.current.value = "";
        toast.error(`${completed} file${completed === 1 ? " was" : "s were"} submitted before the upload stopped. Re-select only the remaining files.`);
      } else toast.error(message);
    } finally {
      setUploading(false);
    }
  }

  function contributeAnother() {
    setSuccessCount(0);
    setProgress(0);
    setTimeout(() => { input.current?.scrollIntoView({ behavior: "smooth", block: "center" }); input.current?.focus(); }, 0);
  }

  function finishContribution() {
    setSuccessCount(0);
    setProgress(0);
  }

  return <main className="contribute-page page-padding">
    {successCount > 0 && <ContributionSuccessModal count={successCount} onAnother={contributeAnother} onDone={finishContribution} />}
    <button className="change contribute-back" onClick={() => navigate(-1)}><ArrowLeft size={14} /> Back</button>
    <header className="contribute-heading"><span className="icon-tile"><FileUp size={23} /></span><div><h1>Contribute Material</h1><p>Share useful material with JIITians. You’ll receive credits if it is accepted.</p><div className="material-link contribution-example"><MaterialFileLabel name="CSE__3__Sample Course__Tut__Tutorial 5__credits=Rohan B10.pdf" /></div></div></header>
    <div className="contribute-layout">
      <form className="contribute-form" onSubmit={submit}>
        <div className="contribute-grid">
          <label><span>Branch</span><Dropdown id="contribution-branch" label="Branch" value={branch} onChange={chooseBranch} placeholder="Select branch" options={Object.keys(branchSemMap).map(value => ({ value, label: value }))} /></label>
          <label><span>Semester</span><Dropdown id="contribution-semester" label="Semester" value={semester} onChange={value => { setSemester(value); setCourseId(""); setCourses([]); }} disabled={!branch} placeholder={branch ? "Select semester" : "Select branch first"} options={(branchSemMap[branch] || []).map(value => ({ value, label: `Semester ${value}` }))} /></label>
          <label className="contribute-wide"><span>Course</span><Dropdown id="contribution-course" label="Course" value={courseId} onChange={setCourseId} disabled={!semester || loadingCourses} placeholder={loadingCourses ? "Loading courses…" : semester ? "Select course" : "Select semester first"} options={courses.map(course => ({ value: course.id, label: `${course.code}${course.code ? " · " : ""}${course.title}` }))} /></label>
          <label><span>Material type</span><Dropdown id="contribution-type" label="Material type" value={type} onChange={setType} placeholder="Select type" options={materialTypes} /></label>
          <label><span>Name for credits</span><input value={credit} onChange={event => setCredit(event.target.value)} maxLength={80} placeholder="Name you want displayed if accepted" /></label>
          <label className="contribute-wide"><span>Files</span><input ref={input} className="contribute-file-input" type="file" multiple accept=".pdf,.pptx,application/pdf,application/vnd.openxmlformats-officedocument.presentationml.presentation" onChange={chooseFiles} /><small>PDF or PPTX · up to 10 files · 15 MB each</small></label>
        </div>
        {files.length > 0 && <div className="selected-files">{files.map(file => <span key={`${file.name}-${file.size}`}><FileUp size={13} />{file.name}</span>)}</div>}
        {uploading && <div className="upload-progress" aria-label={`Upload ${progress}%`}><span style={{ width: `${progress}%` }} /></div>}
        <button className="view-btn contribute-submit" disabled={uploading}>{uploading ? `Uploading ${progress}%` : "Submit for review"}</button>
      </form>
      <aside className="contribute-guide">
        <Award size={22} /><h2>Get credited</h2><p>If the material is accepted, the name you enter appears beside it on JIIT Shelf.</p>
        <div><Info size={17} /><p>Use clear filenames matching the material, such as <strong>Module 2.pdf</strong>, <strong>Tutorial 4.pdf</strong> or <strong>T1 2026.pdf</strong>. Convert JPEG, PNG and other image formats to PDF before uploading.</p></div>
        <p>Submissions appear in course material only after review and approval by JIIT Shelf.</p>
      </aside>
    </div>
  </main>;
}
