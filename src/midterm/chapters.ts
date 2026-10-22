import type { Topic } from "../content";
export const midtermTopics: Topic[] = [
  {
    id: "foundations",
    number: "01",
    title: "Introduction to teaching",
    ar: "مدخل إلى التدريس",
    category: "TEACHING & PROFESSIONAL KNOWLEDGE",
    minutes: 35,
    color: "sage",
    description:
      "Teaching roles, professional expertise, disciplinary knowledge, PCK, TPACK, ADDIE, and ASSURE.",
    arabicDescription:
      "أدوار التدريس والخبرة المهنية وبنية التخصص والمعرفة البيداغوجية والتصميم التعليمي.",
    keywords: [
      {
        en: "Pedagogical Content Knowledge (PCK)",
        ar: "المعرفة البيداغوجية بالمحتوى",
      },
      { en: "TPACK", ar: "المعرفة التكنولوجية البيداغوجية بالمحتوى" },
      { en: "Instructional design", ar: "التصميم التعليمي" },
    ],
    objectives: [
      "Explain teaching functions and professional development.",
      "Distinguish facts, concepts, principles, and skills.",
      "Apply PCK and all seven TPACK knowledge domains.",
      "Distinguish ADDIE phases and ASSURE steps.",
    ],
    arObjectives: [
      "تفسير وظائف التدريس والتطور المهني.",
      "تمييز الحقائق والمفاهيم والمبادئ والمهارات.",
      "تطبيق PCK ومجالات TPACK السبعة.",
      "تمييز مراحل ADDIE وخطوات ASSURE.",
    ],
    explanation:
      "Teaching intentionally organizes conditions for learning. Professional judgment combines knowledge, skills, and dispositions with the structure of a particular discipline. PCK explains subject-specific representation and learner misconceptions; TPACK integrates technology, pedagogy, and content. ADDIE and ASSURE supply processes for translating that judgment into learning experiences. Read the seven detailed subtopics for the full explanations and source pages.",
    arExplanation:
      "ينظم التدريس ظروف التعلّم بصورة مقصودة. يجمع الحكم المهني المعرفة والمهارات والاستعدادات المهنية مع بنية التخصص. تفسّر PCK التمثيلات الخاصة بالمحتوى والتصورات الخاطئة، وتدمج TPACK التقنية والبيداغوجيا والمحتوى. ويقدّم ADDIE وASSURE عمليات تحويل هذا الحكم إلى خبرات تعلم. تتضمن البطاقات السبع التفصيل والمراجع.",
    example:
      "A mathematics teacher anticipates the belief that multiplication always increases a number, selects a fraction model, and asks learners to explain a counterexample. The choice reflects PCK; deliberately integrating a suitable interactive model with the learning strategy adds a TPACK perspective.",
    arExample:
      "يتوقع معلّم الرياضيات الاعتقاد بأن الضرب يزيد العدد دائمًا، ويختار نموذج كسور ويطلب تفسير مثال مضاد. يعكس الاختيار PCK، ويضيف الدمج المقصود لنموذج تفاعلي واستراتيجية التعلم منظور TPACK.",
    takeaway:
      "Knowledge frameworks describe professional judgment; design models organize the work.",
    arTakeaway: "تصف أطر المعرفة الحكم المهني، وتنظم نماذج التصميم العمل.",
    source:
      "Uploaded Chapter One, PDF pp. 4–20. All detailed cards link directly to relevant PDF pages. Dick & Carey is named as an objective but not explained in the supplied body.",
    dialect: {
      egyptian:
        "مش كفاية تعرف المادة؛ المهم تعرف تشرح الفكرة دي للطلاب دول، وتختار وسيلة تخدم فهمهم.",
      jordanian:
        "مش كفاية تعرف المادة؛ المهم تعرف تشرح هاي الفكرة لهاي المجموعة، وتختار وسيلة تخدم فهمهم.",
      emirati:
        "مب كفاية تعرف المادة؛ المهم تعرف تشرح هالفكرة لهالطلبة، وتختار وسيلة تساعدهم يفهمون.",
      syrian:
        "مو كفاية تعرف المادة؛ المهم تعرف تشرح هالفكرة لهالطلاب، وتختار وسيلة تساعدهم يفهموا.",
    },
  },
  {
    id: "objectives",
    number: "02",
    title: "Writing ABCD objectives",
    ar: "صياغة الأهداف بنموذج ABCD",
    category: "OBJECTIVES & ALIGNMENT",
    minutes: 30,
    color: "peach",
    description:
      "Turn standards into measurable, achievable learning outcomes, then align the evidence and practice.",
    arabicDescription:
      "حوّل المعايير إلى نواتج تعلم قابلة للقياس والتحقق، ووائم الأدلة والممارسة.",
    keywords: [
      { en: "Audience", ar: "المتعلّمون المستهدفون" },
      { en: "Behavior", ar: "السلوك" },
      { en: "Condition", ar: "شروط الأداء" },
      { en: "Degree", ar: "درجة الإتقان" },
      { en: "Backward design", ar: "التصميم العكسي" },
    ],
    objectives: [
      "Distinguish professional and curriculum standards.",
      "Sequence backward design correctly.",
      "Write and diagnose Audience, Behavior, Condition, and Degree.",
      "Match Bloom’s thinking level, lesson feasibility, and assessment.",
    ],
    arObjectives: [
      "تمييز المعايير المهنية ومعايير المنهج.",
      "ترتيب مراحل التصميم العكسي.",
      "صياغة وتشخيص المتعلّم والسلوك والشروط ودرجة الإتقان.",
      "مواءمة مستوى التفكير وواقعية الهدف والتقويم.",
    ],
    explanation:
      "Professional standards concern the quality of teaching; curriculum standards identify what learners must learn. Backward design starts with desired results, then determines acceptable evidence, then plans instruction. ABCD makes the daily objective explicit: who performs, what observable performance is expected, under what conditions, and to what criterion. A precise objective still needs a realistic scope for these learners and the available lesson time.",
    arExplanation:
      "تتعلق المعايير المهنية بجودة التدريس، وتحدّد معايير المنهج ما ينبغي تعلمه. يبدأ التصميم العكسي بالنتائج ثم الأدلة المقبولة ثم خبرات التعلّم. يحدد ABCD من يؤدي، والأداء الملحوظ، وشروطه، ومعيار النجاح. ويحتاج الهدف الدقيق إلى نطاق واقعي للمتعلمين وزمن الدرس.",
    example:
      "Given five pairs of price labels and a calculator (C), Grade 7 students (A) calculate unit prices and identify the better buy (B), correctly for at least four pairs (D). The exit ticket uses five new pairs under matching conditions.",
    arExample:
      "عند تقديم خمسة أزواج من بطاقات الأسعار وآلة حاسبة (C)، يحسب طلاب الصف السابع (A) سعر الوحدة ويحددون الصفقة الأفضل (B)، بصورة صحيحة في أربعة أزواج على الأقل (D). يستخدم التقويم أزواجًا جديدة بالشروط نفسها.",
    takeaway:
      "Results → evidence → learning plan. ABCD makes the result checkable.",
    arTakeaway:
      "النتائج ← الأدلة ← خطة التعلّم؛ ويجعل ABCD الناتج قابلًا للتحقق.",
    source:
      "Uploaded Topic Two, PDF pp. 2–14. Page numbers refer to the PDF file; objective and question citations open the exact source page.",
    dialect: {
      egyptian:
        "اسأل: مين الطالب؟ هيعمل إيه؟ بإيه وتحت أي شروط؟ وإمتى أقول إنه حقق الهدف؟",
      jordanian:
        "اسأل: مين المتعلّم؟ شو رح يعمل؟ بأي شروط؟ وكيف بعرف إنه حقق الهدف؟",
      emirati:
        "اسأل: منو المتعلّم؟ شو بيسوي؟ بأي شروط؟ وكيف أعرف إنه حقق الهدف؟",
      syrian:
        "اسأل: مين المتعلّم؟ شو رح يعمل؟ بأي شروط؟ وكيف بعرف إنه حقق الهدف؟",
    },
  },
  {
    id: "planning",
    number: "03",
    title: "Instructional planning",
    ar: "التخطيط للتدريس",
    category: "STANDARDS, LEVELS & LESSON DESIGN",
    minutes: 30,
    color: "lavender",
    description:
      "Connect professional standards and planning levels to a coherent daily lesson across four specializations.",
    arabicDescription:
      "اربط المعايير المهنية ومستويات التخطيط بدرس يومي مترابط في التخصصات الأربعة.",
    keywords: [
      { en: "InTASC", ar: "معايير InTASC المهنية" },
      { en: "Long-range planning", ar: "التخطيط بعيد المدى" },
      { en: "Daily lesson plan", ar: "خطة الدرس اليومية" },
      { en: "Learning domains", ar: "مجالات التعلّم" },
    ],
    objectives: [
      "Explain the purpose, benefits, and resources of planning.",
      "Classify the four InTASC categories and subject-specific frameworks.",
      "Distinguish five planning levels and their time horizons.",
      "Connect eight daily-plan components with the three learning domains.",
    ],
    arObjectives: [
      "تفسير غرض التخطيط وفوائده ومصادره.",
      "تصنيف فئات InTASC الأربع وأطر التخصصات.",
      "تمييز مستويات التخطيط الخمسة وأمدها الزمني.",
      "ربط مكونات الخطة الثمانية بمجالات التعلم الثلاثة.",
    ],
    explanation:
      "Planning translates broad goals into decisions about content, sequence, activities, materials, grouping, time, and assessment. The course guide nests daily planning within weekly, unit, term, and yearly/course plans. InTASC supplies professional categories, while subject frameworks guide disciplinary goals. Daily plans coordinate objectives, resources, an opening, procedures, practice, assessment, closure, and differentiation.",
    arExplanation:
      "يحوّل التخطيط الغايات العامة إلى قرارات في المحتوى والتسلسل والأنشطة والمواد والتجميع والزمن والتقويم. تندرج الخطة اليومية في الأسبوعية ثم الوحدة والفصل والخطة السنوية. تقدم InTASC فئات مهنية، وتوجّه أطر التخصص الأهداف. تنسّق الخطة اليومية الأهداف والموارد والتهيئة والإجراءات والممارسة والتقويم والغلق والتمايز.",
    example:
      "An art lesson targeting a physical blending technique needs a demonstration, safe materials for every learner, time to practice, and observation of execution. A written definition alone does not demonstrate the psychomotor outcome.",
    arExample:
      "يحتاج درس فني يستهدف مهارة مزج عملية إلى عرض ومواد آمنة لكل متعلم وزمن للممارسة وملاحظة التنفيذ. لا يثبت التعريف المكتوب وحده تحقق الناتج النفسحركي.",
    takeaway:
      "The long-range plan sets the map; daily planning turns it into a responsive route.",
    arTakeaway:
      "يضع التخطيط بعيد المدى الخريطة، وتحولها الخطة اليومية إلى مسار مستجيب.",
    source:
      "Uploaded Topic Three, PDF pp. 1–8; references are on p. 9. Detailed subtopic cards include exact page links and supporting excerpts.",
    dialect: {
      egyptian:
        "الخطة الكبيرة بتحدد الطريق العام، وخطة الدرس بتقول هتعمل إيه النهارده، وهتعرف إزاي إن الطلاب اتعلموا.",
      jordanian:
        "الخطة الكبيرة بتحدد الاتجاه، وخطة الدرس بتوضح شو تعمل اليوم وكيف تتأكد إن الطلاب تعلموا.",
      emirati:
        "الخطة الكبيرة تحدد الاتجاه، وخطة الدرس توضح شو بتسوي اليوم وكيف تتأكد إن الطلبة تعلموا.",
      syrian:
        "الخطة الكبيرة بتحدد الاتجاه، وخطة الدرس بتوضح شو تعمل اليوم وكيف تتأكد إن الطلاب تعلموا.",
    },
  },
];
