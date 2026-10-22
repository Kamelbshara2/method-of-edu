import { describe, it, expect, vi } from "vitest";
import { authorized, runAgent, safeAgentError, DEFAULT_MODEL } from "./agent";
import {
  validateCitations,
  parsePdfPages,
  validateReviewCoverage,
  type AIReview,
  type AIQuestion,
} from "../shared/agent";
const b = {
  en: "A detailed evidence-based explanation.",
  ar: "تفسير مفصل يستند إلى الأدلة.",
};
const page = {
  documentId: "pdf-1",
  name: "lecture.pdf",
  page: 2,
  text: "Formative assessment uses evidence to adapt teaching and learning. Feedback should provide a next step.",
};
const citation = {
  documentId: "pdf-1",
  page: 2,
  quote: "Formative assessment uses evidence to adapt teaching and learning.",
};
const q: AIQuestion = {
  id: "q1",
  subtopicId: "s1",
  level: "application",
  stem: b,
  options: ["A", "B", "C", "D"].map((v, i) => ({
    en: b.en + " " + v,
    ar: b.ar + " " + i,
  })),
  correctIndex: 1,
  rationale: b,
  optionFeedback: [b, b, b, b],
  citations: [citation],
};
const pack = {
  title: b,
  scope: b,
  coverageGaps: [b],
  subtopics: [
    {
      id: "s1",
      title: b,
      objective: b,
      concept: b,
      application: b,
      workedExample: b,
      misconception: b,
      selfCheck: b,
      modelAnswer: b,
      comparison: [{ term: b, meaning: b }],
      dialectExplanation: {
        egyptian: "شرح مصري",
        jordanian: "شرح أردني",
        emirati: "شرح إماراتي",
        syrian: "شرح سوري",
      },
      citations: [citation],
    },
  ],
  questions: [q],
};
const review: AIReview = {
  verdict: "supported",
  summary: b,
  findings: [],
  questionReviews: [
    {
      questionId: "q1",
      verdict: "supported",
      correctIndex: 1,
      assessment: b,
      feedbackQuality: b,
      citations: [citation],
    },
  ],
};
const base = { courseCode: "0402526E", dialect: "emirati", sources: [page] };
const env = {
  FAHM_AI_API_KEY: "test-not-a-real-credential",
  FAHM_AI_MODEL: DEFAULT_MODEL,
};
function provider(...results: unknown[]) {
  return vi.fn(
    async (
      _url: Parameters<typeof fetch>[0],
      _init?: Parameters<typeof fetch>[1],
    ) =>
      new Response(
        JSON.stringify({
          status: "completed",
          output: [
            {
              content: [
                { type: "output_text", text: JSON.stringify(results.shift()) },
              ],
            },
          ],
        }),
        { status: 200, headers: { "content-type": "application/json" } },
      ),
  );
}
describe("source verification", () => {
  it("rejects invented pages and quotes even if they sound plausible", () => {
    expect(() =>
      validateCitations({ citations: [{ ...citation, page: 9 }] }, [page]),
    ).toThrow();
    expect(() =>
      validateCitations(
        { citations: [{ ...citation, quote: "A quiz is always formative." }] },
        [page],
      ),
    ).toThrow();
    expect(() =>
      validateCitations(
        { citations: [{ ...citation, quote: "                 " }] },
        [page],
      ),
    ).toThrow();
  });
  it("matches actual source quotes while ignoring extraction whitespace", () => {
    expect(
      validateCitations(
        {
          citations: [
            {
              ...citation,
              quote:
                "Formative assessment uses\n evidence to adapt teaching and learning.",
            },
          ],
        },
        [page],
      ),
    ).toEqual({ total: 1, verified: 1 });
  });
  it("keeps source PDF page numbers and skips pages without usable text", () => {
    expect(
      parsePdfPages("doc", "lecture", "[Page 1]\n\n[Page 2]\n" + page.text),
    ).toEqual([{ ...page, documentId: "doc", name: "lecture" }]);
  });
});
describe("agent workflow", () => {
  it("requires a long workspace token and exact matching", () => {
    expect(authorized("Bearer short", "short")).toBe(false);
    expect(authorized("Bearer " + "a".repeat(32), "a".repeat(32))).toBe(true);
    expect(authorized("Bearer " + "b".repeat(32), "a".repeat(32))).toBe(false);
  });
  it("makes separate author and reviewer calls and accepts only checked evidence", async () => {
    const f = provider(pack, review);
    const r = await runAgent(
      { ...base, action: "build", focus: "Explain formative assessment." },
      env,
      f,
    );
    expect(f).toHaveBeenCalledTimes(2);
    expect(r.pack?.questions).toHaveLength(1);
    expect(r.citationChecks).toEqual({ verified: 3, total: 3 });
    const body = JSON.parse(String(f.mock.calls[0]?.[1]?.body));
    expect(body.store).toBe(false);
    expect(body.model).toBe(DEFAULT_MODEL);
    expect(body.reasoning.effort).toBe("high");
    expect(body.text.format.strict).toBe(true);
  });
  it("rejects missing per-question reviews and a falsely supported changed answer key", () => {
    expect(() =>
      validateReviewCoverage({ ...review, questionReviews: [] }, [q]),
    ).toThrow();
    expect(() =>
      validateReviewCoverage(
        {
          ...review,
          questionReviews: [{ ...review.questionReviews[0], correctIndex: 2 }],
        },
        [q],
      ),
    ).toThrow();
  });
  it("keeps honest reviewer disagreement visible rather than changing the key silently", async () => {
    const changed = {
      ...review,
      verdict: "needs_revision",
      questionReviews: [
        {
          ...review.questionReviews[0],
          verdict: "needs_revision",
          correctIndex: 2,
        },
      ],
    };
    const r = await runAgent(
      { ...base, action: "review", questions: [q] },
      env,
      provider(changed),
    );
    expect(r.review?.verdict).toBe("needs_revision");
    expect(r.review?.questionReviews[0].correctIndex).toBe(2);
  });
  it("rejects unsupported citations before requesting an independent review", async () => {
    const f = provider({
      ...pack,
      questions: [{ ...q, citations: [{ ...citation, page: 88 }] }],
    });
    await expect(
      runAgent({ ...base, action: "build", focus: "Explain this." }, env, f),
    ).rejects.toThrow(/citation/);
    expect(f).toHaveBeenCalledTimes(1);
  });
  it("permits checking an uncited sample question against actual new evidence", async () => {
    const r = await runAgent(
      { ...base, action: "review", questions: [{ ...q, citations: [] }] },
      env,
      provider(review),
    );
    expect(r.review?.verdict).toBe("supported");
  });
  it("rejects incomplete outputs and hides upstream credential details", async () => {
    await expect(
      runAgent(
        { ...base, action: "review", questions: [q] },
        env,
        async () => new Response(JSON.stringify({ status: "incomplete" })),
      ),
    ).rejects.toThrow(/incomplete/);
    const f = vi.fn(
      async () => new Response("secret provider detail", { status: 401 }),
    );
    try {
      await runAgent({ ...base, action: "review", questions: [q] }, env, f);
      expect.fail();
    } catch (e) {
      expect(safeAgentError(e)).toEqual({
        status: 502,
        message:
          "The AI provider rejected the server credential or model access. Check Vercel environment settings.",
      });
    }
  });
  it("blocks missing keys, malformed requests, duplicate pages, and oversized context", async () => {
    const f = provider();
    await expect(
      runAgent({ ...base, action: "build", focus: "Explain" }, {}, f),
    ).rejects.toThrow(/not connected/);
    await expect(runAgent({ action: "build" }, env, f)).rejects.toThrow(
      /Invalid request/,
    );
    await expect(
      runAgent(
        { ...base, action: "build", focus: "Explain", sources: [page, page] },
        env,
        f,
      ),
    ).rejects.toThrow(/unique/);
    await expect(
      runAgent(
        {
          ...base,
          action: "build",
          focus: "Explain",
          sources: Array.from({ length: 6 }, (_, i) => ({
            ...page,
            page: i + 1,
            text: "x".repeat(15000),
          })),
        },
        env,
        f,
      ),
    ).rejects.toThrow(/smaller page range/);
    expect(f).not.toHaveBeenCalled();
  });
});
