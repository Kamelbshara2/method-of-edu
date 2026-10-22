import { additionalQuestions } from "./additionalQuestions";
import { excerpt, questionEvidence } from "./evidence";
import { applyQuestionReview } from "./reviewedQuestions";
import type { Question } from "../content";
import { segments } from "../deepContent";
type Pair = [string, string];
function Q(
  id: string,
  segmentId: string,
  type: string,
  stem: Pair,
  options: Pair[],
  correct: number,
  reason: Pair,
  feedback: Pair[],
): Question {
  const s = segments.find((s) => s.id === segmentId);
  if (!s) throw new Error("Missing question subtopic");
  return {
    id,
    segmentId,
    topic: s.topic,
    type,
    stem: stem[0],
    ar: stem[1],
    options: options.map((p) => p[0]),
    arOptions: options.map((p) => p[1]),
    correct,
    why: reason[0],
    arWhy: reason[1],
    distractors: feedback.map((p) => p[0]),
    arDistractors: feedback.map((p) => p[1]),
    citations: questionEvidence[id]?.map(excerpt) || s.citations,
  };
}
const authoredQuestions: Question[] = [
  Q(
    "m01",
    "teaching-functions",
    "APPLICATION",
    [
      "A teacher explains a model, asks students to defend a new solution, and revises the next task from their answers. Which interpretation best fits the guide?",
      "يشرح معلّم نموذجًا ثم يطلب الدفاع عن حل جديد ويعدّل المهمة التالية وفق الإجابات. ما التفسير الأنسب؟",
    ],
    [
      [
        "Direct explanation rules out facilitation.",
        "الشرح المباشر يستبعد التيسير.",
      ],
      [
        "Implementation can include questioning that also supplies assessment evidence for new planning.",
        "قد يتضمن التنفيذ سؤالًا يقدّم دليل تقويم لتخطيط جديد.",
      ],
      [
        "Assessment starts only when implementation ends.",
        "لا يبدأ التقويم إلا بعد انتهاء التنفيذ.",
      ],
      [
        "The six functions must occur once each in a fixed order.",
        "تحدث الوظائف الست مرة واحدة بترتيب ثابت.",
      ],
    ],
    1,
    [
      "The guide describes a cyclical process. Explanation can coexist with facilitation; questioning during delivery reveals understanding, and that evidence informs the next plan.",
      "يصف الدليل عملية دورية. يجتمع الشرح والتيسير، ويكشف السؤال أثناء التنفيذ الفهم، وتوجّه أدلته الخطة التالية.",
    ],
    [
      [
        "The source explicitly retains a role for direct explanation.",
        "يقر المصدر بدور للشرح المباشر.",
      ],
      [
        "Correct: phases and functions overlap, and evidence returns to planning.",
        "صحيح؛ تتداخل المراحل والوظائف وتعود الأدلة إلى التخطيط.",
      ],
      [
        "The guide includes assessment during instruction.",
        "يتضمن الدليل تقويمًا أثناء التدريس.",
      ],
      [
        "The source says the functions are cyclical, not strictly linear.",
        "يصف المصدر الوظائف بالدورية لا الخطية الصارمة.",
      ],
    ],
  ),
  Q(
    "m02",
    "teaching-functions",
    "CONCEPT CHECK",
    [
      "Which list contains the three macro phases rather than selected detailed functions?",
      "أي قائمة تتضمن المراحل الكبرى الثلاث لا بعض الوظائف التفصيلية؟",
    ],
    [
      ["Presenting, questioning, managing", "العرض والأسئلة والإدارة"],
      [
        "Knowledge, skills, dispositions",
        "المعرفة والمهارات والتوجهات المهنية",
      ],
      ["Planning, implementing, assessing", "التخطيط والتنفيذ والتقويم"],
      ["Analysis, design, development", "التحليل والتصميم والتطوير"],
    ],
    2,
    [
      "The teaching macro-cycle is Planning–Implementing–Assessing. Presenting, questioning, and managing are functions within the work, while the other lists belong to different frameworks.",
      "الدورة الكبرى هي التخطيط والتنفيذ والتقويم. العرض والأسئلة والإدارة وظائف داخل العمل، وتنتمي القائمتان الأخريان لأطر أخرى.",
    ],
    [
      [
        "These are granular teaching functions, not the three overarching phases.",
        "هذه وظائف تفصيلية لا المراحل الكبرى الثلاث.",
      ],
      [
        "These describe domains of teacher effectiveness.",
        "هذه مجالات فاعلية المعلّم.",
      ],
      [
        "Correct: this is the macro-cycle in Chapter One.",
        "صحيح؛ هذه الدورة الكبرى في الفصل الأول.",
      ],
      [
        "These are only the first three ADDIE phases.",
        "هذه أول ثلاث مراحل من ADDIE فقط.",
      ],
    ],
  ),
  Q(
    "m03",
    "professional-growth",
    "APPLICATION",
    [
      "A beginning teacher frequently checks understanding and adapts instruction; a veteran merely covers the slides. What can be concluded?",
      "يفحص معلّم مبتدئ الفهم باستمرار ويكيّف التدريس، بينما يكتفي خبير بعرض الشرائح. ماذا نستنتج؟",
    ],
    [
      [
        "The novice displays an experienced-style practice; years of service alone do not guarantee expertise.",
        "يظهر المبتدئ ممارسة من نمط المتمرس؛ ولا تضمن السنوات وحدها الخبرة.",
      ],
      [
        "The comparison in the guide must be false because a novice cannot do this.",
        "المقارنة خاطئة لأن المبتدئ لا يستطيع ذلك.",
      ],
      [
        "Covering content proves stronger assessment practice.",
        "تثبت تغطية المحتوى تقويمًا أقوى.",
      ],
      [
        "Adaptation concerns dispositions only, never teaching skill.",
        "يتعلق التكييف بالاستعدادات وحدها لا مهارة التدريس.",
      ],
    ],
    0,
    [
      "The guide describes a developmental pattern and explicitly says growth is not automatic. Using evidence to improve instruction is the relevant behavior, regardless of seniority.",
      "يعرض الدليل نمطًا تطوريًا ويصرح بأن التطور ليس آليًا. السلوك المهم توظيف الأدلة للتحسين بغض النظر عن الأقدمية.",
    ],
    [
      [
        "Correct: classify the practice, not the person’s length of service.",
        "صحيح؛ صنّف الممارسة لا مدة الخدمة.",
      ],
      [
        "The comparison is a pattern, not a fixed rule for every individual.",
        "المقارنة نمط لا قاعدة ثابتة لكل فرد.",
      ],
      [
        "Coverage does not establish checking or using learner evidence.",
        "لا تثبت التغطية فحص أدلة المتعلم أو استخدامها.",
      ],
      [
        "Adapting an explanation is a performance skill informed by knowledge.",
        "تعديل الشرح مهارة أداء تستند إلى معرفة.",
      ],
    ],
  ),
  Q(
    "m04",
    "professional-growth",
    "CONCEPT CHECK",
    [
      "A teacher knows subject content, can explain it clearly, and treats errors fairly. How are these best classified?",
      "يعرف معلّم المحتوى ويشرحه بوضوح ويعامل الخطأ بإنصاف. كيف تصنف هذه؟",
    ],
    [
      ["All three are content knowledge.", "جميعها معرفة محتوى."],
      [
        "Knowledge, disposition, skill, respectively.",
        "معرفة ثم استعداد مهني ثم مهارة.",
      ],
      [
        "Curriculum, technology, assessment, respectively.",
        "منهج ثم تقنية ثم تقويم.",
      ],
      [
        "Knowledge, skill, disposition, respectively.",
        "معرفة ثم مهارة ثم استعداد مهني.",
      ],
    ],
    3,
    [
      "Knowing is knowledge, putting it into effective communicative performance is skill, and fairness expresses professional values/dispositions. The source treats all three as coordinated.",
      "المعرفة بالمادة معرفة، وتوظيفها في تواصل فعّال مهارة، ويعبّر الإنصاف عن قيم واستعدادات مهنية. يعامل المصدر الثلاثة بصورة متكاملة.",
    ],
    [
      [
        "The actions extend beyond knowing content.",
        "تتجاوز الأفعال معرفة المحتوى.",
      ],
      [
        "This reverses clear explanation and fairness.",
        "تعكس هذه الإجابة تصنيف الشرح والإنصاف.",
      ],
      [
        "These do not correspond to the three-domain distinction.",
        "لا تطابق هذه المجالات الثلاثة المقصودة.",
      ],
      [
        "Correct: the sequence follows knowing, performing, and professional values.",
        "صحيح؛ يتبع التسلسل المعرفة والأداء والقيم المهنية.",
      ],
    ],
  ),
  Q(
    "m05",
    "discipline-structure",
    "APPLICATION",
    [
      "In a mathematics lesson, “fraction,” “addition is commutative,” and solving a multistep equation are respectively what?",
      "في درس رياضيات، ما تصنيف «الكسر» و«الإبدال في الجمع» وحل معادلة متعددة الخطوات على الترتيب؟",
    ],
    [
      ["Fact, skill, concept", "حقيقة ثم مهارة ثم مفهوم"],
      ["Concept, principle, skill/process", "مفهوم ثم مبدأ ثم مهارة/عملية"],
      ["Principle, fact, concept", "مبدأ ثم حقيقة ثم مفهوم"],
      ["Skill, concept, principle", "مهارة ثم مفهوم ثم مبدأ"],
    ],
    1,
    [
      "Fraction is an organizing concept; commutativity states a relationship; solving is an enacted procedure. The classification is based on function within the discipline.",
      "الكسر مفهوم منظم، والإبدال علاقة، والحل إجراء منفذ. يستند التصنيف إلى وظيفة العنصر داخل التخصص.",
    ],
    [
      [
        "A category is not a single verifiable fact, and a relation is not the executed skill.",
        "الفئة ليست حقيقة مفردة، والعلاقة ليست المهارة المنفذة.",
      ],
      [
        "Correct: category, relationship, and performance.",
        "صحيح؛ فئة وعلاقة وأداء.",
      ],
      [
        "The relation is not merely an isolated fact and solving is not a category.",
        "العلاقة ليست مجرد حقيقة معزولة، والحل ليس فئة.",
      ],
      [
        "This assigns action and abstraction to the wrong elements.",
        "تسند هذه الأفعال والتجريدات إلى عناصر خاطئة.",
      ],
    ],
  ),
  Q(
    "m06",
    "discipline-structure",
    "APPLICATION",
    [
      "A science course presents many disconnected facts. Which redesign most directly treats the subject as a discipline?",
      "يعرض مقرر علوم حقائق منفصلة كثيرة. أي تعديل يعامل المادة كتخصص بصورة مباشرة؟",
    ],
    [
      [
        "Group facts by concepts, show relationships, and practice investigation processes in a meaningful sequence.",
        "نظم الحقائق بمفاهيم ووضح العلاقات ودرّب عمليات البحث بتسلسل ذي معنى.",
      ],
      [
        "Increase the number of facts without changing connections.",
        "زد عدد الحقائق دون تغيير الروابط.",
      ],
      [
        "Replace all factual knowledge with unstructured discussion.",
        "استبدل الحقائق كلها بنقاش غير منظم.",
      ],
      [
        "Assess only whether the textbook pages were completed.",
        "قوّم إكمال صفحات الكتاب وحده.",
      ],
    ],
    0,
    [
      "The guide connects facts, concepts, principles, and skills. Coherent sequencing develops their relationships; it does not discard factual knowledge or equate page coverage with learning.",
      "يربط الدليل الحقائق والمفاهيم والمبادئ والمهارات. يطور التسلسل المترابط علاقاتها ولا يلغي الحقائق أو يساوي التغطية بالتعلم.",
    ],
    [
      [
        "Correct: all structural elements are connected rather than merely listed.",
        "صحيح؛ تُربط عناصر البنية بدل سردها.",
      ],
      [
        "More disconnected information does not repair disciplinary structure.",
        "لا تصلح معلومات منفصلة إضافية بنية التخصص.",
      ],
      [
        "Facts remain part of the structure; removing them is not the intended move.",
        "تبقى الحقائق جزءًا من البنية؛ ليس المطلوب حذفها.",
      ],
      [
        "Completion is an activity indicator, not the structural understanding.",
        "الإكمال مؤشر نشاط لا فهم البنية.",
      ],
    ],
  ),
  Q(
    "m07",
    "pck",
    "APPLICATION",
    [
      "A teacher selects multiplication by 1/2 because learners believe multiplication always increases a number. What best identifies the distinctive knowledge?",
      "يختار معلّم الضرب في 1/2 لأن الطلاب يظنون أن الضرب يزيد العدد دائمًا. ما المعرفة الأبرز؟",
    ],
    [
      ["TK, because numbers are tools", "TK لأن الأعداد أدوات"],
      ["General classroom management alone", "إدارة صفية عامة فقط"],
      [
        "PCK: a content-specific representation chosen to address a predictable misconception",
        "PCK: تمثيل مرتبط بالمحتوى يعالج تصورًا خاطئًا متوقعًا",
      ],
      [
        "Curricular knowledge only: knowing the textbook order",
        "معرفة منهج فقط: معرفة ترتيب الكتاب",
      ],
    ],
    2,
    [
      "The decisive feature is connecting a specific misconception with a representation of the content for those learners. That is PCK; knowing how to calculate alone would be CK.",
      "السمة الحاسمة ربط تصور محدد بتمثيل للمحتوى لهؤلاء المتعلمين. هذه PCK؛ أما معرفة الحساب وحدها فهي CK.",
    ],
    [
      [
        "No technology operation is established by the scenario.",
        "لا يثبت الموقف تشغيل تقنية.",
      ],
      [
        "The judgment is about representing a particular mathematical concept.",
        "يتعلق الحكم بتمثيل مفهوم رياضي محدد.",
      ],
      [
        "Correct: the example is selected for its diagnostic instructional fit.",
        "صحيح؛ اختير المثال لملاءمته التدريسية التشخيصية.",
      ],
      [
        "Knowing sequence may support planning, but does not capture the representation–misconception link.",
        "قد تدعم معرفة التسلسل التخطيط لكنها لا تفسر رابط التمثيل والتصور الخاطئ.",
      ],
    ],
  ),
  Q(
    "m08",
    "pck",
    "CONCEPT CHECK",
    [
      "Knowing which approved materials introduce a subject at a given grade is primarily which knowledge base?",
      "معرفة المواد المعتمدة وتسلسل تقديم تخصص لصف محدد تنتمي أساسًا إلى أي معرفة؟",
    ],
    [
      ["General pedagogical knowledge", "البيداغوجيا العامة"],
      ["Technological knowledge", "المعرفة التقنية"],
      ["PCK in every case", "PCK في كل حالة"],
      ["Curricular knowledge", "معرفة المنهج"],
    ],
    3,
    [
      "The guide defines curricular knowledge in relation to materials, programs, and sequencing for a subject and level. PCK would additionally concern how a particular idea is made understandable.",
      "يعرف الدليل معرفة المنهج بالمواد والبرامج والتسلسل لمادة ومستوى. وتتناول PCK إضافة إلى ذلك جعل فكرة محددة مفهومة.",
    ],
    [
      [
        "General PK concerns broad teaching principles across subjects.",
        "تتناول PK العامة مبادئ تدريس عابرة للتخصصات.",
      ],
      [
        "No hardware or software operation is the focus.",
        "ليس تشغيل العتاد أو البرمجيات محور السؤال.",
      ],
      [
        "A resource sequence alone does not establish subject-specific representation for a misconception.",
        "لا يثبت تسلسل الموارد وحده تمثيلًا لتصور خاطئ.",
      ],
      [
        "Correct: materials, programs, and sequence are the curricular focus.",
        "صحيح؛ المواد والبرامج والتسلسل محور معرفة المنهج.",
      ],
    ],
  ),
  Q(
    "m09",
    "tpack",
    "APPLICATION",
    [
      "A teacher can operate a virtual model but cannot explain why it helps the specific concept or learners. What is demonstrated most directly?",
      "يستطيع معلّم تشغيل نموذج افتراضي لكنه لا يفسر فائدته للمفهوم أو المتعلمين. ما الذي ثبت مباشرة؟",
    ],
    [
      [
        "TK, with insufficient evidence of integrated TPACK",
        "TK مع دليل غير كافٍ على TPACK المتكاملة",
      ],
      [
        "Complete TPACK because software is present",
        "TPACK كاملة لوجود البرنامج",
      ],
      ["Only curricular knowledge", "معرفة منهج فقط"],
      ["No professional knowledge of any kind", "غياب أي معرفة مهنية"],
    ],
    0,
    [
      "Operational knowledge is TK. TPACK requires coordinated pedagogical, content, and technology judgment for goals and learners; operation alone does not establish that integration.",
      "معرفة التشغيل TK. وتتطلب TPACK حكمًا منسقًا في البيداغوجيا والمحتوى والتقنية للأهداف والمتعلمين؛ ولا يثبت التشغيل وحده التكامل.",
    ],
    [
      [
        "Correct: acknowledge the demonstrated knowledge without overstating it.",
        "صحيح؛ اعترف بالمعرفة المثبتة دون المبالغة فيها.",
      ],
      [
        "The presence of technology is not evidence of the pedagogical-content fit.",
        "وجود التقنية ليس دليلًا على ملاءمتها البيداغوجية والمحتوائية.",
      ],
      [
        "The described evidence concerns technology operation, not curriculum sequence.",
        "يتعلق الدليل بالتشغيل لا تسلسل المنهج.",
      ],
      [
        "TK is still genuine professional knowledge.",
        "تبقى TK معرفة مهنية حقيقية.",
      ],
    ],
  ),
  Q(
    "m10",
    "tpack",
    "CONCEPT CHECK",
    [
      "Which pairing correctly distinguishes TCK from TPK?",
      "أي اقتران يميز TCK من TPK بصورة صحيحة؟",
    ],
    [
      [
        "TCK is general management; TPK is subject facts.",
        "TCK إدارة عامة وTPK حقائق تخصصية.",
      ],
      [
        "TCK combines pedagogy and content; TPK combines all three domains.",
        "TCK تجمع البيداغوجيا والمحتوى وTPK تجمع الثلاثة.",
      ],
      [
        "TCK concerns content-specific technology/representations; TPK concerns technology supporting general teaching processes.",
        "TCK تقنية وتمثيلات محتوى محدد؛ وTPK دعم التقنية عمليات التدريس العامة.",
      ],
      [
        "TCK is assessment only; TPK is hardware operation only.",
        "TCK تقويم فقط وTPK تشغيل عتاد فقط.",
      ],
    ],
    2,
    [
      "The pairwise intersections depend on what is being related. Technology plus particular subject content is TCK; technology plus pedagogy is TPK; the three-way integration is TPACK.",
      "تعتمد التقاطعات على ما يُربط. التقنية مع محتوى معين TCK، ومع البيداغوجيا TPK، وتكامل الثلاثة TPACK.",
    ],
    [
      [
        "These describe neither technology intersection correctly.",
        "لا تصف هذه التقاطعين التقنيين بدقة.",
      ],
      [
        "Pedagogy plus content is PCK; all three is TPACK.",
        "البيداغوجيا والمحتوى PCK، والثلاثة TPACK.",
      ],
      [
        "Correct: the distinction is subject representation versus general teaching process.",
        "صحيح؛ الفرق بين تمثيل التخصص وعملية التدريس العامة.",
      ],
      [
        "Both are narrower and differently focused than the source definitions.",
        "التعريفان أضيق ومختلفان عن المصدر.",
      ],
    ],
  ),
  Q(
    "m11",
    "addie",
    "APPLICATION",
    [
      "A team writes objectives and assessment specifications, then produces the actual worksheet. Which ADDIE phases are represented in order?",
      "يكتب فريق الأهداف ومواصفات التقويم ثم ينتج ورقة العمل الفعلية. ما المرحلتان بالترتيب؟",
    ],
    [
      ["Analysis then Implementation", "التحليل ثم التنفيذ"],
      ["Design then Development", "التصميم ثم التطوير"],
      ["Development then Design", "التطوير ثم التصميم"],
      ["Implementation then Evaluation", "التنفيذ ثم التقويم"],
    ],
    1,
    [
      "The blueprint—including objectives and planned evidence—is Design. Producing the resource from that blueprint is Development. The action and output distinguish the phases.",
      "المخطط بما فيه الأهداف والأدلة المخططة هو التصميم، وإنتاج المورد منه هو التطوير. يميز الفعل والناتج المرحلتين.",
    ],
    [
      [
        "Neither learner diagnosis nor delivery is the main action described.",
        "لا يصف الموقف أساسًا تشخيصًا أو تقديمًا للمتعلمين.",
      ],
      [
        "Correct: specifying precedes building.",
        "صحيح؛ تسبق المواصفات البناء.",
      ],
      ["This reverses the described sequence.", "تعكس هذه الإجابة التسلسل."],
      [
        "The resource has not yet been delivered or evaluated with learners.",
        "لم يقدم المورد للمتعلمين أو يقوّم معهم بعد.",
      ],
    ],
  ),
  Q(
    "m12",
    "addie",
    "APPLICATION",
    [
      "Pilot feedback leads to a revised resource before full delivery. Which interpretation fits the source?",
      "تؤدي أدلة تجربة مصغرة إلى تعديل المورد قبل التقديم الكامل. ما التفسير المطابق؟",
    ],
    [
      [
        "Evaluation is impossible until the course ends.",
        "يستحيل التقويم قبل نهاية المقرر.",
      ],
      [
        "Any revision must restart implementation immediately.",
        "أي مراجعة تعيد التنفيذ فورًا.",
      ],
      [
        "Piloting means the design is permanently fixed.",
        "تعني التجربة ثبات التصميم نهائيًا.",
      ],
      [
        "Development can include piloting, with formative evaluation informing improvement before delivery.",
        "قد يتضمن التطوير تجربة مصغرة وتقويمًا تكوينيًا للتحسين قبل التقديم.",
      ],
    ],
    3,
    [
      "The ADDIE table lists small-scale piloting in Development and formative evaluation throughout development. This makes evaluation ongoing rather than exclusively a final event.",
      "يضع جدول ADDIE التجربة المصغرة في التطوير والتقويم التكويني خلاله، فيكون التقويم مستمرًا لا حدثًا ختاميًا فقط.",
    ],
    [
      [
        "The source explicitly includes formative evaluation during development.",
        "يذكر المصدر التقويم التكويني أثناء التطوير.",
      ],
      [
        "Revision may change materials or earlier decisions before delivery.",
        "قد تغيّر المراجعة المواد أو قرارات سابقة قبل التقديم.",
      ],
      [
        "Piloting supplies reasons to revise rather than freeze a design.",
        "توفر التجربة مسوغات للمراجعة لا لتجميد التصميم.",
      ],
      [
        "Correct: development and evaluative work can interact.",
        "صحيح؛ قد يتفاعل التطوير والعمل التقويمي.",
      ],
    ],
  ),
  Q(
    "m13",
    "assure",
    "APPLICATION",
    [
      "In ASSURE, selecting a simulation and testing its display before class are respectively which steps?",
      "في ASSURE، ما خطوتا اختيار المحاكاة واختبار عرضها قبل الدرس على الترتيب؟",
    ],
    [
      [
        "Select methods/media/materials, then Utilize media/materials",
        "اختيار الطرائق والوسائط والمواد ثم استخدامها",
      ],
      [
        "Analyze learners, then State objectives",
        "تحليل المتعلمين ثم صياغة الأهداف",
      ],
      [
        "Require participation, then Evaluate/revise",
        "اشتراط المشاركة ثم التقويم والمراجعة",
      ],
      ["Utilize, then Select", "الاستخدام ثم الاختيار"],
    ],
    0,
    [
      "Selecting identifies what to use. Utilize includes previewing materials and preparing the environment, not only pressing play during class.",
      "يحدّد الاختيار ما سيستخدم، ويشمل الاستخدام فحص المواد وتهيئة البيئة لا تشغيلها أثناء الدرس فقط.",
    ],
    [
      [
        "Correct: choice and preparation/use are distinct decisions.",
        "صحيح؛ الاختيار والتهيئة والاستخدام قرارات متمايزة.",
      ],
      [
        "Those steps concern the audience and outcomes, not the stated media actions.",
        "تتعلق هاتان الخطوتان بالجمهور والنواتج لا الإجرائين المذكورين.",
      ],
      [
        "No learner participation or outcome evidence is described yet.",
        "لم توصف مشاركة أو أدلة نواتج بعد.",
      ],
      ["This reverses the two actions.", "تعكس هذه الإجابة الإجراءين."],
    ],
  ),
  Q(
    "m14",
    "assure",
    "APPLICATION",
    [
      "Which change most directly supplies ASSURE’s “Require learner participation” when a video lesson is passive?",
      "أي تعديل يحقق مباشرة «اشتراط مشاركة المتعلم» في درس فيديو سلبي؟",
    ],
    [
      [
        "Replace the video title with a more attractive font.",
        "استبدل خط عنوان الفيديو بخط أجمل.",
      ],
      [
        "Increase the playback volume without a learner task.",
        "ارفع الصوت دون مهمة للمتعلم.",
      ],
      [
        "Pause for predictions, peer justification, and an explanation check.",
        "توقف لتنبؤات وتبرير بين الزملاء وفحص التفسيرات.",
      ],
      [
        "List the video link in the teacher’s references only.",
        "أدرج الرابط في مراجع المعلم فقط.",
      ],
    ],
    2,
    [
      "The step concerns structured learner engagement such as discussion, small-group activity, and formative response. Media preparation is useful but does not by itself require participation.",
      "تتعلق الخطوة بمشاركة منظمة كالنقاش والعمل الصغير والاستجابة التكوينية. تفيد تهيئة الوسيط لكنها لا تشترط المشاركة بذاتها.",
    ],
    [
      [
        "Typography may affect presentation but does not require thinking.",
        "قد يؤثر الخط في العرض لكنه لا يشترط التفكير.",
      ],
      [
        "Audibility is a use/preparation concern, not evidence of active response.",
        "السمع شأن استخدام وتهيئة لا دليل استجابة نشطة.",
      ],
      [
        "Correct: learners must commit to and explain reasoning.",
        "صحيح؛ يلتزم المتعلمون باستدلال ويفسرونه.",
      ],
      [
        "A reference entry is not a learner participation task.",
        "ليس إدراج المرجع مهمة مشاركة.",
      ],
    ],
  ),
  Q(
    "m15",
    "standards-backward",
    "CONCEPT CHECK",
    [
      "Which statement correctly distinguishes professional teaching standards from curriculum standards?",
      "أي عبارة تميز المعايير المهنية من معايير المنهج؟",
    ],
    [
      [
        "Both specify only the number of textbook pages.",
        "كلاهما يحدد عدد صفحات الكتاب فقط.",
      ],
      [
        "Professional standards concern teaching quality; curriculum standards specify what learners should know and do.",
        "تتعلق المهنية بجودة التدريس، وتحدد معايير المنهج ما يعرفه المتعلم ويؤديه.",
      ],
      [
        "Curriculum standards concern teacher ethics; professional standards list only student facts.",
        "تتناول معايير المنهج أخلاق المعلّم والمهنية حقائق الطلاب فقط.",
      ],
      [
        "Daily objectives replace both frameworks entirely.",
        "تلغي الأهداف اليومية الإطارين تمامًا.",
      ],
    ],
    1,
    [
      "The guide explicitly distinguishes how well a teacher plans/teaches from what students learn. Daily objectives translate curriculum expectations into manageable steps while professional standards guide planning quality.",
      "يميز الدليل جودة تخطيط المعلّم وتدريسه مما يتعلمه الطالب. تترجم الأهداف اليومية المنهج إلى خطوات، وتوجه المعايير المهنية جودة التخطيط.",
    ],
    [
      [
        "Standards are not equivalent to page counts.",
        "لا تعادل المعايير أعداد الصفحات.",
      ],
      [
        "Correct: quality of teaching versus student outcomes/content.",
        "صحيح؛ جودة التدريس مقابل نواتج الطالب ومحتواه.",
      ],
      [
        "This swaps the functions of the frameworks.",
        "تعكس هذه وظائف الإطارين.",
      ],
      [
        "Daily objectives trace to standards rather than replace them.",
        "ترتبط الأهداف بالمعايير ولا تستبدلها.",
      ],
    ],
  ),
  Q(
    "m16",
    "standards-backward",
    "APPLICATION",
    [
      "After specifying a daily outcome, a teacher following backward design should next do what?",
      "بعد تحديد ناتج يومي، ماذا يفعل المعلّم تاليًا وفق التصميم العكسي؟",
    ],
    [
      ["Choose the most entertaining activity.", "يختار النشاط الأكثر تسلية."],
      [
        "Prepare slides before deciding evidence.",
        "يعد الشرائح قبل تحديد الدليل.",
      ],
      [
        "Select a textbook page regardless of the behavior.",
        "يختار صفحة بصرف النظر عن السلوك.",
      ],
      [
        "Determine acceptable assessment evidence matching Behavior, Condition, and Degree.",
        "يحدد دليل تقويم مقبولًا يطابق السلوك والشروط ودرجة الإتقان.",
      ],
    ],
    3,
    [
      "Backward design sequences desired results, acceptable evidence, and then the learning plan. Deciding evidence first protects alignment when activities are chosen.",
      "يرتب التصميم العكسي النتائج ثم الأدلة المقبولة ثم خطة التعلم. يحمي تحديد الدليل أولًا المواءمة عند اختيار الأنشطة.",
    ],
    [
      [
        "Entertainment does not establish alignment or evidence.",
        "لا تثبت التسلية المواءمة أو الدليل.",
      ],
      [
        "Slides are learning resources chosen after evidence is clarified.",
        "الشرائح موارد تعلم تأتي بعد توضيح الدليل.",
      ],
      [
        "Page choice must serve the intended outcome, not bypass it.",
        "يجب أن تخدم الصفحة الناتج لا تتجاوزه.",
      ],
      [
        "Correct: acceptable evidence is stage two.",
        "صحيح؛ الأدلة المقبولة المرحلة الثانية.",
      ],
    ],
  ),
  Q(
    "m17",
    "abcd-parts",
    "APPLICATION",
    [
      "“Using a ruler, Grade 3 students measure five objects to the nearest centimetre.” Which part is Degree?",
      "«باستخدام مسطرة، يقيس طلاب الصف الثالث خمسة أشياء لأقرب سنتيمتر». أي جزء هو درجة الإتقان؟",
    ],
    [
      ["Grade 3 students", "طلاب الصف الثالث"],
      ["Using a ruler", "باستخدام مسطرة"],
      ["To the nearest centimetre", "لأقرب سنتيمتر"],
      ["Measure the length of five objects", "قياس طول خمسة أشياء"],
    ],
    2,
    [
      "Degree is the precision criterion, to the nearest centimetre. The source’s answer key identifies the ruler as Condition, the learners as Audience, and measurement plus content as Behavior.",
      "درجة الإتقان معيار الدقة: لأقرب سنتيمتر. يصنف مفتاح المصدر المسطرة شرطًا، والطلاب جمهورًا، والقياس مع المحتوى سلوكًا.",
    ],
    [
      [
        "This identifies Audience, not the performance criterion.",
        "هذا المتعلمون المستهدفون لا معيار الأداء.",
      ],
      [
        "This is the permitted tool, hence Condition.",
        "هذه الأداة المسموحة، أي الشرط.",
      ],
      ["Correct: it states required precision.", "صحيح؛ يحدد الدقة المطلوبة."],
      ["This describes the action and its content.", "هذا الفعل ومحتواه."],
    ],
  ),
  Q(
    "m18",
    "abcd-parts",
    "APPLICATION",
    [
      "In an objective requiring a letter of at least 200 words, using a checklist, scoring rubric level 3+, which analysis matches the source key?",
      "في هدف رسالة لا تقل عن 200 كلمة باستخدام قائمة تحقق وبمستوى 3 فأعلى، أي تحليل يطابق المفتاح؟",
    ],
    [
      [
        "Checklist is Condition; word minimum and rubric threshold contribute to Degree.",
        "القائمة شرط، والحد الأدنى للكلمات ومستوى السلم من درجة الإتقان.",
      ],
      ["Every number is Audience.", "كل رقم هو المتعلم المستهدف."],
      [
        "The checklist is Degree and the rubric is Behavior.",
        "القائمة درجة الإتقان والسلم السلوك.",
      ],
      [
        "Sentence order alone determines the ABCD labels.",
        "ترتيب الجملة وحده يحدد الأجزاء.",
      ],
    ],
    0,
    [
      "Classify each element by its function. The guide labels the checklist as the permitted support/Condition, and both minimum length and rubric level as success criteria/Degree.",
      "صنّف وفق الوظيفة. يسمي الدليل القائمة دعمًا مسموحًا أو شرطًا، ويعد طول الرسالة ومستوى السلم معياري نجاح ضمن الدرجة.",
    ],
    [
      [
        "Correct: support and criterion have distinct functions.",
        "صحيح؛ للدعم والمعيار وظيفتان مختلفتان.",
      ],
      [
        "Audience names learners; numbers can serve several roles.",
        "يسمي Audience المتعلمين، وقد تؤدي الأرقام أدوارًا مختلفة.",
      ],
      [
        "A rubric threshold judges performance; it is not the action verb.",
        "يحكم حد السلم على الأداء وليس فعلًا سلوكيًا.",
      ],
      [
        "The guide explicitly permits different sentence orders.",
        "يسمح الدليل بتغيّر ترتيب الجملة.",
      ],
    ],
  ),
  Q(
    "m19",
    "bloom-verbs",
    "CONCEPT CHECK",
    [
      "Why is “students will understand fractions” insufficient as the Behavior even though Understand is a Bloom level?",
      "لماذا لا يكفي «سيفهم الطلاب الكسور» كسلوك رغم أن الفهم مستوى في بلوم؟",
    ],
    [
      [
        "Bloom excludes understanding from learning.",
        "يستبعد بلوم الفهم من التعلم.",
      ],
      [
        "It does not specify observable evidence; use an action such as explain or compare.",
        "لا يحدد دليلًا ملحوظًا؛ استخدم فعلًا مثل يفسر أو يقارن.",
      ],
      [
        "Every objective must use only the verb define.",
        "يجب استخدام يعرّف وحده في كل هدف.",
      ],
      [
        "The defect can only be fixed by removing the learner group.",
        "لا يصلح العيب إلا بحذف فئة المتعلمين.",
      ],
    ],
    1,
    [
      "A level names a type of thinking; an objective must specify what learners do to demonstrate it. The guide recommends observable indicators rather than hidden mental-state verbs.",
      "يسمي المستوى نوع التفكير، ويجب أن يحدد الهدف ما يفعله المتعلم لإظهاره. يوصي الدليل بمؤشرات ملحوظة بدل الحالة الذهنية الخفية.",
    ],
    [
      [
        "Understand remains one of the six levels.",
        "يبقى الفهم من المستويات الستة.",
      ],
      [
        "Correct: distinguish the level from evidence of achievement.",
        "صحيح؛ ميّز المستوى من دليل تحققه.",
      ],
      [
        "Different levels require different observable performances.",
        "تحتاج المستويات إلى أداءات ملحوظة مختلفة.",
      ],
      [
        "Audience is required; the Behavior needs revision.",
        "المتعلمون مطلوبون؛ السلوك هو ما يحتاج المراجعة.",
      ],
    ],
  ),
  Q(
    "m20",
    "bloom-verbs",
    "APPLICATION",
    [
      "An outcome asks learners to defend the best strategy for a classroom case. Which assessment best matches its cognitive demand?",
      "يطلب ناتج الدفاع عن أفضل استراتيجية لموقف صفي. أي تقويم يطابق متطلبه؟",
    ],
    [
      ["Copy the strategy names.", "نسخ أسماء الاستراتيجيات."],
      [
        "Match names to definitions without explanation.",
        "مطابقة الأسماء بالتعريفات دون تفسير.",
      ],
      [
        "Recall how many strategies were mentioned.",
        "تذكر عدد الاستراتيجيات المذكورة.",
      ],
      [
        "Recommend a strategy and justify it against the case constraints.",
        "التوصية باستراتيجية وتبريرها وفق قيود الموقف.",
      ],
    ],
    3,
    [
      "Defending a decision corresponds to Evaluate in the guide. A reasoned judgment tied to context supplies the intended evidence; recall may support it but does not demonstrate it.",
      "يقابل الدفاع عن قرار مستوى التقييم. يقدم الحكم المعلل المرتبط بالسياق الدليل المقصود؛ وقد يدعمه التذكر دون أن يثبته.",
    ],
    [
      [
        "Copying does not require a justified judgment.",
        "النسخ لا يتطلب حكمًا مبررًا.",
      ],
      [
        "Recognition/recall alone underrepresents the outcome.",
        "لا يمثل التعرف أو التذكر وحده الناتج.",
      ],
      [
        "A count is unrelated to defending a choice.",
        "العدد لا يثبت الدفاع عن الاختيار.",
      ],
      [
        "Correct: the performance is a context-sensitive judgment.",
        "صحيح؛ الأداء حكم يستجيب للسياق.",
      ],
    ],
  ),
  Q(
    "m21",
    "measurable-achievable",
    "APPLICATION",
    [
      "An objective specifies a complete multiweek plant investigation within one lesson. It has observable verbs and a rubric. What is the main remaining problem?",
      "يحدد هدف استقصاء نبات كاملًا يحتاج أسابيع داخل حصة، بأفعال ملحوظة وسلم تقدير. ما المشكلة الباقية؟",
    ],
    [
      [
        "It is necessarily unmeasurable because it has a rubric.",
        "غير قابل للقياس لوجود سلم.",
      ],
      [
        "No objective can target an investigation.",
        "لا يمكن أن يستهدف هدف استقصاءً.",
      ],
      [
        "The scope and timescale are not achievable for one lesson.",
        "النطاق والمدة غير قابلين للتحقق في حصة.",
      ],
      [
        "Adding more verbs guarantees feasibility.",
        "تضمن إضافة الأفعال الواقعية.",
      ],
    ],
    2,
    [
      "Measurability and achievability are separate tests. The visible performance can be checkable yet unrealistic; narrow today’s step, for example identifying variables in a supplied research question.",
      "القابلية للقياس وإمكان التحقق اختباران مستقلان. قد يكون الأداء قابلًا للفحص وغير واقعي؛ ضيّق خطوة اليوم مثل تحديد المتغيرات لسؤال معطى.",
    ],
    [
      [
        "A rubric can make the criterion clearer, not inherently unmeasurable.",
        "قد يوضح السلم المعيار ولا يجعله غير قابل للقياس.",
      ],
      [
        "Investigation goals are valid but may require several lessons.",
        "الاستقصاء غاية ممكنة لكنه قد يحتاج دروسًا.",
      ],
      [
        "Correct: repair time and scope while preserving the broad goal.",
        "صحيح؛ أصلح الزمن والنطاق مع إبقاء الغاية.",
      ],
      [
        "More behaviors usually increase rather than solve the scope problem.",
        "تزيد الأفعال غالبًا مشكلة النطاق.",
      ],
    ],
  ),
  Q(
    "m22",
    "measurable-achievable",
    "CONCEPT CHECK",
    [
      "Which set is most relevant to judging whether an objective is achievable?",
      "أي مجموعة أهم للحكم على إمكان تحقق الهدف؟",
    ],
    [
      [
        "Learner readiness, available time, scope, resources, and a realistic Degree",
        "استعداد المتعلم والزمن والنطاق والموارد ودرجة إتقان واقعية",
      ],
      ["Only whether it contains a percentage", "وجود نسبة مئوية فقط"],
      ["Only whether the teacher likes the topic", "إعجاب المعلم بالموضوع فقط"],
      ["Only the number of words in the objective", "عدد كلمات الهدف فقط"],
    ],
    0,
    [
      "The guide’s feasibility check considers time, prior knowledge, manageable scope, Degree, resources, and learner characteristics. A numerical threshold alone cannot establish feasibility.",
      "يفحص الدليل الزمن والمعرفة السابقة والنطاق والدرجة والموارد وخصائص المتعلم. لا يثبت الحد العددي الواقعية وحده.",
    ],
    [
      [
        "Correct: these are the source’s feasibility dimensions.",
        "صحيح؛ هذه أبعاد الواقعية في المصدر.",
      ],
      [
        "Percentages help define criteria but not time or readiness.",
        "تساعد النسب في المعيار لا الزمن والاستعداد.",
      ],
      [
        "Interest does not establish that learners can achieve it.",
        "لا يثبت الاهتمام قدرة المتعلمين على بلوغه.",
      ],
      [
        "Length does not establish suitable scope or resources.",
        "لا يثبت الطول ملاءمة النطاق أو الموارد.",
      ],
    ],
  ),
  Q(
    "m23",
    "objective-repair",
    "APPLICATION",
    [
      "“Students will complete page 45.” What is the best first repair?",
      "«سيكمل الطلاب صفحة 45». ما الإصلاح الأول الأنسب؟",
    ],
    [
      ["Add “very well” after complete.", "أضف «بإتقان جيد» بعد يكمل."],
      [
        "Replace the page-completion activity with the learning performance it should demonstrate, then specify ABCD.",
        "استبدل نشاط إكمال الصفحة بأداء التعلم الذي يكشفه ثم حدّد ABCD.",
      ],
      ["Change students to the teacher.", "استبدل الطلاب بالمعلّم."],
      [
        "Require completion twice without specifying learning.",
        "اطلب الإكمال مرتين دون تحديد التعلم.",
      ],
    ],
    1,
    [
      "Completing a page is an activity, not a statement of the learning outcome. Identify the observable content performance and its condition/criterion instead of merely increasing compliance.",
      "إكمال الصفحة نشاط لا ناتج تعلم. حدّد الأداء المرتبط بالمحتوى وشروطه ومعياره بدل زيادة الامتثال فقط.",
    ],
    [
      [
        "“Very well” remains an uncheckable Degree.",
        "تبقى «جيدًا» درجة غير قابلة للفحص.",
      ],
      [
        "Correct: define the learning evidenced by the work.",
        "صحيح؛ حدّد التعلم الذي يكشفه العمل.",
      ],
      [
        "Objectives should describe student achievement.",
        "يجب أن تصف الأهداف تحصيل الطالب.",
      ],
      [
        "Repetition does not fix the missing outcome.",
        "لا يصلح التكرار غياب الناتج.",
      ],
    ],
  ),
  Q(
    "m24",
    "objective-repair",
    "APPLICATION",
    [
      "The objective permits a calculator for unit-price comparisons. Which exit task is best aligned?",
      "يسمح الهدف بحاسبة لمقارنة سعر الوحدة. أي مهمة خروج أوفق؟",
    ],
    [
      [
        "Copy the worked prices with no calculation.",
        "نسخ الأسعار المحلولة دون حساب.",
      ],
      ["Name currency symbols only.", "تسمية رموز العملات فقط."],
      [
        "Use new price pairs and a calculator; calculate and select the better buy at the stated success criterion.",
        "استخدم أزواج أسعار جديدة وحاسبة للحساب واختيار الأفضل وفق معيار النجاح.",
      ],
      [
        "Ban calculators while keeping all other details unchanged without revising the objective.",
        "امنع الحاسبة مع إبقاء البقية دون مراجعة الهدف.",
      ],
    ],
    2,
    [
      "The task preserves Behavior, Condition, and Degree while varying examples to test application. Copying results or naming symbols does not show unit-price comparison.",
      "تحفظ المهمة السلوك والشروط والدرجة وتغير الأمثلة لفحص التطبيق. لا يثبت النسخ أو تسمية الرموز مقارنة سعر الوحدة.",
    ],
    [
      [
        "Copying cannot establish independent calculation.",
        "لا يثبت النسخ حسابًا مستقلًا.",
      ],
      [
        "Symbol recognition is not the intended decision.",
        "التعرف على الرمز ليس القرار المقصود.",
      ],
      [
        "Correct: same performance and supports, new items.",
        "صحيح؛ الأداء والدعم نفسيهما مع عناصر جديدة.",
      ],
      [
        "This changes the stated Condition without a coherent redesign.",
        "يغيّر هذا الشرط دون إعادة تصميم مترابطة.",
      ],
    ],
  ),
  Q(
    "m25",
    "objective-alignment",
    "APPLICATION",
    [
      "A checklist is allowed in the objective but banned in the assessment. Which ABCD component is directly inconsistent?",
      "تُسمح قائمة تحقق في الهدف وتُمنع في التقويم. أي جزء غير متسق مباشرة؟",
    ],
    [
      ["Audience", "المتعلمون A"],
      ["Degree", "درجة الإتقان D"],
      ["Behavior", "السلوك B"],
      ["Condition", "شروط الأداء C"],
    ],
    3,
    [
      "Condition defines the permitted tools and support. Changing it can change the performance being judged; align it or revise the objective and preparation intentionally.",
      "يحدد الشرط الأدوات والدعم المسموح. قد يغيّر تبديله الأداء المحكوم؛ طابقه أو راجع الهدف والإعداد قصدًا.",
    ],
    [
      ["The learner group has not changed.", "لم تتغير فئة المتعلمين."],
      [
        "The success threshold is not the directly stated change.",
        "ليس حد النجاح التغيير المذكور مباشرة.",
      ],
      [
        "The action may remain the same; the support has changed.",
        "قد يبقى الفعل نفسه ويتغير الدعم.",
      ],
      [
        "Correct: the permitted resource is a condition.",
        "صحيح؛ المورد المسموح شرط.",
      ],
    ],
  ),
  Q(
    "m26",
    "objective-alignment",
    "APPLICATION",
    [
      "Which relationship between a professional objective, an “I can” target, and a success criterion fits the guide?",
      "أي علاقة بين الهدف المهني وصيغة «أستطيع» ومعيار النجاح توافق الدليل؟",
    ],
    [
      [
        "The target communicates the purpose; the criterion states how success is checked; the full plan retains ABCD precision.",
        "توصل الصيغة الغرض، ويحدد المعيار فحص النجاح، وتحفظ الخطة دقة ABCD.",
      ],
      [
        "The target replaces all assessment criteria.",
        "تلغي صيغة الطالب كل المعايير.",
      ],
      [
        "A success criterion should avoid checkable performance.",
        "ينبغي أن يتجنب المعيار الأداء القابل للفحص.",
      ],
      [
        "The objective is unrelated to daily activities.",
        "الهدف غير مرتبط بأنشطة اليوم.",
      ],
    ],
    0,
    [
      "The source gives a concise student target alongside a numerical exit criterion and a full teacher objective. They are complementary layers of clarity, not competing replacements.",
      "يعرض المصدر هدف طالب مختصرًا مع معيار خروج عددي وهدف معلم كامل. هي طبقات وضوح متكاملة لا بدائل متنافسة.",
    ],
    [
      [
        "Correct: meaning, evidence, and professional precision remain connected.",
        "صحيح؛ يبقى المعنى والدليل والدقة مرتبطًا.",
      ],
      [
        "The criterion remains necessary to judge achievement.",
        "يبقى المعيار لازمًا للحكم على التحقق.",
      ],
      [
        "Checkability is the purpose of the success criterion.",
        "القابلية للفحص غرض المعيار.",
      ],
      [
        "The guide places objectives near the top because later sections depend on them.",
        "يضع الدليل الأهداف في البداية لاعتماد بقية الأقسام عليها.",
      ],
    ],
  ),
  Q(
    "m27",
    "planning-foundations",
    "APPLICATION",
    [
      "A textbook task assumes graph-reading skills, but recent assessment shows gaps. Which planning response is strongest?",
      "يفترض نشاط الكتاب مهارة قراءة رسوم، لكن التقويم الحديث يكشف فجوات. ما الاستجابة الأقوى؟",
    ],
    [
      [
        "Follow the page unchanged because the textbook is the only valid planning source.",
        "اتبع الصفحة كما هي لأن الكتاب المصدر الوحيد.",
      ],
      [
        "Use learner evidence to adjust sequence/support while retaining the curriculum outcome.",
        "استخدم الأدلة لتعديل التسلسل والدعم مع إبقاء ناتج المنهج.",
      ],
      [
        "Remove the outcome from the course without considering alternatives.",
        "احذف الناتج من المقرر دون بدائل.",
      ],
      [
        "Ignore prior evidence until the final examination.",
        "تجاهل الأدلة حتى النهائي.",
      ],
    ],
    1,
    [
      "Topic Three lists prior assessment data as a planning resource and links planning to anticipation and differentiation. Adapt support and pacing instead of confusing page coverage with readiness.",
      "يعد الموضوع الثالث بيانات التقويم مصدرًا للتخطيط ويربطه بالتوقع والتمايز. كيّف الدعم والإيقاع بدل مساواة تغطية الصفحة بالاستعداد.",
    ],
    [
      [
        "The source explicitly recommends multiple resources.",
        "يوصي المصدر صراحة بمصادر متعددة.",
      ],
      [
        "Correct: align the goal with current learner needs.",
        "صحيح؛ وائم الغاية مع الحاجات الحالية.",
      ],
      [
        "A gap calls for support or sequencing, not automatic deletion.",
        "تستدعي الفجوة دعمًا أو ترتيبًا لا حذفًا تلقائيًا.",
      ],
      [
        "Evidence is meant to inform current and next planning.",
        "توجه الأدلة التخطيط الحالي والتالي.",
      ],
    ],
  ),
  Q(
    "m28",
    "planning-foundations",
    "CONCEPT CHECK",
    [
      "Which list matches the five planning benefits in Topic Three?",
      "أي قائمة تطابق فوائد التخطيط الخمس في الموضوع الثالث؟",
    ],
    [
      [
        "Coverage, uniform tasks, fixed pacing, no revision, fewer resources",
        "تغطية ومهام موحدة وإيقاع ثابت وعدم مراجعة وموارد أقل",
      ],
      [
        "Technology, entertainment, copying, grading, attendance",
        "تقنية وتسلية ونسخ ودرجات وحضور",
      ],
      [
        "Coverage, anticipation, differentiation, coherence, professional accountability",
        "تغطية وتوقع وتمايز وترابط ومساءلة مهنية",
      ],
      [
        "Facts, concepts, principles, skills, algorithms",
        "حقائق ومفاهيم ومبادئ ومهارات وخوارزميات",
      ],
    ],
    2,
    [
      "The source names curriculum coverage, anticipation, differentiation, coherence, and professional accountability. A responsive plan is purposeful, not permanently fixed or limited to one resource.",
      "يسمي المصدر التغطية والتوقع والتمايز والترابط والمساءلة المهنية. الخطة المستجيبة مقصودة لا جامدة أو محدودة بمصدر واحد.",
    ],
    [
      [
        "Uniformity and rigidity contradict differentiation and responsiveness.",
        "تناقض الموحدة والجمود التمايز والاستجابة.",
      ],
      [
        "These are not the guide’s organizing benefits.",
        "ليست هذه الفوائد المنظمة في الدليل.",
      ],
      [
        "Correct: all five benefits are represented.",
        "صحيح؛ حضرت الفوائد الخمس.",
      ],
      [
        "This mostly describes disciplinary structure, not planning benefits.",
        "تصف هذه غالبًا بنية التخصص لا فوائد التخطيط.",
      ],
    ],
  ),
  Q(
    "m29",
    "intasc",
    "APPLICATION",
    [
      "A teacher revises assessment and lesson sequencing from learner evidence. Which InTASC category is the main focus?",
      "يراجع معلّم التقويم وتسلسل الدرس بناء على أدلة المتعلمين. ما فئة InTASC الأبرز؟",
    ],
    [
      ["Content (4–5)", "المحتوى 4–5"],
      ["Professional Responsibility (9–10)", "المسؤولية المهنية 9–10"],
      [
        "The Learner and Learning (1–3) solely because students are mentioned",
        "المتعلم والتعلم 1–3 لمجرد ذكر الطلاب",
      ],
      ["Instructional Practice (6–8)", "الممارسة التدريسية 6–8"],
    ],
    3,
    [
      "Assessment, planning, and instructional strategies are grouped under Instructional Practice. All categories can benefit learners; classify by the professional decision’s focus.",
      "يجمع إطار الممارسة التدريسية التقويم والتخطيط والاستراتيجيات. قد تفيد كل الفئات المتعلم؛ صنّف حسب بؤرة القرار.",
    ],
    [
      [
        "Deep content and its application are not the primary decision described.",
        "ليست المعرفة العميقة بالمحتوى محور القرار هنا.",
      ],
      [
        "Collaboration, ethics, or professional learning are not the principal action.",
        "ليس التعاون أو الأخلاق أو التعلم المهني الفعل الرئيس.",
      ],
      [
        "A surface mention of learners does not determine the category.",
        "لا يحدد ذكر المتعلمين وحده الفئة.",
      ],
      [
        "Correct: evidence informs assessment and planning.",
        "صحيح؛ توجه الأدلة التقويم والتخطيط.",
      ],
    ],
  ),
  Q(
    "m30",
    "intasc",
    "CONCEPT CHECK",
    [
      "Which InTASC category–range pairing is correct?",
      "أي مطابقة بين فئة InTASC ونطاقها صحيحة؟",
    ],
    [
      ["Professional Responsibility: 9–10", "المسؤولية المهنية 9–10"],
      ["Content: 1–3", "المحتوى 1–3"],
      ["Instructional Practice: 4–5", "الممارسة التدريسية 4–5"],
      ["The Learner and Learning: 6–8", "المتعلم والتعلم 6–8"],
    ],
    0,
    [
      "The complete mapping is Learner/Learning 1–3, Content 4–5, Instructional Practice 6–8, and Professional Responsibility 9–10. Associate both meaning and range.",
      "الخريطة الكاملة: المتعلم والتعلم 1–3، المحتوى 4–5، الممارسة التدريسية 6–8، المسؤولية المهنية 9–10. اربط المعنى والنطاق.",
    ],
    [
      [
        "Correct: this includes professional learning/ethics and leadership/collaboration.",
        "صحيح؛ تشمل التعلم المهني والأخلاق والقيادة والتعاون.",
      ],
      ["Standards 1–3 are Learner and Learning.", "1–3 للمتعلم والتعلم."],
      ["Standards 4–5 belong to Content.", "4–5 للمحتوى."],
      [
        "Standards 6–8 belong to Instructional Practice.",
        "6–8 للممارسة التدريسية.",
      ],
    ],
  ),
  Q(
    "m31",
    "subject-standards",
    "APPLICATION",
    [
      "An art teacher requires thumbnail sketches before painting so students develop original ideas. Which framework emphasis fits most directly?",
      "يشترط معلّم فن رسومًا مصغرة قبل الرسم لتطوير الأفكار الأصلية. ما التركيز الأنسب؟",
    ],
    [
      ["NCTM reasoning and proof", "الاستدلال والبرهان في NCTM"],
      [
        "National Core Arts Standards: Creating",
        "معايير الفنون الأساسية: الإبداع",
      ],
      ["ISTE hardware operation only", "تشغيل العتاد في ISTE فقط"],
      ["NGSS controlled investigation", "التحقيق المضبوط في NGSS"],
    ],
    1,
    [
      "Topic Three uses thumbnail sketches as an example of generating and conceptualizing artistic ideas under Creating. The task enacts the process rather than merely naming a standard.",
      "يستخدم الموضوع الثالث الرسوم المصغرة مثالًا لتوليد الأفكار وتصورها ضمن الإبداع. تجسد المهمة العملية بدل تسمية المعيار فقط.",
    ],
    [
      [
        "This is a mathematics process, not the task’s disciplinary emphasis.",
        "هذه عملية رياضية لا محور المهمة الفني.",
      ],
      [
        "Correct: original idea development is the specified art process.",
        "صحيح؛ تطوير الفكرة الأصلية هو العملية الفنية.",
      ],
      [
        "The scenario is about artistic ideation, not technology operation.",
        "الموقف عن توليد أفكار فنية لا تشغيل تقنية.",
      ],
      [
        "No testable science investigation is described.",
        "لم يوصف تحقيق علمي قابل للاختبار.",
      ],
    ],
  ),
  Q(
    "m32",
    "subject-standards",
    "CONCEPT CHECK",
    [
      "Which set gives NCTM’s five process standards?",
      "أي مجموعة تعطي عمليات NCTM الخمس؟",
    ],
    [
      [
        "Creating, presenting, responding, connecting, grading",
        "الإبداع والعرض والاستجابة والربط والدرجات",
      ],
      [
        "Analysis, design, development, implementation, evaluation",
        "التحليل والتصميم والتطوير والتنفيذ والتقويم",
      ],
      [
        "Development, differences, environment, ethics, leadership",
        "النمو والفروق والبيئة والأخلاق والقيادة",
      ],
      [
        "Problem solving; reasoning and proof; communication; connections; representation",
        "حل المشكلات؛ الاستدلال والبرهان؛ التواصل؛ الترابطات؛ التمثيل",
      ],
    ],
    3,
    [
      "The source distinguishes these mathematics processes from content standards. Other options borrow from arts, ADDIE, or InTASC rather than the NCTM process list.",
      "يميز المصدر عمليات الرياضيات هذه من معايير المحتوى. تستعير البدائل من الفن أو ADDIE أو InTASC لا قائمة عمليات NCTM.",
    ],
    [
      [
        "This mixes arts processes with an unrelated addition.",
        "تمزج هذه عمليات فنية بإضافة غير مرتبطة.",
      ],
      ["This is ADDIE, not NCTM.", "هذه ADDIE لا NCTM."],
      [
        "These resemble professional-standard themes, not the mathematics processes.",
        "تشبه هذه موضوعات المعايير المهنية لا العمليات الرياضية.",
      ],
      [
        "Correct: all five NCTM process standards appear.",
        "صحيح؛ تظهر العمليات الخمس.",
      ],
    ],
  ),
  Q(
    "m33",
    "planning-levels",
    "APPLICATION",
    [
      "A teacher organizes several weeks of related lessons around one theme. How is this plan classified in the supplied guide?",
      "ينظم معلّم عدة أسابيع من دروس مترابطة حول موضوع واحد. كيف تُصنّف الخطة؟",
    ],
    [
      ["Daily, short-range", "يومية قريبة المدى"],
      ["Weekly, long-range", "أسبوعية بعيدة المدى"],
      ["Unit, long-range", "وحدة بعيدة المدى"],
      ["Yearly, short-range", "سنوية قريبة المدى"],
    ],
    2,
    [
      "A coherent several-week block is a Unit Plan. Topic Three groups yearly, term, and unit planning as long-range; weekly and daily planning are short-range.",
      "الكتلة المترابطة لأسابيع خطة وحدة. يجمع الموضوع الثالث السنوية والفصلية والوحدة ضمن البعيد، والأسبوعية واليومية ضمن القريب.",
    ],
    [
      ["A daily plan details one class session.", "تفصّل اليومية حصة واحدة."],
      [
        "A weekly plan covers one week and is short-range in the guide.",
        "تغطي الأسبوعية أسبوعًا وتعد قريبة في الدليل.",
      ],
      [
        "Correct: identify both level and the course’s time-horizon classification.",
        "صحيح؛ حدّد المستوى وتصنيف أمده في المصدر.",
      ],
      [
        "A yearly plan maps the whole academic year/course.",
        "تغطي السنوية العام أو المقرر كاملًا.",
      ],
    ],
  ),
  Q(
    "m34",
    "planning-levels",
    "APPLICATION",
    [
      "After Monday’s evidence, a teacher moves practice to Thursday without changing the unit goal. What does this illustrate?",
      "بعد أدلة الاثنين ينقل معلّم تدريبًا إلى الخميس دون تغيير غاية الوحدة. ماذا يوضح ذلك؟",
    ],
    [
      [
        "Responsive short-range planning within a broader plan",
        "تخطيطًا قريبًا مستجيبًا ضمن خطة أوسع",
      ],
      ["Abandoning all curriculum coherence", "التخلي عن كل ترابط منهجي"],
      ["Replacing the yearly plan with a textbook", "استبدال السنوية بكتاب"],
      ["A unit plan always lasts one day", "أن الوحدة تدوم يومًا دائمًا"],
    ],
    0,
    [
      "Weekly/daily plans are revised continuously from prior learning and assessment. Keeping the unit goal preserves the hierarchy while changing the immediate route.",
      "تراجع الأسبوعية واليومية باستمرار وفق التعلم والتقويم. يحفظ إبقاء غاية الوحدة التسلسل مع تعديل المسار المباشر.",
    ],
    [
      [
        "Correct: adaptation and coherence are compatible.",
        "صحيح؛ يتوافق التكييف والترابط.",
      ],
      [
        "The retained unit goal is evidence against this interpretation.",
        "يناقض إبقاء الغاية هذا التفسير.",
      ],
      ["No annual replacement is described.", "لم يوصف استبدال سنوي."],
      [
        "The guide places unit plans over several weeks.",
        "يجعل الدليل الوحدة لعدة أسابيع.",
      ],
    ],
  ),
  Q(
    "m35",
    "daily-plan-domains",
    "APPLICATION",
    [
      "A lesson targets safe execution of a manual technique. Which plan gives the most suitable evidence?",
      "يستهدف درس تنفيذًا آمنًا لتقنية يدوية. أي خطة توفر الدليل الأنسب؟",
    ],
    [
      ["Only a definition quiz", "اختبار تعريفات فقط"],
      [
        "Demonstration, safe equipment access, supervised hands-on practice, and observation of execution",
        "عرض وإتاحة آمنة وممارسة عملية مراقبة وملاحظة التنفيذ",
      ],
      ["Only reflection on liking the subject", "تأمل الإعجاب بالمادة فقط"],
      [
        "Only a lecture on the history of the technique",
        "محاضرة تاريخ التقنية فقط",
      ],
    ],
    1,
    [
      "The psychomotor domain concerns physical/manual performance. Definitions and reflection may complement the lesson but do not demonstrate execution; plan materials, safety, and practice time.",
      "يتعلق النفسحركي بالأداء البدني واليدوي. قد تكمل التعريفات والتأمل الدرس دون إثبات التنفيذ؛ خطّط المواد والسلامة وزمن الممارسة.",
    ],
    [
      [
        "This checks cognitive description, not the manual performance.",
        "يفحص هذا وصفًا معرفيًا لا الأداء اليدوي.",
      ],
      [
        "Correct: practice and evidence fit the target domain.",
        "صحيح؛ تطابق الممارسة والدليل المجال المستهدف.",
      ],
      [
        "Liking/reflection concerns an affective emphasis, not execution.",
        "يرتبط الإعجاب والتأمل بتركيز وجداني لا التنفيذ.",
      ],
      [
        "Historical knowledge does not establish a physical skill.",
        "لا تثبت معرفة التاريخ مهارة بدنية.",
      ],
    ],
  ),
  Q(
    "m36",
    "daily-plan-domains",
    "APPLICATION",
    [
      "Which distinction between set induction, assessment, and closure matches the guide?",
      "أي تمييز بين التهيئة والتقويم والغلق يطابق الدليل؟",
    ],
    [
      [
        "All three are interchangeable labels for the same activity.",
        "الثلاثة أسماء متبادلة للنشاط نفسه.",
      ],
      [
        "Closure introduces unrelated content and assessment replaces practice.",
        "يقدم الغلق محتوى غير مرتبط ويستبدل التقويم الممارسة.",
      ],
      [
        "Set induction is only distributing equipment, with no learning connection.",
        "التهيئة توزيع أدوات فقط بلا ارتباط بالتعلم.",
      ],
      [
        "Set induction activates attention/prior knowledge; assessment gathers outcome evidence; closure consolidates and previews.",
        "تنشط التهيئة الانتباه والمعرفة السابقة، ويجمع التقويم دليل النواتج، ويرسخ الغلق ويمهّد.",
      ],
    ],
    3,
    [
      "The plan components have distinct purposes even when a task serves more than one. Name the purpose being served, rather than assuming all end-of-lesson activity is identical.",
      "للمكونات أغراض متمايزة ولو خدمت مهمة أكثر من غرض. حدّد الغرض بدل افتراض تطابق كل نشاط في النهاية.",
    ],
    [
      [
        "A task can overlap purposes without erasing their distinctions.",
        "قد تتداخل الأغراض دون إلغاء فروقها.",
      ],
      [
        "Closure connects key learning; practice remains a separate component.",
        "يربط الغلق التعلم الرئيس وتبقى الممارسة مكونًا مستقلًا.",
      ],
      [
        "The source stresses attention and connection to prior knowledge.",
        "يؤكد المصدر الانتباه والارتباط بالمعرفة السابقة.",
      ],
      [
        "Correct: each purpose is accurately distinguished.",
        "صحيح؛ تميّزت الأغراض بدقة.",
      ],
    ],
  ),
];

export const midtermQuestions = [
  ...authoredQuestions.map(applyQuestionReview),
  ...additionalQuestions,
];
