import { b } from "../deepContent";
const originalCases = [
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
const additionalCases = [
  {
    id: "math-fraction-model",
    subject: "math",
    title: "When multiplication makes a number smaller",
    ar: "عندما يجعل الضرب العدد أصغر",
    prompt: b(
      "Grade 6 learners say “multiplication always makes a number bigger.” A teacher projects an animated fraction model and asks students to copy the answers. Design a mathematics-first alternative: identify the PCK issue, justify the role of technology using TPACK, write an observable ABCD objective, and plan evidence that distinguishes explanation from copying. Connect the task to an NCTM process standard.",
      "يقول طلاب الصف السادس «الضرب يجعل العدد أكبر دائمًا». يعرض المعلم نموذج كسور متحركًا ويطلب نسخ الإجابات. صمّم بديلًا: حدّد قضية PCK، وبرّر التقنية عبر TPACK، واكتب هدف ABCD ملحوظًا، وخطط دليلًا يميز التفسير من النسخ، واربطه بعملية من NCTM.",
    ),
    criteria: [
      b(
        "Name the misconception and select a counterexample/representation that makes its limitation visible.",
        "تسمية التصور الخاطئ واختيار مثال مضاد أو تمثيل يكشف حدوده.",
      ),
      b(
        "Justify the learning work enabled by the model rather than treating animation as proof of learning.",
        "تبرير العمل التعلمي الذي يتيحه النموذج بدل اعتبار الحركة دليل تعلم.",
      ),
      b(
        "Provide a feasible ABCD objective and evidence under matching conditions.",
        "تقديم هدف ABCD واقعي ودليل بشروط مطابقة.",
      ),
      b(
        "Require individual mathematical reasoning and relate it to reasoning/proof or representation.",
        "اشتراط استدلال رياضي فردي وربطه بالاستدلال والبرهان أو التمثيل.",
      ),
    ],
    answer: b(
      "The source’s mathematics PCK example challenges the belief by multiplying by a positive fraction below 1. For instance, model 8 × 1/2 as half of eight. Ask learners to predict, inspect the model, and explain why this example does not increase the original positive number. Do not generalize that every multiplication by every fraction decreases every number. The representation must address the stated misconception.\n\nAn authored objective could be: “Given area models for four positive whole-number × 1/2 examples, Grade 6 learners will explain the product-size relationship with an accurate model-to-calculation connection in at least three examples.” A is Grade 6; B is explain the relationship; C is the supplied models and task type; D is the three-example criterion with a clear explanation requirement. This sample criterion is a planning choice, not a university pass mark. Use new examples under the same conditions for assessment. Integrating the model with prediction, discussion, and individual explanation illustrates TPACK; knowing how to run the animation alone is TK. NCTM representation and reasoning/proof support the justification. If misconceptions remain, revise the example sequence and support rather than replaying the same animation unchanged.",
      "يتحدى مثال PCK الرياضي في المصدر الاعتقاد بالضرب بكسر موجب أقل من 1. يمكن مثلًا تمثيل 8 × 1/2 بأنه نصف ثمانية. اطلب التنبؤ وفحص النموذج وتفسير عدم زيادة العدد الموجب الأصلي. لا تعمم أن كل ضرب بأي كسر ينقص كل عدد. يجب أن يعالج التمثيل التصور المحدد.\n\nهدف مؤلف للتدريب: «عند تقديم نماذج مساحة لأربعة أمثلة لعدد كلي موجب × 1/2، يفسر طلاب الصف السادس علاقة حجم الناتج بالأصل بربط صحيح بين النموذج والحساب في ثلاثة أمثلة على الأقل». A الصف السادس؛ B تفسير العلاقة؛ C النماذج ونوع المهمة؛ D معيار الأمثلة الثلاثة مع وضوح التفسير. هذا المعيار اختيار تخطيطي لا حد نجاح جامعي. قوّم أمثلة جديدة بالشروط نفسها. يوضح دمج النموذج مع التنبؤ والنقاش والتفسير الفردي TPACK، بينما تشغيل الحركة وحده TK. تدعم عمليتا التمثيل والاستدلال والبرهان في NCTM التبرير. إذا بقي الخلط فراجع تسلسل الأمثلة والدعم بدل إعادة العرض دون تعديل.",
    ),
    sourceIds: ["pck", "tpack", "abcd-parts", "subject-standards"],
  },
  {
    id: "it-loop-blueprint",
    subject: "it",
    title: "From a loop-tracing problem to an ADDIE plan",
    ar: "من مشكلة تتبّع الحلقة إلى خطة ADDIE",
    prompt: b(
      "Students can copy a loop but cannot trace how its variable changes. A colleague labels writing the objective “Development” and building the tracing worksheet “Design.” Correct the phase labels, define an achievable daily outcome, and distinguish resource production from delivery and evaluation. Explain how a printed tracing table could remain educationally useful if the projector fails.",
      "يستطيع الطلاب نسخ حلقة برمجية ولا يتتبعون تغير متغيرها. يصنف زميل كتابة الهدف «تطويرًا» وبناء ورقة التتبع «تصميمًا». صحح المراحل وحدد ناتجًا يوميًا واقعيًا، وميّز إنتاج المورد من التنفيذ والتقويم، وفسّر فائدة جدول تتبع مطبوع إذا تعطل العرض.",
    ),
    criteria: [
      b(
        "Diagnose the actual learning gap rather than treating code copying as understanding.",
        "تشخيص فجوة التعلم بدل مساواة نسخ الشفرة بالفهم.",
      ),
      b(
        "Distinguish Analysis, Design, Development, Implementation, and Evaluation by their outputs.",
        "تمييز مراحل ADDIE وفق نواتجها.",
      ),
      b(
        "State a learner outcome, matching evidence, and a feasible scope.",
        "تحديد ناتج للمتعلم ودليل مطابق ونطاق ممكن.",
      ),
      b(
        "Justify the fallback in terms of the content and learning task, not device presence.",
        "تبرير البديل بالمحتوى ومهمة التعلم لا بوجود الجهاز.",
      ),
    ],
    answer: b(
      "Analysis establishes the gap: learners cannot yet track variable changes through iterations. Design specifies the daily objective, evidence, strategy, and sequence. Producing the worksheet and tracing table is Development. Teaching with a think-aloud and guided practice is Implementation. Interpreting exit evidence and revising the next lesson is Evaluation; pilot feedback can also improve materials during development.\n\nAn authored daily objective could ask students, given a short loop and a tracing table, to record the variable after three iterations with all three entries correct. Define the loop’s prerequisites and restrict scope to a task feasible for these learners. An exit task uses a new loop with comparable demands and the same permitted support. A printed table preserves the intellectual work of tracing and explaining, although it does not reproduce every debugger affordance. Explain that trade-off rather than claiming any technology use proves TPACK. Require a justification of the values, not just copied output, and target later support to the step where the reasoning breaks.",
      "يحدد التحليل الفجوة: تعذر تتبع تغير المتغير خلال التكرارات. ويحدد التصميم الهدف والدليل والاستراتيجية والتسلسل. إنتاج الورقة وجدول التتبع تطوير، والتدريس بالتفكير المسموع والممارسة الموجهة تنفيذ، وتفسير أدلة الخروج ومراجعة الدرس تقويم. وقد تحسن أدلة التجربة المواد أثناء التطوير أيضًا.\n\nيمكن أن يطلب هدف يومي مؤلف تسجيل قيمة متغير بعد ثلاث دورات عند تقديم حلقة قصيرة وجدول تتبع، بصحة القيم الثلاث. حدد المتطلبات واضبط نطاقًا ممكنًا. تستخدم مهمة الخروج حلقة جديدة بمتطلبات مشابهة ودعم مسموح مطابق. يحفظ الجدول المطبوع العمل الفكري للتتبع والتفسير، ولو لم يحاكِ كل إمكانات المصحح. وضح هذا الفرق بدل الادعاء أن أي تقنية تثبت TPACK. اطلب تبرير القيم لا نسخ المخرج، ووجّه الدعم إلى الخطوة التي يتعثر فيها الاستدلال.",
    ),
    sourceIds: ["addie", "objective-alignment", "tpack"],
  },
  {
    id: "science-vacuum-inquiry",
    subject: "science",
    title: "Prediction is a task; explanation is the evidence",
    ar: "التنبؤ مهمة والتفسير هو الدليل",
    prompt: b(
      "A teacher uses the guide’s hammer-and-feather vacuum example to address “heavier objects always fall faster.” Students watch silently and choose an answer after the reveal. Redesign the lesson using ASSURE and guided inquiry. State what the example supports, how individual understanding will be checked, and what to revise if the original misconception remains.",
      "يستخدم معلم مثال المطرقة والريشة في الفراغ الوارد بالدليل لمعالجة «يسقط الأثقل أسرع دائمًا». يشاهد الطلاب بصمت ويختارون إجابة بعد الكشف. أعد التصميم عبر ASSURE والاستقصاء الموجّه، وبيّن ما يدعمه المثال وكيف يفحص الفهم الفردي وما يراجع عند بقاء التصور.",
    ),
    criteria: [
      b(
        "Keep the vacuum condition explicit and avoid an unsupported universal claim about every falling-object situation.",
        "إبقاء شرط الفراغ صريحًا وتجنب تعميم غير مسند على كل سقوط.",
      ),
      b(
        "Distinguish selecting/using media from requiring learner participation.",
        "تمييز اختيار الوسيط واستخدامه من اشتراط المشاركة.",
      ),
      b(
        "Connect prediction, evidence, explanation, and a new individual check.",
        "ربط التنبؤ والدليل والتفسير وفحص فردي جديد.",
      ),
      b(
        "Use results to adjust the next lesson rather than infer understanding from viewing alone.",
        "استخدام النتائج لتعديل الدرس لا استنتاج الفهم من المشاهدة.",
      ),
    ],
    answer: b(
      "The source’s example is explicitly a vacuum comparison; preserve that condition. Use the contrast to challenge the stated “always” belief without claiming the same observation in every real-world condition. Begin by analyzing prior explanations. State an objective requiring prediction and explanation under the described condition. Select and preview an appropriate simulation/video, prepare the viewing environment, and pause before the outcome so learners commit to a prediction and reason.\n\nRequire discussion of what the evidence changes in their explanation, then obtain an individual response to a new but comparable vacuum example. Choosing the displayed answer after the reveal cannot distinguish understanding from copying. In ASSURE, choosing is Select, previewing/preparing is Utilize, and prediction/explanation enacts Require participation. Evaluate the explanations and revise prompts, representations, or practice where the misconception remains. This is an authored classroom application of the guide, not a report of an experiment conducted on these students.",
      "مثال المصدر مقارنة في الفراغ صراحة؛ فحافظ على الشرط. استخدم التباين لتحدي اعتقاد «دائمًا» دون الادعاء بالملاحظة نفسها في كل ظروف الواقع. ابدأ بتحليل التفسيرات السابقة، وصغ هدف تنبؤ وتفسير وفق الشرط، واختر محاكاة أو فيديو مناسبًا وافحصه وهيئ البيئة، وتوقف قبل النتيجة ليلتزم الطلاب بتنبؤ وسبب.\n\nاشترط مناقشة ما يغيره الدليل في التفسير، ثم استجابة فردية لمثال فراغ جديد مشابه. لا يميز اختيار الجواب المعروض بعد الكشف الفهم من النسخ. في ASSURE الاختيار Select، والفحص والتهيئة Utilize، ويجسد التنبؤ والتفسير Require participation. قوّم التفسيرات وراجع الأسئلة أو التمثيلات أو التدريب حيث يبقى الخلط. هذه حالة تدريسية مؤلفة تطبيقًا للدليل لا تقرير تجربة أُجريت على الطلاب.",
    ),
    sourceIds: ["pck", "assure", "subject-standards"],
  },
  {
    id: "art-original-ideas",
    subject: "art",
    title: "From copying a painting to developing an idea",
    ar: "من نسخ لوحة إلى تطوير فكرة",
    prompt: b(
      "In an Art & Design lesson, every learner copies the teacher’s painting. The plan claims to assess original idea generation, but its rubric rewards closeness to the teacher’s model. Redesign the objective, preparation, and evidence using the guide’s National Core Arts Standards example. Explain how sketches and a student rationale would improve alignment without treating one style as the only good art.",
      "ينسخ الجميع لوحة المعلم في درس فن، بينما تدعي الخطة تقويم توليد أفكار أصلية ويكافئ السلم التشابه بالنموذج. أعد تصميم الهدف والإعداد والدليل وفق مثال معايير الفنون بالدليل. فسّر كيف تحسن الرسوم الأولية وتبرير الطالب المواءمة دون اعتبار أسلوب واحد الفن الجيد الوحيد.",
    ),
    criteria: [
      b(
        "Identify the mismatch between original ideation and copying-based scoring.",
        "تحديد عدم الاتساق بين توليد الأفكار وتصحيح النسخ.",
      ),
      b(
        "Connect the task to Creating and generating/conceptualizing artistic ideas.",
        "ربط المهمة بالإبداع وتوليد الأفكار وتصورها.",
      ),
      b(
        "Use process evidence and explicit, learner-visible criteria.",
        "استخدام أدلة العملية ومعايير صريحة للطلاب.",
      ),
      b(
        "Preserve room for different justified artistic choices.",
        "إبقاء مساحة لاختيارات فنية مختلفة مبررة.",
      ),
    ],
    answer: b(
      "The intended outcome is idea generation, while the original evidence rewards reproduction of one example. The guide’s Creating example uses thumbnail sketches before painting so the work develops the student’s idea. An authored objective could require learners, given a theme and planning sheet, to propose three distinct thumbnail compositions with an identifiable compositional choice in each. Explain the criterion with examples rather than equating originality with an undefined personal preference.\n\nPlan a relevant opening using contrasting works, model how to develop and discuss an idea without dictating the final composition, provide guided then independent sketching, and assess the sketches plus the learner’s reasoned selection. Use a criterion appropriate to the stated outcome, not resemblance to the teacher’s painting. Link this to the guide’s PCK example about broadening quality beyond photographic realism. Other well-justified designs can meet the outcome. This does not claim copying is never useful; it is misaligned with this specific goal when copying is the only evidence.",
      "الناتج المقصود توليد الأفكار، بينما يكافئ الدليل الأصلي إعادة نموذج واحد. يستخدم مثال الإبداع في الدليل رسومًا مصغرة قبل الرسم لتطوير فكرة الطالب. يمكن أن يطلب هدف مؤلف اقتراح ثلاثة تكوينات أولية مختلفة عند تقديم موضوع وورقة تخطيط، مع اختيار تكويني واضح في كل منها. وضح المعيار بأمثلة بدل مساواة الأصالة بذوق شخصي غامض.\n\nخطط تهيئة بأعمال متباينة، ونمذج تطوير الفكرة ومناقشتها دون فرض التكوين النهائي، ثم تدريبًا موجهًا فمستقلًا، وقوّم الرسوم واختيار الطالب المعلل. استخدم معيارًا يلائم الناتج لا التشابه بلوحة المعلم. اربط ذلك بمثال PCK الذي يوسع الجودة إلى ما وراء الواقعية الفوتوغرافية. قد تحقق تصاميم مبررة أخرى الناتج. لا يعني ذلك أن النسخ بلا فائدة دائمًا؛ بل أنه غير متسق مع هذه الغاية إذا كان الدليل الوحيد.",
    ),
    sourceIds: ["subject-standards", "pck", "objective-alignment"],
  },
  {
    id: "art-manual-technique",
    subject: "art",
    title: "A written quiz cannot show a blending technique",
    ar: "الاختبار المكتوب لا يظهر تقنية المزج",
    prompt: b(
      "An art lesson targets a manual blending/shading technique, but its only assessment is labeling a color wheel. Learners have different practice experience, and materials are limited. Distinguish the learning domains, design suitable evidence, and explain the eight daily-plan components, including differentiation and safe resource access. Keep the scope achievable for one lesson.",
      "يستهدف درس فن تقنية مزج أو تظليل يدوية، لكن تقويمه الوحيد تسمية عجلة ألوان. تختلف خبرة الطلاب وتقل المواد. ميّز مجالات التعلم وصمم دليلًا مناسبًا، وفسر مكونات الخطة اليومية الثمانية بما فيها التمايز وإتاحة الموارد الآمنة، واضبط نطاق حصة واحدة.",
    ),
    criteria: [
      b(
        "Distinguish cognitive naming from psychomotor execution.",
        "تمييز التسمية المعرفية من التنفيذ النفسحركي.",
      ),
      b(
        "Provide observable performance criteria and practical assessment.",
        "تقديم معايير أداء ملحوظة وتقويم عملي.",
      ),
      b(
        "Plan demonstration, practice time, materials, and safety access.",
        "تخطيط العرض والممارسة والمواد والإتاحة الآمنة.",
      ),
      b(
        "Use targeted support without silently changing the intended skill.",
        "توظيف دعم موجه دون تغيير المهارة المقصودة خفية.",
      ),
    ],
    answer: b(
      "Labeling the color wheel provides cognitive evidence, but not evidence of executing a manual technique. The guide identifies blending/shading as a disciplinary skill and says psychomotor planning needs demonstration, hands-on time, materials for learners, and safety. An authored daily objective can require a small practice sample that demonstrates the specific technique against a short, explained rubric; define the actual technique and observable criteria before assigning a threshold. Do not invent an exact technique-specific safety rule from this general course guide.\n\nThe plan should state the objective and resources; open by connecting to prior art knowledge; develop through a visible demonstration; provide guided and independent practice; observe the produced performance; close by comparing the work to criteria and previewing next practice; and document differentiation. Use a manageable rotation or equivalent access plan when resources are limited, while checking that everyone has sufficient opportunity to perform. Adjust prompts and time according to readiness. Reflection on valuing careful work may address an affective goal, but it cannot replace evidence of the manual outcome.",
      "تقدم تسمية عجلة الألوان دليلًا معرفيًا لا دليل تنفيذ يدوي. يسمي الدليل المزج والتظليل مهارة تخصصية، ويطلب التخطيط النفسحركي عرضًا وممارسة ومواد وسلامة. يمكن لهدف يومي مؤلف أن يطلب عينة تدريب صغيرة تظهر التقنية وفق سلم قصير مشروح؛ حدد التقنية والمعايير الملحوظة قبل وضع الحد. لا تختلق قاعدة سلامة تفصيلية لأداة معينة من دليل عام كهذا.\n\nتحدد الخطة الهدف والموارد، وتهيئ بربط المعرفة الفنية السابقة، وتطور بعرض مرئي، وتوفر ممارسة موجهة ومستقلة، وتلاحظ الأداء المنتج، وتغلق بمقارنة العمل بالمعايير والتمهيد للتدريب التالي، وتوثق التمايز. استخدم تناوبًا ممكنًا أو إتاحة مكافئة عند قلة المواد، مع ضمان فرصة أداء كافية للجميع. كيّف التلميحات والزمن بالاستعداد. قد يعالج تأمل تقدير الإتقان غاية وجدانية لكنه لا يستبدل دليل الناتج اليدوي.",
    ),
    sourceIds: [
      "discipline-structure",
      "daily-plan-domains",
      "planning-foundations",
    ],
  },
];
export const caseSubjects = [
  { id: "math", en: "Mathematics", ar: "الرياضيات" },
  { id: "it", en: "IT", ar: "تقنية المعلومات" },
  { id: "science", en: "Science", ar: "العلوم" },
  { id: "art", en: "Art & Design", ar: "الفن والتصميم" },
];
export const cases = [
  { ...originalCases[1], subject: "math" },
  additionalCases[0],
  { ...originalCases[0], subject: "it" },
  additionalCases[1],
  { ...originalCases[2], subject: "science" },
  additionalCases[2],
  additionalCases[3],
  additionalCases[4],
];
import { segments } from "../deepContent";
import { excerpt, type EvidencePointer } from "./evidence";
const focusedCaseEvidence: Record<string, EvidencePointer[]> = {
  "repair-objective": [
    ["objectives", 5, "A · Audience", 1350],
    ["objectives", 9, "Worked example", 1400],
    ["objectives", 11, "Turn the objective", 650],
  ],
  "math-fraction-model": [
    ["intro", 10, "Mathematics —", 550],
    ["intro", 12, "The three core circles", 850],
    ["objectives", 5, "A · Audience", 1350],
    ["planning", 3, "Mathematics", 800],
  ],
  "design-technology": [
    ["intro", 10, "IT —", 550],
    ["intro", 12, "The three core circles", 850],
    ["intro", 16, "Each step corresponds", 1350],
    ["intro", 17, "U — Utilize", 1100],
  ],
  "it-loop-blueprint": [
    ["intro", 14, "Each phase answers", 1400],
    ["intro", 15, "Development", 1400],
    ["objectives", 4, "Alignment test", 500],
  ],
  "plan-domain": [
    ["objectives", 8, "Grade 5 students", 650],
    ["planning", 4, "Key Framework: The Planning Hierarchy", 1400],
    ["planning", 2, "Instructional Practice", 700],
    ["planning", 6, "Component", 1400],
  ],
  "science-vacuum-inquiry": [
    ["intro", 10, "Science —", 600],
    ["intro", 16, "Each step corresponds", 1350],
    ["intro", 17, "R — Require", 850],
  ],
  "art-original-ideas": [
    ["planning", 8, "National Core Arts", 650],
    ["intro", 10, "Art & Design —", 600],
    ["objectives", 4, "Alignment test", 500],
  ],
  "art-manual-technique": [
    ["intro", 9, "Skill / Process", 850],
    ["planning", 6, "Domain", 1200],
    ["planning", 6, "Component", 1400],
  ],
};
export function caseSources(c: (typeof cases)[number]) {
  return (
    focusedCaseEvidence[c.id]?.map(excerpt) ||
    c.sourceIds.flatMap((id) => segments.find((s) => s.id === id)!.citations)
  );
}
