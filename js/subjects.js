document.addEventListener("DOMContentLoaded", () => {
    const branch = localStorage.getItem("selectedBranch");
    const semester = localStorage.getItem("selectedSemester");

    const heading = document.querySelector(".branch-sem");
    heading.textContent = `${branch} — Semester ${semester}`;

    const subjectList = document.querySelector(".subject-list");
    subjectList.innerHTML = "";

    const subjects = subjectMap[branch]?.[semester] || [];
    if (subjects.length === 0) {
        subjectList.innerHTML = "<p>No subjects found for this combination.</p>";
    }
    else {
        subjects.forEach((subject) => {
            const card = document.createElement("div");
            card.classList.add("subject-card");

            card.innerHTML = `
            <div class="subject-info">
                <i data-lucide="${subject.icon}" class="icon-detail"></i>
                <div>
                    <h3>${subject.name}</h3>
                    <p>${subject.code}</p>
                </div>

            </div>
            `;
            const materialBtn = document.createElement("a");
            materialBtn.href = "material.html";
            materialBtn.classList.add("material-btn");
            materialBtn.textContent = "View Material";

            materialBtn.addEventListener("click", () => {
                localStorage.setItem("selectedSubject", JSON.stringify(subject));
            });
            card.append(materialBtn);
            subjectList.append(card);
            lucide.createIcons();
        });
    }
});
