import { useState } from "react";
import { Search } from "lucide-react";
import { segments } from "./deepContent";
import { studyTables } from "./midterm/studyDetails";
import { sourceLabel, sourceUrl } from "./midterm/sources";
export default function TerminologyPanel({ topicId }: { topicId: string }) {
  const [query, setQuery] = useState("");
  const entries = segments
    .filter((s) => s.topic === topicId)
    .flatMap((s) =>
      (studyTables[s.id] || []).map((row) => ({ ...row, segment: s })),
    )
    .filter((r) =>
      (r.term.en + " " + r.term.ar + " " + r.meaning.en + " " + r.meaning.ar)
        .toLowerCase()
        .includes(query.toLowerCase()),
    );
  return (
    <div className="study-paper terminology-panel">
      <span className="eyebrow">
        ENGLISH KEY TERMS · STABLE ACADEMIC ARABIC
      </span>
      <h2>Precise terms, in both languages.</h2>
      <p>
        The Arabic below is a consistent academic translation for studying these
        English-language guides. Dialect explanations may vary; the English
        labels, abbreviations, and formal Arabic meanings stay visible. These
        translations have not been issued as an official university glossary.
      </p>
      <p className="arabic" dir="rtl" lang="ar">
        المصطلحات العربية هون ترجمة أكاديمية ثابتة للدراسة. بنغيّر أسلوب الشرح
        حسب اللهجة، وبنحافظ على المصطلح الإنجليزي ومعناه بالعربي الفصيح.
      </p>
      <label className="search-box">
        <Search size={17} />
        <input
          aria-label="Search English or Arabic terminology"
          placeholder="Search English or Arabic terms…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </label>
      <p className="term-count">{entries.length} terms and distinctions</p>
      {entries.map((r, i) => (
        <article className="glossary-entry" key={r.segment.id + "-" + i}>
          <div>
            <strong>{r.term.en}</strong>
            <strong className="arabic" lang="ar" dir="rtl">
              {r.term.ar}
            </strong>
          </div>
          <p>{r.meaning.en}</p>
          <p className="arabic" lang="ar" dir="rtl">
            {r.meaning.ar}
          </p>
          <small>
            {r.segment.title.en} ·{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href={sourceUrl(r.segment.citations[0])}
            >
              {sourceLabel(r.segment.citations[0])}
            </a>
          </small>
        </article>
      ))}
      {!entries.length && (
        <p>No matching term. Try the English label or its Arabic meaning.</p>
      )}
    </div>
  );
}
