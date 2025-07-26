function startExamCountdown(targetDateStr) {
    const timer = document.getElementById("timer");
    const [daysEl, hoursEl, minutesEl, secondsEl] = timer.querySelectorAll(".number");

    const targetDate = new Date(targetDateStr).getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance <= 0) {
            daysEl.textContent = "00";
            hoursEl.textContent = "00";
            minutesEl.textContent = "00";
            secondsEl.textContent = "00";

            const heading = document.querySelector(".ecw-heading");
            heading.textContent = "Exam Time!";
            clearInterval(interval);
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        // (a%n) % m = a%m, when n is a multiple of m

        daysEl.textContent = String(days).padStart(2, "0");
        hoursEl.textContent = String(hours).padStart(2, "0");
        minutesEl.textContent = String(minutes).padStart(2, "0");
        secondsEl.textContent = String(seconds).padStart(2, "0");
    }

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
}

startExamCountdown("2025-08-29T09:00:00");
