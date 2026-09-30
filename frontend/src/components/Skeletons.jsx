export default function Skeletons({ kind = "rows", count = 3 }) {
  return <div className={`skeleton-layout skeleton-${kind}`} role="status" aria-label="Loading">
    <span className="sr-only">Loading…</span>
    {Array.from({ length: count }, (_, index) => <div className="skeleton-item" key={index} aria-hidden="true">
      {kind === "courses" && <div className="skeleton skeleton-icon" />}
      <div className="skeleton skeleton-line" />
      {!["rows", "result"].includes(kind) && <div className="skeleton skeleton-line short" />}
      {["courses", "estimator"].includes(kind) && <div className="skeleton skeleton-control" />}
      {kind === "estimator" && <div className="skeleton skeleton-control" />}
    </div>)}
  </div>;
}
