import { describe, it, expect } from "vitest";
import { cases, caseSubjects, caseSources } from "./cases";
import { segments } from "../deepContent";
import { questions } from "../content";
import { studyTables } from "./studyDetails";
import { sourceDocuments } from "./sources";
import { validateCitations } from "../../shared/agent";
describe("reviewed midterm content", () => {
  it("gives two substantial bilingual cases to each specialization, with mathematics first", () => {
    expect(cases).toHaveLength(8);
    expect(cases.slice(0, 2).every((c) => c.subject === "math")).toBe(true);
    expect(new Set(cases.map((c) => c.id)).size).toBe(8);
    for (const subject of caseSubjects)
      expect(cases.filter((c) => c.subject === subject.id)).toHaveLength(2);
    for (const c of cases) {
      expect(c.prompt.ar.length).toBeGreaterThan(100);
      expect(c.criteria).toHaveLength(4);
      expect(c.answer.en.length).toBeGreaterThan(500);
      expect(c.answer.ar.length).toBeGreaterThan(400);
      for (const id of c.sourceIds)
        expect(segments.some((s) => s.id === id)).toBe(true);
    }
  });
  it("keeps case evidence grounded in the original PDF pages", () => {
    const pages = sourceDocuments.flatMap((d) =>
      d.pages.map((p) => ({ documentId: d.id, name: d.name, ...p })),
    );
    for (const c of cases) {
      const evidence = caseSources(c);
      expect(evidence.length).toBeGreaterThan(1);
      expect(() =>
        validateCitations({ citations: evidence }, pages),
      ).not.toThrow();
    }
  });
  it("provides bilingual comparison tables for every subtopic", () => {
    for (const s of segments) {
      expect(studyTables[s.id].length).toBeGreaterThan(1);
      for (const row of studyTables[s.id])
        for (const field of [row.term, row.meaning, row.decision]) {
          expect(field.en.length).toBeGreaterThan(1);
          expect(field.ar.length).toBeGreaterThan(1);
        }
    }
  });
  it("does not repeat the original correct-answer-length cue across most questions", () => {
    const longest = questions.filter(
      (q) =>
        q.options[q.correct].length ===
        Math.max(...q.options.map((x) => x.length)),
    ).length;
    expect(longest).toBeLessThan(questions.length / 2);
  });
});
