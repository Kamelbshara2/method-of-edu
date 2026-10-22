import { describe, it, expect } from "vitest";
import { segments, references } from "./deepContent";
import { topics, questions, dialects } from "./content";
import { sourceDocuments } from "./midterm/sources";
import { validateCitations } from "../shared/agent";
describe("midterm source coverage", () => {
  it("includes exactly the three uploaded guides and their 45 pages", () => {
    expect(sourceDocuments.map((d) => [d.id, d.pages.length])).toEqual([
      ["intro", 21],
      ["objectives", 15],
      ["planning", 9],
    ]);
  });
  it("provides 18 substantial source-backed cards and two mapped questions per card", () => {
    expect(segments).toHaveLength(18);
    expect(new Set(segments.map((s) => s.id)).size).toBe(18);
    expect(
      topics.map((t) => segments.filter((s) => s.topic === t.id).length),
    ).toEqual([7, 6, 5]);
    for (const s of segments) {
      expect(s.concept.en.length).toBeGreaterThan(600);
      expect(s.concept.ar.length).toBeGreaterThan(350);
      expect(s.steps).toHaveLength(3);
      expect(s.analysis.en.length).toBeGreaterThan(100);
      expect(s.answer.ar.length).toBeGreaterThan(50);
      expect(questions.filter((q) => q.segmentId === s.id)).toHaveLength(2);
      for (const d of dialects)
        expect(s.dialect[d.id].length).toBeGreaterThan(20);
      for (const ref of s.references) {
        expect(references[ref]).toBeDefined();
        expect(references[ref].url).toMatch(/^\/materials\/.+\.pdf#page=\d+$/);
      }
    }
  });
  it("matches every lesson and question quotation to an actual source page", () => {
    const pages = sourceDocuments.flatMap((d) =>
      d.pages.map((p) => ({
        documentId: d.id,
        name: d.name,
        page: p.page,
        text: p.text,
      })),
    );
    expect(() =>
      validateCitations({ lessons: segments, questions }, pages),
    ).not.toThrow();
    const checks = validateCitations({ lessons: segments, questions }, pages);
    expect(checks.total).toBeGreaterThan(100);
    expect(checks.verified).toBe(checks.total);
  });
});
