import { useState } from "react";
import { CheckCircle2, GraduationCap, Lightbulb } from "lucide-react";
import { cases, caseSubjects, caseSources } from "./midterm/cases";
import { Dual } from "./DeepStudy";
import SourceNotes from "./SourceNotes";

export default function CaseLab({ bilingual }: { bilingual: boolean }) {
  const [active, setActive] = useState(cases[0].id);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [revealed, setRevealed] = useState<string[]>([]);
  const c = cases.find((c) => c.id === active)!;
  const citations = caseSources(c);
  return (
    <section className="case-lab">
      <div className="section-heading">
        <div>
          <span className="overline">INTEGRATE · JUSTIFY · TRANSFER</span>
          <h2>
            <GraduationCap size={24} />
            The professor’s case lab
          </h2>
        </div>
        <span className="count-badge">
          8 cases · 2 per subject · mathematics first
        </span>
      </div>
      <p>
        Original practice cases based on your guides. Write a reasoned response,
        then compare it with the criteria and worked answer. These are ungraded
        practice, not predicted examination questions.
      </p>
      <div className="case-subjects">
        {caseSubjects.map((subject) => (
          <section className="case-subject" key={subject.id}>
            <div className="case-subject-heading">
              <h3>{subject.en}</h3>
              {bilingual && (
                <span className="arabic" dir="rtl" lang="ar">
                  {subject.ar}
                </span>
              )}
              <small>2 source-based applications</small>
            </div>
            <div className="case-subject-grid">
              {cases
                .filter((v) => v.subject === subject.id)
                .map((v, i) => (
                  <button
                    key={v.id}
                    className={`subtopic-card ${v.id === active ? "active" : ""}`}
                    aria-pressed={v.id === active}
                    onClick={() => setActive(v.id)}
                  >
                    <span className="eyebrow">
                      {subject.en.toUpperCase()} · CASE 0{i + 1}
                    </span>
                    <h3>{v.title}</h3>
                    {bilingual && (
                      <p className="arabic" lang="ar" dir="rtl">
                        {v.ar}
                      </p>
                    )}
                  </button>
                ))}
            </div>
          </section>
        ))}
      </div>
      <article className="study-paper expanded-segment">
        <h2>{c.title}</h2>
        <Dual value={c.prompt} arabic={bilingual} />
        <label className="field-label" htmlFor="case-answer">
          Your written response · English or Arabic
        </label>
        <textarea
          id="case-answer"
          className="agent-input"
          rows={7}
          maxLength={12000}
          placeholder="State your judgment, connect the relevant concepts, and justify your decisions…"
          value={answers[c.id] || ""}
          onChange={(e) =>
            setAnswers((v) => ({ ...v, [c.id]: e.target.value }))
          }
        />
        <small className="field-help">
          Session-only writing space. It is not sent to an AI service or
          automatically graded.
        </small>
        <h3>What a strong answer should demonstrate</h3>
        {c.criteria.map((v, i) => (
          <div className="case-criterion" key={i}>
            <CheckCircle2 size={17} />
            <div>
              <Dual value={v} arabic={bilingual} />
            </div>
          </div>
        ))}
        {!revealed.includes(c.id) ? (
          <button
            className="primary"
            onClick={() => setRevealed((v) => [...v, c.id])}
          >
            <Lightbulb size={17} />
            Compare with the worked answer
          </button>
        ) : (
          <div className="worked-case">
            <span className="eyebrow">
              MODEL RESPONSE · OTHER WELL-JUSTIFIED ANSWERS ARE POSSIBLE
            </span>
            <Dual value={c.answer} arabic={bilingual} />
          </div>
        )}
        <SourceNotes citations={citations} />
      </article>
    </section>
  );
}
