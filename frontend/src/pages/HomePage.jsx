import { ArrowUpRight, Code2, Download } from "lucide-react";
import BranchSemForm from "../components/BranchSemForm";
import TrendingSubjects from "../components/TrendingSubjects";
import ExamCountdown from "../components/ExamCountdown";

export default function HomePage() {
  return <>
    <main className="home-layout" id="main-content" tabIndex={-1}>
      <div className="home-primary">
        <section className="shelf-hero" aria-labelledby="hero-title">
          <h1 id="hero-title">All your JIIT study material,<br />One <span>Shelf.</span></h1>
          <p>Tired of hunting through Classrooms and Drive folders? Find all your resources — organized, accessible, and in one place.</p>
        </section>
        <div className="home-action-grid" id="find-material">
          <BranchSemForm mode="navigate" />
        </div>
      </div>
      <div className="home-sidebar-column">
        <aside className="home-sidebar" aria-label="Exam countdown and popular material">
          <div className="exam-panel">
            <ExamCountdown />
            <a href="https://drive.google.com/file/d/1KUMLMqzIXm_IXX9PiZX5uPDNzWZ3Ct8A/view?usp=drive_link" target="_blank" rel="noopener noreferrer" id="ac">
              <Download size={18} aria-hidden="true" /><span>Academic Calendar</span><ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
          <TrendingSubjects />
        </aside>
        <aside className="codeshelf-teaser" aria-label="CodeShelf announcement">
          <span className="teaser-icon"><Code2 size={22} aria-hidden="true" /></span>
          <p><strong>CodeShelf,</strong> launching soon.</p>
        </aside>
      </div>
    </main>
  </>;
}
