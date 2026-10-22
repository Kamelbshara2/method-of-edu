import {
  BookOpen,
  CheckCircle2,
  ExternalLink,
  Info,
  ShieldCheck,
} from "lucide-react";
import { sourceDocuments } from "./midterm/sources";
const clarifications = [
  {
    title: "Dick & Carey: source gap",
    ar: "Dick & Carey: فجوة في المصدر",
    detail:
      "Chapter One p. 3 names a comparison, but the supplied body does not explain the steps. No unsupported sequence is taught or assessed.",
    arDetail:
      "يذكر الفصل الأول ص. 3 مقارنة النموذج دون شرح خطواته في المتن. لا ندرّس تسلسلًا غير مسند ولا نقوّمه.",
  },
  {
    title: "PCK: the guide’s summary, not an exhaustive original taxonomy",
    ar: "PCK: ملخص الدليل لا تصنيف أصلي شامل",
    detail:
      "The four knowledge bases on Chapter One p. 10 are presented as the course guide’s table. They should not be described as the complete list in Shulman’s original research.",
    arDetail:
      "تُعرض المعارف الأربع في ص. 10 بوصفها جدول الدليل الدراسي، لا القائمة الكاملة لأبحاث شولمان الأصلية.",
  },
  {
    title: "Learning styles: mention does not establish effectiveness",
    ar: "أنماط التعلم: الذكر لا يثبت الفاعلية",
    detail:
      "Chapter One p. 16 lists learning styles under learner analysis. The platform does not infer from this that matching instruction to a fixed style improves outcomes.",
    arDetail:
      "تذكر ص. 16 أنماط التعلم في التحليل. لا نستنتج من ذلك أن مطابقة التدريس بنمط ثابت تحسن النواتج.",
  },
  {
    title: "ABCD: a criterion is not always a percentage",
    ar: "ABCD: المعيار ليس نسبة دائمًا",
    detail:
      "Degree may specify precision, quality, time, or a count. The guide’s 70–80% examples are not universal rules, and necessary safety standards should not be relaxed automatically.",
    arDetail:
      "قد تحدد الدرجة دقة أو جودة أو زمنًا أو عددًا. أمثلة 70–80% ليست قاعدة عامة، ولا تُخفف متطلبات السلامة تلقائيًا.",
  },
  {
    title: "Bloom: read the task as well as the verb",
    ar: "بلوم: اقرأ المهمة مع الفعل",
    detail:
      "The guide’s verb lists are useful examples. Reproducing a memorized text does not become Create simply because the instruction says “write.” Inspect what thinking the task actually requires.",
    arDetail:
      "قوائم الأفعال أمثلة مفيدة. لا تصبح إعادة نص محفوظ إبداعًا لمجرد ورود «اكتب». افحص التفكير الذي تتطلبه المهمة فعلًا.",
  },
  {
    title: "Experience and planning levels: keep the qualifiers",
    ar: "الخبرة ومستويات التخطيط: حافظ على القيود",
    detail:
      "Novice/experienced comparisons are patterns, not rules about individuals. Unit planning is long-range in this guide’s classification; do not present that label as a universal duration rule.",
    arDetail:
      "مقارنة المبتدئ والمتمرس أنماط لا أحكام على الأفراد. الوحدة بعيدة المدى وفق تصنيف هذا الدليل، وليست التسمية قاعدة زمنية عالمية.",
  },
];
export default function EvidenceRegister() {
  return (
    <>
      <div className="page-heading">
        <div>
          <div className="overline">TRACE THE CLAIM · UNDERSTAND THE LIMIT</div>
          <h1>
            Sources, scope & review<span>.</span>
          </h1>
          <p>
            Your three guides are the primary evidence. Teaching explanations
            and worked applications are kept distinct from direct quotations.
          </p>
        </div>
      </div>
      <div className="audit-summary">
        <ShieldCheck size={25} />
        <div>
          <h2>Reviewed against the uploaded material</h2>
          <p>
            Three guides · 45 PDF pages · 18 detailed subtopics · 90 practice
            questions. The review checked conceptual distinctions, answer keys,
            Arabic/English equivalence, source relevance, and answer-length
            clues. It is not lecturer approval, independent peer review, or a
            live AI certification.
          </p>
          <p className="arabic" lang="ar" dir="rtl">
            راجعنا الشرح والأسئلة على ملفاتك المرفوعة، مع فصل الاقتباس عن
            التفسير والتطبيق. المراجعة مش اعتماد رسمي من المحاضر، ومش ضمان إن كل
            سؤال هو نفسه رح ييجي بالامتحان.
          </p>
        </div>
      </div>
      <section className="source-register">
        <h2>The original midterm guides</h2>
        {sourceDocuments.map((d) => (
          <article key={d.id}>
            <span className="file-icon">
              <BookOpen size={24} />
            </span>
            <div>
              <h3>{d.title}</h3>
              <p>{d.name}</p>
              <small>
                {d.pages.length} PDF pages · bibliography on PDF p.{" "}
                {d.pages.length} · original-file checksum checked during build
              </small>
              <div className="source-register-links">
                <a target="_blank" rel="noreferrer" href={d.url}>
                  Read original PDF
                  <ExternalLink size={13} />
                </a>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={`${d.url}#page=${d.pages.length}`}
                >
                  View guide’s bibliography
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>
          </article>
        ))}
      </section>
      <section className="study-paper audit-policy">
        <h2>What each evidence label means</h2>
        <div>
          <CheckCircle2 size={19} />
          <section>
            <h3>Primary course evidence</h3>
            <p>
              A passage exists in the named uploaded PDF page. Its source panel
              links to that page and includes a substantive excerpt. This
              establishes provenance; a matching quotation alone cannot prove
              that every interpretation is correct.
            </p>
          </section>
        </div>
        <div>
          <BookOpen size={19} />
          <section>
            <h3>Teaching synthesis / worked application</h3>
            <p>
              An explanation, comparison table, classroom case, or model
              response organizes the source ideas or applies them to a new
              situation. It is not presented as a verbatim quotation or evidence
              from a classroom experiment.
            </p>
          </section>
        </div>
        <div>
          <Info size={19} />
          <section>
            <h3>External bibliography: not independently verified here</h3>
            <p>
              Publisher/DOI and standards websites could not be retrieved
              because the environment returned 403 network restrictions.
              References listed inside your guides remain the guides’
              bibliography; the platform does not claim to have read or verified
              every external book or article. No new external research finding,
              invented DOI, or statistical claim was added to fill that gap.
            </p>
          </section>
        </div>
        <div>
          <ShieldCheck size={19} />
          <section>
            <h3>AI review: a separate, fallible check</h3>
            <p>
              Once configured, AI Studio reviews selected pages and validates
              exact source quotations. It can still misinterpret evidence.
              Generated collections retain their scope gaps and review findings.
              A model’s “supported” verdict is not official academic approval.
            </p>
          </section>
        </div>
      </section>
      <section className="source-clarifications">
        <h2>Important qualifications, kept visible</h2>
        {clarifications.map((c) => (
          <article key={c.title}>
            <h3>{c.title}</h3>
            <h4 className="arabic" lang="ar" dir="rtl">
              {c.ar}
            </h4>
            <p>{c.detail}</p>
            <p className="arabic" lang="ar" dir="rtl">
              {c.arDetail}
            </p>
          </article>
        ))}
      </section>
      <div className="collection-banner">
        <Info size={20} />
        <div>
          <strong>Current midterm, expandable later</strong>
          <p>
            The course code 0402526E and midterm scope were supplied by you. The
            full university syllabus and the lecturer’s actual examination have
            not been inferred from that code. Further course material can be
            added without silently changing the scope of this collection.
          </p>
        </div>
      </div>
    </>
  );
}
