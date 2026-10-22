import { z } from "zod";
export const bilingual = z
  .object({
    en: z.string().min(1).max(10000),
    ar: z.string().min(1).max(10000),
  })
  .strict();
export const sourcePageSchema = z
  .object({
    documentId: z.string().min(1).max(100),
    name: z.string().min(1).max(200),
    page: z.number().int().min(1).max(10000),
    text: z.string().min(30).max(16000),
  })
  .strict();
export const citationSchema = z
  .object({
    documentId: z.string(),
    page: z.number().int().positive(),
    quote: z.string().min(12).max(1500),
  })
  .strict();
export const lessonSchema = z
  .object({
    id: z.string(),
    title: bilingual,
    objective: bilingual,
    concept: bilingual,
    application: bilingual,
    workedExample: bilingual,
    misconception: bilingual,
    selfCheck: bilingual,
    modelAnswer: bilingual,
    comparison: z
      .array(z.object({ term: bilingual, meaning: bilingual }))
      .max(6),
    dialectExplanation: z
      .object({
        egyptian: z.string(),
        jordanian: z.string(),
        emirati: z.string(),
        syrian: z.string(),
      })
      .strict(),
    citations: z.array(citationSchema).min(1).max(8),
  })
  .strict();
export const questionSchema = z
  .object({
    id: z.string(),
    subtopicId: z.string(),
    level: z.enum(["recall", "understanding", "application", "analysis"]),
    stem: bilingual,
    options: z.array(bilingual).length(4),
    correctIndex: z.number().int().min(0).max(3),
    rationale: bilingual,
    optionFeedback: z.array(bilingual).length(4),
    citations: z.array(citationSchema).min(1).max(6),
  })
  .strict();
export const packSchema = z
  .object({
    title: bilingual,
    scope: bilingual,
    coverageGaps: z.array(bilingual).max(12),
    subtopics: z.array(lessonSchema).min(1).max(4),
    questions: z.array(questionSchema).min(1).max(6),
  })
  .strict();
export const reviewSchema = z
  .object({
    verdict: z.enum(["supported", "needs_revision", "insufficient_evidence"]),
    summary: bilingual,
    findings: z
      .array(
        z.object({
          targetId: z.string(),
          severity: z.enum(["critical", "major", "minor"]),
          issue: bilingual,
          suggestion: bilingual,
        }),
      )
      .max(30),
    questionReviews: z
      .array(
        z.object({
          questionId: z.string(),
          verdict: z.enum([
            "supported",
            "needs_revision",
            "insufficient_evidence",
          ]),
          correctIndex: z.number().int().min(0).max(3),
          assessment: bilingual,
          feedbackQuality: bilingual,
          citations: z.array(citationSchema).max(6),
        }),
      )
      .max(6),
  })
  .strict();
export const coachingSchema = z
  .object({
    assessment: z.enum([
      "well_supported",
      "partially_supported",
      "needs_revision",
      "insufficient_evidence",
    ]),
    feedback: bilingual,
    strengths: z.array(bilingual).max(5),
    improvements: z.array(bilingual).max(5),
    modelAnswer: bilingual,
    dialectExplanation: z.string(),
    citations: z.array(citationSchema).min(1).max(8),
  })
  .strict();
const inputQuestionSchema = questionSchema.extend({
  citations: z.array(citationSchema).max(6),
});
const base = {
  dialect: z.enum(["egyptian", "jordanian", "emirati", "syrian"]),
  courseCode: z.literal("0402526E"),
  sources: z.array(sourcePageSchema).min(1).max(24),
};
export const requestSchema = z.discriminatedUnion("action", [
  z
    .object({
      ...base,
      action: z.literal("build"),
      focus: z.string().min(3).max(1200),
    })
    .strict(),
  z
    .object({
      ...base,
      action: z.literal("review"),
      questions: z.array(inputQuestionSchema).min(1).max(6),
    })
    .strict(),
  z
    .object({
      ...base,
      action: z.literal("coach"),
      question: inputQuestionSchema,
      studentAnswer: z.string().min(10).max(6000),
    })
    .strict(),
]);
export type SourcePage = z.infer<typeof sourcePageSchema>;
export type AIPack = z.infer<typeof packSchema>;
export type AIReview = z.infer<typeof reviewSchema>;
export type AICoaching = z.infer<typeof coachingSchema>;
export type AIQuestion = z.infer<typeof questionSchema>;
export type AgentRequest = z.infer<typeof requestSchema>;
export type Citation = z.infer<typeof citationSchema>;
export type AgentResult = {
  action: "build" | "review" | "coach";
  model: string;
  generatedAt: string;
  pack?: AIPack;
  review?: AIReview;
  coaching?: AICoaching;
  citationChecks: { verified: number; total: number };
  sources: SourcePage[];
};
const norm = (s: string) =>
  s
    .normalize("NFKC")
    .replace(/\s+/gu, "")
    .replace(/[\u200B-\u200F\u202A-\u202E\uFEFF]/gu, "");
export function validateCitations(
  value: unknown,
  pages: SourcePage[],
): { verified: number; total: number } {
  let total = 0;
  let verified = 0;
  function walk(v: unknown) {
    if (!v || typeof v !== "object") return;
    if (Array.isArray(v)) {
      v.forEach(walk);
      return;
    }
    for (const [k, a] of Object.entries(v)) {
      if (k === "citations" && Array.isArray(a)) {
        for (const c of a) {
          total++;
          const parsed = citationSchema.safeParse(c);
          if (!parsed.success) throw new Error("Malformed source citation.");
          const p = pages.find(
            (p) =>
              p.documentId === parsed.data.documentId &&
              p.page === parsed.data.page,
          );
          if (
            !p ||
            norm(parsed.data.quote).length < 8 ||
            !norm(p.text).includes(norm(parsed.data.quote))
          )
            throw new Error(
              "A citation could not be matched to the supplied PDF page. Try a narrower source range.",
            );
          verified++;
        }
      } else walk(a);
    }
  }
  walk(value);
  return { verified, total };
}
export function validatePackLinks(pack: AIPack) {
  const ids = pack.subtopics.map((s) => s.id);
  if (
    new Set(ids).size !== ids.length ||
    new Set(pack.questions.map((q) => q.id)).size !== pack.questions.length
  )
    throw new Error("The generated collection contains duplicate IDs.");
  for (const q of pack.questions) {
    if (
      new Set(q.options.map((o) => norm(o.en).toLowerCase())).size !== 4 ||
      new Set(q.options.map((o) => norm(o.ar))).size !== 4
    )
      throw new Error(
        "A generated question contains duplicate answer options. No packet was accepted.",
      );
  }
  if (pack.questions.some((q) => !ids.includes(q.subtopicId)))
    throw new Error("A question references a missing subtopic.");
}
export function validateReviewCoverage(
  review: AIReview,
  questions: AIQuestion[],
) {
  if (
    review.questionReviews.length !== questions.length ||
    new Set(review.questionReviews.map((r) => r.questionId)).size !==
      questions.length ||
    review.questionReviews.some(
      (r) => !questions.some((q) => q.id === r.questionId),
    )
  )
    throw new Error("The independent review did not assess every question.");
  if (
    review.verdict === "supported" &&
    (review.questionReviews.some(
      (r) =>
        r.verdict !== "supported" ||
        questions.find((q) => q.id === r.questionId)!.correctIndex !==
          r.correctIndex,
    ) ||
      review.findings.some((f) => f.severity !== "minor"))
  )
    throw new Error(
      "The review contains unresolved issues and cannot be marked supported.",
    );
}
export function parsePdfPages(
  documentId: string,
  name: string,
  text: string,
): SourcePage[] {
  const parts = text.split(/\[Page (\d+)\]\s*\n/);
  const pages: SourcePage[] = [];
  for (let i = 1; i < parts.length; i += 2) {
    const t = parts[i + 1]?.trim() || "";
    if (t.length >= 30)
      pages.push({ documentId, name, page: Number(parts[i]), text: t });
  }
  return pages;
}
