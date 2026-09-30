import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { getExamCountdown } from "../lib/examCountdown.js";

const ExamCountdown = () => {
  const [time, setTime] = useState(() => getExamCountdown(Date.now()));

  useEffect(() => {
    const updateTime = () => setTime(getExamCountdown(Date.now()));
    const countdown = setInterval(updateTime, 1000);
    document.addEventListener("visibilitychange", updateTime);
    window.addEventListener("focus", updateTime);
    return () => {
      clearInterval(countdown);
      document.removeEventListener("visibilitychange", updateTime);
      window.removeEventListener("focus", updateTime);
    };
  }, []);

  return (
    <div id="ecw">
      <Clock className="ecw-icon" />
      <h2 className="ecw-heading">{time.status === "completed" ? "Exams completed" : time.status === "active" ? `${time.exam} — Exam Time!` : `${time.exam} begins in`}</h2>
      <div id="timer">
        {["Days", "Hours", "Minutes", "Seconds"].map((label, i) => {
          const values = [time.days, time.hours, time.minutes, time.seconds];
          return (
            <div className="time-segment" key={label}>
              <div className="a">{String(values[i]).padStart(2, "0")}</div>
              <div className="b">{label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExamCountdown;
