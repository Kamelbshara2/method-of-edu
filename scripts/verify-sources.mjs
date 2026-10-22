import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
const docs = JSON.parse(
  readFileSync(
    new URL("../src/midterm/sourcePages.json", import.meta.url),
    "utf8",
  ),
);
for (const doc of docs) {
  const file = new URL("../public" + doc.url, import.meta.url);
  const hash = createHash("sha256").update(readFileSync(file)).digest("hex");
  if (hash !== doc.sha256)
    throw new Error(
      `Source PDF changed: ${doc.name}. Review and re-extract citations before publishing.`,
    );
}
console.log(
  `Verified ${docs.length} original source PDFs (${docs.reduce((n, d) => n + d.pages.length, 0)} pages).`,
);
