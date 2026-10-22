import documents from "./sourcePages.json";
import type { Material } from "../storage";
export const sourceDocuments = documents;
export type CourseCitation = {
  documentId: string;
  page: number;
  quote: string;
};
export function cite(
  documentId: string,
  page: number,
  needle: string,
): CourseCitation {
  const p = sourceDocuments
    .find((d) => d.id === documentId)
    ?.pages.find((p) => p.page === page);
  if (!p || !p.text.includes(needle))
    throw new Error(
      `Course citation not found: ${documentId}:${page} ${needle}`,
    );
  return { documentId, page, quote: needle };
}
export const courseMaterials: Material[] = sourceDocuments.map((d) => ({
  id: d.id,
  name: d.name,
  size: d.size,
  pages: d.pages.length,
  text: d.pages.map((p) => `[Page ${p.page}]\n${p.text}`).join("\n\n"),
  added: "2026-10-22T00:00:00Z",
  url: d.url,
  builtin: true,
}));
export function sourceLabel(c: CourseCitation) {
  return `${sourceDocuments.find((d) => d.id === c.documentId)?.title || c.documentId} · PDF p. ${c.page}`;
}
export function sourceUrl(c: CourseCitation) {
  return `${sourceDocuments.find((d) => d.id === c.documentId)?.url || ""}#page=${c.page}`;
}
