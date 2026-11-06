import { ArrowUpRight, CalendarDays, Clock3, Trophy } from "lucide-react";

export default function CodeShelfLaunch() {
  return <section className="codeshelf-launch" aria-labelledby="codeshelf-launch-title">
    <div className="codeshelf-launch-brand">
      <img src="/codeshelf-512.png" alt="" width="44" height="44" />
      <h2 id="codeshelf-launch-title">Meet CodeShelf</h2>
    </div>
    <div className="codeshelf-launch-intro">
      <p>Explore the latest company-wise interview questions and sharpen your skills with coding practice.</p>
      <a href="https://codeshelf.space" target="_blank" rel="noopener noreferrer">Explore CodeShelf <ArrowUpRight size={16} aria-hidden="true" /></a>
    </div>
  </section>;
}