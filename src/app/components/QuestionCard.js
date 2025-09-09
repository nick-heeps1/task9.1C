"use client";

export default function QuestionCard({ q, expanded, onToggle, onHide }) {
  const created = q.createdAt?.toDate ? q.createdAt.toDate() : null;
  const dateStr = created ? created.toLocaleDateString() : "—";

  return (
    <div className="fq-card">
      <div className="fq-card-header">
        <div>
          <h3 className="fq-card-title">{q.title}</h3>
          <div className="fq-card-meta">
            <span>Tag: {Array.isArray(q.tags) ? q.tags.join(", ") : (q.tags || "—")}</span>
            <span>•</span>
            <span>Date: {dateStr}</span>
          </div>
        </div>
        <div className="fq-card-actions">
          <button type="button" className="fq-btn fq-btn-ghost" onClick={onHide}>Hide</button>
          <button type="button" className="fq-btn fq-btn-ghost" onClick={onToggle}>
            {expanded ? "Collapse" : "Expand"}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="fq-card-body">
          <p className="fq-card-description">
            {q.description || q.content || "No description."}
          </p>
        </div>
      )}
    </div>
  );
}
