import { BookOpen, ExternalLink } from "lucide-react";
import { sourceLabel, sourceUrl, type CourseCitation } from "./midterm/sources";
export default function SourceNotes({
  citations,
}: {
  citations: CourseCitation[];
}) {
  return (
    <div className="course-source-notes">
      <span className="eyebrow">
        <BookOpen size={15} /> PRIMARY COURSE EVIDENCE
      </span>
      <p>
        Open the original guide to check the explanation in context. PDF page
        numbers count from the first file page.
      </p>
      {citations.map((c, i) => (
        <details key={i}>
          <summary>{sourceLabel(c)}</summary>
          <blockquote>{c.quote}</blockquote>
          <a href={sourceUrl(c)} target="_blank" rel="noreferrer">
            Read original PDF page <ExternalLink size={13} />
          </a>
        </details>
      ))}
    </div>
  );
}
