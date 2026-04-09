import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

const ExamCountdown = ({ targetDate }) => {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date().getTime();
      const distance = new Date(targetDate).getTime() - now;

      if (distance <= 0) {
        setFinished(true);
        setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTime({ days, hours, minutes, seconds });
    };

    updateTime();

    const countdown = setInterval(updateTime, 1000);

    return () => clearInterval(countdown);
  }, [targetDate]);

  return (
    <div id="ecw">
      <Clock className="ecw-icon" />
      <h2 className="ecw-heading">{finished ? "Exam Time!" : "T3 begins in"}</h2>
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
