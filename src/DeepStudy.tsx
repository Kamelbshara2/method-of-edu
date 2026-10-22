import { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  GraduationCap,
  Lightbulb,
  Target,
} from "lucide-react";
import { studyTables } from "./midterm/studyDetails";
import SourceNotes from "./SourceNotes";
import type { Dialect } from "./content";
import { segments, references, type BilingualText } from "./deepContent";
export function Dual({
  value,
  arabic = true,
}: {
  value: BilingualText;
  arabic?: boolean;
}) {
  return (
    <>
      <p>{value.en}</p>
      {arabic && (
        <p className="arabic" lang="ar" dir="rtl">
          {value.ar}
        </p>
      )}
    </>
  );
}
export default function DeepStudy({
  topicId,
  bilingual,
  dialect,
}: {
  topicId: string;
  bilingual: boolean;
  dialect: Dialect;
}) {
  const [active, setActive] = useState<string | null>(null);
  const items = segments.filter((s) => s.topic === topicId);
  return (
    <div className="deep-study">
      <div className="collection-banner">
        <BookOpen size={20} />
        <div>
          <strong>
            From concept to classroom · {items.length} detailed subtopics
          </strong>
          <p>
            Current midterm scope: the three guides supplied for course
            0402526E. Explanations cite exact PDF pages. Worked cases are
            teaching applications; these are not predictions of the lecturer’s
            exam.
          </p>
        </div>
      </div>
      <div className="subtopic-grid">
        {items.map((s, i) => (
          <button
            key={s.id}
            className={`subtopic-card ${active === s.id ? "active" : ""}`}
            aria-expanded={active === s.id}
            onClick={() => setActive(active === s.id ? null : s.id)}
          >
            <span className="subtopic-index">
              0{i + 1}
              <span>CONCEPT → APPLICATION</span>
            </span>
            <h3>{s.title.en}</h3>
            {bilingual && (
              <p className="arabic" dir="rtl" lang="ar">
                {s.title.ar}
              </p>
            )}
            <div>
              <span>
                {s.references.length} source{" "}
                {s.references.length === 1 ? "reference" : "references"}
              </span>
              <ArrowRight size={17} />
            </div>
          </button>
        ))}
      </div>
      {active ? (
        items
          .filter((s) => s.id === active)
          .map((s) => (
            <article className="study-paper expanded-segment" key={s.id}>
              <span className="eyebrow">
                DEEP STUDY · {s.title.en.toUpperCase()}
              </span>
              <h2>{s.title.en}</h2>
              {bilingual && (
                <h3 className="arabic" lang="ar" dir="rtl">
                  {s.title.ar}
                </h3>
              )}
              <div className="segment-goal">
                <Target size={20} />
                <div>
                  <Dual value={s.goal} arabic={bilingual} />
                </div>
              </div>
              <h3>1. The concept & its boundaries</h3>
              <Dual value={s.concept} arabic={bilingual} />
              <div className="dialect-callout">
                <span className="eyebrow">
                  THE SAME IDEA, IN YOUR CHOSEN DIALECT
                </span>
                <p lang="ar" dir="rtl">
                  {s.dialect[dialect]}
                </p>
                <small>
                  Academic keywords retain their standard Arabic terminology.
                </small>
              </div>
              <h3>2. Compare the terms & decisions</h3>
              <p className="table-scope">
                Teaching synthesis of the cited guide pages; examples clarify
                the distinction rather than quote the source.
              </p>
              <div className="comparison-table study-comparison">
                <table>
                  <thead>
                    <tr>
                      <th>Term / المصطلح</th>
                      <th>Meaning / المعنى</th>
                      <th>Decision clue / دليل التمييز</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(studyTables[s.id] || []).map((r, i) => (
                      <tr key={i}>
                        <td>
                          <Dual value={r.term} arabic={bilingual} />
                        </td>
                        <td>
                          <Dual value={r.meaning} arabic={bilingual} />
                        </td>
                        <td>
                          <Dual value={r.decision} arabic={bilingual} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <h3>3. Put it into practice</h3>
              <ol className="practice-steps">
                {s.steps.map((v, i) => (
                  <li key={i}>
                    <Dual value={v} arabic={bilingual} />
                  </li>
                ))}
              </ol>
              <div className="worked-case">
                <span className="eyebrow">
                  <GraduationCap size={16} /> WORKED CLASSROOM APPLICATION
                </span>
                <p className="case-source-label">
                  Adapted from a source example or authored as an application;
                  not a verbatim quotation.
                </p>
                <Dual value={s.case} arabic={bilingual} />
                <h4>Why this example matters</h4>
                <Dual value={s.analysis} arabic={bilingual} />
              </div>
              <div className="takeaway">
                <Lightbulb size={23} />
                <div>
                  <span className="eyebrow">MISCONCEPTION TO AVOID</span>
                  <Dual value={s.misconception} arabic={bilingual} />
                </div>
              </div>
              <div className="segment-check">
                <span className="eyebrow">APPLY IT YOURSELF</span>
                <Dual value={s.check} arabic={bilingual} />
                <details>
                  <summary>
                    <CheckCircle2 size={16} />
                    Reveal the reasoned answer
                    <ChevronDown size={15} />
                  </summary>
                  <Dual value={s.answer} arabic={bilingual} />
                </details>
              </div>
              <SourceNotes citations={s.citations} />
            </article>
          ))
      ) : (
        <div className="choose-segment">
          <Lightbulb size={25} />
          <p>
            Choose a subtopic to explore the full explanation, application, and
            source context.
          </p>
        </div>
      )}
    </div>
  );
}
