import { useState } from "react";
import { CheckCircle2, GraduationCap, Lightbulb } from "lucide-react";
import { b, segments } from "./deepContent";
import { Dual } from "./DeepStudy";
import SourceNotes from "./SourceNotes";
const cases = [
  {
    id: "design-technology",
    title: "A debugger is not a teaching strategy",
    ar: "أداة تصحيح الأخطاء ليست استراتيجية تدريس",
    prompt: b(
      "In an IT class, students confuse assignment (=) with equality (==). The teacher can operate a debugger and presents a long demonstration, but students cannot explain the difference afterward. Redesign the lesson using PCK and TPACK. Name the relevant ASSURE steps and the evidence you would collect. Distinguish what the teacher knows from the process used to plan.",
      "في صف تقنية معلومات، يخلط الطلاب بين الإسناد (=) والمساواة (==). يعرف المعلّم تشغيل مصحح الأخطاء ويعرض شرحًا طويلًا، لكن الطلاب لا يفسرون الفرق بعده. أعد تصميم الدرس باستخدام PCK وTPACK، وسمّ خطوات ASSURE والأدلة المطلوبة، وميّز معرفة المعلّم من عملية التخطيط.",
    ),
    criteria: [
      b(
        "Identify the content-specific misconception and a suitable representation (PCK).",
        "تحديد التصور الخاطئ المرتبط بالمحتوى وتمثيل مناسب له PCK.",
      ),
      b(
        "Justify the content–pedagogy–technology fit, rather than naming a device (TPACK).",
        "تبرير ملاءمة المحتوى والبيداغوجيا والتقنية لا تسمية الجهاز TPACK.",
      ),
      b(
        "Apply Analyze, State, Select, Utilize, Require, and Evaluate/revise coherently.",
        "تطبيق تحليل المتعلمين والأهداف والاختيار والاستخدام والمشاركة والتقويم بترابط.",
      ),
      b(
        "Collect individual explanation/transfer evidence and propose a responsive revision.",
        "جمع تفسير فردي ودليل نقل واقتراح مراجعة مستجيبة.",
      ),
    ],
    answer: b(
      "First diagnose the confusion with two short code examples. For PCK, represent assignment as putting a value into a labeled box before introducing the comparison performed by equality. CK is knowing the semantic difference; TK is operating the debugger; PCK is selecting the representation for this misconception. Integrated TPACK is the reasoned use of a visual debugger, prediction, and explanation to make changing values and comparisons visible.\n\nUsing ASSURE: analyze prior knowledge; state a measurable code-tracing/explanation objective; select a short buggy program and suitable debugger; preview the program and prepare access; require students to predict, trace, explain, and correct an example in pairs; then evaluate individual explanations on a new example and revise support where errors remain. A running tool or correct copied output is insufficient evidence of conceptual understanding. ADDIE/ASSURE describe design processes; PCK/TPACK describe the knowledge informing decisions.",
      "ابدأ بتشخيص الخلط بمثالين برمجيين قصيرين. وظّف PCK بتمثيل الإسناد بوضع قيمة في صندوق مسمى قبل تقديم المقارنة في المساواة. CK معرفة الفرق الدلالي، وTK تشغيل المصحح، وPCK اختيار تمثيل لهذا التصور. أما TPACK المتكاملة فهي التوظيف المبرر للمصحح البصري والتنبؤ والتفسير لإظهار تغير القيم والمقارنات.\n\nوفق ASSURE: حلّل المعرفة السابقة؛ صُغ هدف تتبع وتفسير قابلًا للقياس؛ اختر برنامجًا قصيرًا ومصححًا مناسبًا؛ افحص البرنامج وهيّئ الإتاحة؛ اشترط تنبؤًا وتتبعًا وتفسيرًا وتصحيحًا في أزواج؛ ثم قوّم تفسيرات فردية لمثال جديد وعدّل الدعم حيث تبقى أخطاء. لا يكفي تشغيل الأداة أو نسخ مخرج صحيح لإثبات الفهم. تصف ADDIE وASSURE عمليات التصميم، وتصف PCK وTPACK المعرفة التي توجه القرار.",
    ),
    sourceIds: ["pck", "tpack", "assure"],
  },
  {
    id: "repair-objective",
    title: "Repair the objective, then design backward",
    ar: "أصلح الهدف ثم صمّم عكسيًا",
    prompt: b(
      "A Grade 7 plan says: “The teacher will explain ratios, and students will complete a worksheet and understand all price comparisons perfectly.” There are 40 minutes, learners can divide decimals, and calculators are available. Write one achievable ABCD objective for unit-price comparisons. Label its parts, justify the thinking demand, design aligned evidence, and give a student-friendly target. Explain what is wrong with the draft.",
      "تقول خطة صف سابع: «سيشرح المعلّم النسب، ويكمل الطلاب ورقة ويفهمون جميع مقارنات الأسعار بإتقان تام». الزمن 40 دقيقة، ويتقن الطلاب قسمة الأعداد العشرية وتتوفر حاسبات. اكتب هدف ABCD واحدًا واقعيًا لمقارنة سعر الوحدة، وصنّف أجزائه وعلّل التفكير وصمم الدليل وصيغة الطالب وفسّر عيوب المسودة.",
    ),
    criteria: [
      b(
        "Distinguish teacher action/activity from learner outcome and diagnose vague scope/criteria.",
        "تمييز فعل المعلّم والنشاط من الناتج وتشخيص الغموض والنطاق.",
      ),
      b(
        "Supply Audience, observable Behavior, permitted Condition, and realistic Degree.",
        "توفير المتعلمين والسلوك الملحوظ والشرط المسموح ودرجة واقعية.",
      ),
      b(
        "Use results → evidence → learning plan with matching tools and criteria.",
        "توظيف نتائج ثم أدلة ثم خطة مع تطابق الأدوات والمعايير.",
      ),
      b(
        "Communicate the meaning to learners while keeping the full professional criterion.",
        "توصيل المعنى للطلاب مع حفظ المعيار المهني الكامل.",
      ),
    ],
    answer: b(
      "One source-aligned option is: “Given five pairs of price labels and a calculator, Grade 7 students will calculate unit prices and identify the better buy correctly for at least four pairs.” A: Grade 7 students. B: calculate unit prices and identify the better buy as one integrated task. C: five pairs of labels and a calculator. D: at least four correct pairs. The performance applies unit-rate knowledge; the actual task and explanation determine the demand, not a verb in isolation.\n\nBackward design first specifies that result, then an exit task with five new price pairs under the same calculator condition and four-of-five criterion, then modeling, guided practice, and independent comparison. A suitable target is “I can find the price of one item to compare deals,” paired with the explicit four-of-five success criterion. The draft describes teacher action, worksheet completion, an unobservable verb, overly broad “all,” and an undefined/perfection standard. The chosen threshold is the guide’s example, not a universal rule for every lesson.",
      "خيار يطابق المصدر: «عند تقديم خمسة أزواج من بطاقات الأسعار وحاسبة، يحسب طلاب الصف السابع سعر الوحدة ويحددون الصفقة الأفضل بصورة صحيحة في أربعة أزواج على الأقل». A طلاب السابع؛ B حساب السعر وتحديد الأفضل كمهمة متكاملة؛ C البطاقات والحاسبة؛ D أربعة أزواج صحيحة على الأقل. يطبق الأداء معرفة معدل الوحدة؛ وتحدد المهمة وتفسيرها المتطلب لا الفعل منفردًا.\n\nيحدد التصميم العكسي النتيجة أولًا، ثم مهمة خروج بخمسة أزواج جديدة بالحاسبة والمعيار نفسيهما، ثم النمذجة والتدريب الموجه والمقارنة المستقلة. صيغة الطالب «أستطيع إيجاد سعر قطعة واحدة لمقارنة العروض»، ومعها معيار أربع من خمس صريحًا. تصف المسودة فعل المعلم وإكمال ورقة وفعلًا غير ملحوظ ونطاق «جميع» ومعيارًا غامضًا أو كاملًا. الحد المختار مثال الدليل وليس قاعدة عامة لكل درس.",
    ),
    sourceIds: ["abcd-parts", "objective-repair", "objective-alignment"],
  },
  {
    id: "plan-domain",
    title: "Turn a unit goal into a teachable day",
    ar: "حوّل غاية الوحدة إلى يوم قابل للتدريس",
    prompt: b(
      "A science unit spans several weeks. Tomorrow’s lesson asks learners to plan a controlled plant-growth investigation, but the draft tries to grow plants and report the full study in the same period. Some learners cannot yet identify variables. Distinguish unit/weekly/daily planning, revise the daily goal, identify relevant InTASC and science frameworks, and outline the lesson components and evidence.",
      "تمتد وحدة علوم لأسابيع. تطلب خطة الغد تصميم تجربة مضبوطة لنمو النبات، لكنها تحاول زراعة النبات وإعداد التقرير الكامل في الحصة نفسها. لا يحدد بعض الطلاب المتغيرات بعد. ميّز الوحدة والأسبوعية واليومية، وراجع الغاية اليومية، واربط InTASC وإطار العلوم، وحدد مكونات الدرس وأدلته.",
    ),
    criteria: [
      b(
        "Classify unit as long-range and weekly/daily as short-range without discarding the broad goal.",
        "تصنيف الوحدة بعيدة والأسبوعية واليومية قريبة دون إلغاء الغاية.",
      ),
      b(
        "Create an achievable step from learner evidence and reference inquiry/science practices.",
        "إنشاء خطوة ممكنة من الأدلة وربطها بالاستقصاء وممارسات العلوم.",
      ),
      b(
        "Relate planning/assessment to InTASC Instructional Practice (6–8).",
        "ربط التخطيط والتقويم بالممارسة التدريسية InTASC ‏6–8.",
      ),
      b(
        "Connect the eight components and domain-appropriate evidence, resources, and support.",
        "ربط المكونات الثمانية بالدليل الملائم والموارد والدعم.",
      ),
    ],
    answer: b(
      "The unit organizes a coherent several-week investigation and is long-range in the supplied guide. Weekly planning distributes its lessons, while the daily plan details one class; both are short-range. Keep the investigation as the unit goal but make today’s step identifying independent, dependent, and controlled variables from a supplied research question, with all three identified correctly as in Topic Two’s example. Use recent assessment to provide a scaffold where needed.\n\nNSES/NGSS supports inquiry and planning investigations; InTASC groups planning and assessment under Instructional Practice (6–8). The daily plan needs objectives, materials, an opening connected to prior knowledge, sequenced explanation/modeling, guided then independent practice, checks of variables on a new question, closure, and differentiation. The immediate outcome is mainly cognitive. Later hands-on investigation may add psychomotor requirements, materials, time, and safety; attitudes toward evidence can add affective goals with appropriate reflection. Evidence should show the daily step, not claim that the entire investigation has already occurred.",
      "تنظم الوحدة استقصاء مترابطًا لأسابيع وتُعد بعيدة المدى في الدليل. توزع الأسبوعية دروسها وتفصّل اليومية حصة واحدة، وهما قريبتان. احتفظ بالاستقصاء غاية للوحدة واجعل خطوة اليوم تحديد المستقل والتابع والمتغيرات المضبوطة من سؤال معطى، مع صحة الثلاثة كما في مثال الموضوع الثاني، واستخدم التقويم الحديث لتوفير دعم مناسب.\n\nيدعم NSES/NGSS الاستقصاء وتخطيط التحقيقات، وتجمع InTASC التخطيط والتقويم في الممارسة التدريسية 6–8. تحتاج اليومية أهدافًا ومواد وتهيئة مرتبطة بالمعرفة السابقة وتسلسل شرح ونمذجة وممارسة موجهة فمستقلة وفحص المتغيرات في سؤال جديد وغلقًا وتمايزًا. الناتج الحالي معرفي أساسًا. وقد تضيف الممارسة اللاحقة متطلبات نفسحركية ومواد وزمنًا وسلامة، ويضيف تقدير الأدلة أهدافًا وجدانية وتأملًا ملائمًا. يكشف الدليل خطوة اليوم دون ادعاء إنجاز الاستقصاء الكامل.",
    ),
    sourceIds: [
      "measurable-achievable",
      "intasc",
      "subject-standards",
      "planning-levels",
      "daily-plan-domains",
    ],
  },
];
export default function CaseLab({ bilingual }: { bilingual: boolean }) {
  const [active, setActive] = useState(cases[0].id);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [revealed, setRevealed] = useState<string[]>([]);
  const c = cases.find((c) => c.id === active)!;
  const citations = c.sourceIds
    .flatMap((id) => segments.find((s) => s.id === id)!.citations)
    .filter(
      (c, i, a) =>
        a.findIndex(
          (x) => x.documentId === c.documentId && x.page === c.page,
        ) === i,
    );
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
        <span className="count-badge">3 extended-response tasks</span>
      </div>
      <p>
        Original practice cases based on your guides. Write a reasoned response,
        then compare it with the criteria and worked answer. These are ungraded
        practice, not predicted examination questions.
      </p>
      <div className="subtopic-grid">
        {cases.map((v, i) => (
          <button
            key={v.id}
            className={`subtopic-card ${v.id === active ? "active" : ""}`}
            onClick={() => setActive(v.id)}
          >
            <span className="eyebrow">CASE 0{i + 1}</span>
            <h3>{v.title}</h3>
            {bilingual && (
              <p className="arabic" lang="ar" dir="rtl">
                {v.ar}
              </p>
            )}
          </button>
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
