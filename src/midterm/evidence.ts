import { sourceDocuments, type CourseCitation } from "./sources";
export type EvidencePointer = [string, number, string, number?];
export function excerpt([
  documentId,
  page,
  needle,
  span = 850,
]: EvidencePointer): CourseCitation {
  const p = sourceDocuments
    .find((d) => d.id === documentId)
    ?.pages.find((p) => p.page === page);
  if (!p) throw new Error(`Missing PDF page ${documentId}:${page}`);
  const start = p.text.indexOf(needle);
  if (start < 0)
    throw new Error(`Missing source evidence ${documentId}:${page}: ${needle}`);
  let end = Math.min(start + Math.min(span, 1400), p.text.length);
  if (end < p.text.length) {
    const boundary = p.text.lastIndexOf(" ", end);
    if (boundary > start) end = boundary;
  }
  return { documentId, page, quote: p.text.slice(start, end) };
}
// Substantive source passages, rather than a heading-only match.
export const lessonEvidence: Record<string, EvidencePointer[]> = {
  "teaching-functions": [
    ["intro", 4, "Teaching can be defined"],
    ["intro", 5, "At a more granular level", 1150],
  ],
  "professional-growth": [
    ["intro", 6, "3.1 Knowledge", 1100],
    ["intro", 7, "4.2 Planning", 1100],
    ["intro", 8, "Taken together"],
  ],
  "discipline-structure": [["intro", 9, "A discipline is more than", 1000]],
  pck: [
    ["intro", 10, "Lee Shulman", 950],
    ["intro", 10, "6.1 Shulman", 1100],
  ],
  tpack: [
    ["intro", 11, "TPACK describes", 900],
    ["intro", 12, "The three core circles", 1050],
  ],
  addie: [
    ["intro", 13, "Instructional design is the practice", 1050],
    ["intro", 14, "Each phase answers", 1500],
    ["intro", 14, "Evaluation", 1250],
  ],
  assure: [
    ["intro", 15, "The ASSURE model", 750],
    ["intro", 16, "Each step corresponds", 1250],
    ["intro", 17, "R — Require", 850],
    ["intro", 19, "For postgraduate study", 700],
  ],
  "standards-backward": [
    ["objectives", 2, "Two kinds of standards", 1000],
    ["objectives", 3, "Backward design", 1400],
  ],
  "abcd-parts": [
    ["objectives", 5, "A · Audience", 1350],
    ["objectives", 14, "Activity 1", 700],
  ],
  "bloom-verbs": [
    ["objectives", 5, "4. Choosing Measurable Verbs", 700],
    ["objectives", 6, "Understand", 1000],
    ["objectives", 6, "Verbs to avoid", 850],
  ],
  "measurable-achievable": [
    ["objectives", 6, "Every daily objective", 1400],
    ["objectives", 7, "How each ABCD", 1400],
    ["objectives", 8, "Break a standard", 500],
  ],
  "objective-repair": [
    ["objectives", 9, "2. Choose today's step", 650],
    ["objectives", 9, "Worked example", 1500],
    ["objectives", 10, "Common mistakes", 850],
  ],
  "objective-alignment": [
    ["objectives", 4, "Alignment test", 500],
    ["objectives", 10, "7. Where Objectives", 500],
    ["objectives", 11, "Turn the objective", 650],
    ["objectives", 13, "Self-check", 1100],
  ],
  "planning-foundations": [
    ["planning", 1, "Instructional planning is the process", 1150],
    ["planning", 2, "Differentiation", 550],
    ["planning", 5, "Effective planning draws", 850],
  ],
  intasc: [
    ["planning", 2, "Key Framework", 1450],
    ["objectives", 2, "InTASC Standard 7", 700],
  ],
  "subject-standards": [
    ["planning", 3, "Specialization", 1550],
    ["planning", 8, "National Core Arts", 650],
  ],
  "planning-levels": [
    ["planning", 4, "Key Framework: The Planning Hierarchy", 1450],
    ["planning", 5, "Levels covered", 1100],
  ],
  "daily-plan-domains": [
    ["planning", 6, "Component", 1450],
    ["planning", 6, "Domain", 1200],
  ],
};
export const questionEvidence: Record<string, EvidencePointer[]> = {
  m01: [
    ["intro", 5, "These functions are cyclical", 450],
    ["intro", 4, "Most contemporary", 500],
  ],
  m02: [["intro", 5, "Phase", 1050]],
  m03: [
    ["intro", 8, "Taken together", 600],
    ["intro", 8, "4.4 Assessment", 1000],
  ],
  m04: [["intro", 6, "3.1 Knowledge", 1300]],
  m05: [["intro", 9, "A discipline is more than", 850]],
  m06: [["intro", 9, "Thinking of a subject", 700]],
  m07: [["intro", 10, "Mathematics —", 550]],
  m08: [["intro", 10, "Curricular Knowledge", 550]],
  m09: [
    ["intro", 11, "Knowledge of technology hardware", 1100],
    ["intro", 12, "The three core circles", 900],
  ],
  m10: [
    ["intro", 11, "Knowledge of how technology can support", 1250],
    ["intro", 12, "The three core circles", 650],
  ],
  m11: [["intro", 14, "Design", 1350]],
  m12: [["intro", 14, "Development", 1500]],
  m13: [
    ["intro", 16, "S — Select", 550],
    ["intro", 17, "U — Utilize", 650],
  ],
  m14: [["intro", 17, "R — Require", 650]],
  m15: [["objectives", 2, "Two kinds of standards", 1200]],
  m16: [["objectives", 3, "Backward design", 1450]],
  m17: [["objectives", 14, "Activity 1", 650]],
  m18: [["objectives", 14, "Activity 1", 650]],
  m19: [["objectives", 6, "Verbs to avoid", 650]],
  m20: [["objectives", 6, "Evaluate", 550]],
  m21: [["objectives", 8, "Grade 5 students", 600]],
  m22: [["objectives", 6, "Every daily objective", 1450]],
  m23: [["objectives", 10, "Students will complete", 550]],
  m24: [
    ["objectives", 9, "Aligned assessment", 500],
    ["objectives", 9, "Condition", 500],
  ],
  m25: [["objectives", 10, "A Condition", 500]],
  m26: [["objectives", 11, "Turn the objective", 650]],
  m27: [["planning", 5, "Prior student assessment", 650]],
  m28: [
    ["planning", 1, "2. Why Planning Matters", 600],
    ["planning", 2, "Differentiation", 600],
  ],
  m29: [["planning", 2, "Instructional Practice", 750]],
  m30: [["planning", 2, "Key Framework", 1450]],
  m31: [["planning", 8, "National Core Arts", 600]],
  m32: [["planning", 3, "Mathematics", 800]],
  m33: [
    ["planning", 4, "Unit Plan", 900],
    ["planning", 5, "Levels covered", 650],
  ],
  m34: [["planning", 5, "How often revised", 650]],
  m35: [["planning", 6, "Psychomotor", 600]],
  m36: [["planning", 6, "Opening / Set Induction", 1050]],
};
