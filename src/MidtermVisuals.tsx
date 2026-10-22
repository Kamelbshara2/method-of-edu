import { ArrowRight, BookOpen, CheckCircle2 } from "lucide-react";
import type { Dialect } from "./content";
export default function MidtermVisuals({
  topicId,
  bilingual,
}: {
  topicId: string;
  bilingual: boolean;
  dialect: Dialect;
}) {
  const Row = ({ en, ar }: { en: string; ar: string }) => (
    <>
      {en}
      {bilingual && (
        <span className="arabic visual-ar" lang="ar" dir="rtl">
          {ar}
        </span>
      )}
    </>
  );
  return (
    <div className="study-paper visual-paper">
      <span className="eyebrow">CURRENT MIDTERM · CONCEPTS YOU CAN SEE</span>
      {topicId === "foundations" ? (
        <>
          <h2>Professional knowledge → instructional design</h2>
          <p className="visual-note">These are complementary lenses, not a mandatory ladder or a sequence of teaching stages. / هذه منظورات متكاملة، وليست سُلّمًا إلزاميًا أو مراحل تدريس متتابعة.</p><div className="framework-map">
            <div>
              <strong>PCK</strong>
              <Row
                en="How do I represent this concept for these learners?"
                ar="كيف أمثّل هذا المفهوم لهؤلاء المتعلمين؟"
              />
            </div>
            <ArrowRight />
            <div>
              <strong>TPACK</strong>
              <Row
                en="How do content, pedagogy, and technology work together here?"
                ar="كيف يتكامل المحتوى والبيداغوجيا والتقنية هنا؟"
              />
            </div>
            <ArrowRight />
            <div>
              <strong>ADDIE / ASSURE</strong>
              <Row
                en="What process turns that judgment into a learning experience?"
                ar="ما العملية التي تحوّل الحكم إلى خبرة تعلم؟"
              />
            </div>
          </div>
          <h3>The ADDIE improvement cycle</h3>
          <div className="model-strip">
            {[
              ["Analyze", "التحليل"],
              ["Design", "التصميم"],
              ["Develop", "التطوير"],
              ["Implement", "التنفيذ"],
              ["Evaluate", "التقويم"],
            ].map(([en, ar], i) => (
              <div key={en}>
                <span>0{i + 1}</span>
                <Row en={en} ar={ar} />
              </div>
            ))}
          </div>
          <p className="visual-note">
            Evaluation feeds revision and new analysis; it can also happen
            during development. Source: Chapter One, pp. 13–15.
          </p>
          <h3>All seven TPACK domains</h3>
          <div className="knowledge-map">
            {[
              ["CK", "Content", "المحتوى"],
              ["PK", "Pedagogy", "البيداغوجيا"],
              ["TK", "Technology", "التقنية"],
              ["PCK", "Pedagogy + Content", "البيداغوجيا + المحتوى"],
              ["TCK", "Technology + Content", "التقنية + المحتوى"],
              ["TPK", "Technology + Pedagogy", "التقنية + البيداغوجيا"],
              ["TPACK", "All three in context", "الثلاثة في السياق"],
            ].map(([abbr, en, ar]) => (
              <div
                key={abbr}
                className={abbr === "TPACK" ? "central-domain" : ""}
              >
                <strong>{abbr}</strong>
                <Row en={en} ar={ar} />
              </div>
            ))}
          </div>
          <h3>ASSURE: do not skip learner participation</h3>
          <div className="model-strip assure-strip">
            {[
              ["A", "Analyze learners", "تحليل المتعلمين"],
              ["S", "State objectives", "صياغة الأهداف"],
              ["S", "Select", "الاختيار"],
              ["U", "Utilize", "الاستخدام"],
              ["R", "Require participation", "اشتراط المشاركة"],
              ["E", "Evaluate & revise", "التقويم والمراجعة"],
            ].map(([a, en, ar], i) => (
              <div key={i}>
                <span>{a}</span>
                <Row en={en} ar={ar} />
              </div>
            ))}
          </div>
          <p className="visual-note">
            Sources: Chapter One, PDF pp. 10–19. Dick & Carey detail is not
            supplied; it is a flagged source gap.
          </p>
        </>
      ) : topicId === "objectives" ? (
        <>
          <h2>One objective. Four explicit decisions.</h2>
          <div className="abcd-grid">
            {[
              ["A", "Audience", "المتعلّمون", "Who performs?"],
              ["B", "Behavior", "السلوك", "What observable action?"],
              ["C", "Condition", "شروط الأداء", "Given what tools or limits?"],
              ["D", "Degree", "درجة الإتقان", "What counts as success?"],
            ].map(([a, en, ar, question]) => (
              <div key={a}>
                <span>{a}</span>
                <h3>{en}</h3>
                {bilingual && (
                  <p className="arabic" lang="ar" dir="rtl">
                    {ar}
                  </p>
                )}
                <small>{question}</small>
              </div>
            ))}
          </div>
          <div className="annotated-objective">
            <span className="tag-c">
              Given five price pairs and a calculator (C)
            </span>
            , <span className="tag-a">Grade 7 students (A)</span> will{" "}
            <span className="tag-b">
              calculate unit prices and identify the better buy (B)
            </span>
            ,{" "}
            <span className="tag-d">correctly for at least four pairs (D)</span>
            .
          </div>
          <h3>Backward design</h3>
          <div className="concept-flow">
            {[
              [
                "01",
                "Desired results",
                "النتائج المرغوبة",
                "Standard → daily objective",
              ],
              [
                "02",
                "Acceptable evidence",
                "الأدلة المقبولة",
                "Behavior + Condition + Degree",
              ],
              [
                "03",
                "Learning plan",
                "خطة التعلم",
                "Model → guided → independent practice",
              ],
            ].map(([n, en, ar, desc], i) => (
              <div
                key={n}
                className={`flow-card ${["sage", "peach", "lavender"][i]}`}
              >
                <span>{n}</span>
                <h3>{en}</h3>
                {bilingual && (
                  <p lang="ar" dir="rtl">
                    {ar}
                  </p>
                )}
                <small>{desc}</small>
              </div>
            ))}
          </div>
          <div className="comparison-table">
            <table>
              <thead>
                <tr>
                  <th>Test</th>
                  <th>Key question</th>
                  <th>A failure to recognize</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Row en="Measurable" ar="قابل للقياس" />
                  </td>
                  <td>Can the performance and success criterion be checked?</td>
                  <td>
                    “Understand the topic well” gives no observable evidence.
                  </td>
                </tr>
                <tr>
                  <td>
                    <Row en="Achievable" ar="ممكن التحقق" />
                  </td>
                  <td>
                    Can these learners reach it in this lesson with these
                    resources?
                  </td>
                  <td>
                    A fully specified multiweek investigation still cannot fit
                    one short lesson.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="visual-note">
            Sources: Topic Two, PDF pp. 3–11. The annotated objective follows
            the guide’s price-label example.
          </p>
        </>
      ) : (
        <>
          <h2>From the whole course to one lesson</h2>
          <div className="planning-staircase">
            {[
              [
                "Yearly / course",
                "سنوية / مقرر",
                "One year or whole course",
                "LONG-RANGE",
              ],
              ["Term", "فصلية", "One semester / term", "LONG-RANGE"],
              ["Unit", "وحدة", "Several related weeks", "LONG-RANGE"],
              ["Weekly", "أسبوعية", "One week", "SHORT-RANGE"],
              ["Daily lesson", "درس يومي", "One class session", "SHORT-RANGE"],
            ].map(([en, ar, time, range], i) => (
              <div
                key={en}
                style={{ marginLeft: `${i * 4}%`, width: `${100 - i * 4}%` }}
              >
                <span>0{i + 1}</span>
                <strong>
                  <Row en={en} ar={ar} />
                </strong>
                <small>{time}</small>
                <em>{range}</em>
              </div>
            ))}
          </div>
          <h3>The InTASC organizing map</h3>
          <div className="comparison-table">
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Standards</th>
                  <th>Focus</th>
                </tr>
              </thead>
              <tbody>
                {[
                  [
                    "The Learner and Learning",
                    "المتعلم والتعلم",
                    "1–3",
                    "Development, differences, environment",
                  ],
                  [
                    "Content",
                    "المحتوى",
                    "4–5",
                    "Content knowledge and application",
                  ],
                  [
                    "Instructional Practice",
                    "الممارسة التدريسية",
                    "6–8",
                    "Assessment, planning, strategies",
                  ],
                  [
                    "Professional Responsibility",
                    "المسؤولية المهنية",
                    "9–10",
                    "Learning/ethics, leadership/collaboration",
                  ],
                ].map(([en, ar, range, focus]) => (
                  <tr key={en}>
                    <td>
                      <Row en={en} ar={ar} />
                    </td>
                    <td>{range}</td>
                    <td>{focus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h3>Eight components of the daily plan</h3>
          <div className="plan-component-grid">
            {[
              ["Objectives", "الأهداف"],
              ["Materials", "المواد"],
              ["Opening", "التهيئة"],
              ["Development", "الإجراءات"],
              ["Practice", "الممارسة"],
              ["Assessment", "التقويم"],
              ["Closure", "الغلق"],
              ["Differentiation", "التمايز"],
            ].map(([en, ar]) => (
              <div key={en}>
                <CheckCircle2 size={16} />
                <Row en={en} ar={ar} />
              </div>
            ))}
          </div>
          <p className="visual-note">
            Sources: Topic Three, PDF pp. 2, 4–6. Weekly/daily plans are
            short-range; unit plans are long-range in this guide.
          </p>
        </>
      )}
      <div className="source-note">
        <strong>
          <BookOpen size={15} />
          Use diagrams with the detailed notes
        </strong>
        <p>
          These visuals summarize relationships. The detailed subtopic cards
          retain qualifications, worked cases, self-checks, and the original
          source pages.
        </p>
      </div>
    </div>
  );
}
