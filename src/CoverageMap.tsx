import { BookOpen, CheckCircle2 } from "lucide-react";
import { segments } from "./deepContent";
import { questions, topics } from "./content";
export default function CoverageMap() {
  return (
    <section className="coverage-panel">
      <div className="section-heading">
        <h2>
          <BookOpen size={20} />
          Your midterm coverage map
        </h2>
        <span className="count-badge">18 subtopics · 36 questions</span>
      </div>
      <p>
        Every card has two mapped questions and an additional written
        self-check. This shows coverage of the supplied guides’ main topics; it
        does not predict the lecturer’s exam or replace source reading.
      </p>
      {topics.map((t) => (
        <details key={t.id}>
          <summary>
            <span>{t.title}</span>
            <span>
              {segments.filter((s) => s.topic === t.id).length} cards ·{" "}
              {questions.filter((q) => q.topic === t.id).length} questions
            </span>
          </summary>
          <div>
            {segments
              .filter((s) => s.topic === t.id)
              .map((s) => (
                <div className="coverage-line" key={s.id}>
                  <CheckCircle2 size={15} />
                  <span>
                    {s.title.en}
                    <small lang="ar" dir="rtl">
                      {s.title.ar}
                    </small>
                  </span>
                  <span>
                    {questions
                      .filter((q) => q.segmentId === s.id)
                      .map((q) => q.id.toUpperCase())
                      .join(" · ")}
                  </span>
                </div>
              ))}
          </div>
        </details>
      ))}
      <div className="coverage-gap">
        <strong>Source gap: Dick & Carey</strong>
        <p>
          Chapter One p. 3 names a comparison, but the supplied body does not
          explain the model. It is flagged for lecturer clarification rather
          than assessed using invented course details. The full course can be
          added after the midterm.
        </p>
      </div>
    </section>
  );
}
