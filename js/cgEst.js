function createDisclaimer() {
    const discl = document.querySelector("#estimator-disclaimer");
    discl.innerHTML = `
        <p> &#10148; This tool provides a rough estimate of your semester performance based on the marks you provide. Actual SGPA may vary depending on official grading policies and other academic considerations.
        </p>
        <p> &#10148; Lab subject marks are asked only after 1 Dec 2025, when both midterm and endterm marks are available (as on academic schedule). This ensures accurate estimation of SGPA.
        </p>
        `;
    lucide.createIcons();
    discl.style.display = "flex";
}

// Utility function to calculate grade based on %
function getGradePoint(percentage) {
    if (percentage >= 80) return 10;
    if (percentage >= 75) return 9;
    if (percentage >= 70) return 8;
    if (percentage >= 60) return 7;
    if (percentage >= 50) return 6;
    if (percentage >= 40) return 5;
    if (percentage >= 30) return 4;
    return 0;
}

function loadSubjects(branch, semester) {
    document.querySelector("#estimator-content").style.display = "flex";
    const container = document.getElementById("subjects-container");
    const calculateSection = document.getElementById("calculate-section");
    container.innerHTML = "";

    const subjects = subjectMap[branch]?.[semester] || [];
    const today = new Date();
    const labCutoffDate = new Date("2025-12-01");

    if (!subjects.length) {
        container.innerHTML = "<p>No subjects found for this selection.</p>";
        return;
    }

    subjects.forEach(subject => {
        const subjectDiv = document.createElement("div");
        subjectDiv.classList.add("subject-block");

        if (subject.isLab) {
            if(today < labCutoffDate) return;
            subjectDiv.innerHTML = `
                <h3>${subject.name} <span>(${subject.code})</span></h3>
                <div class="input-group">
                    <label>Midterm Marks (out of 20)</label>
                    <input type="number" name="midterm" min="0" max="20">
                </div>
                <div class="input-group">
                    <label>Endterm Marks (out of 20)</label>
                    <input type="number" name="endterm" min="0" max="20">
                </div>
            `;
        }
        else {
            subjectDiv.innerHTML = `
            <h3>${subject.name} <span>(${subject.code})</span></h3>
            <div class="input-group">
                <label>T1 Marks (out of 20) <span class = "to-accent">*</span></label>
                <input type="number" name="t1" min="0" max="20" required>
            </div>
            <div class="input-group">
                <label>T2 Marks (out of 20)</label>
                <input type="number" name="t2" min="0" max="20">
            </div>
            <div class="input-group">
                <label>T3 Marks (out of 35)</label>
                <input type="number" name="t3" min="0" max="35">
            </div>
        `;
        }

        container.appendChild(subjectDiv);
    });
}

// Function to calculate estimated SGPA
function calculateSGPA() {
    const selectedBranch = document.getElementById("branch-select").value;
    const selectedSem = document.getElementById("semester-select").value;
    const subjectBlocks = document.querySelectorAll(".subject-block");

    let totalGradePoints = 0;
    let totalCredits = 0;
    let missingT1 = false;
    let invalidMarks = false;

    subjectBlocks.forEach((block) => {
        const t1 = parseFloat(block.querySelector("input[name='t1']").value);
        const t2 = parseFloat(block.querySelector("input[name='t2']").value);
        const t3 = parseFloat(block.querySelector("input[name='t3']").value);
        const midtermInput = block.querySelector("input[name='midterm']");
        const endtermInput = block.querySelector("input[name='endterm']");
        const midterm = midtermInput ? parseFloat(midtermInput.value) : null;
        const endterm = endtermInput ? parseFloat(endtermInput.value) : null;
        const isLab = block.innerHTML.includes("Midterm Marks");

        let subjectTotal = 0;

        // Validation check
        if ((!isNaN(t1) && t1 > 20) || (!isNaN(t2) && t2 > 20) || (!isNaN(t3) && t3 > 35) ||
            (!isNaN(midterm) && midterm > 20) || (!isNaN(endterm) && endterm > 20)) {
            invalidMarks = true;
            return;
        }

        if (!isLab) {
            if (isNaN(t1)) {
                missingT1 = true;
                return;
            }
            let assumedT2 = !isNaN(t2) ? t2 : t1;
            let assumedT3 = !isNaN(t3) ? t3 : (!isNaN(t2) ? ((t1 + t2) / 40) * 35 : (t1 / 20) * 35);

            if (isNaN(t2)) {
                const t2Input = block.querySelector("input[name='t2']");
                t2Input.placeholder = `Auto-estimated marks`;
                t2Input.classList.add("predicted-input");
                t2Input.addEventListener("input", function handler() {
                    t2Input.placeholder = ``;
                    t2Input.classList.remove("predicted-input");
                    t2Input.removeEventListener("input", handler);
                });

            }
            if (isNaN(t3)) {
                const t3Input = block.querySelector("input[name='t3']");
                t3Input.placeholder = `Auto-estimated marks`;
                t3Input.classList.add("predicted-input");
                t3Input.addEventListener("input", function handler() {
                    t3Input.placeholder = ``;
                    t3Input.classList.remove("predicted-input");
                    t3Input.removeEventListener("input", handler);
                });
            }
            subjectTotal = t1 + assumedT2 + assumedT3 + 20;
        } else {
            if (!isNaN(midterm) && !isNaN(endterm)) {
                subjectTotal = midterm + endterm + (((midterm + endterm) / 40) * 60);
            } else {
                return;
            }
        }

        const gradePoint = getGradePoint(subjectTotal);

        const subjectCode = block.querySelector("h3 span").textContent.replace(/[()]/g, "");
        const subjectObj = subjectMap[selectedBranch]?.[selectedSem]?.find((s) => s.code === subjectCode);

        if (subjectObj) {
            totalGradePoints += gradePoint * subjectObj.credits;
            totalCredits += subjectObj.credits;
        }
    });

    if (invalidMarks) {
        document.querySelector("#estimator-warning").innerHTML = `
        <i data-lucide="circle-alert" class="icon-detail"></i>
        Entered marks exceed allowed limits. Please check inputs.
        `;
        lucide.createIcons();
        document.querySelector("#estimator-warning").style.display = "flex";
        return;
    }

    if (missingT1) {
        document.querySelector("#estimator-warning").innerHTML = `
        <i data-lucide="circle-alert" class="icon-detail"></i>
        Please fill marks of atleast T1 for all subjects before calculating.
        `;
        lucide.createIcons();
        document.querySelector("#estimator-warning").style.display = "flex";
        return;
    }

    document.querySelector("#estimator-warning").style.display = "none";
    const sgpa = totalCredits ? (totalGradePoints / totalCredits).toFixed(2) : 0;
    const resultElement = document.getElementById("sgpa-result");
    resultElement.innerHTML = `<span class="loader-spinner"></span>`;

    setTimeout(() => {
        resultElement.textContent = sgpa > 10 ? 10 : sgpa;
        createDisclaimer();
    }, 1500);
}

document.getElementById("cta").addEventListener("submit", (e) => {
    e.preventDefault();
    const branch = document.getElementById("branch-select").value;
    const semester = document.getElementById("semester-select").value;
    loadSubjects(branch, semester);
    window.location.href = "#view-subjects";
});

document.getElementById("calculate-btn").addEventListener("click", calculateSGPA);

document.getElementById("branch-select").addEventListener("change", (e) => {
    const selectedBranch = e.target.value;
    const semesterSelect = document.getElementById("semester-select");

    semesterSelect.innerHTML = `<option value="" disabled selected hidden>Select Semester</option>`;

    if (subjectMap[selectedBranch]) {
        const semesters = Object.keys(subjectMap[selectedBranch]);
        semesters.forEach((sem) => {
            const option = document.createElement("option");
            option.value = sem;
            option.textContent = sem;
            semesterSelect.appendChild(option);
        });
    }
});

