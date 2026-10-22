import { describe, it, expect } from "vitest";
import { questions, topics, dialects } from "./content";
import { scoreAnswers } from "./storage";
const fixture = [
  { id: "a", correct: 1 },
  { id: "b", correct: 0 },
  { id: "c", correct: 2 },
];
describe("practice scoring", () => {
  it("does not credit unanswered questions", () => {
    expect(scoreAnswers({}, fixture)).toEqual({
      correct: 0,
      total: 3,
      answered: 0,
    });
  });
  it("scores choices while keeping unanswered distinct", () => {
    expect(scoreAnswers({ a: 1, b: 2 }, fixture)).toEqual({
      correct: 1,
      total: 3,
      answered: 2,
    });
  });
  it("does not count answers outside a filtered question set", () => {
    expect(scoreAnswers({ a: 1, b: 0, c: 2 }, fixture.slice(1))).toEqual({
      correct: 2,
      total: 2,
      answered: 2,
    });
  });
});
describe("bilingual assessment content", () => {
  it("has full bilingual feedback and source-linked topics for all 36 questions", () => {
    expect(questions).toHaveLength(36);
    expect(new Set(questions.map((q) => q.id)).size).toBe(36);
    for (const q of questions) {
      expect(topics.some((t) => t.id === q.topic)).toBe(true);
      expect(q.correct).toBeGreaterThanOrEqual(0);
      expect(q.correct).toBeLessThan(q.options.length);
      expect(q.arOptions).toHaveLength(4);
      expect(q.distractors).toHaveLength(4);
      expect(q.arDistractors).toHaveLength(4);
      expect(new Set(q.options).size).toBe(4);
      expect(q.why.length).toBeGreaterThan(50);
      expect(q.arWhy.length).toBeGreaterThan(50);
      expect(q.citations.length).toBeGreaterThan(0);
    }
  });
  it("keeps dialect explanations and canonical terms available across the three chapters", () => {
    expect(topics).toHaveLength(3);
    for (const t of topics) {
      for (const d of dialects)
        expect(t.dialect[d.id].length).toBeGreaterThan(20);
      expect(t.keywords.every((k) => k.ar && k.en)).toBe(true);
      expect(t.objectives).toHaveLength(t.arObjectives.length);
    }
  });
});
