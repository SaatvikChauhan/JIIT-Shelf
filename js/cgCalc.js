lucide.createIcons();
document.addEventListener("DOMContentLoaded", () => {
    const currentSemSelect = document.getElementById("current-sem");
    const prevSemsContainer = document.getElementById("previous-sems-container");
    const cgpaForm = document.getElementById("cgpa-form");
    const resultDiv = document.getElementById("cgpa-result");

    currentSemSelect.addEventListener("change", () => {
        const selectedSem = parseInt(currentSemSelect.value);
        prevSemsContainer.innerHTML = "";

        for (let i = 1; i < selectedSem; i++) {
            const div = document.createElement("div");
            div.classList.add("form-group");
            div.innerHTML = `
                <label>Semester ${i} SGPA:</label>
                <input type="number" class="sgpa-input" data-sem="${i}" step="0.01" min="0" max="10" required>

                <label>Semester ${i} Credits:</label>
                <input type="number" class="credits-input" data-sem="${i}" step="0.5" min="1" required>
            `;
            prevSemsContainer.appendChild(div);
        }
    });

    cgpaForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const sGPAInputs = document.querySelectorAll(".sgpa-input");
        const creditsInputs = document.querySelectorAll(".credits-input");
        const currentCredits = parseFloat(document.getElementById("current-credits").value);
        const targetCGPA = parseFloat(document.getElementById("target-cgpa").value);

        let totalPrevGradePoints = 0;
        let totalPrevCredits = 0;

        sGPAInputs.forEach((input, index) => {
            const sgpa = parseFloat(input.value);
            const credits = parseFloat(creditsInputs[index].value);
            totalPrevGradePoints += sgpa * credits;
            totalPrevCredits += credits;
        });

        const totalCredits = totalPrevCredits + currentCredits;
        const requiredTotalGradePoints = targetCGPA * totalCredits;
        const requiredCurrentGradePoints = requiredTotalGradePoints - totalPrevGradePoints;
        const requiredSGPA = requiredCurrentGradePoints / currentCredits;

        if (requiredSGPA > 10) {
            resultDiv.innerHTML = `
                <p class="result-text">
                    <strong>It's not possible</strong> to reach your target CGPA with the entered values.<br>
                    Required SGPA: <strong>${requiredSGPA.toFixed(2)}</strong> (Maximum allowed: 10.00)
                </p>
            `;
        } else if (requiredSGPA < 0) {
            resultDiv.innerHTML = `
                <p class="result-text">
                    Your target CGPA is already achieved with your previous semesters.<br>
                    You can maintain or exceed this easily.
                </p>
            `;
        } else {
            resultDiv.innerHTML = `
                <p class="result-text">
                    You need an SGPA of <strong>${requiredSGPA.toFixed(2)}</strong> this semester to reach your target CGPA of <strong>${targetCGPA}</strong>.
                </p>
            `;
        }
    });
});
