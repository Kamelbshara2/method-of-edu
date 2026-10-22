// Parallel alternatives and feedback revised against the three supplied guides.
import type { Question } from "../content";
type P = [string, string];
type Revision = { options: P[]; feedback: P[] };
const revisions: Record<string, Revision> = {
  m01: {
    options: [
      [
        "The explanation makes the lesson primarily transmission, regardless of later student reasoning.",
        "يجعل الشرح الدرس نقلًا أساسًا بصرف النظر عن استدلال الطلاب لاحقًا.",
      ],
      [
        "Questioning during implementation can supply evidence for subsequent planning.",
        "قد يقدّم السؤال أثناء التنفيذ دليلًا للتخطيط اللاحق.",
      ],
      [
        "The change counts as reflection, so no assessing function occurred during delivery.",
        "التعديل تأمل، لذا لم تحدث وظيفة تقويم أثناء التنفيذ.",
      ],
      [
        "The revised task starts a new cycle, making the earlier question a planning action.",
        "تبدأ المهمة المعدلة دورة جديدة، فيصبح السؤال السابق فعل تخطيط.",
      ],
    ],
    feedback: [
      [
        "The guide allows direct explanation within a facilitative lesson; examine what learners do as well.",
        "يسمح الدليل بالشرح المباشر داخل درس تيسيري؛ افحص ما يفعله الطلاب أيضًا.",
      ],
      [
        "Correct: the question reveals understanding during delivery and informs the next decision.",
        "صحيح؛ يكشف السؤال الفهم أثناء التنفيذ ويوجه القرار التالي.",
      ],
      [
        "Reflection and assessment can coexist; interpreting learner answers is an assessing function.",
        "قد يجتمع التأمل والتقويم؛ وتفسير إجابات الطلاب وظيفة تقويمية.",
      ],
      [
        "The later use of evidence does not relocate the original question outside implementation.",
        "لا ينقل الاستخدام اللاحق للدليل السؤال الأصلي إلى خارج التنفيذ.",
      ],
    ],
  },
  m03: {
    options: [
      [
        "The novice shows the evidence-responsive practice described as more experienced.",
        "يظهر المبتدئ الممارسة المستجيبة للأدلة الموصوفة بأنها أكثر خبرة.",
      ],
      [
        "The veteran shows stronger planning because completing the slides proves coverage and learning.",
        "يظهر الخبير تخطيطًا أقوى لأن إكمال الشرائح يثبت التغطية والتعلم.",
      ],
      [
        "Both demonstrate the same assessment expertise because both deliver the assigned material.",
        "يظهر الاثنان خبرة تقويم واحدة لأنهما يقدمان المادة المحددة.",
      ],
      [
        "The comparison should be decided by career stage before considering classroom evidence.",
        "يُحسم التصنيف بالمرحلة المهنية قبل النظر إلى الدليل الصفي.",
      ],
    ],
    feedback: [
      [
        "Correct: the guide describes practices and a developmental tendency, not an automatic rule about seniority.",
        "صحيح؛ يصف الدليل ممارسات واتجاهًا تطوريًا لا قاعدة آلية عن الأقدمية.",
      ],
      [
        "Slide coverage may show delivery, but it does not establish learner understanding or responsive assessment.",
        "قد تثبت تغطية الشرائح العرض، لا فهم المتعلم أو استجابة التقويم.",
      ],
      [
        "Delivery and evidence-informed adaptation are not equivalent assessment practices.",
        "ليس العرض والتكييف المستند إلى الأدلة ممارسة تقويمية متكافئة.",
      ],
      [
        "The source explicitly states that professional development is not automatic with experience.",
        "يصرّح المصدر بأن التطور المهني ليس آليًا مع الخبرة.",
      ],
    ],
  },
  m06: {
    options: [
      [
        "Connect facts to concepts, relationships, and inquiry processes in a sequence.",
        "اربط الحقائق بالمفاهيم والعلاقات وعمليات البحث في تسلسل.",
      ],
      [
        "Group facts by textbook page, then assess the number of statements recalled.",
        "جمّع الحقائق حسب صفحات الكتاب وقوّم عدد العبارات المتذكّرة.",
      ],
      [
        "Teach inquiry procedures separately so that factual knowledge cannot affect them.",
        "درّس إجراءات البحث منفصلة كي لا تؤثر فيها المعرفة الواقعية.",
      ],
      [
        "Begin with all principles and postpone concepts until the unit review.",
        "ابدأ بجميع المبادئ وأجّل المفاهيم إلى مراجعة الوحدة.",
      ],
    ],
    feedback: [
      [
        "Correct: disciplinary structure connects its four elements rather than simply increasing information.",
        "صحيح؛ تربط بنية التخصص عناصرها الأربعة بدل زيادة المعلومات فقط.",
      ],
      [
        "A page grouping can organize delivery without explaining disciplinary relationships or processes.",
        "قد ينظم تجميع الصفحات العرض دون تفسير علاقات التخصص وعملياته.",
      ],
      [
        "The guide describes facts, concepts, principles, and skills as interrelated, not independent.",
        "يصف الدليل العناصر بالترابط لا الاستقلال.",
      ],
      [
        "A fixed principle-first sequence ignores the prerequisite concepts needed to understand relationships.",
        "يتجاهل البدء الدائم بالمبادئ المفاهيم اللازمة لفهم العلاقات.",
      ],
    ],
  },
  m07: {
    options: [
      [
        "CK: knowing the arithmetic result without considering how learners interpret it.",
        "CK: معرفة الناتج الحسابي دون النظر إلى تفسير المتعلمين له.",
      ],
      [
        "PK: choosing a general questioning routine applicable to many subjects.",
        "PK: اختيار روتين أسئلة عام يصلح لتخصصات متعددة.",
      ],
      [
        "PCK: selecting a representation for a content-specific misconception.",
        "PCK: اختيار تمثيل لتصور خاطئ خاص بالمحتوى.",
      ],
      [
        "Curricular knowledge: identifying which textbook chapter follows multiplication.",
        "معرفة المنهج: تحديد فصل الكتاب التالي لموضوع الضرب.",
      ],
    ],
    feedback: [
      [
        "Correct calculation is CK, but it does not capture why this example was chosen for these learners.",
        "الحساب الصحيح CK لكنه لا يفسر اختيار المثال لهؤلاء المتعلمين.",
      ],
      [
        "A general routine is PK; the distinctive evidence here is the specific mathematical misconception.",
        "الروتين العام PK؛ أما الدليل المميز هنا فهو التصور الرياضي المحدد.",
      ],
      [
        "Correct: the representation directly addresses a predictable content difficulty.",
        "صحيح؛ يعالج التمثيل صعوبة محتوى متوقعة مباشرة.",
      ],
      [
        "Sequence knowledge is curricular; the scenario instead focuses on representation and misconception.",
        "معرفة التسلسل منهجية، بينما يركز الموقف على التمثيل والتصور الخاطئ.",
      ],
    ],
  },
  m09: {
    options: [
      [
        "Operational TK; integrated TPACK has not yet been demonstrated.",
        "TK تشغيلية؛ ولم تثبت TPACK المتكاملة بعد.",
      ],
      [
        "Integrated TPACK, since the tool can represent the subject visually.",
        "TPACK متكاملة لأن الأداة تعرض الموضوع بصريًا.",
      ],
      [
        "Established TCK, since operating a tool proves its content-specific suitability.",
        "TCK مثبتة لأن تشغيل الأداة يثبت ملاءمتها للمحتوى.",
      ],
      [
        "Established TPK, since a classroom setting proves pedagogical selection.",
        "TPK مثبتة لأن وجود الصف يثبت الاختيار البيداغوجي.",
      ],
    ],
    feedback: [
      [
        "Correct: acknowledge the knowledge shown without inferring an unobserved instructional fit.",
        "صحيح؛ اعترف بالمعرفة الظاهرة دون استنتاج ملاءمة تدريسية غير مثبتة.",
      ],
      [
        "A tool’s potential representation is not evidence that the teacher coordinates content, pedagogy, and learner needs.",
        "إمكانات الأداة لا تثبت تنسيق المعلّم المحتوى والبيداغوجيا وحاجات الطلاب.",
      ],
      [
        "The scenario does not explain the relation between the tool and this specific content.",
        "لا يفسر الموقف علاقة الأداة بهذا المحتوى المحدد.",
      ],
      [
        "Use in a classroom alone does not demonstrate understanding of technology-supported pedagogy.",
        "لا يثبت الوجود في الصف وحده فهم البيداغوجيا المدعومة بالتقنية.",
      ],
    ],
  },
  m10: {
    options: [
      [
        "TCK relates technology to the teaching sequence; TPK relates it to disciplinary representations.",
        "تربط TCK التقنية بتسلسل التدريس وتربطها TPK بتمثيلات التخصص.",
      ],
      [
        "TCK concerns operating software; TPK concerns knowing the subject taught with that software.",
        "تتعلق TCK بتشغيل البرنامج وTPK بمعرفة المادة المقدمة به.",
      ],
      [
        "TCK: content–technology relations; TPK: pedagogy–technology relations.",
        "TCK علاقة المحتوى والتقنية؛ وTPK علاقة البيداغوجيا والتقنية.",
      ],
      [
        "TCK concerns curricular resources; TPK combines content, pedagogy, technology, and context.",
        "تتعلق TCK بموارد المنهج وتجمع TPK المحتوى والبيداغوجيا والتقنية والسياق.",
      ],
    ],
    feedback: [
      [
        "This swaps the content-specific and pedagogical intersections.",
        "تعكس هذه تقاطع المحتوى والتقاطع البيداغوجي.",
      ],
      [
        "Operation is TK and subject knowledge is CK; neither definition captures the two-way intersections.",
        "التشغيل TK ومعرفة المادة CK؛ ولا يصفان التقاطعين الثنائيين.",
      ],
      [
        "Correct: the second domain in each intersection determines the distinction.",
        "صحيح؛ يحدد المجال الثاني في كل تقاطع الفرق.",
      ],
      [
        "Curricular knowledge is a separate base; the three-way integration is TPACK, not TPK.",
        "معرفة المنهج أساس آخر؛ وتكامل الثلاثة TPACK لا TPK.",
      ],
    ],
  },
  m12: {
    options: [
      [
        "Evaluation is the post-delivery phase, so the pilot feedback cannot guide evaluation yet.",
        "التقويم مرحلة بعد التقديم، لذا لا توجهه أدلة التجربة بعد.",
      ],
      [
        "The resource has reached implementation because any trial is full classroom delivery.",
        "وصل المورد إلى التنفيذ لأن أي تجربة تقديم صفي كامل.",
      ],
      [
        "The pilot tests technical operation, while learning evidence belongs only to final grading.",
        "تفحص التجربة التشغيل التقني، وتخص أدلة التعلم الدرجات النهائية فقط.",
      ],
      [
        "Development may include piloting and formative evaluation before delivery.",
        "قد يشمل التطوير تجربة مصغرة وتقويمًا تكوينيًا قبل التقديم.",
      ],
    ],
    feedback: [
      [
        "The guide expressly includes formative evaluation during development.",
        "يتضمن الدليل التقويم التكويني أثناء التطوير صراحة.",
      ],
      [
        "The table distinguishes small-scale piloting in Development from delivery to real learners in Implementation.",
        "يميز الجدول التجربة المصغرة في التطوير من تقديم التدريس في التنفيذ.",
      ],
      [
        "Pilot evidence can inform the quality of learning materials, not only technical operation.",
        "قد توجّه أدلة التجربة جودة مواد التعلم لا التشغيل فقط.",
      ],
      [
        "Correct: evaluation is not restricted to a single final event.",
        "صحيح؛ لا يقتصر التقويم على حدث أخير واحد.",
      ],
    ],
  },
  m13: {
    options: [
      [
        "Select, then Utilize: choose the medium, then preview and prepare it.",
        "الاختيار ثم الاستخدام: اختر الوسيط ثم افحصه وهيئه.",
      ],
      [
        "State, then Select: a file choice is an objective and display testing is selection.",
        "الأهداف ثم الاختيار: اختيار الملف هدف واختبار عرضه اختيار.",
      ],
      [
        "Utilize, then Require: choosing counts as use and setup counts as participation.",
        "الاستخدام ثم المشاركة: يعد الاختيار استخدامًا والإعداد مشاركة.",
      ],
      [
        "Analyze, then Evaluate: choosing diagnoses learners and setup measures outcomes.",
        "التحليل ثم التقويم: يشخّص الاختيار الطلاب ويقيس الإعداد النواتج.",
      ],
    ],
    feedback: [
      [
        "Correct: previewing and environment preparation belong to Utilize as the source specifies.",
        "صحيح؛ يندرج فحص المواد وتهيئة البيئة في الاستخدام كما يحدد المصدر.",
      ],
      [
        "An objective states learner performance; choosing a file does not state that performance.",
        "يحدد الهدف أداء المتعلم؛ ولا يحدده اختيار ملف.",
      ],
      [
        "Preparing a display does not require learners to participate.",
        "لا تشترط تهيئة العرض مشاركة المتعلم.",
      ],
      [
        "The actions do not establish learner diagnosis or evaluation of learning outcomes.",
        "لا تثبت الإجراءات تشخيص المتعلمين أو تقويم النواتج.",
      ],
    ],
  },
  m14: {
    options: [
      [
        "Preview the video and check that the projector displays it correctly.",
        "افحص الفيديو وتأكد من عرضه الصحيح على جهاز العرض.",
      ],
      [
        "State the video’s objective and list the media resources in the plan.",
        "حدّد هدف الفيديو وأدرج موارده في الخطة.",
      ],
      [
        "Pause for predictions, peer justification, and explanation checks.",
        "توقف للتنبؤ والتبرير بين الزملاء وفحص التفسير.",
      ],
      [
        "Replace the video with another medium covering the same concept.",
        "استبدل الفيديو بوسيط آخر يقدم المفهوم نفسه.",
      ],
    ],
    feedback: [
      [
        "This improves Utilize, but does not itself require a learner response.",
        "يحسن هذا الاستخدام لكنه لا يشترط استجابة المتعلم بذاته.",
      ],
      [
        "Objectives and resource selection are necessary but do not enact participation.",
        "تلزم الأهداف واختيار الموارد لكنهما لا يجسدان المشاركة.",
      ],
      [
        "Correct: these tasks require students to make their thinking visible.",
        "صحيح؛ تتطلب المهام إظهار تفكير الطلاب.",
      ],
      [
        "Changing the medium is selection; active participation still needs a designed task.",
        "تغيير الوسيط اختيار؛ وتحتاج المشاركة إلى مهمة مصممة.",
      ],
    ],
  },
  m15: {
    options: [
      [
        "Professional standards identify textbook content; curriculum standards judge teacher conduct.",
        "تحدد المعايير المهنية محتوى الكتاب وتحكم معايير المنهج على سلوك المعلّم.",
      ],
      [
        "Professional standards address teaching quality; curriculum standards address learner outcomes.",
        "تعالج المهنية جودة التدريس ومعايير المنهج نواتج المتعلم.",
      ],
      [
        "Professional standards set learner pass marks; curriculum standards set classroom routines.",
        "تضع المهنية درجات نجاح الطلاب وتضع معايير المنهج روتين الصف.",
      ],
      [
        "Professional standards select daily activities; curriculum standards replace learning objectives.",
        "تختار المهنية الأنشطة اليومية وتستبدل معايير المنهج أهداف التعلم.",
      ],
    ],
    feedback: [
      [
        "This reverses the central quality-of-teaching versus content/outcomes distinction.",
        "تعكس هذه التمييز بين جودة التدريس والمحتوى والنواتج.",
      ],
      [
        "Correct: how well the teacher plans/teaches versus what learners should know and do.",
        "صحيح؛ جودة التخطيط والتدريس مقابل ما يعرفه الطالب ويؤديه.",
      ],
      [
        "Neither pass marks nor routines is the defining contrast in the guide.",
        "ليست الدرجات أو الروتين الفرق المحدد في الدليل.",
      ],
      [
        "Daily objectives operationalize curriculum expectations; they are not replaced by them.",
        "تترجم الأهداف اليومية توقعات المنهج ولا تلغيها المعايير.",
      ],
    ],
  },
  m16: {
    options: [
      [
        "Choose the classroom activity, then infer acceptable evidence from its products.",
        "اختر النشاط ثم استنتج الدليل المقبول من منتجاته.",
      ],
      [
        "Develop the resources first, then use their format to set the success criterion.",
        "أنتج الموارد أولًا ثم استعمل شكلها لتحديد معيار النجاح.",
      ],
      [
        "Write the teaching sequence, then check whether its topic resembles the outcome.",
        "اكتب تسلسل التدريس ثم افحص تشابه موضوعه مع الناتج.",
      ],
      [
        "Specify acceptable evidence matching the objective’s behavior and conditions.",
        "حدّد دليلًا مقبولًا يطابق سلوك الهدف وشروطه.",
      ],
    ],
    feedback: [
      [
        "This returns to activity-first planning instead of deciding the required evidence.",
        "تعود هذه إلى البدء بالنشاط بدل تحديد الدليل المطلوب.",
      ],
      [
        "Resource format should serve the intended evidence, not determine the criterion arbitrarily.",
        "يخدم شكل المورد الدليل المقصود ولا يحدد المعيار اعتباطًا.",
      ],
      [
        "Topic similarity is weaker than matching performance, conditions, and degree.",
        "تشابه العنوان أضعف من تطابق الأداء والشروط والدرجة.",
      ],
      [
        "Correct: acceptable evidence follows desired results and precedes the learning plan.",
        "صحيح؛ تلي الأدلة النتائج وتسبق خطة التعلم.",
      ],
    ],
  },
  m18: {
    options: [
      [
        "Checklist: Condition; minimum length and rubric threshold: Degree.",
        "القائمة: شرط؛ والحد الأدنى للطول ومستوى السلم: درجة الإتقان.",
      ],
      [
        "Checklist and minimum length: Condition; rubric threshold: Behavior.",
        "القائمة والحد الأدنى للطول: شرط؛ ومستوى السلم: سلوك.",
      ],
      [
        "Checklist: Degree; minimum length: Behavior; rubric threshold: Condition.",
        "القائمة: درجة؛ والطول الأدنى: سلوك؛ ومستوى السلم: شرط.",
      ],
      [
        "Checklist: Condition; minimum length: Audience; rubric threshold: Degree.",
        "القائمة: شرط؛ والطول الأدنى: جمهور؛ ومستوى السلم: درجة.",
      ],
    ],
    feedback: [
      [
        "Correct: the guide’s key treats the tool as support and both output criteria as Degree.",
        "صحيح؛ يعامل المفتاح الأداة دعمًا ومعياري المنتج ضمن درجة الإتقان.",
      ],
      [
        "A rubric threshold evaluates the output; it is not the observable action.",
        "يقوّم حد السلم المنتج وليس الفعل الملحوظ.",
      ],
      [
        "This confuses the support provided with the criterion used to judge the output.",
        "تخلط هذه بين الدعم المقدم ومعيار الحكم على المنتج.",
      ],
      [
        "A word count does not identify the learners; it specifies required output.",
        "لا يحدد عدد الكلمات المتعلمين بل المنتج المطلوب.",
      ],
    ],
  },
  m19: {
    options: [
      [
        "The verb is acceptable at the Understand level, so only the sentence order needs changing.",
        "الفعل مقبول لمستوى الفهم، لذا يحتاج ترتيب الجملة وحده إلى تعديل.",
      ],
      [
        "It names a mental state without specifying observable evidence.",
        "يسمي حالة ذهنية دون تحديد دليل ملحوظ.",
      ],
      [
        "The content is mathematical, so the goal must use an Apply-level verb instead.",
        "المحتوى رياضي لذا يلزم استخدام فعل من مستوى التطبيق.",
      ],
      [
        "The phrase becomes measurable whenever a high accuracy percentage is added to it.",
        "تصبح العبارة قابلة للقياس عند إضافة نسبة دقة مرتفعة إليها.",
      ],
    ],
    feedback: [
      [
        "A taxonomy label is not automatically a measurable Behavior verb.",
        "ليست تسمية المستوى تلقائيًا فعل سلوك قابلًا للقياس.",
      ],
      [
        "Correct: specify what students will say, write, or do to demonstrate understanding.",
        "صحيح؛ حدّد ما يقوله الطلاب أو يكتبونه أو يؤدونه لإظهار الفهم.",
      ],
      [
        "Mathematics can involve every level; the standard and task determine the required demand.",
        "قد تشمل الرياضيات كل المستويات؛ ويحدد المعيار والمهمة المتطلب.",
      ],
      [
        "A percentage without a defined observable performance remains ambiguous.",
        "تبقى النسبة غامضة دون أداء ملحوظ محدد.",
      ],
    ],
  },
  m20: {
    options: [
      [
        "List the strategies and reproduce one example given during teaching.",
        "اسرد الاستراتيجيات وأعد مثالًا قُدّم أثناء التدريس.",
      ],
      [
        "Match each strategy to a definition and identify its common classroom use.",
        "طابق الاستراتيجية بتعريفها وحدد استخدامها الشائع.",
      ],
      [
        "Describe the preferred strategy without comparing it with the case constraints.",
        "صِف الاستراتيجية المفضلة دون مقارنتها بقيود الحالة.",
      ],
      [
        "Recommend a strategy and justify its fit to the case.",
        "أوصِ باستراتيجية وبرّر ملاءمتها للحالة.",
      ],
    ],
    feedback: [
      [
        "Recall and reproduction may support evaluation but do not demonstrate a defended judgment.",
        "قد يدعم التذكر والتكرار التقييم دون إثبات حكم مدافَع عنه.",
      ],
      [
        "Recognizing uses does not itself justify the best choice for this context.",
        "لا يبرر التعرف على الاستخدامات أفضل اختيار لهذا السياق.",
      ],
      [
        "Description omits the criterion-based defense requested by the outcome.",
        "يحذف الوصف الدفاع المستند إلى المعايير الذي يطلبه الناتج.",
      ],
      [
        "Correct: the learner evaluates suitability and provides reasons.",
        "صحيح؛ يقيّم المتعلم الملاءمة ويقدم أسبابًا.",
      ],
    ],
  },
  m21: {
    options: [
      [
        "The rubric makes the task measurable, so the stated time no longer affects its quality.",
        "يجعل السلم المهمة قابلة للقياس، فلا يعود الزمن مؤثرًا في جودتها.",
      ],
      [
        "The problem is that investigations cannot be divided into observable learning outcomes.",
        "المشكلة أن الاستقصاء لا يمكن تقسيمه إلى نواتج تعلم ملحوظة.",
      ],
      [
        "Its scope and timescale are not achievable within one lesson.",
        "نطاقه ومدته غير قابلين للتحقق في حصة واحدة.",
      ],
      [
        "The only defect is the absence of a percentage, regardless of how long plant growth takes.",
        "العيب الوحيد غياب نسبة بصرف النظر عن مدة نمو النبات.",
      ],
    ],
    feedback: [
      [
        "Measurability does not establish feasibility; time is a separate test.",
        "لا تثبت قابلية القياس الواقعية؛ فالوقت اختبار مستقل.",
      ],
      [
        "The guide explicitly offers identifying variables as a smaller daily investigation step.",
        "يقدم الدليل تحديد المتغيرات خطوة استقصاء يومية أصغر.",
      ],
      [
        "Correct: preserve the broad goal but narrow the daily step.",
        "صحيح؛ احتفظ بالغاية وضيّق خطوة اليوم.",
      ],
      [
        "A criterion may use a rubric, count, or precision; adding a percentage does not solve timescale.",
        "قد يكون المعيار سلمًا أو عددًا أو دقة؛ ولا تحل النسبة مشكلة المدة.",
      ],
    ],
  },
  m22: {
    options: [
      [
        "Readiness, lesson time, scope, resources, and a realistic criterion.",
        "الاستعداد وزمن الدرس والنطاق والموارد ومعيار واقعي.",
      ],
      [
        "An observable verb, consistent wording, a percentage, and a written product.",
        "فعل ملحوظ وصياغة متسقة ونسبة ومنتج مكتوب.",
      ],
      [
        "A curriculum link, a complete ABCD order, a worksheet, and a teacher explanation.",
        "رابط بالمنهج وترتيب ABCD كامل وورقة وشرح للمعلم.",
      ],
      [
        "An ambitious target, identical supports, a long objective, and a final examination.",
        "هدف طموح ودعم متطابق وهدف طويل وامتحان نهائي.",
      ],
    ],
    feedback: [
      [
        "Correct: these address whether these learners can reach the result in this setting.",
        "صحيح؛ تفحص هذه قدرة هؤلاء المتعلمين على بلوغ الناتج في البيئة.",
      ],
      [
        "This mostly describes visible/checkable evidence, not the full feasibility check.",
        "تصف هذه غالبًا دليلًا قابلًا للفحص لا الواقعية كاملة.",
      ],
      [
        "These features can exist even when time and prerequisites make the task unreachable.",
        "قد تتوفر هذه مع عجز الزمن والمتطلبات عن إتاحة الإنجاز.",
      ],
      [
        "Ambition and length do not establish readiness, resources, or attainable scope.",
        "لا يثبت الطموح والطول الاستعداد أو الموارد أو النطاق الممكن.",
      ],
    ],
  },
  m23: {
    options: [
      [
        "Add an accuracy percentage to page completion without identifying the content skill.",
        "أضف نسبة دقة لإكمال الصفحة دون تحديد مهارة المحتوى.",
      ],
      [
        "Name the intended learning performance, then specify its ABCD parts.",
        "سمّ أداء التعلم المقصود ثم حدّد أجزاء ABCD.",
      ],
      [
        "Specify that the teacher monitors completion and counts every submitted worksheet.",
        "حدّد مراقبة المعلم للإكمال وعدّ كل ورقة مسلمة.",
      ],
      [
        "Replace the page number with a unit title and keep the completion behavior.",
        "استبدل رقم الصفحة بعنوان وحدة واحتفظ بسلوك الإكمال.",
      ],
    ],
    feedback: [
      [
        "A number alone does not establish what learning the completed page demonstrates.",
        "لا يثبت الرقم وحده التعلم الذي تكشفه الصفحة.",
      ],
      [
        "Correct: define the outcome rather than merely task compliance.",
        "صحيح؛ حدّد الناتج لا الامتثال للمهمة فقط.",
      ],
      [
        "Monitoring submission is useful administration but does not state learner achievement.",
        "مراقبة التسليم إدارة مفيدة لا صياغة تحصيل المتعلم.",
      ],
      [
        "Changing the content label leaves the activity–outcome distinction unresolved.",
        "يترك تغيير العنوان الفرق بين النشاط والناتج دون حل.",
      ],
    ],
  },
  m24: {
    options: [
      [
        "Reuse the worked price pairs and calculator, asking students to copy the final selections.",
        "أعد أزواج الأسعار المحلولة والحاسبة واطلب نسخ الاختيارات النهائية.",
      ],
      [
        "Use new labels and a calculator, but score recognition of currency symbols instead.",
        "استخدم بطاقات جديدة وحاسبة لكن صحح التعرف على رموز العملات.",
      ],
      [
        "Use new pairs with a calculator, requiring the same comparison and criterion.",
        "استخدم أزواجًا جديدة وحاسبة للمقارنة والمعيار نفسيهما.",
      ],
      [
        "Use new pairs without a calculator, retaining the stated objective and preparation.",
        "استخدم أزواجًا جديدة دون حاسبة مع إبقاء الهدف والإعداد كما هما.",
      ],
    ],
    feedback: [
      [
        "Copying the worked answer does not demonstrate independent application to new items.",
        "لا يثبت نسخ الإجابة تطبيقًا مستقلًا على عناصر جديدة.",
      ],
      [
        "Tools match, but the assessed Behavior changes from comparison to symbol recognition.",
        "تطابق الأدوات لكن السلوك يتحول من المقارنة إلى التعرف على الرموز.",
      ],
      [
        "Correct: behavior, condition, and degree remain aligned while the examples change.",
        "صحيح؛ يبقى السلوك والشرط والدرجة متسقًا وتتغير الأمثلة.",
      ],
      [
        "The condition changes without revising the objective or learning preparation.",
        "يتغير الشرط دون مراجعة الهدف أو الإعداد.",
      ],
    ],
  },
  m26: {
    options: [
      [
        "The target states the purpose; the criterion makes success checkable.",
        "توضح صيغة الطالب الغرض ويجعل المعيار النجاح قابلًا للفحص.",
      ],
      [
        "The target states the success threshold; the criterion lists the teacher’s activities.",
        "تحدد صيغة الطالب حد النجاح ويسرد المعيار أنشطة المعلم.",
      ],
      [
        "The target replaces the ABCD statement; the criterion is needed only after grading.",
        "تستبدل صيغة الطالب ABCD ولا يلزم المعيار إلا بعد التصحيح.",
      ],
      [
        "The target lists resources; the criterion states how much content the teacher covers.",
        "تسرد صيغة الطالب الموارد ويحدد المعيار كمية ما يغطيه المعلم.",
      ],
    ],
    feedback: [
      [
        "Correct: these communicate complementary aspects while the full plan retains ABCD precision.",
        "صحيح؛ توصلان جانبين متكاملين وتحفظ الخطة دقة ABCD.",
      ],
      [
        "The guide’s target communicates the learning meaning, and its criterion describes learner success.",
        "يوصل الهدف معنى التعلم ويصف المعيار نجاح المتعلم.",
      ],
      [
        "The student wording does not remove the full objective or the need to share criteria beforehand.",
        "لا تلغي صيغة الطالب الهدف الكامل أو مشاركة المعايير مسبقًا.",
      ],
      [
        "Neither purpose is defined by teacher coverage or a resource inventory.",
        "لا يُعرّف أي منهما بتغطية المعلم أو جرد الموارد.",
      ],
    ],
  },
  m27: {
    options: [
      [
        "Retain the task unchanged because the approved textbook already accounts for every learner.",
        "أبق المهمة لأن الكتاب المعتمد يراعي مسبقًا كل متعلم.",
      ],
      [
        "Adjust sequence or support using assessment evidence while retaining the outcome.",
        "عدّل التسلسل أو الدعم بالأدلة مع إبقاء الناتج.",
      ],
      [
        "Lower the curriculum standard immediately so the task no longer requires interpreting graphs.",
        "اخفض معيار المنهج فورًا حتى لا تحتاج المهمة إلى تفسير الرسوم.",
      ],
      [
        "Proceed with the activity and postpone all readiness decisions until the final unit assessment.",
        "نفذ النشاط وأجّل كل قرارات الاستعداد إلى تقويم الوحدة النهائي.",
      ],
    ],
    feedback: [
      [
        "Approval does not replace evidence about this class’s prerequisites and needs.",
        "لا يستبدل الاعتماد أدلة متطلبات هذا الصف وحاجاته.",
      ],
      [
        "Correct: learner evidence informs anticipation, differentiation, and coherent sequencing.",
        "صحيح؛ توجه الأدلة التوقع والتمايز والتسلسل المترابط.",
      ],
      [
        "A readiness gap suggests targeted support or a smaller step, not automatic removal of the goal.",
        "تقترح فجوة الاستعداد دعمًا أو خطوة أصغر لا حذف الغاية تلقائيًا.",
      ],
      [
        "The guide treats prior assessment as a resource for current planning.",
        "يعامل الدليل التقويم السابق موردًا للتخطيط الحالي.",
      ],
    ],
  },
  m28: {
    options: [
      [
        "Coverage, anticipation, uniformity, fixed pacing, and resource reduction",
        "التغطية والتوقع والتوحيد والإيقاع الثابت وتقليل الموارد",
      ],
      [
        "Coverage, recall, media selection, summative grading, and attendance",
        "التغطية والتذكر واختيار الوسائط والدرجات الختامية والحضور",
      ],
      [
        "Coverage, anticipation, differentiation, coherence, and accountability",
        "التغطية والتوقع والتمايز والترابط والمساءلة",
      ],
      [
        "Content, methods, materials, procedures, practice, and assessment",
        "المحتوى والطرائق والمواد والإجراءات والممارسة والتقويم",
      ],
    ],
    feedback: [
      [
        "Uniformity and fixed pacing do not express the guide’s differentiation and responsive coherence.",
        "لا يعبر التوحيد والإيقاع الثابت عن التمايز والترابط المستجيب.",
      ],
      [
        "These mix possible classroom tasks with benefits rather than giving the five benefits.",
        "تمزج هذه مهام محتملة بالفوائد ولا تعطي الفوائد الخمس.",
      ],
      [
        "Correct: this reproduces the five benefits named in Topic Three.",
        "صحيح؛ تمثل الفوائد الخمس المسماة في الموضوع الثالث.",
      ],
      [
        "These are planning decisions/components, not the stated reasons planning matters.",
        "هذه قرارات أو مكونات لا أسباب أهمية التخطيط المذكورة.",
      ],
    ],
  },
  m30: {
    options: [
      [
        "Professional Responsibility: standards 9–10",
        "المسؤولية المهنية: المعايير 9–10",
      ],
      [
        "Content: standards 6–8, including planning and assessment",
        "المحتوى: المعايير 6–8 ومنها التخطيط والتقويم",
      ],
      [
        "Instructional Practice: standards 1–3, including development",
        "الممارسة التدريسية: المعايير 1–3 ومنها النمو",
      ],
      [
        "The Learner and Learning: standards 4–5 and content application",
        "المتعلم والتعلم: المعايير 4–5 وتطبيق المحتوى",
      ],
    ],
    feedback: [
      [
        "Correct: professional learning/ethics and leadership/collaboration are standards 9–10.",
        "صحيح؛ التعلم المهني والأخلاق والقيادة والتعاون في 9–10.",
      ],
      [
        "Standards 6–8 are Instructional Practice; Content is 4–5.",
        "6–8 للممارسة التدريسية؛ والمحتوى 4–5.",
      ],
      ["Standards 1–3 are The Learner and Learning.", "1–3 للمتعلم والتعلم."],
      [
        "Standards 4–5 are Content, not The Learner and Learning.",
        "4–5 للمحتوى لا للمتعلم والتعلم.",
      ],
    ],
  },
  m31: {
    options: [
      [
        "National Core Arts Standards: Responding through interpreting finished artworks",
        "معايير الفنون الأساسية: الاستجابة بتفسير أعمال منتهية",
      ],
      [
        "National Core Arts Standards: Creating through idea development",
        "معايير الفنون الأساسية: الإبداع بتطوير الأفكار",
      ],
      [
        "National Core Arts Standards: Connecting through relating art to cultural contexts",
        "معايير الفنون الأساسية: الربط بسياقات ثقافية",
      ],
      [
        "National Core Arts Standards: Presenting through arranging an exhibition for an audience",
        "معايير الفنون الأساسية: العرض بترتيب معرض لجمهور",
      ],
    ],
    feedback: [
      [
        "Responding concerns interpretation/evaluation; the described action is generating ideas before production.",
        "تتعلق الاستجابة بالتفسير والتقييم؛ والفعل هنا توليد أفكار قبل الإنتاج.",
      ],
      [
        "Correct: thumbnail sketches generate and conceptualize ideas for the intended artwork.",
        "صحيح؛ تولد الرسوم المصغرة أفكار العمل وتتصورها.",
      ],
      [
        "The scenario does not foreground connecting work with personal or cultural context.",
        "لا يركز الموقف على ربط العمل بسياق شخصي أو ثقافي.",
      ],
      [
        "Preparing exhibition presentation is different from developing the artwork’s initial ideas.",
        "يختلف إعداد العرض عن تطوير الأفكار الأولية للعمل.",
      ],
    ],
  },
  m32: {
    options: [
      [
        "Problem solving; procedural fluency; communication; grading; representation",
        "حل المشكلات؛ الطلاقة الإجرائية؛ التواصل؛ الدرجات؛ التمثيل",
      ],
      [
        "Reasoning and proof; communication; number; algebra; measurement",
        "الاستدلال والبرهان؛ التواصل؛ الأعداد؛ الجبر؛ القياس",
      ],
      [
        "Problem solving; recall; communication; connections; classroom management",
        "حل المشكلات؛ التذكر؛ التواصل؛ الترابطات؛ إدارة الصف",
      ],
      [
        "Problem solving; reasoning and proof; communication; connections; representation",
        "حل المشكلات؛ الاستدلال والبرهان؛ التواصل؛ الترابطات؛ التمثيل",
      ],
    ],
    feedback: [
      [
        "This replaces reasoning/proof and connections with items outside the five-process list.",
        "تستبدل هذه الاستدلال والبرهان والترابطات بعناصر خارج قائمة العمليات الخمس.",
      ],
      [
        "This mixes two process standards with mathematics content areas.",
        "تمزج هذه عمليتين بمجالات محتوى رياضية.",
      ],
      [
        "Recall and classroom management are not the two missing NCTM process standards.",
        "ليس التذكر وإدارة الصف عمليتي NCTM الناقصتين.",
      ],
      [
        "Correct: all five processes match the course guide’s NCTM list.",
        "صحيح؛ تطابق العمليات الخمس قائمة NCTM في الدليل.",
      ],
    ],
  },
  m34: {
    options: [
      [
        "A short-range revision within the unit’s continuing goals",
        "مراجعة قريبة المدى داخل غايات الوحدة المستمرة",
      ],
      [
        "A long-range revision because changing a lesson changes every curriculum standard",
        "مراجعة بعيدة لأن تغيير درس يغير كل معايير المنهج",
      ],
      [
        "An annual curriculum replacement because the order of two activities changes",
        "استبدال سنوي للمنهج لأن ترتيب نشاطين يتغير",
      ],
      [
        "An unplanned deviation because weekly plans cannot respond to learner evidence",
        "انحراف غير مخطط لأن الأسبوعية لا تستجيب لأدلة الطلاب",
      ],
    ],
    feedback: [
      [
        "Correct: weekly/daily planning can adapt while preserving the broader outcome.",
        "صحيح؛ قد تتكيف الأسبوعية واليومية مع حفظ الناتج الأوسع.",
      ],
      [
        "The scenario retains the unit goal; the immediate schedule, not every standard, changes.",
        "يحفظ الموقف غاية الوحدة ويغير الجدول المباشر لا كل المعايير.",
      ],
      [
        "A local change of timing does not establish replacement of the yearly map.",
        "لا يثبت تعديل التوقيت المحلي استبدال الخريطة السنوية.",
      ],
      [
        "The guide expressly describes continuous short-range revision from lesson evidence.",
        "يصف الدليل صراحة مراجعة القريب باستمرار وفق أدلة الدروس.",
      ],
    ],
  },
  m35: {
    options: [
      [
        "A written explanation of the technique, scored for accurate definitions and sequence",
        "شرح مكتوب للتقنية يصحح لدقة التعريفات والتسلسل",
      ],
      [
        "Demonstration, safe hands-on practice, and observation of execution",
        "عرض وممارسة عملية آمنة وملاحظة التنفيذ",
      ],
      [
        "A reflective discussion of why students value safe practice, followed by an attitude statement",
        "نقاش تأملي لقيمة الأمان يليه تعبير عن اتجاه",
      ],
      [
        "A diagram-labeling task identifying the tools and recalling their safety rules",
        "تسمية أدوات في رسم وتذكر قواعد سلامتها",
      ],
    ],
    feedback: [
      [
        "This provides cognitive evidence, but not evidence of executing the manual skill.",
        "يقدم هذا دليلًا معرفيًا لا تنفيذ المهارة اليدوية.",
      ],
      [
        "Correct: psychomotor evidence requires performance, with materials, practice time, and safety planned.",
        "صحيح؛ يحتاج الدليل النفسحركي أداءً مع تخطيط المواد والممارسة والسلامة.",
      ],
      [
        "This supports an affective goal but cannot substitute for observed execution.",
        "يدعم هذا غاية وجدانية ولا يستبدل التنفيذ الملحوظ.",
      ],
      [
        "Knowing tool names and rules may support performance but does not demonstrate it.",
        "قد تدعم معرفة الأدوات والقواعد الأداء دون إثباته.",
      ],
    ],
  },
  m36: {
    options: [
      [
        "Opening gathers final evidence; assessment rehearses the task; closure introduces its prerequisites.",
        "يجمع الافتتاح الدليل النهائي ويتدرب التقويم على المهمة ويقدم الغلق متطلباتها.",
      ],
      [
        "Opening distributes resources; assessment records attendance; closure allocates practice time.",
        "يوزع الافتتاح الموارد ويسجل التقويم الحضور ويخصص الغلق زمن الممارسة.",
      ],
      [
        "Opening states the final grade; assessment summarizes the unit; closure first activates prior knowledge.",
        "يعلن الافتتاح الدرجة ويلخص التقويم الوحدة وينشط الغلق المعرفة السابقة أولًا.",
      ],
      [
        "Opening connects prior knowledge; assessment checks outcomes; closure consolidates learning.",
        "يربط الافتتاح المعرفة السابقة ويفحص التقويم النواتج ويرسخ الغلق التعلم.",
      ],
    ],
    feedback: [
      [
        "This reverses the opening’s prior-knowledge role and confuses assessment with practice.",
        "تعكس هذه دور المعرفة السابقة وتخلط التقويم بالممارسة.",
      ],
      [
        "These administrative actions do not express the three components’ instructional purposes.",
        "لا تعبر هذه الإجراءات الإدارية عن الأغراض التدريسية الثلاثة.",
      ],
      [
        "The roles are misplaced: prior knowledge belongs in the opening, not first in closure.",
        "الأدوار في غير مواضعها؛ فالمعرفة السابقة في الافتتاح لا تبدأ بالغلق.",
      ],
      [
        "Correct: the guide also notes closure can preview what comes next; one task may serve several purposes.",
        "صحيح؛ يمهّد الغلق أيضًا لما يلي، وقد تخدم مهمة عدة أغراض.",
      ],
    ],
  },
};
export function applyQuestionReview(q: Question): Question {
  const r = revisions[q.id];
  if (!r) return q;
  return {
    ...q,
    options: r.options.map((p) => p[0]),
    arOptions: r.options.map((p) => p[1]),
    distractors: r.feedback.map((p) => p[0]),
    arDistractors: r.feedback.map((p) => p[1]),
  };
}
