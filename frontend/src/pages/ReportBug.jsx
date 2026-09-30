export default function ReportBug() {
  return <main className="report-page page-padding">
    <h1>Found something broken?</h1>
    <p>Please report bugs directly to <a href="mailto:jiitshelf@gmail.com">jiitshelf@gmail.com</a>.</p>
    <section className="report-card"><h2>What to include</h2>
      <ul><li>The page or feature where you noticed the issue.</li><li>Steps to reproduce it, and what you expected to happen.</li><li>What actually happened, including any error message.</li><li>Your browser and device, plus a screenshot if it helps.</li></ul>
      <p>Please leave out passwords, API keys and private information.</p>
      <a className="view-btn secondary" href="mailto:jiitshelf@gmail.com?subject=JIIT%20Shelf%20bug%20report">Email a bug report</a>
    </section>
    <small>This opens your email app. You can also copy the address into your preferred email service.</small>
  </main>;
}
