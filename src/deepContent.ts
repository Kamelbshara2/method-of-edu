import {
  sourceDocuments,
  sourceLabel,
  sourceUrl,
  type CourseCitation,
} from "./midterm/sources";
import type { Dialect } from "./content";
export type BilingualText = { en: string; ar: string };
export type Segment = {
  id: string;
  topic: string;
  title: BilingualText;
  goal: BilingualText;
  concept: BilingualText;
  steps: BilingualText[];
  case: BilingualText;
  analysis: BilingualText;
  misconception: BilingualText;
  check: BilingualText;
  answer: BilingualText;
  references: string[];
  citations: CourseCitation[];
  dialect: Record<Dialect, string>;
  comparison?: { en: string; ar: string; detail: string; arDetail: string }[];
};
export const references: Record<
  string,
  { citation: string; url: string; scope: string }
> = {};
export const b = (en: string, ar: string): BilingualText => ({ en, ar });
const d = (
  egyptian: string,
  jordanian: string,
  emirati: string,
  syrian: string,
) => ({ egyptian, jordanian, emirati, syrian });
type Draft = Omit<Segment, "references" | "citations"> & {
  evidence: [string, number, string][];
};
function L(v: Draft): Segment {
  const citations = v.evidence.map(([documentId, page, needle]) => {
    const p = sourceDocuments
      .find((d) => d.id === documentId)
      ?.pages.find((p) => p.page === page);
    if (!p) throw new Error("Missing source page");
    const start = p.text.indexOf(needle);
    if (start < 0)
      throw new Error(`Missing evidence ${documentId}:${page}: ${needle}`);
    return { documentId, page, quote: p.text.slice(start, start + 320) };
  });
  const refs = citations.map((c) => {
    const id = `${v.id}-${c.documentId}-${c.page}`;
    references[id] = {
      citation: sourceLabel(c),
      url: sourceUrl(c),
      scope:
        "Primary course guide supplied by the user. PDF page numbering starts at the first file page.",
    };
    return id;
  });
  return { ...v, references: refs, citations };
}
export const segments: Segment[] = [
  L({
    id: "teaching-functions",
    topic: "foundations",
    title: b(
      "Teaching roles & the instructional cycle",
      "أدوار التدريس ودورته",
    ),
    goal: b(
      "Explain intentional facilitation and connect the three phases with six recurring functions.",
      "تفسير التيسير المقصود وربط المراحل الثلاث بالوظائف الست المتكررة.",
    ),
    concept: b(
      "The guide defines teaching as a deliberate, goal-directed organization of experiences, resources, and interactions. Intentionality means planning around outcomes; facilitation means designing conditions that help learners construct knowledge, skills, and attitudes. The transmission view emphasizes the teacher as a source of information and a relatively passive student. The facilitation view gives learners active intellectual work while the teacher structures tasks and questions. The guide still recognizes an important role for direct explanation.\n\nAt the macro level, teaching cycles through Planning, Implementing, and Assessing. At the functional level it includes planning, presenting/delivering, questioning, managing, assessing, and reflecting. These are not six isolated timetable slots: questioning can assess understanding during implementation, and reflection and assessment inform the next plan.",
      "يعرّف الدليل التدريس بأنه تنظيم مقصود وهادف للخبرات والموارد والتفاعلات. تعني القصدية التخطيط لنواتج محددة، ويعني التيسير تصميم ظروف تدعم بناء المعرفة والمهارات والاتجاهات. يركّز منظور النقل على المعلّم مصدرًا للمعلومات والمتعلّم متلقيًا نسبيًا، بينما يتيح التيسير نشاطًا فكريًا للمتعلّم مع تنظيم المهام والأسئلة. ويقر الدليل بأهمية الشرح المباشر أيضًا.\n\nتضم الدورة الكبرى التخطيط والتنفيذ والتقويم. وتشمل الوظائف التفصيلية التخطيط والعرض وطرح الأسئلة والإدارة والتقويم والتأمل. ليست هذه خانات زمنية منفصلة؛ فقد يقوّم السؤال الفهم أثناء التنفيذ، وتوجّه نتائج التقويم والتأمل الخطة التالية.",
    ),
    steps: [
      b(
        "Name the intended learner outcome before choosing an activity.",
        "حدّد ناتج المتعلّم قبل اختيار النشاط.",
      ),
      b(
        "During implementation, identify presentation, questioning, and management decisions.",
        "حدّد أثناء التنفيذ قرارات العرض والأسئلة والإدارة.",
      ),
      b(
        "Use evidence and reflection to revise the next lesson rather than repeating the same plan.",
        "استخدم الأدلة والتأمل لتعديل الدرس التالي بدل تكرار الخطة نفسها.",
      ),
    ],
    case: b(
      "A teacher explains one example, asks students to justify a new example, notices a misconception, and changes the next task.",
      "يشرح معلّم مثالًا، ثم يطلب تبرير مثال جديد، ويكتشف تصورًا خاطئًا ويعدّل المهمة التالية.",
    ),
    analysis: b(
      "Direct explanation and active learning coexist. The question provides assessment evidence during implementation; the change shows reflection feeding back into planning.",
      "يجتمع الشرح المباشر والتعلّم النشط. يقدّم السؤال دليل تقويم أثناء التنفيذ، ويجسّد التعديل عودة التأمل إلى التخطيط.",
    ),
    misconception: b(
      "Facilitation means the teacher never explains. The source describes a blend, with deliberate guidance rather than teacher absence.",
      "التيسير يعني أن المعلّم لا يشرح أبدًا. يصف المصدر مزجًا وتوجيهًا مقصودًا، لا غياب المعلّم.",
    ),
    check: b(
      "Which macro phase contains real-time questioning, and why can that question also be assessment?",
      "ضمن أي مرحلة كبرى يقع السؤال اللحظي، ولماذا قد يكون تقويمًا أيضًا؟",
    ),
    answer: b(
      "It occurs during implementation. When it reveals understanding and informs a response, it also performs an assessing function; phases and functions can overlap.",
      "يحدث أثناء التنفيذ. وعندما يكشف الفهم ويوجّه الاستجابة يؤدي وظيفة تقويمية أيضًا؛ فقد تتداخل المراحل والوظائف.",
    ),
    evidence: [
      ["intro", 4, "Teaching can be defined"],
      ["intro", 5, "2. Basic Teaching Functions"],
    ],
    dialect: d(
      "المعلّم بيوجّه وبيشرح وقت اللزوم، والطالب لازم يفكّر مش يسمع وبس.",
      "المعلّم بوجّه وبشرح وقت الحاجة، والطالب لازم يفكّر مش بس يسمع.",
      "المعلّم يوجّه ويشرح وقت الحاجة، والطالب لازم يفكّر مب بس يسمع.",
      "المعلّم بيوجّه وبيشرح وقت الحاجة، والطالب لازم يفكّر مو بس يسمع.",
    ),
  }),
  L({
    id: "professional-growth",
    topic: "foundations",
    title: b(
      "Effective teachers & professional growth",
      "فاعلية المعلّم وتطوره المهني",
    ),
    goal: b(
      "Distinguish knowledge, skills, and dispositions and analyze five novice–experienced comparisons.",
      "تمييز المعرفة والمهارات والاستعدادات المهنية وتحليل المقارنة في خمسة مجالات.",
    ),
    concept: b(
      "Knowledge includes subject content, general pedagogy, PCK, and TPACK. Skills are the ability to use that knowledge in practice. Dispositions are values, commitment, ethics, beliefs, and attitudes expressed through behavior. A knowledgeable teacher who cannot communicate a concept has knowledge without the full performance needed for effective teaching. The guide also emphasizes fairness, rapport, enthusiasm, management, flexibility, and reflection.\n\nIts beginning–experienced comparison spans purpose, planning, teaching, assessment, and management. The developmental direction is from covering textbook content toward cultivating understanding; from assuming learning toward checking it; and from controlling students toward supporting self-regulation. These are patterns for analysis, not a rule that every novice is ineffective or that experience automatically creates expertise. Mentoring and reflection matter.",
      "تضم المعرفة المحتوى والبيداغوجيا العامة وPCK وTPACK. والمهارات هي توظيف المعرفة في الممارسة، أما الاستعدادات المهنية فتشمل القيم والالتزام والأخلاق والمعتقدات والاتجاهات الظاهرة في السلوك. قد يعرف المعلّم الموضوع ولا يستطيع توضيحه، فيمتلك معرفة دون الأداء الكامل المطلوب. ويؤكد الدليل الإنصاف والألفة والحماس والإدارة والمرونة والتأمل.\n\nتقارن المادة المبتدئ والمتمرس في الغرض والتخطيط والتدريس والتقويم والإدارة. يتجه التطور من تغطية الكتاب إلى تنمية الفهم، ومن افتراض التعلّم إلى فحصه، ومن السيطرة إلى التنظيم الذاتي. هذه أنماط تحليلية وليست حكمًا على كل مبتدئ أو ضمانًا بأن سنوات الخبرة تنتج الكفاءة تلقائيًا؛ فالإرشاد والتأمل مهمان.",
    ),
    steps: [
      b(
        "Identify whether evidence concerns knowing, performing, or professional values.",
        "حدّد هل الدليل يتعلق بالمعرفة أم الأداء أم القيم المهنية.",
      ),
      b(
        "Compare decisions across all five domains rather than judging years of service alone.",
        "قارن القرارات في المجالات الخمسة بدل الحكم بسنوات الخدمة وحدها.",
      ),
      b(
        "Suggest a specific improvement supported by learner evidence.",
        "اقترح تحسينًا محددًا يستند إلى أدلة تعلّم الطلاب.",
      ),
    ],
    case: b(
      "An experienced lecturer covers every slide but never checks reasoning. A beginning teacher uses exit evidence to adapt tomorrow’s task.",
      "يعرض محاضر متمرس كل الشرائح دون فحص الاستدلال، بينما يوظف معلّم مبتدئ أدلة الخروج لتعديل مهمة الغد.",
    ),
    analysis: b(
      "The novice demonstrates an experienced-style assessment decision. Length of service is not the criterion; using evidence to improve learning is.",
      "يظهر المبتدئ قرارًا تقويميًا من نمط الممارسة المتمرسة. ليست مدة الخدمة المعيار؛ بل توظيف الدليل لتحسين التعلّم.",
    ),
    misconception: b(
      "Warmth alone guarantees effective teaching. The guide treats knowledge, skills, and dispositions as coordinated requirements.",
      "يضمن الود وحده التدريس الفعّال. يعامل الدليل المعرفة والمهارات والاستعدادات متطلبات متكاملة.",
    ),
    check: b(
      "A teacher treats errors respectfully and changes an explanation. Which domains are visible?",
      "يتعامل معلّم مع الخطأ باحترام ويعدّل شرحه. ما المجالات الظاهرة؟",
    ),
    answer: b(
      "Respect and fairness indicate dispositions; adapting the explanation demonstrates skill informed by knowledge. A single action can draw on several domains.",
      "يدل الاحترام والإنصاف على الاستعدادات المهنية، ويظهر تعديل الشرح مهارة تستند إلى المعرفة. قد يستند الفعل الواحد إلى مجالات متعددة.",
    ),
    evidence: [
      ["intro", 6, "3. Essential Characteristics"],
      ["intro", 7, "4. Beginning Teachers"],
      ["intro", 8, "4.4 Assessment"],
    ],
    dialect: d(
      "الخبرة مش عدد سنين وبس؛ المهم تستخدم فهمك وتراجع أثر تدريسِك.",
      "الخبرة مش عدد سنين بس؛ المهم توظّف معرفتك وتراجع أثر تدريسك.",
      "الخبرة مب عدد سنين وبس؛ المهم توظّف معرفتك وتشوف أثر تدريسك.",
      "الخبرة مو عدد سنين وبس؛ المهم توظّف معرفتك وتراجع أثر تدريسك.",
    ),
  }),
  L({
    id: "discipline-structure",
    topic: "foundations",
    title: b(
      "Facts, concepts, principles & skills",
      "الحقائق والمفاهيم والمبادئ والمهارات",
    ),
    goal: b(
      "Classify knowledge and use its structure to sequence teaching.",
      "تصنيف المعرفة وتوظيف بنيتها في ترتيب التدريس.",
    ),
    concept: b(
      "A discipline has an organized structure, not simply a list of topics. Facts are specific verifiable information; concepts organize facts into categories or ideas; principles express relationships or generalizations connecting concepts; skills/processes are characteristic ways of working. A fact can contribute to a concept, and a skill can use a principle, so the categories are related without being interchangeable.\n\nThe guide illustrates the distinctions in IT, Science, Mathematics, and Art & Design: the keyword “if” is a fact, a loop is a concept, DRY is a design principle, and debugging is a process. In mathematics, 7 × 8 = 56 is a fact, fraction a concept, commutativity a principle, and solving a multistep equation a skill. Planning should connect these layers so that later ideas build on earlier ones.",
      "للتخصص بنية منظمة، وليس قائمة موضوعات فقط. الحقائق معلومات محددة قابلة للتحقق، والمفاهيم فئات أو أفكار تنظم الحقائق، والمبادئ علاقات أو تعميمات تربط المفاهيم، والمهارات أو العمليات طرائق العمل المميزة للتخصص. قد تدعم حقيقة مفهومًا، وتستخدم مهارة مبدأ؛ فالفئات مترابطة لكنها غير متطابقة.\n\nيعرض الدليل أمثلة في تقنية المعلومات والعلوم والرياضيات والفن: الكلمة if حقيقة، والحلقة مفهوم، وDRY مبدأ تصميم، وتصحيح البرنامج عملية. وفي الرياضيات 7 × 8 = 56 حقيقة، والكسر مفهوم، والإبدال مبدأ، وحل معادلة متعددة الخطوات مهارة. ينبغي أن يربط التخطيط هذه الطبقات بحيث تُبنى الأفكار اللاحقة على السابقة.",
    ),
    steps: [
      b(
        "Ask whether the item is a specific statement, a category, a relationship, or a performance.",
        "اسأل هل العنصر معلومة محددة أم فئة أم علاقة أم أداء.",
      ),
      b(
        "Choose examples and counterexamples that clarify the distinction.",
        "اختر أمثلة وأمثلة مضادة توضّح الفرق.",
      ),
      b(
        "Sequence prerequisite facts and concepts before the principle or process that depends on them.",
        "رتّب الحقائق والمفاهيم اللازمة قبل المبدأ أو العملية المعتمدة عليها.",
      ),
    ],
    case: b(
      "A science unit asks students to memorize “energy” and repeat conservation of energy but never explain a new energy-transfer situation.",
      "تطلب وحدة علوم حفظ كلمة الطاقة وتكرار مبدأ حفظها دون تفسير موقف جديد لانتقال الطاقة.",
    ),
    analysis: b(
      "A concept label and a rehearsed principle do not yet demonstrate use of the relationship. Add an explanation that connects the concept to a new case.",
      "لا تثبت تسمية المفهوم وترديد المبدأ توظيف العلاقة. أضف تفسيرًا يربط المفهوم بحالة جديدة.",
    ),
    misconception: b(
      "A principle is just a longer fact. Its defining role is to connect concepts through a relationship or generalization.",
      "المبدأ مجرد حقيقة أطول. دوره المحدد ربط المفاهيم بعلاقة أو تعميم.",
    ),
    check: b(
      "Classify “balance,” “complementary colors increase contrast,” and executing a shading technique.",
      "صنّف الاتزان، وزيادة التباين بالألوان المتكاملة، وتنفيذ التظليل.",
    ),
    answer: b(
      "Balance is a concept; the relationship about complementary colors is a principle in the guide; executing shading is a skill/process.",
      "الاتزان مفهوم، والعلاقة بين الألوان المتكاملة والتباين مبدأ في الدليل، وتنفيذ التظليل مهارة أو عملية.",
    ),
    evidence: [["intro", 9, "5. The Subject as a Discipline"]],
    dialect: d(
      "اسأل: دي معلومة، ولا فكرة بتجمع معلومات، ولا علاقة بين أفكار، ولا حاجة الطالب بينفّذها؟",
      "اسأل: هاي معلومة، ولا مفهوم بجمع معلومات، ولا علاقة، ولا مهارة الطالب بنفّذها؟",
      "اسأل: هذي معلومة، ولا مفهوم يجمع معلومات، ولا علاقة، ولا مهارة الطالب ينفّذها؟",
      "اسأل: هاي معلومة، ولا مفهوم بيجمع معلومات، ولا علاقة، ولا مهارة الطالب بينفّذها؟",
    ),
  }),
  L({
    id: "pck",
    topic: "foundations",
    title: b(
      "PCK & the knowledge bases for teaching",
      "المعرفة البيداغوجية بالمحتوى وأسس معرفة المعلّم",
    ),
    goal: b(
      "Distinguish CK, general PK, curricular knowledge, and PCK in a scenario.",
      "تمييز معرفة المحتوى والبيداغوجيا العامة والمنهج وPCK في موقف تطبيقي.",
    ),
    concept: b(
      "Content Knowledge (CK) is knowing the subject itself. General Pedagogical Knowledge concerns cross-subject principles such as management and instructional strategies. Curricular Knowledge concerns the materials, programs, and sequencing used for a subject at a level. Pedagogical Content Knowledge (PCK) is knowing how to make a particular idea understandable to particular learners through representations, analogies, examples, and attention to common misconceptions. It is more specific than knowing the content and more contextualized than a generic teaching technique.\n\nThe guide’s examples show a teacher anticipating confusion between assignment and equality in programming, using multiplication by a fraction below one, challenging beliefs about falling objects, or broadening art-quality criteria beyond realism. The diagnostic feature is the fit between a specific content difficulty and the selected representation.",
      "معرفة المحتوى CK هي معرفة الموضوع ذاته. وتعالج البيداغوجيا العامة مبادئ عابرة للتخصصات كالإدارة والاستراتيجيات. وتتعلق معرفة المنهج بالمواد والبرامج والتسلسل لمادة ومستوى معينين. أما PCK فهي معرفة كيفية جعل فكرة محددة مفهومة لمتعلمين محددين، باستخدام التمثيلات والتشبيهات والأمثلة ومعرفة التصورات الخاطئة. وهي أخصّ من معرفة المحتوى، وأكثر ارتباطًا بالسياق من تقنية تدريس عامة.\n\nتتضمن أمثلة الدليل توقع الخلط بين الإسناد والمساواة في البرمجة، والضرب بكسر أقل من واحد، وتحدي تصور سقوط الأجسام، وتوسيع معايير جودة الفن إلى ما وراء الواقعية. السمة التشخيصية هي ملاءمة التمثيل لصعوبة في محتوى محدد.",
    ),
    steps: [
      b(
        "Name the subject-specific idea and likely misconception.",
        "سمّ الفكرة التخصصية والتصور الخاطئ المتوقع.",
      ),
      b(
        "Choose a representation that directly addresses the misconception.",
        "اختر تمثيلًا يعالج التصور مباشرة.",
      ),
      b(
        "Ask learners to explain a new case to check conceptual change.",
        "اطلب تفسير حالة جديدة للتحقق من تغير الفهم.",
      ),
    ],
    case: b(
      "Students believe multiplication always makes numbers larger. The teacher models 8 × 1/2 and asks why the result is smaller.",
      "يعتقد طلاب أن الضرب يزيد العدد دائمًا. يمثّل المعلّم 8 × 1/2 ويسأل لماذا تصغر النتيجة.",
    ),
    analysis: b(
      "Knowing how to multiply is CK. Selecting this counterexample because of a predictable misconception is PCK. A general rule about turn-taking is PK.",
      "معرفة إجراء الضرب هي CK، واختيار المثال المضاد بسبب تصور متوقع هو PCK، وقاعدة عامة لتنظيم أدوار الكلام هي PK.",
    ),
    misconception: b(
      "Any clear explanation proves PCK. Identify what makes it specific to the subject, concept, and learners.",
      "كل شرح واضح يثبت PCK. حدّد ما يجعله خاصًا بالتخصص والمفهوم والمتعلمين.",
    ),
    check: b(
      "Where does knowledge of which textbook sequence introduces fractions belong?",
      "أين تندرج معرفة تسلسل تقديم الكسور في الكتاب؟",
    ),
    answer: b(
      "Primarily curricular knowledge. Choosing a representation for a fraction misconception adds PCK; the same planning decision can draw on both.",
      "تندرج أساسًا في معرفة المنهج. ويضيف اختيار تمثيل لتصور خاطئ عن الكسور PCK؛ فقد يستند القرار إلى المعرفتين.",
    ),
    evidence: [["intro", 10, "6. Pedagogical Content Knowledge"]],
    dialect: d(
      "PCK يعني تعرف الطالب هيتلخبط فين في الفكرة دي، وتختار شرح يعالج اللخبطة.",
      "PCK يعني تعرف وين الطالب ممكن يخلط بهاي الفكرة، وتختار شرح يعالجها.",
      "PCK يعني تعرف وين الطالب ممكن يتلخبط بهالفكرة، وتختار شرح يعالجها.",
      "PCK يعني تعرف وين الطالب ممكن يتلخبط بهالفكرة، وتختار شرح يعالجها.",
    ),
  }),
  L({
    id: "tpack",
    topic: "foundations",
    title: b("The seven TPACK domains", "مجالات TPACK السبعة"),
    goal: b(
      "Distinguish core knowledge, pairwise intersections, and integrated TPACK.",
      "تمييز المعارف الأساسية والتقاطعات الثنائية والتكامل في TPACK.",
    ),
    concept: b(
      "TPACK describes professional knowledge used in instructional decision-making, not the number of devices in a room. Its three core domains are Content Knowledge (CK), Pedagogical Knowledge (PK), and Technological Knowledge (TK). Pairwise overlaps form PCK (teaching specific content), TCK (technology’s relationship to particular content and its representations), and TPK (technology’s support for general teaching processes). The central intersection, TPACK, coordinates all three for particular learners, goals, and context.\n\nOperating software demonstrates TK but does not establish integrated TPACK. A virtual fraction model concerns TCK; using a polling tool for participation concerns TPK. Deliberately using that model with prediction, discussion, and assessment to address a fraction misconception shows integrated judgment. Boundaries are analytical: a real decision may draw on several domains simultaneously.",
      "تصف TPACK معرفة مهنية تُستخدم في القرار التعليمي، لا عدد الأجهزة في الصف. مجالاتها الأساسية معرفة المحتوى CK، والبيداغوجيا PK، والتقنية TK. وتتكوّن التقاطعات الثنائية من PCK لتدريس محتوى معين، وTCK لعلاقة التقنية بمحتوى وتمثيلاته، وTPK لدعم التقنية عمليات التدريس العامة. ينسّق التقاطع المركزي TPACK المجالات الثلاثة لمتعلمين وأهداف وسياق معين.\n\nيدل تشغيل البرنامج على TK ولا يثبت وحده TPACK المتكاملة. يتعلق نموذج كسور افتراضي بـTCK، واستخدام التصويت للمشاركة بـTPK. أما توظيف النموذج مع التنبؤ والنقاش والتقويم لمعالجة تصور عن الكسور فيظهر حكمًا متكاملًا. والحدود تحليلية؛ فقد يستند القرار إلى مجالات متعددة معًا.",
    ),
    steps: [
      b(
        "Separate the content goal, pedagogical process, and technological affordance.",
        "افصل هدف المحتوى والعملية البيداغوجية وإمكانات التقنية.",
      ),
      b(
        "Identify whether the scenario describes one domain, a pair, or all three.",
        "حدّد هل الموقف يصف مجالًا واحدًا أم تقاطعًا ثنائيًا أم تكامل الثلاثة.",
      ),
      b(
        "Explain why the technology is appropriate for these learners and this concept.",
        "فسّر ملاءمة التقنية لهؤلاء المتعلمين وهذا المفهوم.",
      ),
    ],
    case: b(
      "A teacher knows how to launch a simulation but uses it as an unrelated visual break. Another uses a selected simulation to test predictions about falling objects, then checks explanations.",
      "يعرف معلّم تشغيل محاكاة لكنه يعرضها استراحة بصرية غير مرتبطة. ويوظف آخر محاكاة مختارة لاختبار تنبؤات السقوط ثم يفحص التفسيرات.",
    ),
    analysis: b(
      "The first shows operational TK without demonstrated integration. The second aligns content, pedagogy, and technology; a justification of the learning fit is essential.",
      "يظهر الأول TK تشغيلية دون تكامل مثبت. ويوائم الثاني المحتوى والبيداغوجيا والتقنية؛ ويظل تبرير الملاءمة للتعلّم أساسيًا.",
    ),
    misconception: b(
      "TPACK means adding technology to any lesson. Integration is about coherent learning decisions, not technological decoration.",
      "تعني TPACK إضافة تقنية لأي درس. التكامل قرارات تعلم مترابطة، لا زينة تقنية.",
    ),
    check: b("What distinguishes TCK from TPK?", "ما الفرق بين TCK وTPK؟"),
    answer: b(
      "TCK concerns technology and particular subject content or its representation. TPK concerns how technology supports teaching/learning processes more generally. TPACK integrates those with pedagogical content judgment in context.",
      "تتعلق TCK بالتقنية ومحتوى تخصصي أو تمثيله، وتتعلق TPK بدعم التقنية عمليات التدريس والتعلم عمومًا. وتدمجهما TPACK مع الحكم المرتبط بتدريس المحتوى في السياق.",
    ),
    evidence: [
      ["intro", 11, "7. Technological"],
      ["intro", 12, "7.2 How the Domains Converge"],
    ],
    dialect: d(
      "مش أي جهاز يبقى TPACK؛ لازم المحتوى وطريقة التدريس والتقنية يخدموا نفس الهدف.",
      "مش أي جهاز يعني TPACK؛ لازم المحتوى والتدريس والتقنية يخدموا نفس الهدف.",
      "مب أي جهاز يعني TPACK؛ لازم المحتوى والتدريس والتقنية تخدم الهدف نفسه.",
      "مو أي جهاز يعني TPACK؛ لازم المحتوى والتدريس والتقنية يخدموا نفس الهدف.",
    ),
  }),
  L({
    id: "addie",
    topic: "foundations",
    title: b("Instructional design & ADDIE", "التصميم التعليمي ونموذج ADDIE"),
    goal: b(
      "Identify each ADDIE phase by its decision and output, not just its order.",
      "تحديد مرحلة ADDIE وفق القرار والناتج لا ترتيبها فقط.",
    ),
    concept: b(
      "Instructional design systematically connects clear goals/objectives, learning activities, and assessments. ADDIE organizes the work into Analysis, Design, Development, Implementation, and Evaluation. Analysis identifies the learning problem, learners, needs, and constraints. Design specifies objectives, evidence, strategy, and sequence in a blueprint. Development builds or pilots the materials. Implementation prepares the setting and delivers instruction. Evaluation collects evidence and guides revision.\n\nWriting an assessment plan is Design; constructing its actual materials is Development; using it with learners is Implementation; examining results to improve the experience is Evaluation. Evaluation can be formative during development as well as summative after delivery, and its results feed the next analysis. The source’s diagram is a cycle, not a justification for never revising an earlier decision.",
      "يربط التصميم التعليمي بصورة منهجية الأهداف والأنشطة والتقويم. ينظم ADDIE العمل في التحليل والتصميم والتطوير والتنفيذ والتقويم. يشخّص التحليل المشكلة والمتعلمين والحاجات والقيود، ويحدد التصميم الأهداف والأدلة والاستراتيجية والتسلسل في مخطط. يبني التطوير المواد ويجربها، ويهيئ التنفيذ البيئة ويقدم التدريس، ويجمع التقويم الأدلة ويوجّه المراجعة.\n\nالتخطيط لأداة التقويم تصميم، وبناء موادها الفعلية تطوير، واستخدامها مع الطلاب تنفيذ، وفحص نتائجها للتحسين تقويم. وقد يكون التقويم تكوينيًا أثناء التطوير وختاميًا بعد التطبيق، وتعود نتائجه إلى التحليل. يقدم المصدر دورة، لا مبررًا لعدم مراجعة القرارات السابقة.",
    ),
    steps: [
      b(
        "Identify the question being answered and the output produced.",
        "حدّد السؤال الذي تعالجه المرحلة والناتج الذي تنتجه.",
      ),
      b(
        "Distinguish a blueprint from a finished learning resource.",
        "ميّز بين المخطط ومورد التعلم المُنتج.",
      ),
      b(
        "Use evaluation evidence to improve the next design cycle.",
        "استخدم أدلة التقويم لتحسين دورة التصميم التالية.",
      ),
    ],
    case: b(
      "A lecturer diagnoses weak code tracing, specifies an objective, builds a worksheet, runs a think-aloud lesson, and revises pacing after an exit ticket.",
      "يشخّص محاضر ضعف تتبع الشفرة، ويحدد هدفًا، ويبني ورقة عمل، وينفّذ درس تفكير مسموع، ويعدّل الإيقاع بعد بطاقة خروج.",
    ),
    analysis: b(
      "These correspond to Analysis, Design, Development, Implementation, and Evaluation. The same resource moves through several phases; the action performed determines the phase.",
      "تقابل الإجراءات التحليل والتصميم والتطوير والتنفيذ والتقويم. يمر المورد نفسه بمراحل متعددة؛ ويحدّد الفعل المنجز المرحلة.",
    ),
    misconception: b(
      "Selecting an instructional strategy is Development. Strategy and sequence belong to Design; building the selected resources belongs to Development.",
      "اختيار استراتيجية التدريس هو التطوير. الاستراتيجية والتسلسل في التصميم؛ وإنتاج الموارد في التطوير.",
    ),
    check: b(
      "Where does small-scale piloting of draft materials fit, and why may evaluation also occur there?",
      "أين تندرج التجربة المصغّرة للمواد، ولماذا قد يحدث التقويم فيها أيضًا؟",
    ),
    answer: b(
      "The guide lists piloting under Development. Interpreting pilot evidence to improve materials is formative evaluation, illustrating that evaluative work can occur before final delivery.",
      "يضع الدليل التجربة ضمن التطوير. ويُعد تفسير أدلتها لتحسين المواد تقويمًا تكوينيًا، فيوضح حدوث التقويم قبل التقديم النهائي.",
    ),
    evidence: [
      ["intro", 13, "8. Instructional Design"],
      ["intro", 14, "Analysis"],
      ["intro", 15, "Development"],
    ],
    dialect: d(
      "التصميم بيحدد الخطة، والتطوير بيبني المواد؛ متخلطش بينهم.",
      "التصميم بحدد الخطة، والتطوير ببني المواد؛ فرّق بينهم.",
      "التصميم يحدد الخطة، والتطوير يبني المواد؛ فرّق بينهم.",
      "التصميم بيحدد الخطة، والتطوير بيبني المواد؛ ميّز بينهم.",
    ),
  }),
  L({
    id: "assure",
    topic: "foundations",
    title: b(
      "ASSURE & choosing the right framework",
      "نموذج ASSURE واختيار الإطار المناسب",
    ),
    goal: b(
      "Apply six ASSURE steps and distinguish a process model from a knowledge framework.",
      "تطبيق خطوات ASSURE الست وتمييز نموذج العملية من إطار المعرفة.",
    ),
    concept: b(
      "ASSURE focuses on planning media- and technology-supported lessons. Its steps are Analyze learners; State objectives; Select methods, media, materials; Utilize media/materials; Require learner participation; Evaluate and revise. Selecting a video is not the same as preparing and using it, and showing it is not the same as requiring learners to think or act. Participation must be deliberately designed.\n\nADDIE offers a broad development process; ASSURE structures classroom media integration; PCK and TPACK explain professional knowledge used in making the decisions. They are complementary rather than competing labels. Chapter One names Dick & Carey in its learning objectives, but the supplied body does not explain its steps: this platform flags the missing material instead of presenting an invented course comparison. The guide mentions learning styles within learner analysis; that mention should not be expanded into an unsupported claim that matching a fixed style improves learning.",
      "يركز ASSURE على تخطيط الدروس المدعومة بالوسائط والتقنية. خطواته تحليل المتعلمين، وصياغة الأهداف، واختيار الطرائق والوسائط والمواد، واستخدامها، واشتراط مشاركة المتعلم، والتقويم والمراجعة. اختيار فيديو غير تهيئته واستخدامه، وعرضه غير اشتراط التفكير أو الأداء؛ فالمشاركة تحتاج إلى تصميم مقصود.\n\nيوفر ADDIE عملية تطوير عامة، وينظم ASSURE دمج الوسائط في الدرس، وتفسّر PCK وTPACK المعرفة المهنية المستخدمة. هذه أطر متكاملة لا تسميات متنافسة. يذكر فصل المقدمة Dick & Carey ضمن أهدافه دون شرح خطواته في المتن؛ لذا تُسجل فجوة المصدر بدل اختلاق مقارنة مقررة. ويذكر الدليل أنماط التعلم ضمن التحليل؛ ولا ينبغي توسيع هذا الذكر إلى ادعاء غير مسند عن فاعلية مطابقة نمط ثابت.",
    ),
    steps: [
      b(
        "Analyze prior knowledge and learner needs, then state the learning objective.",
        "حلّل المعرفة السابقة والحاجات ثم صُغ الهدف.",
      ),
      b(
        "Select a suitable medium; preview it and prepare the setting before use.",
        "اختر الوسيط الملائم وافحصه وهيّئ البيئة قبل استخدامه.",
      ),
      b(
        "Plan learner action and use evidence to evaluate and revise the lesson.",
        "خطّط لفعل المتعلم واستخدم الأدلة لتقويم الدرس ومراجعته.",
      ),
    ],
    case: b(
      "A science teacher chooses a falling-object simulation, tests it on the projector, pauses it for student predictions, then revises the next lesson after checking explanations.",
      "يختار معلّم علوم محاكاة سقوط، ويختبرها على جهاز العرض، ويوقفها لتنبؤات الطلاب، ثم يراجع الدرس التالي بعد فحص التفسيرات.",
    ),
    analysis: b(
      "Choosing is Select; preparing and operating is Utilize; prediction/discussion is Require participation; interpreting results and adjusting is Evaluate/revise.",
      "الاختيار هو Select، والتهيئة والتشغيل Utilize، والتنبؤ والمناقشة Require participation، وتفسير النتائج والتعديل Evaluate/revise.",
    ),
    misconception: b(
      "Playing a video satisfies learner participation. Learners must engage through an intentionally designed response or task.",
      "تشغيل الفيديو يحقق مشاركة المتعلم. لا بد من استجابة أو مهمة مصممة مقصودًا.",
    ),
    check: b(
      "Does knowing all ASSURE steps demonstrate TPACK?",
      "هل يثبت حفظ خطوات ASSURE امتلاك TPACK؟",
    ),
    answer: b(
      "No. ASSURE describes a planning process. TPACK concerns integrated knowledge and judgment; the quality of the content–pedagogy–technology fit must be demonstrated in the decisions.",
      "لا؛ يصف ASSURE عملية تخطيط. وتتعلق TPACK بمعرفة وحكم متكاملين، فيجب إظهار ملاءمة المحتوى والبيداغوجيا والتقنية في القرارات.",
    ),
    evidence: [
      ["intro", 16, "A — Analyze learners"],
      ["intro", 17, "R — Require learner"],
      ["intro", 19, "For postgraduate study"],
      ["intro", 3, "Dick"],
    ],
    dialect: d(
      "اختيار الفيديو خطوة، وتجهيزه خطوة، وتشغيل تفكير الطلاب بيه خطوة تانية.",
      "اختيار الفيديو خطوة، وتجهيزه خطوة، وتشغيل تفكير الطلاب فيه خطوة ثانية.",
      "اختيار الفيديو خطوة، وتجهيزه خطوة، وتشغيل تفكير الطلبة فيه خطوة ثانية.",
      "اختيار الفيديو خطوة، وتجهيزه خطوة، وتشغيل تفكير الطلاب فيه خطوة تانية.",
    ),
  }),
  L({
    id: "standards-backward",
    topic: "objectives",
    title: b("Standards & backward design", "المعايير والتصميم العكسي"),
    goal: b(
      "Move from standards to results, evidence, and learning experiences in the correct sequence.",
      "الانتقال من المعايير إلى النتائج والأدلة وخبرات التعلم بالتسلسل الصحيح.",
    ),
    concept: b(
      "Professional teaching standards describe how well a teacher plans and teaches: using learner knowledge, differentiation, assessment data, and reflection. Curriculum/content standards describe what students should know and be able to do. A daily objective is a manageable step toward a broader curriculum standard, not a replacement for it. Professional standards affect the quality of that planning.\n\nBackward design reverses activity-first planning. First identify desired results: the standard and daily objective. Second determine acceptable evidence: what performance will show the objective, under its conditions and at its degree. Third plan learning experiences: introduction, modeling, guided and independent practice. Alignment means the objective, practice, and assessment require the same intended performance, while new examples can test transfer.",
      "تصف المعايير المهنية جودة التخطيط والتدريس، بما يشمل معرفة المتعلمين والتمايز والأدلة والتأمل. وتحدد معايير المنهج ما ينبغي أن يعرفه الطلاب ويؤدوه. الهدف اليومي خطوة مناسبة نحو معيار واسع وليس بديلًا عنه، بينما تؤثر المعايير المهنية في جودة التخطيط.\n\nيعكس التصميم العكسي البدء بالنشاط. تُحدد النتائج المرغوبة أولًا: المعيار والهدف اليومي؛ ثم الأدلة المقبولة: الأداء الذي يكشف تحقق الهدف بشروطه ودرجة إتقانه؛ ثم خبرات التعلم: التهيئة والنمذجة والممارسة الموجهة والمستقلة. تعني المواءمة أن يستدعي الهدف والتدريب والتقويم الأداء المقصود نفسه، مع إمكان استخدام أمثلة جديدة لفحص النقل.",
    ),
    steps: [
      b(
        "Trace today’s outcome to a curriculum standard.",
        "اربط ناتج اليوم بمعيار منهجي.",
      ),
      b(
        "Decide the assessment evidence before choosing an attractive activity.",
        "حدّد دليل التقويم قبل اختيار نشاط جذاب.",
      ),
      b(
        "Choose practice that prepares the exact behavior under the intended conditions.",
        "اختر تدريبًا يُعد للسلوك نفسه في شروطه المقصودة.",
      ),
    ],
    case: b(
      "A standard asks students to compare prices. The teacher first chooses a shopping role-play but assesses only naming currency symbols.",
      "يطلب معيار مقارنة الأسعار. يختار المعلّم لعب أدوار التسوق أولًا، لكنه يقوّم تسمية رموز العملات فقط.",
    ),
    analysis: b(
      "The activity may be relevant, but the evidence does not establish comparison. Define the daily comparison outcome, design a price-comparison task, then adapt the activity to prepare that performance.",
      "قد يكون النشاط ذا صلة، لكن الدليل لا يثبت المقارنة. حدّد الناتج اليومي وصمّم مهمة مقارنة أسعار ثم عدّل النشاط لإعداد ذلك الأداء.",
    ),
    misconception: b(
      "Professional standards and curriculum standards answer the same question. One concerns teaching quality; the other concerns student learning content/outcomes.",
      "المعايير المهنية ومعايير المنهج تجيبان السؤال نفسه. الأولى لجودة التدريس والثانية لمحتوى التعلم ونواتجه.",
    ),
    check: b(
      "Which comes immediately after desired results in backward design?",
      "ماذا يأتي مباشرة بعد النتائج المرغوبة في التصميم العكسي؟",
    ),
    answer: b(
      "Acceptable evidence. Decide how learners will demonstrate the result before planning the learning activities.",
      "الأدلة المقبولة: حدّد كيف سيظهر المتعلمون النتيجة قبل تخطيط الأنشطة.",
    ),
    evidence: [
      ["objectives", 2, "Two kinds of standards"],
      ["objectives", 3, "Backward design"],
    ],
    dialect: d(
      "متبدأش بنشاط عاجبك؛ حدّد الهدف، وبعده دليل النجاح، وبعدين النشاط.",
      "لا تبدأ بنشاط عاجبك؛ حدّد الهدف، بعده دليل النجاح، وبعدين النشاط.",
      "لا تبدأ بنشاط عايبنك؛ حدّد الهدف، وعقبه دليل النجاح، وبعدين النشاط.",
      "لا تبدأ بنشاط عاجبك؛ حدّد الهدف، بعده دليل النجاح، وبعدين النشاط.",
    ),
  }),
  L({
    id: "abcd-parts",
    topic: "objectives",
    title: b("The anatomy of an ABCD objective", "بنية الهدف وفق ABCD"),
    goal: b(
      "Identify all four parts even when the sentence order changes.",
      "تحديد الأجزاء الأربعة حتى عند تغير ترتيب الجملة.",
    ),
    concept: b(
      "A is Audience: the learners whose performance is expected, not the teacher. B is Behavior: an observable action verb plus the content. C is Condition: the materials, setting, support, permissions, or limits under which learners demonstrate the performance. D is Degree: the checkable success criterion, such as accuracy, count, time, or rubric quality. The sentence order can change; a condition often appears first.\n\nThe important distinction is functional, not grammatical position. “Using a ruler” identifies a tool/condition; “to the nearest centimetre” sets precision/degree. A minimum word count and a rubric threshold can both contribute to Degree. Conditions are not merely decorations: they define what resources are permitted and must be coherent with the assessment.",
      "A هو المتعلمون المستهدفون Audience، لا المعلّم. وB هو السلوك Behavior: فعل ملحوظ مع محتواه. وC هو شروط الأداء Condition: المواد أو البيئة أو الدعم أو المسموح أو القيود أثناء إظهار الأداء. وD هو درجة الإتقان Degree: معيار نجاح قابل للتحقق كالدقة أو العدد أو الزمن أو مستوى سلم التقدير. يمكن تغيير ترتيب الجملة وغالبًا يسبق الشرط بقية الأجزاء.\n\nالتمييز وظيفي لا موضعي؛ فعبارة «باستخدام مسطرة» شرط أداة، و«لأقرب سنتيمتر» معيار دقة. وقد يشترك عدد أدنى للكلمات ومستوى سلم التقدير في تحديد الدرجة. ليست الشروط زينة؛ بل تحدد الموارد المسموحة ويجب اتساقها مع التقويم.",
    ),
    steps: [
      b(
        "Underline the learner group (A) and observable action plus content (B).",
        "ضع خطًا تحت فئة المتعلمين A والفعل الملحوظ مع محتواه B.",
      ),
      b(
        "Circle what is given, allowed, or restricted (C).",
        "أحط المعطى أو المسموح أو المقيّد C.",
      ),
      b(
        "Box the criterion that distinguishes success from incomplete performance (D).",
        "حدّد المعيار الذي يميز النجاح من الأداء غير المكتمل D.",
      ),
    ],
    case: b(
      "Using a ruler, Grade 3 students measure five classroom objects to the nearest centimetre.",
      "باستخدام مسطرة، يقيس طلاب الصف الثالث خمسة أشياء صفية لأقرب سنتيمتر.",
    ),
    analysis: b(
      "A: Grade 3 students. B: measure the length of five objects. C: using a ruler. D: to the nearest centimetre. This follows the source exercise and its answer key; word order does not change the labels.",
      "A طلاب الصف الثالث؛ B قياس أطوال خمسة أشياء؛ C باستخدام مسطرة؛ D لأقرب سنتيمتر. يوافق هذا تمرين المصدر ومفتاحه، ولا يغيّر ترتيب الكلمات التصنيف.",
    ),
    misconception: b(
      "Every number belongs to Degree. A grade number can name the Audience and an item count can describe the Behavior/content; classify by its role.",
      "كل رقم ينتمي إلى درجة الإتقان. قد يحدد رقم الصف المتعلمين، وقد يصف عدد العناصر السلوك ومحتواه؛ صنّف بحسب الوظيفة.",
    ),
    check: b(
      "In “using the checklist, write a letter of at least 200 words scoring 3 or higher on the rubric,” what are C and D?",
      "في «باستخدام قائمة التحقق، يكتب رسالة لا تقل عن 200 كلمة ويحصل على 3 فأعلى في السلم»، ما C وD؟",
    ),
    answer: b(
      "C is using the checklist. D includes at least 200 words and rubric level 3 or higher, as the guide’s answer key specifies.",
      "C استخدام قائمة التحقق، وD تشمل 200 كلمة على الأقل ومستوى 3 فأعلى كما يوضح مفتاح الدليل.",
    ),
    evidence: [
      ["objectives", 5, "A · Audience"],
      ["objectives", 13, "Using a ruler"],
      ["objectives", 14, "Activity 1"],
    ],
    dialect: d(
      "ما تحفظش ترتيب الحروف في الجملة؛ اسأل كل جزء بيحدد إيه.",
      "لا تحفظ ترتيب الحروف بالجملة؛ اسأل كل جزء بحدد شو.",
      "لا تحفظ ترتيب الحروف في الجملة؛ اسأل كل جزء يحدد شو.",
      "لا تحفظ ترتيب الحروف بالجملة؛ اسأل كل جزء بيحدد شو.",
    ),
  }),
  L({
    id: "bloom-verbs",
    topic: "objectives",
    title: b(
      "Bloom’s levels & observable verbs",
      "مستويات بلوم والأفعال القابلة للملاحظة",
    ),
    goal: b(
      "Choose an observable behavior at the thinking level required by the standard.",
      "اختيار سلوك ملحوظ عند مستوى التفكير الذي يتطلبه المعيار.",
    ),
    concept: b(
      "The guide uses six revised Bloom levels: Remember, Understand, Apply, Analyze, Evaluate, and Create. Examples move from naming/defining, to explaining/classifying, to solving/demonstrating, to comparing/distinguishing, to judging/justifying, to designing/producing. The standard’s demand should guide the daily action. Merely recognizing the name of a strategy does not demonstrate the ability to justify its use.\n\n“Understand” is the name of a cognitive level, but “students will understand” is not an observable Behavior as written. The guide recommends observable evidence such as explaining or classifying instead. Words such as know, learn, appreciate, and be familiar with do not directly specify visible performance. Interpret the verb together with the content and task: an observable action must still match the intended thinking.",
      "يستخدم الدليل مستويات بلوم المنقحة الستة: التذكّر والفهم والتطبيق والتحليل والتقييم والإبداع. تمتد الأمثلة من التسمية والتعريف، إلى التفسير والتصنيف، والحل والتمثيل، والمقارنة والتمييز، والحكم والتبرير، ثم التصميم والإنتاج. ينبغي أن يوجّه مطلب المعيار الفعل اليومي. لا يثبت التعرف على اسم استراتيجية القدرة على تبرير استخدامها.\n\n«الفهم» اسم مستوى معرفي، لكن «أن يفهم الطالب» ليس سلوكًا ملحوظًا بصيغته هذه. يقترح الدليل دليلًا ملحوظًا مثل التفسير أو التصنيف بدلًا منه. ولا تحدد أفعال يعرف ويتعلم ويقدّر ويألف أداءً ظاهرًا مباشرة. فسّر الفعل مع المحتوى والمهمة؛ إذ يجب أن يطابق الفعل الملحوظ نوع التفكير المقصود.",
    ),
    steps: [
      b(
        "Read the intended cognitive demand in the standard.",
        "اقرأ المتطلب المعرفي المقصود في المعيار.",
      ),
      b(
        "Replace a hidden mental-state verb with what learners will say, write, or do.",
        "استبدل وصف الحالة الذهنية بما سيقوله المتعلم أو يكتبه أو يؤديه.",
      ),
      b(
        "Check that the assessment requires that action rather than just recall of its name.",
        "تحقق من أن التقويم يطلب الفعل نفسه لا تذكّر اسمه.",
      ),
    ],
    case: b(
      "“Understand fractions” becomes “compare two fractions using <, >, or =.” A goal to evaluate strategies instead requires a justified judgment, not only matching strategy names.",
      "يتحول «فهم الكسور» إلى «مقارنة كسرين باستخدام < أو > أو =». ويتطلب تقييم الاستراتيجيات حكمًا مبررًا لا مطابقة الأسماء فقط.",
    ),
    analysis: b(
      "The revision makes evidence visible. Whether the objective is complete still depends on Audience, Condition, and Degree; fixing the verb alone is not the entire ABCD task.",
      "تجعل المراجعة الدليل ظاهرًا. ويظل اكتمال الهدف معتمدًا على المتعلمين والشروط ودرجة الإتقان؛ فإصلاح الفعل ليس مهمة ABCD كاملة.",
    ),
    misconception: b(
      "Because “Understand” is a taxonomy level, it is automatically a measurable objective verb. Distinguish the level from its observable indicators.",
      "لأن «الفهم» مستوى في التصنيف فهو تلقائيًا فعل هدف قابل للقياس. ميّز المستوى من مؤشراته الملحوظة.",
    ),
    check: b(
      "Which level does the guide associate with defending a decision, and what evidence is needed?",
      "بأي مستوى يربط الدليل الدفاع عن قرار، وما الدليل المطلوب؟",
    ),
    answer: b(
      "Evaluate. The learner should provide a reasoned judgment or defense; selecting a label without justification does not show that performance.",
      "التقييم؛ ويجب تقديم حكم معلّل أو دفاع. لا يثبت اختيار تسمية دون تبرير هذا الأداء.",
    ),
    evidence: [
      ["objectives", 5, "4. Choosing Measurable Verbs"],
      ["objectives", 6, "Verbs to avoid"],
    ],
    dialect: d(
      "الفهم مستوى، بس لازم تقول الطالب هيعمل إيه عشان يبيّن فهمه.",
      "الفهم مستوى، بس لازم تحدد شو يعمل الطالب ليبيّن فهمه.",
      "الفهم مستوى، بس لازم تحدد شو يسوي الطالب عشان يبيّن فهمه.",
      "الفهم مستوى، بس لازم تحدد شو يعمل الطالب ليبيّن فهمه.",
    ),
  }),
  L({
    id: "measurable-achievable",
    topic: "objectives",
    title: b("Measurable versus achievable", "القابلية للقياس وإمكان التحقق"),
    goal: b(
      "Diagnose the two qualities independently and repair a realistic daily step.",
      "تشخيص الصفتين بصورة مستقلة وإصلاح الهدف ليصبح خطوة يومية واقعية.",
    ),
    concept: b(
      "Measurable means there is visible or audible evidence and a clear criterion for deciding whether the objective is met. Achievable means these learners can realistically reach it within the lesson, given prior knowledge, time, scope, resources, language, and needs. An objective can be measurable but unrealistic, or realistic in ambition but too vague to assess. Both tests are necessary.\n\nABCD contributes to both: Audience anchors learner readiness; Behavior makes performance visible and limits cognitive scope; Condition specifies the setting and can supply support; Degree makes success checkable and sets a realistic threshold. The guide’s first-attempt percentages are examples, not a universal rule that every objective must use 80%. Broad investigations should be broken into daily steps, rather than pretending a whole unit fits one period.",
      "تعني القابلية للقياس وجود دليل مرئي أو مسموع ومعيار واضح للحكم على تحقق الهدف. وتعني إمكان التحقق أن يستطيع هؤلاء المتعلمون بلوغه واقعيًا في الدرس، وفق المعرفة السابقة والزمن والنطاق والموارد واللغة والحاجات. قد يكون الهدف قابلًا للقياس لكنه غير واقعي، أو واقعي الطموح لكنه غامض للتقويم. ولا بد من الاختبارين.\n\nيسهم ABCD في الصفتين: يربط Audience الهدف باستعداد المتعلم، ويظهر Behavior الأداء ويحد نطاقه، ويحدد Condition البيئة وقد يوفر دعمًا، ويجعل Degree النجاح قابلًا للفحص ومعياره واقعيًا. نسب المحاولة الأولى أمثلة في الدليل وليست قاعدة تلزم كل هدف بنسبة 80%. وينبغي تقسيم الاستقصاء الكبير إلى خطوات يومية بدل حشر وحدة كاملة في حصة.",
    ),
    steps: [
      b(
        "Check observable evidence and a criterion for success.",
        "افحص الدليل الملحوظ ومعيار النجاح.",
      ),
      b(
        "Check time, prior knowledge, scope, resources, and learner needs separately.",
        "افحص الزمن والمعرفة السابقة والنطاق والموارد والحاجات مستقلًا.",
      ),
      b(
        "Narrow the task, add appropriate supports, or revise the criterion without removing the core learning.",
        "ضيّق المهمة أو أضف دعمًا مناسبًا أو عدّل المعيار مع إبقاء التعلم الجوهري.",
      ),
    ],
    case: b(
      "Grade 5 students are expected to design, conduct, and report a plant-growth investigation in one lesson.",
      "يُتوقع من طلاب الصف الخامس تصميم تجربة نمو نبات وتنفيذها وإعداد تقريرها في درس واحد.",
    ),
    analysis: b(
      "The behaviors can be observable, but the timescale and combined scope are unrealistic. A daily step could identify independent, dependent, and controlled variables from a provided research question.",
      "يمكن ملاحظة السلوكيات، لكن المدة والنطاق المركب غير واقعيين. يمكن أن تكون الخطوة اليومية تحديد المتغيرات المستقل والتابع والمضبوطة من سؤال معطى.",
    ),
    misconception: b(
      "Any objective with a number is achievable. Numerical precision does not establish readiness or sufficient lesson time.",
      "كل هدف يحتوي رقمًا ممكن التحقق. لا تثبت الدقة العددية الاستعداد أو كفاية الوقت.",
    ),
    check: b(
      "What should change if a complex task is unreachable but remains important to the unit?",
      "ماذا يتغير إذا كانت مهمة معقدة غير قابلة للإنجاز في الحصة لكنها مهمة للوحدة؟",
    ),
    answer: b(
      "Retain the broad goal and sequence smaller daily objectives, gradually reducing support and increasing demand as the guide recommends.",
      "احتفظ بالغاية العامة ورتّب أهدافًا يومية أصغر، مع تقليل الدعم ورفع المتطلب تدريجيًا كما يقترح الدليل.",
    ),
    evidence: [
      ["objectives", 6, "5. Making Objectives Measurable"],
      ["objectives", 7, "How each ABCD part"],
      ["objectives", 8, "Break a standard"],
    ],
    dialect: d(
      "إنك تقدر تقيس الهدف مش معناه إنه ممكن يخلص في حصة. اختبر الاتنين.",
      "إنك تقدر تقيس الهدف مش معناته ينجز بحصة. افحص الاثنين.",
      "قدرتك تقيس الهدف مب معناته ينجز في حصة. افحص الاثنين.",
      "إنك تقدر تقيس الهدف مو معناته ينجز بحصة. افحص الاتنين.",
    ),
  }),
  L({
    id: "objective-repair",
    topic: "objectives",
    title: b(
      "Write, diagnose & repair objectives",
      "صياغة الأهداف وتشخيصها وإصلاحها",
    ),
    goal: b(
      "Use the eight-step writing process and distinguish outcomes from activities.",
      "توظيف خطوات الصياغة الثماني وتمييز النواتج من الأنشطة.",
    ),
    concept: b(
      "The guide’s process is: start with the curriculum standard, choose today’s manageable step, name the Audience, select a measurable Behavior and content, set the Condition, define a realistic Degree, read the objective for shared clarity, and write its assessment. If you cannot identify the evidence, revise the objective. Another teacher should be able to judge the same performance consistently from the wording.\n\n“Complete page 45” states an activity, not the learning it demonstrates. “The teacher will explain fractions” describes teacher action, not learner achievement. Vague verbs, several large behaviors, uncheckable degrees, mismatched tools, and unrealistic first-lesson targets are common failures. The guide’s price-comparison example uses new assessment items under the same calculator condition, preserving the behavior while avoiding simple repetition.",
      "تسلسل الدليل: ابدأ بالمعيار، واختر خطوة اليوم الممكنة، وحدد Audience، ثم Behavior قابلًا للقياس مع محتواه، واضبط Condition، وحدد Degree واقعية، واقرأ الهدف للتحقق من وضوحه المشترك، ثم اكتب التقويم. إذا تعذّر تحديد الدليل فراجع الهدف. ينبغي أن يستطيع معلّم آخر الحكم على الأداء نفسه من الصياغة.\n\n«إكمال صفحة 45» نشاط لا يوضح التعلم، و«سيشرح المعلّم الكسور» فعل للمعلم لا تحصيل للطالب. من الأخطاء الأفعال الغامضة والسلوكيات الكبيرة المتعددة والدرجات غير القابلة للفحص واختلاف الأدوات والأهداف الأولى غير الواقعية. يستخدم مثال الأسعار في الدليل عناصر تقويم جديدة بالشروط نفسها، فيحافظ على السلوك دون تكرار آلي.",
    ),
    steps: [
      b(
        "Locate the missing or defective ABCD component rather than rewriting at random.",
        "حدّد الجزء الناقص أو المعيب بدل إعادة الصياغة اعتباطًا.",
      ),
      b(
        "Rewrite as a learner outcome with one clear performance and a checkable criterion.",
        "أعد الصياغة كناتج للمتعلم بأداء واضح ومعيار قابل للفحص.",
      ),
      b(
        "Design the matching assessment immediately and test feasibility.",
        "صمّم التقويم المطابق مباشرة وافحص الواقعية.",
      ),
    ],
    case: b(
      "A draft says “The teacher will show paragraph writing.” A revision asks Grade 3 students, given a graphic organizer, to write a paragraph with all five specified parts.",
      "تقول المسودة «سيعرض المعلّم كتابة الفقرة». وتطلب المراجعة من طلاب الصف الثالث، عند تقديم منظم بياني، كتابة فقرة تتضمن الأجزاء الخمسة المحددة.",
    ),
    analysis: b(
      "The revision shifts from teacher activity to student performance and supplies condition and degree. The five-part criterion specifies the intended product, rather than merely time spent on a worksheet.",
      "تنقل المراجعة التركيز من نشاط المعلّم إلى أداء الطالب وتضيف الشرط ودرجة الإتقان. يحدد معيار الأجزاء الخمسة المنتج المقصود لا الوقت على ورقة عمل.",
    ),
    misconception: b(
      "Adding “students will” fixes any objective. The rest must still name evidence, conditions, degree, and an achievable scope.",
      "إضافة «سيقوم الطلاب» تصلح أي هدف. يجب أن تبقى الأدلة والشروط والدرجة والنطاق الواقعي واضحة.",
    ),
    check: b(
      "Why use new price-label pairs in the aligned exit ticket?",
      "لماذا تُستخدم أزواج جديدة من بطاقات الأسعار في بطاقة الخروج؟",
    ),
    answer: b(
      "They require the same unit-price calculation and better-buy decision, but give evidence of applying the procedure to new items instead of recalling worked answers.",
      "تتطلب الحساب والقرار نفسيهما، لكنها تكشف تطبيق الإجراء على عناصر جديدة بدل استرجاع إجابات التدريب.",
    ),
    evidence: [
      ["objectives", 8, "6. Writing an ABCD"],
      ["objectives", 9, "Worked example"],
      ["objectives", 10, "Common mistakes"],
    ],
    dialect: d(
      "إكمال الورقة نشاط؛ الهدف لازم يقول الطالب اتعلّم يعمل إيه من خلالها.",
      "إكمال الورقة نشاط؛ الهدف لازم يوضح شو تعلم الطالب يعمل من خلالها.",
      "إكمال الورقة نشاط؛ الهدف لازم يوضح شو تعلّم الطالب يسوي من خلالها.",
      "إكمال الورقة نشاط؛ الهدف لازم يوضح شو تعلم الطالب يعمل من خلالها.",
    ),
  }),
  L({
    id: "objective-alignment",
    topic: "objectives",
    title: b(
      "Alignment, targets & the final self-check",
      "المواءمة وأهداف الطالب والفحص النهائي",
    ),
    goal: b(
      "Keep Behavior, Condition, and Degree consistent across instruction and assessment.",
      "الحفاظ على اتساق السلوك والشروط ودرجة الإتقان في التدريس والتقويم.",
    ),
    concept: b(
      "The objective sits near the top of the daily plan and directs later decisions. The guide recommends one to three objectives for most lessons. Activities should practice the intended Behavior; materials should make the stated Condition possible; assessment should collect the matching performance at the stated Degree. A calculator condition in the objective and a no-calculator quiz create a mismatch even if the arithmetic content is identical.\n\nA student-friendly “I can” target communicates the purpose without replacing the full professional objective. A separate success criterion tells students how they will know they have met it. The final self-check asks whether the objective traces to a standard, identifies A/B/C/D, describes learning rather than an activity, is measurable and achievable, and could be assessed similarly by another teacher.",
      "يوضع الهدف قرب بداية الخطة اليومية ويوجّه ما بعدها، ويقترح الدليل هدفًا إلى ثلاثة لمعظم الدروس. تتدرب الأنشطة على Behavior المقصود، وتتيح المواد Condition، ويجمع التقويم الأداء المطابق عند Degree المحددة. يؤدي السماح بالحاسبة في الهدف ومنعها في الاختبار إلى عدم اتساق ولو تطابق المحتوى الحسابي.\n\nيوصل هدف الطالب بصيغة «أستطيع» الغرض دون استبدال الهدف المهني الكامل. ويوضح معيار نجاح مستقل كيف يعرف الطالب تحقق الهدف. ويسأل الفحص النهائي عن الارتباط بالمعيار، ووضوح الأجزاء الأربعة، ووصف التعلم لا النشاط، والقابلية للقياس والتحقق، وإمكان حكم معلّم آخر بالطريقة نفسها.",
    ),
    steps: [
      b(
        "Read the objective, main activity, and assessment side by side.",
        "اقرأ الهدف والنشاط الرئيس والتقويم جنبًا إلى جنب.",
      ),
      b(
        "Compare behavior, tools/limits, and success criteria explicitly.",
        "قارن السلوك والأدوات والقيود ومعايير النجاح صراحة.",
      ),
      b(
        "Translate the purpose into an “I can” target and share a visible success criterion.",
        "حوّل الغرض إلى هدف «أستطيع» وشارك معيار نجاح ظاهرًا.",
      ),
    ],
    case: b(
      "The professional objective allows a calculator for five price comparisons, four correct. Students hear “I can find a unit price to compare deals,” and the exit criterion is four of five correct.",
      "يسمح الهدف المهني بالحاسبة لخمس مقارنات أسعار، أربع منها صحيحة. يسمع الطلاب «أستطيع إيجاد سعر الوحدة لمقارنة العروض»، ويكون معيار الخروج أربعًا من خمس.",
    ),
    analysis: b(
      "The target expresses meaning; the criterion preserves the pass line; the assessment must also preserve the condition. Shorter student wording does not authorize removing the criterion from the teacher’s plan.",
      "تعبّر صيغة الطالب عن المعنى، ويحفظ المعيار حد النجاح، ويجب أن يحفظ التقويم الشرط أيضًا. لا تبيح الصياغة المبسطة حذف المعيار من خطة المعلّم.",
    ),
    misconception: b(
      "The “I can” statement must contain every technical detail of the formal objective. It communicates purpose, while the formal plan and success criterion retain precision.",
      "يجب أن تحمل «أستطيع» كل تفاصيل الهدف المهني. هي توصل الغرض، وتحفظ الخطة ومعيار النجاح الدقة.",
    ),
    check: b(
      "Which part is violated when a checklist is allowed during the objective task but banned during assessment?",
      "أي جزء يُخل به عندما تُسمح قائمة التحقق في الهدف وتُمنع في التقويم؟",
    ),
    answer: b(
      "Condition. The assessment changes the permitted support; either match it to the objective or intentionally revise the objective and preparation together.",
      "شروط الأداء C؛ فقد تغير الدعم المسموح. طابق التقويم مع الهدف أو راجع الهدف والإعداد معًا بصورة مقصودة.",
    ),
    evidence: [
      ["objectives", 4, "Alignment test"],
      ["objectives", 10, "7. Where Objectives"],
      ["objectives", 11, "Turn the objective"],
      ["objectives", 13, "Self-check"],
    ],
    dialect: d(
      "الطالب يتدرّب بنفس الشروط اللي هتقيّمه بيها؛ وإلا أنت بتقيس حاجة تانية.",
      "الطالب يتدرّب بنفس الشروط اللي رح تقيّمه فيها؛ غير هيك بتقيس إشي ثاني.",
      "الطالب يتدرّب بنفس الشروط اللي بتقيّمه فيها؛ وإلا بتقيس شي ثاني.",
      "الطالب يتدرّب بنفس الشروط اللي رح تقيّمه فيها؛ وإلا عم تقيس شي تاني.",
    ),
  }),
  L({
    id: "planning-foundations",
    topic: "planning",
    title: b(
      "Planning purpose, benefits & resources",
      "غرض التخطيط وفوائده ومصادره",
    ),
    goal: b(
      "Explain why planning is purposeful and select evidence-informed resources.",
      "تفسير هادفية التخطيط واختيار مصادر مستندة إلى الأدلة.",
    ),
    concept: b(
      "Instructional planning decides in advance what students should learn, how learning is organized and delivered, and how it is assessed. It translates broad curriculum goals into decisions about content, sequence, activities, materials, grouping, and time. A plan supports intentional coherence rather than improvisation, but it should remain responsive to evidence.\n\nThe guide identifies five benefits: curriculum coverage and pacing; anticipation of difficulties and management needs; differentiation; coherence within a lesson and unit; and professional accountability. Resources include official frameworks and standards, approved textbooks/teacher guides, prior student assessment data, colleagues and mentors, vetted professional/digital repositories, and reflection from previous teaching. The best choice combines sources rather than treating a textbook as the entire planning process.",
      "يقرر التخطيط مسبقًا ما سيتعلمه الطلاب وكيف ينظم التعلم ويقدّم ويقوّم. ويحوّل غايات المنهج إلى قرارات في المحتوى والتسلسل والأنشطة والمواد والتجميع والزمن. يدعم الترابط المقصود بدل الارتجال، مع بقائه مستجيبًا للدليل.\n\nيحدد الدليل خمس فوائد: التغطية والإيقاع، وتوقع الصعوبات والحاجات الإدارية، والتمايز، والترابط داخل الدرس والوحدة، والمساءلة المهنية. وتشمل المصادر الأطر والمعايير الرسمية، والكتب وأدلة المعلّم المعتمدة، وبيانات التقويم السابقة، والزملاء والمرشدين، والمستودعات المهنية والرقمية المنتقاة، والتأمل في التدريس السابق. يجمع الاختيار الجيد مصادر متعددة بدل اختزال التخطيط في كتاب.",
    ),
    steps: [
      b(
        "Start with the curriculum requirement and available learning time.",
        "ابدأ بمتطلب المنهج وزمن التعلم المتاح.",
      ),
      b(
        "Use assessment evidence to anticipate misconceptions and differentiation needs.",
        "استخدم أدلة التقويم لتوقع التصورات الخاطئة وحاجات التمايز.",
      ),
      b(
        "Select vetted materials, consult colleagues, and record what to revise after delivery.",
        "اختر مواد موثوقة واستشر الزملاء وسجّل ما يحتاج مراجعة بعد التنفيذ.",
      ),
    ],
    case: b(
      "A textbook activity assumes prior graph-reading knowledge, but last week’s assessment shows that many learners lack it.",
      "يفترض نشاط كتابي معرفة سابقة بقراءة الرسوم، لكن تقويم الأسبوع الماضي يكشف افتقار كثير من الطلاب إليها.",
    ),
    analysis: b(
      "Prior assessment data should change sequencing or support. Following the textbook unchanged would sacrifice readiness and coherence despite apparent coverage.",
      "يجب أن تعدّل بيانات التقويم التسلسل أو الدعم. قد يحقق اتباع الكتاب دون تعديل تغطية شكلية على حساب الاستعداد والترابط.",
    ),
    misconception: b(
      "A complete written plan should never change. The guide’s short-range planning responds continuously to what lessons and assessment reveal.",
      "الخطة المكتملة لا تتغير. يستجيب التخطيط القريب باستمرار لما تكشفه الدروس والأدلة.",
    ),
    check: b(
      "Which planning resource best diagnoses this class’s current misconceptions?",
      "أي مصدر تخطيط يشخّص التصورات الحالية لهذا الصف بصورة مباشرة؟",
    ),
    answer: b(
      "Prior student assessment evidence. Standards establish the destination, but learner evidence identifies current gaps and necessary support.",
      "أدلة تقويم الطلاب السابقة. تحدد المعايير الوجهة، وتكشف أدلة المتعلمين الفجوات والدعم اللازم.",
    ),
    evidence: [
      ["planning", 1, "1. What Is Instructional Planning"],
      ["planning", 2, "Differentiation"],
      ["planning", 5, "7. Resources for Planning"],
    ],
    dialect: d(
      "الكتاب مصدر مهم، بس نتيجة الطلاب هي اللي تقول لك تبدأ منين وتضيف دعم إيه.",
      "الكتاب مصدر مهم، بس نتائج الطلاب بتوضح من وين تبدأ وشو الدعم المطلوب.",
      "الكتاب مصدر مهم، بس نتايج الطلبة توضح من وين تبدأ وشو الدعم المطلوب.",
      "الكتاب مصدر مهم، بس نتائج الطلاب بتوضح من وين تبدأ وشو الدعم المطلوب.",
    ),
  }),
  L({
    id: "intasc",
    topic: "planning",
    title: b(
      "InTASC: four categories, ten standards",
      "InTASC: أربع فئات وعشرة معايير",
    ),
    goal: b(
      "Map a professional decision to the correct InTASC organizing category.",
      "ربط القرار المهني بفئة InTASC المناسبة.",
    ),
    concept: b(
      "The guide presents InTASC as ten teaching standards organized into four categories. The Learner and Learning covers standards 1–3: learner development, learning differences, and supportive learning environments. Content covers 4–5: deep subject knowledge and applying it across ideas and perspectives. Instructional Practice covers 6–8: assessment, planning, and varied instructional strategies. Professional Responsibility covers 9–10: professional learning/ethical practice and leadership/collaboration.\n\nThe framework supplies professional language across the course. Planning belongs to Instructional Practice, not to the Content category simply because the plan names content. A scenario may involve multiple concerns, so identify the decision’s main focus and explain the evidence. The guide notes that revised standards apply across career stages, rather than only to beginning teachers.",
      "يعرض الدليل عشرة معايير InTASC في أربع فئات. تشمل «المتعلّم والتعلّم» 1–3 نمو المتعلم والفروق وبيئة تعلم داعمة، وتشمل «المحتوى» 4–5 المعرفة العميقة وتطبيقها عبر الأفكار والمنظورات، وتشمل «الممارسة التدريسية» 6–8 التقويم والتخطيط والاستراتيجيات المتنوعة، وتشمل «المسؤولية المهنية» 9–10 التعلم المهني والأخلاق والقيادة والتعاون.\n\nيوفر الإطار لغة مهنية عبر المقرر. يندرج التخطيط في الممارسة التدريسية، لا المحتوى لمجرد أن الخطة تذكر محتوى. وقد يجمع الموقف قضايا متعددة، لذا حدّد بؤرة القرار وعلّل بالدليل. ويذكر الدليل أن المعايير المنقحة تمتد إلى المراحل المهنية المختلفة ولا تقتصر على المبتدئين.",
    ),
    steps: [
      b(
        "Identify the action: learner support, content use, instructional practice, or professional responsibility.",
        "حدّد الفعل: دعم المتعلم أم المحتوى أم الممارسة التدريسية أم المسؤولية المهنية.",
      ),
      b(
        "Associate the category with its standard range.",
        "اربط الفئة بنطاق معاييرها.",
      ),
      b(
        "Justify the classification using the decision’s focus rather than a surface word.",
        "برر التصنيف ببؤرة القرار لا بكلمة شكلية.",
      ),
    ],
    case: b(
      "A teacher uses assessment results to revise the instructional sequence, then separately collaborates with families on a school initiative.",
      "يستخدم معلّم نتائج التقويم لمراجعة التسلسل التدريسي، ويتعاون بصورة منفصلة مع الأسر في مبادرة مدرسية.",
    ),
    analysis: b(
      "The revision concerns Instructional Practice (6–8). The collaboration concerns Professional Responsibility (9–10). Both can support learners, but their professional focus differs.",
      "تتعلق المراجعة بالممارسة التدريسية 6–8، والتعاون بالمسؤولية المهنية 9–10. يدعم كلاهما المتعلم، لكن بؤرتهما المهنية مختلفة.",
    ),
    misconception: b(
      "Anything about learning belongs to The Learner and Learning. All categories ultimately support learning; classify by the specific focus.",
      "كل ما يخدم التعلم يندرج في المتعلم والتعلم. تخدم الفئات كلها التعلم؛ صنّف وفق التركيز المحدد.",
    ),
    check: b(
      "Where are planning, assessment, and instructional strategies grouped?",
      "أين تُجمع مجالات التخطيط والتقويم والاستراتيجيات؟",
    ),
    answer: b(
      "Instructional Practice, standards 6–8. In the separate ABCD guide, Standard 7 is specifically named Planning for Instruction.",
      "الممارسة التدريسية، المعايير 6–8. ويسمي دليل ABCD المعيار 7 تحديدًا «التخطيط للتدريس».",
    ),
    evidence: [
      ["planning", 2, "3. The InTASC"],
      ["objectives", 2, "InTASC Standard 7"],
    ],
    dialect: d(
      "بص على محور القرار، مش كلمة واحدة فيه؛ التخطيط والتقويم ضمن الممارسة التدريسية.",
      "شوف محور القرار، مش كلمة فيه؛ التخطيط والتقويم ضمن الممارسة التدريسية.",
      "شوف محور القرار، مب كلمة فيه؛ التخطيط والتقويم ضمن الممارسة التدريسية.",
      "شوف محور القرار، مو كلمة فيه؛ التخطيط والتقويم ضمن الممارسة التدريسية.",
    ),
  }),
  L({
    id: "subject-standards",
    topic: "planning",
    title: b(
      "Standards across four specializations",
      "المعايير في التخصصات الأربعة",
    ),
    goal: b(
      "Match each specialization to its framework and translate the emphasis into a task.",
      "مطابقة التخصص بإطاره وتحويل التركيز إلى مهمة.",
    ),
    concept: b(
      "IT uses ISTE: Educator Standards guide teaching with technology, while Student Standards describe learner roles such as Computational Thinker. Mathematics uses NCTM Principles and Standards: content plus five process standards—problem solving, reasoning and proof, communication, connections, and representation. Science uses NSES/NGSS: inquiry is expressed through science and engineering practices such as asking questions and planning investigations. Art & Design uses National Core Arts Standards: Creating; Performing/Presenting/Producing; Responding; and Connecting.\n\nA framework matters when it changes the work students do. A computational-thinking lesson can begin with sequencing a real task; a science lesson with a testable question; mathematics with authentic strategy selection; and art with thumbnail sketches that develop original ideas. Merely displaying a framework’s acronym is not an instructional application.",
      "تستخدم تقنية المعلومات ISTE: توجه معايير المعلمين التدريس بالتقنية، وتحدد معايير الطلاب أدوارًا مثل المفكر الحاسوبي. وتستخدم الرياضيات NCTM للمحتوى وخمس عمليات: حل المشكلات والاستدلال والبرهان والتواصل والترابطات والتمثيل. وتستخدم العلوم NSES/NGSS، حيث يظهر الاستقصاء في ممارسات العلوم والهندسة كطرح الأسئلة وتصميم التحقيقات. ويستخدم الفن معايير الفنون الأساسية: الإبداع، والأداء/العرض/الإنتاج، والاستجابة، والربط.\n\nتظهر قيمة الإطار عندما يغير ما يفعله الطلاب. قد يبدأ التفكير الحاسوبي بترتيب خطوات مهمة واقعية، والعلوم بسؤال قابل للاختبار، والرياضيات باختيار استراتيجية أصيلة، والفن برسوم مصغرة تطور الأفكار. لا يُعد عرض الاختصار وحده تطبيقًا تدريسيًا.",
    ),
    steps: [
      b(
        "Match the specialization and named framework.",
        "طابق التخصص والإطار المسمى.",
      ),
      b(
        "Identify its process or learner role, not only a content topic.",
        "حدّد العملية أو دور المتعلم لا عنوان المحتوى فقط.",
      ),
      b(
        "Design a concrete task that enacts the process and produces evidence.",
        "صمّم مهمة تجسد العملية وتنتج دليلًا.",
      ),
    ],
    case: b(
      "An art teacher asks every learner to copy one dictated painting. A revised task requires thumbnail ideas before selecting and developing a composition.",
      "يطلب معلّم فن نسخ لوحة محددة من الجميع، ثم يراجع المهمة لتتطلب أفكارًا مصغرة قبل اختيار تكوين وتطويره.",
    ),
    analysis: b(
      "The revision better enacts Creating and generating/conceptualizing artistic ideas, as illustrated in Topic Three. It does not make all copying invalid; it aligns this particular goal with original ideation.",
      "تجسد المراجعة الإبداع وتوليد الأفكار وتصوّرها كما في الموضوع الثالث. لا تجعل كل نسخ غير صالح، بل توائم هذا الهدف مع توليد الأفكار الأصلية.",
    ),
    misconception: b(
      "ISTE is just a list of hardware skills. The source distinguishes educator practice and learner roles.",
      "ISTE قائمة مهارات تشغيل فقط. يميّز المصدر ممارسة المعلم وأدوار المتعلم.",
    ),
    check: b("Name NCTM’s five process standards.", "اذكر عمليات NCTM الخمس."),
    answer: b(
      "Problem solving; reasoning and proof; communication; connections; representation. These are processes alongside content, not five mathematics content units.",
      "حل المشكلات، والاستدلال والبرهان، والتواصل، والترابطات، والتمثيل. هي عمليات إلى جانب المحتوى، وليست خمس وحدات محتوى.",
    ),
    evidence: [
      ["planning", 3, "4. Subject-Specific"],
      ["planning", 7, "Standard in action"],
      ["planning", 8, "National Core Arts"],
    ],
    dialect: d(
      "اسم المعيار لوحده مش كفاية؛ ورّيني الطالب هيعمل إيه يحققه.",
      "اسم المعيار لحاله مش كفاية؛ وضّح شو يعمل الطالب ليحققه.",
      "اسم المعيار بروحه مب كفاية؛ وضّح شو يسوي الطالب عشان يحققه.",
      "اسم المعيار لحاله مو كفاية؛ وضّح شو يعمل الطالب ليحققه.",
    ),
  }),
  L({
    id: "planning-levels",
    topic: "planning",
    title: b(
      "Five planning levels & two time horizons",
      "خمسة مستويات وأمدان للتخطيط",
    ),
    goal: b(
      "Distinguish nested planning levels and classify long- versus short-range decisions.",
      "تمييز مستويات التخطيط المتداخلة وتصنيف القرارات البعيدة والقريبة.",
    ),
    concept: b(
      "The hierarchy runs from Yearly/Course Plan, to Term Plan, Unit Plan, Weekly Plan, and Daily Lesson Plan. A yearly/course plan maps major units and standards across the course; a term plan distributes work within one semester; a unit plan organizes several weeks of related lessons; a weekly plan distributes those lessons and resources across days; and a daily plan specifies one class session’s objectives, sequence, timing, and evidence. Each narrower level works within broader boundaries.\n\nIn this course guide, yearly, term, and unit plans are long-range. Weekly and daily plans are short-range. Long-range work sets curriculum mapping and pacing; short-range work specifies immediate activities, questions, materials, and time. The guide contrasts occasional long-range revision with continuous short-range adjustment from prior lessons and assessment evidence. Its metaphor is map versus route, not rigid plan versus random improvisation.",
      "يتدرج التسلسل من الخطة السنوية/خطة المقرر إلى الفصلية ثم الوحدة ثم الأسبوعية ثم اليومية. توزع الأولى الوحدات والمعايير عبر المقرر، والفصلية العمل داخل فصل، والوحدة عدة أسابيع مترابطة، والأسبوعية الدروس والموارد عبر الأيام، واليومية أهداف حصة واحدة وتسلسلها وزمنها وأدلتها. يعمل المستوى الأضيق داخل حدود الأوسع.\n\nيعد الدليل الخطط السنوية والفصلية والوحدة بعيدة المدى، والأسبوعية واليومية قريبة المدى. يضع البعيد خريطة المنهج والإيقاع، ويحدد القريب الأنشطة والأسئلة والمواد والزمن المباشر. ويقارن المراجعة الدورية للبعيد بالتعديل المتواصل للقريب بناء على الدروس والتقويم. التشبيه خريطة ومسار، لا خطة جامدة وارتجال عشوائي.",
    ),
    steps: [
      b(
        "Identify the timespan and granularity of the decision.",
        "حدّد المدة الزمنية ودرجة تفصيل القرار.",
      ),
      b(
        "Locate the level within the five-part hierarchy.",
        "حدّد المستوى داخل التسلسل الخماسي.",
      ),
      b(
        "Check that the daily task serves the unit and broader standards while responding to current evidence.",
        "تحقق من خدمة المهمة اليومية للوحدة والمعايير مع الاستجابة للدليل الحالي.",
      ),
    ],
    case: b(
      "A teacher moves a difficult practice task from Tuesday to Thursday after seeing Monday’s errors, without dropping the unit outcome.",
      "ينقل معلّم تدريبًا صعبًا من الثلاثاء إلى الخميس بعد أخطاء الاثنين دون حذف ناتج الوحدة.",
    ),
    analysis: b(
      "This is a short-range weekly adjustment. It remains coherent with the unit plan; responsiveness does not mean abandoning the long-range goal.",
      "هذا تعديل أسبوعي قريب المدى. يبقى متسقًا مع خطة الوحدة؛ فالاستجابة لا تعني التخلي عن الهدف البعيد.",
    ),
    misconception: b(
      "A unit plan is short-range because it is shorter than a year. Topic Three explicitly classifies unit planning as long-range.",
      "خطة الوحدة قريبة لأنها أقصر من سنة. يصنف الموضوع الثالث الوحدة صراحة ضمن البعيد.",
    ),
    check: b(
      "Which plan maps related lessons over several weeks, and which details timing within one class?",
      "أي خطة تنظم دروسًا مترابطة لأسابيع، وأيها يفصل زمن حصة؟",
    ),
    answer: b(
      "The unit plan organizes the several-week block; the daily lesson plan details one teaching period.",
      "تنظم خطة الوحدة كتلة الأسابيع، وتفصّل اليومية فترة تدريس واحدة.",
    ),
    evidence: [
      ["planning", 4, "5. Levels of Planning"],
      ["planning", 5, "6. Types of Planning"],
    ],
    dialect: d(
      "الوحدة ضمن التخطيط البعيد في الدليل؛ الأسبوع واليوم ضمن القريب.",
      "الوحدة من التخطيط البعيد بالدليل؛ الأسبوع واليوم من القريب.",
      "الوحدة من التخطيط البعيد في الدليل؛ الأسبوع واليوم من القريب.",
      "الوحدة من التخطيط البعيد بالدليل؛ الأسبوع واليوم من القريب.",
    ),
  }),
  L({
    id: "daily-plan-domains",
    topic: "planning",
    title: b(
      "The daily plan & three learning domains",
      "الخطة اليومية ومجالات التعلم الثلاثة",
    ),
    goal: b(
      "Explain eight plan components and adapt learning evidence to the target domain.",
      "تفسير مكونات الخطة الثمانية وتكييف الدليل مع مجال التعلم.",
    ),
    concept: b(
      "The written daily plan includes Objectives; Materials/Resources; Opening/Set Induction; Development/Procedures; Guided/Independent Practice; Assessment/Check for Understanding; Closure; and Differentiation Notes. The opening captures attention and activates prior knowledge. Development sequences the main work. Practice moves toward reduced support. Assessment gathers evidence. Closure consolidates learning and previews what comes next. Differentiation records adjustments for readiness and needs, rather than changing the intended outcome without reason.\n\nCognitive learning concerns knowledge and intellectual skills and needs explanations, examples, questioning, and problem-solving. Affective learning concerns attitudes, values, and feelings and needs reflection, discussion, and justified choices. Psychomotor learning concerns physical/manual performance and needs demonstration, sufficient hands-on practice, materials for all, and safety. A single lesson can target more than one domain; each outcome still needs suitable evidence.",
      "تشمل الخطة اليومية الأهداف، والمواد والموارد، والافتتاح/التهيئة، والتطوير/الإجراءات، والممارسة الموجهة والمستقلة، والتقويم/فحص الفهم، والغلق، وملاحظات التمايز. تجذب التهيئة الانتباه وتفعّل المعرفة السابقة، وترتب الإجراءات العمل، وتنتقل الممارسة نحو دعم أقل، ويجمع التقويم الأدلة، ويرسخ الغلق التعلم ويمهّد للتالي. ويوثق التمايز التعديلات بحسب الاستعداد والحاجات بدل تغيير الناتج بلا مسوّغ.\n\nيتعلق المجال المعرفي بالمعرفة والمهارات العقلية ويحتاج الشرح والأمثلة والأسئلة والحل. ويتعلق الوجداني بالاتجاهات والقيم والمشاعر ويحتاج التأمل والنقاش والاختيارات المعللة. ويتعلق النفسحركي بالأداء البدني واليدوي ويحتاج العرض والممارسة والمواد للجميع والسلامة. وقد يستهدف الدرس أكثر من مجال، مع حاجة كل ناتج لدليل ملائم.",
    ),
    steps: [
      b(
        "Identify the objective’s domain and required evidence first.",
        "حدّد مجال الهدف ودليله أولًا.",
      ),
      b(
        "Plan an opening, sequence, practice, and assessment that serve it, with materials and safety where needed.",
        "خطّط تهيئة وتسلسلًا وممارسة وتقويمًا يخدمه مع المواد والسلامة عند الحاجة.",
      ),
      b(
        "Close with consolidation and record differentiation and next steps.",
        "اختم بالترسيخ ووثّق التمايز والخطوات التالية.",
      ),
    ],
    case: b(
      "A lesson targets safe use of art equipment but allocates all time to a lecture and a written definition quiz.",
      "يستهدف درس الاستخدام الآمن لأدوات الفن لكنه يخصص وقته لمحاضرة واختبار تعريفات مكتوب.",
    ),
    analysis: b(
      "The evidence cannot establish actual psychomotor execution. Plan demonstration, supervised hands-on practice, safe equipment access, and observation of performance; conceptual explanation can complement that evidence.",
      "لا يثبت الدليل التنفيذ النفسحركي الفعلي. خطط عرضًا وممارسة مراقبة وإتاحة آمنة للأدوات وملاحظة الأداء؛ ويمكن أن يكمله الشرح المفاهيمي.",
    ),
    misconception: b(
      "Closure and assessment are identical. Closure consolidates and previews; assessment checks evidence of objectives, although one task can serve both purposes.",
      "الغلق والتقويم متطابقان. يرسخ الغلق ويمهّد، ويفحص التقويم دليل النواتج؛ وقد تخدم مهمة واحدة الغرضين.",
    ),
    check: b(
      "How should a lesson targeting willingness to consider others’ ideas differ from a manual technique lesson?",
      "كيف يختلف درس يستهدف الاستعداد للنظر في أفكار الآخرين عن درس تقنية يدوية؟",
    ),
    answer: b(
      "The affective goal needs discussion/reflection and evidence of valued or justified choices. The psychomotor goal needs demonstration, practice, safe materials, and evidence of execution. Do not infer a stable attitude from a single superficial response.",
      "يحتاج الهدف الوجداني نقاشًا وتأملًا ودليل اختيارات مقدّرة أو مبررة، ويحتاج النفسحركي عرضًا وممارسة ومواد آمنة ودليل تنفيذ. ولا تُستنتج نزعة ثابتة من استجابة شكلية واحدة.",
    ),
    evidence: [
      ["planning", 6, "Key Framework: Standard Lesson"],
      ["planning", 7, "Set induction"],
      ["planning", 8, "Set induction"],
    ],
    dialect: d(
      "لو الهدف مهارة بإيد الطالب، لازم يتدرّب وينفّذ؛ تعريف مكتوب مش كفاية.",
      "إذا الهدف مهارة بإيد الطالب، لازم يتدرّب وينفّذ؛ التعريف المكتوب لحاله مش كفاية.",
      "إذا الهدف مهارة بيد الطالب، لازم يتدرّب وينفّذ؛ التعريف المكتوب بروحه مب كفاية.",
      "إذا الهدف مهارة بإيد الطالب، لازم يتدرّب وينفّذ؛ التعريف المكتوب لحاله مو كفاية.",
    ),
  }),
];
