import BranchSemForm from "../components/BranchSemForm";
import TrendingSubjects from "../components/TrendingSubjects";
import ExamCountdown from "../components/ExamCountdown";
import Footer from "../components/Footer";
import { Download } from "lucide-react";

const HomePage = () => {
  return (
    <>
      <section id="hero">
        <div id="hero-1">
          <h1 className="heading">
            All your JIIT study material,
            <br />
            One <span className="to-accent">Shelf.</span>
          </h1>
          <p id="small-para">
            Tired of hunting through Classrooms and Drive folders? Find all your
            resources — organized, accessible, and in one place.
          </p>
        </div>

        <div id="hero-2">
          <BranchSemForm mode="navigate" />
          <TrendingSubjects />
        </div>

        <div id="hero-3">
          <ExamCountdown targetDate="2025-12-01T09:00:00" />
          <a
            href="https://drive.google.com/file/d/1SRVkiEAD3xdWSQCemtTL_eCm_tWd78eQ/view?usp=sharing"
            target="_blank"
            title="Download"
            id="ac"
            rel="noopener noreferrer"
          >
            <Download className="ac-icon" />
            Academic Calendar
          </a>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default HomePage;
