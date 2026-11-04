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
    <div className="codeshelf-launch-contest">
      <span className="codeshelf-contest-label">You're invited</span>
      <h3>CodeShelf Launch Contest</h3>
      <div className="codeshelf-contest-details">
        <span><CalendarDays size={16} aria-hidden="true" /><time dateTime="2026-11-05T20:00:00+05:30">5 November 2026</time></span>
        <span><Clock3 size={16} aria-hidden="true" />8 PM IST</span>
      </div>
      <div className="codeshelf-prize"><Trophy size={22} aria-hidden="true" /><div><strong>&#8377;500</strong><span>Prize pool</span></div></div>
      <a className="view-btn codeshelf-contest-cta" href="https://codeshelf.space/contests" target="_blank" rel="noopener noreferrer">View contest <ArrowUpRight size={16} aria-hidden="true" /></a>
    </div>
  </section>;
}