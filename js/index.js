document.getElementById("cta").addEventListener("submit", (e) => {
    e.preventDefault();

    const branch = document.getElementById("branch-select").value;
    const semester = document.getElementById("semester-select").value;

    localStorage.setItem("selectedBranch", branch);
    localStorage.setItem("selectedSemester", semester);

    window.location.href = "subjects.html";
});
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
