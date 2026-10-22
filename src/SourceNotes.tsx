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
        These substantive excerpts come from the supplied guides. Read the
        original page for context; quotations establish source provenance, while
        explanations and examples are teaching synthesis. PDF numbering starts
        at the first file page.
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
