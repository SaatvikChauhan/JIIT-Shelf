import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import api from "../lib/axios.js";
import { semIdMap } from "../data/data.js";
import BranchSemForm from "../components/BranchSemForm";
import { parseSubjectName } from "../lib/utils.js";
import { CircleCheckBig } from "lucide-react";
import toast from "react-hot-toast";

const SGEstimator = () => {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [loadingSubjects, setLoadingSubjects] = useState(false);

  const [resultsVisible, setResultsVisible] = useState(false);
  const [sgpa, setSgpa] = useState(null);
  const [isLoadingResult, setIsLoadingResult] = useState(false);

  const subjectsRef = useRef(null);

  const getGradePoint = (percentage) => {
    if (percentage >= 80) return 10;
    if (percentage >= 75) return 9;
    if (percentage >= 70) return 8;
    if (percentage >= 60) return 7;
    if (percentage >= 50) return 6;
    if (percentage >= 40) return 5;
    if (percentage >= 30) return 4;
    return 0;
  };

  const loadSubjects = async (branch, sem) => {
    const folderId = semIdMap[sem];
    if (!folderId) return;

    setLoadingSubjects(true);
    setResultsVisible(false);

    try {
      const res = await api.get(`/drive/${folderId}`);
      let parsed = res.data.map((item) => parseSubjectName(item.name));

      // not considering Lab subjects
      parsed = parsed.filter((sub) => !sub.title.toLowerCase().includes("lab"));
      setSubjects(parsed);
    } catch (err) {
      console.error(err);
      toast.error("Failed to get subjects");
    } finally {
      setLoadingSubjects(false);
      setTimeout(() => {
        if (subjectsRef.current) {
          subjectsRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 120);
    }
  };

  const addPredictionUI = (inputEl, text) => {
    if (!inputEl.value) {
      inputEl.placeholder = text;
      inputEl.classList.add("predicted-input");

      const handler = () => {
        inputEl.placeholder = "";
        inputEl.classList.remove("predicted-input");
        inputEl.removeEventListener("input", handler);
      };

      inputEl.addEventListener("input", handler);
    }
  };

  const handleCalculate = () => {
    let totalGradePoints = 0;
    let totalCredits = 0;
    let missingT1 = false;
    let invalidMarks = false;

    if (localStorage.getItem("selectedSemester") === "1") {
      subjects.forEach((sub) => {
        const block = document.getElementById(`sub-${sub.code}`);
        if (!block) return;

        const mid = block.querySelector("input[name='mid']");
        const end = block.querySelector("input[name='end']");

        const vMid = mid.value ? parseFloat(mid.value) : NaN;
        const vEnd = end.value ? parseFloat(end.value) : NaN;

        if (vMid > 30 || vEnd > 40) {
          invalidMarks = true;
          return;
        }

        if (isNaN(vMid)) {
          missingT1 = true;
          return;
        }

        const assumedEnd = !isNaN(vEnd) ? vEnd : (vMid / 30) * 40;
        if (isNaN(vEnd)) addPredictionUI(end, "Auto-estimated marks");
        const subjectTotal = vMid + assumedEnd + 25;

        const gp = getGradePoint(subjectTotal);

        totalGradePoints += gp * sub.credits;
        totalCredits += sub.credits;
      });
    } else {
      subjects.forEach((sub) => {
        const block = document.getElementById(`sub-${sub.code}`);
        if (!block) return;

        const t1 = block.querySelector("input[name='t1']");
        const t2 = block.querySelector("input[name='t2']");
        const t3 = block.querySelector("input[name='t3']");

        let subjectTotal = 0;

        const v1 = t1.value ? parseFloat(t1.value) : NaN;
        const v2 = t2.value ? parseFloat(t2.value) : NaN;
        const v3 = t3.value ? parseFloat(t3.value) : NaN;

        if (v1 > 20 || v2 > 20 || v3 > 35) {
          invalidMarks = true;
          return;
        }

        if (isNaN(v1)) {
          missingT1 = true;
          return;
        }

        const assumedT2 = !isNaN(v2) ? v2 : v1;
        const assumedT3 = !isNaN(v3)
          ? v3
          : !isNaN(v2)
          ? ((v1 + v2) / 40) * 35
          : (v1 / 20) * 35;

        if (isNaN(v2)) addPredictionUI(t2, "Auto-estimated marks");
        if (isNaN(v3)) addPredictionUI(t3, "Auto-estimated marks");

        subjectTotal = v1 + assumedT2 + assumedT3 + 20;
        const gp = getGradePoint(subjectTotal);
        totalGradePoints += gp * sub.credits;
        totalCredits += sub.credits;
      });
    }

    if (invalidMarks) {
      toast.error("Entered marks exceed allowed limits. Please check inputs.");
      return;
    }
    if (missingT1) {
      toast.error(
        "Please fill marks of atleast T1 for all subjects before calculating."
      );
      return;
    }
    const sg = totalGradePoints / totalCredits;
    setIsLoadingResult(true);
    setResultsVisible(true);
    setSgpa(null);

    setTimeout(() => {
      setIsLoadingResult(false);
      setSgpa((sg > 10 ? 10 : sg).toFixed(2));
    }, 1400);
  };

  return (
    <>
      <main className="page-padding">
        <div id="estimator-header" className="page-header">
          <button className="change" onClick={() => navigate(-1)}>
            ← Back
          </button>
          <h2 id="estimator-heading" className="branch-sem">
            SGPA Estimator
          </h2>
        </div>

        <p className="estimator-description">
          Estimate your semester SGPA based on your obtained marks till now.
          Just select your branch and semester, enter your marks, and see your
          likely SGPA.
        </p>

        <div id="estimator-main">
          <BranchSemForm
            mode="sg"
            onSelect={(branch, sem) => loadSubjects(branch, sem)}
          />

          {loadingSubjects && (
            <div className="loading loading-dots w-8 self-center"></div>
          )}

          {!loadingSubjects && subjects.length > 0 && (
            <div id="estimator-content" ref={subjectsRef}>
              <p
                id="estimator-warning-1"
                className="material-disclaimer"
                style={{ width: "fit-content", marginTop: 0 }}
              >
                <CircleCheckBig className="icon-detail" />
                Marks of at least T1 are required in all subjects for SGPA
                Estimation.
              </p>

              <div id="subjects-container">
                {subjects.map((sub) => {
                  return (
                    <div
                      className="subject-block"
                      id={`sub-${sub.code}`}
                      key={sub.code}
                    >
                      <h3>
                        {sub.title} <span>({sub.code})</span>
                      </h3>

                      {localStorage.getItem("selectedSemester") === "1" ? (
                        <>
                          <div className="input-group">
                            <label>
                              Midterm Marks (out of 30){" "}
                              <span className="to-accent">*</span>
                            </label>
                            <input
                              type="number"
                              name="mid"
                              min="0"
                              max="30"
                              className="text-normal"
                            />
                          </div>

                          <div className="input-group">
                            <label>Endterm Marks (out of 40)</label>
                            <input
                              type="number"
                              name="end"
                              min="0"
                              max="40"
                              className="text-normal"
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="input-group">
                            <label>
                              T1 Marks (out of 20){" "}
                              <span className="to-accent">*</span>
                            </label>
                            <input
                              type="number"
                              name="t1"
                              min="0"
                              max="20"
                              className="text-normal"
                            />
                          </div>
                          <div className="input-group">
                            <label>T2 Marks (out of 20)</label>
                            <input
                              type="number"
                              name="t2"
                              min="0"
                              max="20"
                              className="text-normal"
                            />
                          </div>
                          <div className="input-group">
                            <label>T3 Marks (out of 35)</label>
                            <input
                              type="number"
                              name="t3"
                              min="0"
                              max="35"
                              className="text-normal"
                            />
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>

              <div id="calculate-section">
                <button id="calculate-btn" onClick={handleCalculate}>
                  Calculate SGPA
                </button>

                {resultsVisible && (
                  <div id="sgpa-output">
                    <h3>Estimated SGPA:</h3>

                    <p id="sgpa-result">
                      {isLoadingResult ? (
                        <span className="loader-spinner"></span>
                      ) : (
                        sgpa
                      )}
                    </p>
                  </div>
                )}

                {resultsVisible && sgpa && (
                  <div
                    id="estimator-disclaimer"
                    className="material-disclaimer"
                  >
                    <p>
                      ➤ This tool provides a rough estimate of your semester
                      performance based on the marks you provide. Actual SGPA
                      may vary depending on official grading policies and other
                      academic considerations.
                    </p>
                    <p>
                      ➤ Lab subjects are excluded from this tool because their
                      grading is heavily TA-based (60/100), and with only 40
                      marks available to estimate from, the predictions become
                      highly unreliable.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default SGEstimator;
