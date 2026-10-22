import { useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  FileText,
  Info,
  KeyRound,
  Lightbulb,
  Loader2,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Trash2,
} from "lucide-react";
import { type Dialect, questions as sampleQuestions } from "./content";
import { type Material, readSaved } from "./storage";
import {
  parsePdfPages,
  requestSchema,
  type AgentResult,
  type AIQuestion,
  type Citation,
  type SourcePage,
} from "../shared/agent";
import { Dual } from "./DeepStudy";
function CitationList({
  items,
  materials,
  sources,
}: {
  items: Citation[];
  materials: Material[];
  sources: SourcePage[];
}) {
  const open = (id: string, page: number) => {
    const file = materials.find((m) => m.id === id);
    if (!file) return;
    const u = file.url || (file.blob ? URL.createObjectURL(file.blob) : "");
    if (!u) return;
    window.open(`${u}#page=${page}`, "_blank", "noopener,noreferrer");
    if (!file.url) setTimeout(() => URL.revokeObjectURL(u), 60000);
  };
  return (
    <div className="ai-citations">
      {items.map((c, i) => {
        const source = sources.find(
          (s) => s.documentId === c.documentId && s.page === c.page,
        );
        return (
          <details key={i}>
            <summary>
              <BookOpen size={13} />
              {source?.name || "Source document"} · PDF page {c.page}
              <ChevronDown size={12} />
            </summary>
            <blockquote dir="auto">“{c.quote}”</blockquote>
            {materials.some((m) => m.id === c.documentId) ? (
              <button
                className="text-link"
                onClick={() => open(c.documentId, c.page)}
              >
                Open original PDF at page {c.page}
                <ArrowRight size={13} />
              </button>
            ) : (
              <small>
                Original PDF is not in this browser’s library. Re-add it to view
                the file.
              </small>
            )}
          </details>
        );
      })}
    </div>
  );
}
export default function AIStudio({
  materials,
  dialect,
  bilingual,
  onLibrary,
}: {
  materials: Material[];
  dialect: Dialect;
  bilingual: boolean;
  onLibrary: () => void;
}) {
  const [collections, setCollections] = useState<AgentResult[]>(() =>
    readSaved("fahm-ai-collections", []),
  );
  const [reviewOffset, setReviewOffset] = useState(0);
  const [accessToken, setAccessToken] = useState("");
  const [consent, setConsent] = useState(false);
  const [focus, setFocus] = useState(
    "Explain the teaching concepts in these pages in depth, then apply them to classroom decisions.",
  );
  const [selected, setSelected] = useState<
    Record<string, { enabled: boolean; from: number; to: number }>
  >({});
  const [mode, setMode] = useState<"build" | "review" | "coach">("build");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<AgentResult | null>(() =>
    readSaved("fahm-ai-result", null),
  );
  const [expanded, setExpanded] = useState<string | null>(null);
  const [qIndex, setQIndex] = useState(0);
  const [studentAnswer, setStudentAnswer] = useState("");
  const [quizChoices, setQuizChoices] = useState<Record<string, number>>({});
  const [checked, setChecked] = useState<string[]>([]);
  const allPages = useMemo(
    () => materials.flatMap((m) => parsePdfPages(m.id, m.name, m.text)),
    [materials],
  );
  const pages = allPages.filter(
    (p) =>
      selected[p.documentId]?.enabled &&
      p.page >= selected[p.documentId].from &&
      p.page <= selected[p.documentId].to,
  );
  const chars = pages.reduce((n, p) => n + p.text.length, 0);
  const pack = result?.pack;
  const [savedPack, setSavedPack] = useState<AgentResult | null>(() => {
    const r = readSaved<AgentResult | null>("fahm-ai-result", null);
    return r?.pack ? r : readSaved<AgentResult | null>("fahm-ai-pack", null);
  });
  const availableQuestions = (pack || savedPack?.pack)?.questions || [];
  const sampleAIQuestions: AIQuestion[] = sampleQuestions.map((q) => ({
    id: q.id,
    subtopicId: q.segmentId,
    level: q.type === "APPLICATION" ? "application" : "understanding",
    stem: { en: q.stem, ar: q.ar },
    options: q.options.map((en, i) => ({ en, ar: q.arOptions[i] })),
    correctIndex: q.correct,
    rationale: { en: q.why, ar: q.arWhy },
    optionFeedback: q.distractors.map((en, i) => ({
      en,
      ar: q.arDistractors[i],
    })),
    citations: q.citations,
  }));
  const questionPool = availableQuestions.length
    ? availableQuestions
    : sampleAIQuestions;
  const reviewQuestions = questionPool.slice(reviewOffset, reviewOffset + 6);

  const updateSelection = (
    m: Material,
    update: Partial<{ enabled: boolean; from: number; to: number }>,
  ) =>
    setSelected((v) => ({
      ...v,
      [m.id]: {
        ...(v[m.id] || { enabled: false, from: 1, to: Math.min(m.pages, 6) }),
        ...update,
      },
    }));
  async function run() {
    setError("");
    if (accessToken.length < 24) {
      setError(
        "Enter your workspace access token (at least 24 characters). This is not your provider API key.",
      );
      return;
    }
    if (!consent) {
      setError(
        "Confirm that the selected excerpts may be sent to the AI provider.",
      );
      return;
    }
    if (
      pages.length === 0 ||
      pages.length > 24 ||
      chars > 80000 ||
      pages.some((p) => p.text.length > 16000)
    ) {
      setError(
        "Select 1–24 readable PDF pages, no more than 80,000 characters total and 16,000 per page. Scanned pages need OCR.",
      );
      return;
    }
    const base = { courseCode: "0402526E" as const, dialect, sources: pages };
    const payload =
      mode === "build"
        ? { ...base, action: "build" as const, focus }
        : mode === "review"
          ? { ...base, action: "review" as const, questions: reviewQuestions }
          : {
              ...base,
              action: "coach" as const,
              question:
                reviewQuestions[Math.min(qIndex, reviewQuestions.length - 1)],
              studentAnswer,
            };
    const valid = requestSchema.safeParse(payload);
    if (!valid.success) {
      setError(
        mode === "coach"
          ? "Write at least 10 characters explaining your reasoning."
          : "Complete the focus and source selection.",
      );
      return;
    }
    setBusy(true);
    try {
      const r = await fetch("/api/agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(285000),
      });
      const type = r.headers.get("content-type") || "";
      if (!type.includes("application/json"))
        throw new Error(
          "The AI server is unavailable here. Run npm run dev locally or deploy the API function on Vercel; static preview supports reading only.",
        );
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || "The AI request failed.");
      setResult(data);
      if (data.pack) {
        setReviewOffset(0);
        const next = [data, ...collections];
        setCollections(next);
        try {
          localStorage.setItem("fahm-ai-collections", JSON.stringify(next));
        } catch {
          setError(
            "The collection could not be saved because browser storage is full. Keep this tab open.",
          );
        }
        setSavedPack(data);
        setExpanded(data.pack.subtopics[0]?.id || null);
        setQuizChoices({});
        setChecked([]);
      }
      try {
        localStorage.setItem("fahm-ai-result", JSON.stringify(data));
        if (data.pack)
          localStorage.setItem("fahm-ai-pack", JSON.stringify(data));
      } catch {
        setError(
          "The result is available below, but browser storage is full. Keep this tab open.",
        );
      }
    } catch (e) {
      setError(
        e instanceof Error && e.name === "TimeoutError"
          ? "The request timed out. Try fewer source pages."
          : e instanceof Error
            ? e.message
            : "Could not reach the AI server. Please retry.",
      );
    } finally {
      setBusy(false);
    }
  }
  const displayed = pack
    ? result
    : savedPack || readSaved<AgentResult | null>("fahm-ai-pack", null);
  const displayPack = displayed?.pack;
  return (
    <>
      <div className="page-heading">
        <div>
          <div className="overline">
            COURSE 0402526E · SOURCE-GROUNDED STUDY
          </div>
          <h1>
            A thoughtful AI study partner<span>.</span>
          </h1>
          <p>
            Go deeper into your material. Build, challenge, and refine your
            understanding.
          </p>
        </div>
        <span className="soft-badge">
          <ShieldCheck size={15} /> REVIEW BEFORE YOU RELY
        </span>
      </div>
      <div className="collection-banner">
        <Info size={20} />
        <div>
          <strong>
            Al Ain University · current midterm defined by your three guides
          </strong>
          <p>
            The current collection covers Introduction to Teaching, ABCD
            Objectives, and Instructional Planning. The full course can be added
            later. The agent uses selected pages only, without assuming the
            lecturer’s exam or retrieving external sources.
          </p>
        </div>
      </div>
      <div className="agent-workflow">
        <span>
          <FileText size={16} />
          Select evidence
        </span>
        <ArrowRight size={15} />
        <span>
          <Sparkles size={16} />
          Develop the explanation
        </span>
        <ArrowRight size={15} />
        <span>
          <ShieldCheck size={16} />
          Independent review
        </span>
        <ArrowRight size={15} />
        <span>
          <BookOpen size={16} />
          Study the draft
        </span>
      </div>
      <div className="ai-layout">
        <section className="agent-config">
          <div className="reader-tabs ai-mode-tabs">
            {[
              ["build", "Build study cards"],
              ["review", "Review questions"],
              ["coach", "Answer feedback"],
            ].map(([id, title]) => (
              <button
                key={id}
                disabled={busy}
                className={mode === id ? "active" : ""}
                onClick={() => {
                  setMode(id as typeof mode);
                  setError("");
                }}
              >
                {title}
              </button>
            ))}
          </div>
          <h2>
            {mode === "build"
              ? "From selected pages to detailed understanding"
              : mode === "review"
                ? "Challenge the answer key and its feedback"
                : "Explain your reasoning. Get specific feedback."}
          </h2>
          <p className="agent-description">
            {mode === "build"
              ? "Generate a focused packet with detailed subtopics, worked examples, four Arabic dialects, and source-cited questions. A separate review pass checks the packet before it is returned."
              : mode === "review"
                ? `Audit ${reviewQuestions.length} ${availableQuestions.length ? "generated" : "midterm"} questions for accuracy, ambiguity, cognitive demand, translation, and feedback quality against your selected sources.`
                : "Get formative feedback on a written explanation, including strengths, gaps, and a reasoned model answer. This is not an official grade."}
          </p>
          <label className="field-label" htmlFor="agent-token">
            <KeyRound size={14} /> Workspace access token
          </label>
          <input
            id="agent-token"
            className="agent-input"
            type="password"
            autoComplete="off"
            spellCheck={false}
            value={accessToken}
            onChange={(e) => setAccessToken(e.target.value)}
            placeholder="Access token set by the workspace owner"
          />
          <small className="field-help">
            Held in memory for this session. Your OpenAI API key belongs only in
            server settings.
          </small>
          {mode !== "build" && questionPool.length > 6 && (
            <>
              <label className="field-label" htmlFor="review-batch">
                Question set · up to six per review
              </label>
              <select
                id="review-batch"
                className="agent-input"
                value={reviewOffset}
                onChange={(e) => {
                  setReviewOffset(Number(e.target.value));
                  setQIndex(0);
                }}
              >
                {Array.from(
                  { length: Math.ceil(questionPool.length / 6) },
                  (_, i) => (
                    <option key={i} value={i * 6}>
                      Questions {i * 6 + 1}–
                      {Math.min(i * 6 + 6, questionPool.length)}
                    </option>
                  ),
                )}
              </select>
            </>
          )}
          <div className="source-select-heading">
            <h3>Choose your source pages</h3>
            <button className="text-link" onClick={onLibrary}>
              Manage PDFs
              <ArrowRight size={13} />
            </button>
          </div>
          {materials.length === 0 ? (
            <div className="ai-empty-source">
              <FileText size={22} />
              <p>
                Add course PDFs to your library before asking the agent to
                develop or verify content.
              </p>
              <button className="secondary" onClick={onLibrary}>
                Add course material
              </button>
            </div>
          ) : (
            materials.map((m) => (
              <div className="source-select" key={m.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={selected[m.id]?.enabled || false}
                    onChange={(e) =>
                      updateSelection(m, { enabled: e.target.checked })
                    }
                  />
                  <span>
                    {m.name}
                    <small>
                      {m.pages} PDF pages ·{" "}
                      {allPages.filter((p) => p.documentId === m.id).length}{" "}
                      with extractable text
                    </small>
                  </span>
                </label>
                {selected[m.id]?.enabled && (
                  <div className="page-range">
                    <label>
                      From page
                      <input
                        type="number"
                        min={1}
                        max={m.pages}
                        value={selected[m.id].from}
                        onChange={(e) =>
                          updateSelection(m, { from: Number(e.target.value) })
                        }
                      />
                    </label>
                    <span>—</span>
                    <label>
                      To page
                      <input
                        type="number"
                        min={selected[m.id].from}
                        max={m.pages}
                        value={selected[m.id].to}
                        onChange={(e) =>
                          updateSelection(m, { to: Number(e.target.value) })
                        }
                      />
                    </label>
                  </div>
                )}
              </div>
            ))
          )}
          <div className="source-budget">
            {pages.length} / 24 readable pages selected ·{" "}
            {chars.toLocaleString()} / 80,000 characters
          </div>
          <small className="field-help">
            PDF page numbers count from the first file page and may differ from
            printed page labels. No pages are silently truncated.
          </small>
          {mode === "build" && (
            <>
              <label className="field-label" htmlFor="agent-focus">
                What should this packet explain in depth?
              </label>
              <textarea
                id="agent-focus"
                className="agent-input"
                rows={4}
                value={focus}
                maxLength={1200}
                onChange={(e) => setFocus(e.target.value)}
              />
            </>
          )}
          {mode === "coach" && (
            <>
              <label className="field-label" htmlFor="coach-question">
                Choose a question
              </label>
              <select
                id="coach-question"
                className="agent-input"
                value={Math.min(qIndex, reviewQuestions.length - 1)}
                onChange={(e) => setQIndex(Number(e.target.value))}
              >
                {reviewQuestions.map((q, i) => (
                  <option key={q.id} value={i}>
                    {i + 1}. {q.stem.en.slice(0, 100)}
                  </option>
                ))}
              </select>
              <p className="coach-stem">
                {
                  reviewQuestions[Math.min(qIndex, reviewQuestions.length - 1)]
                    ?.stem.en
                }
              </p>
              <label className="field-label" htmlFor="student-answer">
                Your reasoning · English or Arabic
              </label>
              <textarea
                id="student-answer"
                className="agent-input"
                rows={5}
                maxLength={6000}
                value={studentAnswer}
                onChange={(e) => setStudentAnswer(e.target.value)}
                placeholder="Explain your choice and why the alternatives are less suitable…"
              />
            </>
          )}
          <label className="ai-consent">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
            />
            <span>
              I agree to send the selected extracted PDF text
              {mode === "coach" ? " and my written answer" : ""} to OpenAI for
              this request. Provider API usage may incur charges.
            </span>
          </label>
          <button
            className="primary agent-run"
            disabled={busy || materials.length === 0}
            onClick={() => void run()}
          >
            {busy ? (
              <>
                <Loader2 size={17} className="spin" />
                Developing and checking…
              </>
            ) : (
              <>
                <Sparkles size={17} />
                {mode === "build"
                  ? "Build & independently review"
                  : mode === "review"
                    ? "Review questions & feedback"
                    : "Give feedback on my answer"}
                <ArrowRight size={16} />
              </>
            )}
          </button>
          {busy && (
            <p className="agent-progress" role="status">
              Careful reasoning can take several minutes. Build mode makes two
              model requests: authoring, then a separate review. Keep this tab
              open.
            </p>
          )}
          {error && (
            <div className="error-notice" role="alert">
              {error}
            </div>
          )}
        </section>
        <aside className="agent-principles">
          <span className="note-icon sage">
            <ShieldCheck size={25} />
          </span>
          <h3>Evidence before confidence.</h3>
          <div>
            <strong>01 · Quality-focused reasoning</strong>
            <p>
              The server defaults to GPT-6 Astra with high reasoning effort. The
              deployment owner can change the model. Access depends on the API
              account.
            </p>
          </div>
          <div>
            <strong>02 · A second look</strong>
            <p>
              A separate reviewer call checks the answer key, every option’s
              feedback, translation, and source support. It uses the same model
              in a new context, so correlated errors remain possible.
            </p>
          </div>
          <div>
            <strong>03 · Verifiable citations</strong>
            <p>
              Every accepted quotation must match a supplied PDF page. Quote
              matching confirms provenance, not the correctness of every
              interpretation.
            </p>
          </div>
          <div>
            <strong>04 · Honest limits</strong>
            <p>
              Generated collections remain drafts. Missing evidence and reviewer
              concerns stay visible. The agent never replaces your lecturer’s
              official scope.
            </p>
          </div>
          <details>
            <summary>Server setup for the owner</summary>
            <p>
              Set FAHM_AI_API_KEY, FAHM_REVIEW_TOKEN (a random value of at least
              24 characters), and optionally FAHM_AI_MODEL in Vercel. Redeploy
              after changing them. Never prefix secrets with VITE_. Use the
              workspace access token here, not the provider key.
            </p>
          </details>
        </aside>
      </div>
      {collections.length > 0 && (
        <section className="saved-ai-collections">
          <div className="section-heading">
            <h2>Your generated collections</h2>
            <span className="count-badge">{collections.length} drafts</span>
          </div>
          <p>
            Each collection covers its selected pages. Review status applies
            only to that collection.
          </p>
          <div className="subtopic-grid">
            {collections.map((r, i) => (
              <button
                key={r.generatedAt + "-" + i}
                className="subtopic-card"
                onClick={() => {
                  setReviewOffset(0);
                  setQIndex(0);
                  setSavedPack(r);
                  setResult(r);
                  setExpanded(r.pack?.subtopics[0]?.id || null);
                  setQuizChoices({});
                  setChecked([]);
                }}
              >
                <span className="eyebrow">
                  {r.review?.verdict.replaceAll("_", " ") || "DRAFT"}
                </span>
                <h3>{r.pack?.title.en}</h3>
                <p>
                  {r.pack?.subtopics.length} subtopics · {r.sources.length}{" "}
                  source pages
                </p>
                <div>
                  <span>{new Date(r.generatedAt).toLocaleDateString()}</span>
                  <ArrowRight size={15} />
                </div>
              </button>
            ))}
          </div>
        </section>
      )}
      {result?.review && (
        <section className={`ai-review-panel ${result.review.verdict}`}>
          <div className="section-heading">
            <h2>
              <ShieldCheck size={22} />
              Independent review
            </h2>
            <span className="review-verdict">
              {result.review.verdict.replaceAll("_", " ")}
            </span>
          </div>
          <Dual value={result.review.summary} arabic={bilingual} />
          <p className="review-meta">
            Model: {result.model} · {result.citationChecks.verified}/
            {result.citationChecks.total} citation quotes matched to selected
            pages · {new Date(result.generatedAt).toLocaleString()}
          </p>
          {result.review.findings.map((f, i) => (
            <div className="review-finding" key={i}>
              <span>
                {f.severity} · {f.targetId}
              </span>
              <Dual value={f.issue} arabic={bilingual} />
              <strong>Suggested correction</strong>
              <Dual value={f.suggestion} arabic={bilingual} />
            </div>
          ))}
          <details>
            <summary>
              Question-by-question audit <ChevronDown size={15} />
            </summary>
            {result.review.questionReviews.map((r) => (
              <div className="question-audit" key={r.questionId}>
                <strong>
                  {r.questionId} · {r.verdict.replaceAll("_", " ")} · reviewer’s
                  answer: {String.fromCharCode(65 + r.correctIndex)}
                </strong>
                <Dual value={r.assessment} arabic={bilingual} />
                <h4>Feedback quality</h4>
                <Dual value={r.feedbackQuality} arabic={bilingual} />
                <CitationList
                  items={r.citations}
                  materials={materials}
                  sources={result.sources}
                />
              </div>
            ))}
          </details>
        </section>
      )}
      {result?.coaching && (
        <section className="ai-review-panel coaching-panel">
          <h2>
            <MessageSquare size={22} />
            Feedback on your reasoning
          </h2>
          <span className="review-verdict">
            {result.coaching.assessment.replaceAll("_", " ")}
          </span>
          <Dual value={result.coaching.feedback} arabic={bilingual} />
          <h3>What is working</h3>
          {result.coaching.strengths.map((v, i) => (
            <Dual key={i} value={v} arabic={bilingual} />
          ))}
          <h3>Your next steps</h3>
          {result.coaching.improvements.map((v, i) => (
            <Dual key={i} value={v} arabic={bilingual} />
          ))}
          <h3>A reasoned model answer</h3>
          <Dual value={result.coaching.modelAnswer} arabic={bilingual} />
          <div className="dialect-callout">
            <p lang="ar" dir="rtl">
              {result.coaching.dialectExplanation}
            </p>
          </div>
          <CitationList
            items={result.coaching.citations}
            materials={materials}
            sources={result.sources}
          />
        </section>
      )}
      {displayPack && displayed && (
        <section className="generated-collection">
          <div className="section-heading">
            <div>
              <span className="overline">
                AI-GENERATED DRAFT · SELECTED SOURCE PAGES ONLY
              </span>
              <h2>{displayPack.title.en}</h2>
            </div>
            <button
              className="icon-button"
              aria-label="Remove generated collection"
              onClick={() => {
                setCollections((v) => {
                  const remaining = v.filter(
                    (r) => r.generatedAt !== displayed.generatedAt,
                  );
                  try {
                    localStorage.setItem(
                      "fahm-ai-collections",
                      JSON.stringify(remaining),
                    );
                  } catch {}
                  return remaining;
                });
                setResult(null);
                setSavedPack(null);
                localStorage.removeItem("fahm-ai-result");
                localStorage.removeItem("fahm-ai-pack");
              }}
            >
              <Trash2 size={17} />
            </button>
          </div>
          <Dual value={displayPack.scope} arabic={bilingual} />
          <div className="coverage-gaps">
            <strong>Scope & evidence gaps</strong>
            {displayPack.coverageGaps.length ? (
              displayPack.coverageGaps.map((g, i) => (
                <Dual key={i} value={g} arabic={bilingual} />
              ))
            ) : (
              <p>
                No additional gaps were identified within the selected excerpt.
                This does not establish whole-course coverage.
              </p>
            )}
          </div>
          <div className="subtopic-grid">
            {displayPack.subtopics.map((s, i) => (
              <button
                key={s.id}
                className={`subtopic-card ${expanded === s.id ? "active" : ""}`}
                onClick={() => setExpanded(expanded === s.id ? null : s.id)}
                aria-expanded={expanded === s.id}
              >
                <span className="subtopic-index">
                  0{i + 1}
                  <span>SOURCE-GROUNDED DRAFT</span>
                </span>
                <h3>{s.title.en}</h3>
                {bilingual && (
                  <p className="arabic" lang="ar" dir="rtl">
                    {s.title.ar}
                  </p>
                )}
                <div>
                  <span>{s.citations.length} source citations</span>
                  <ArrowRight size={17} />
                </div>
              </button>
            ))}
          </div>
          {displayPack.subtopics
            .filter((s) => s.id === expanded)
            .map((s) => (
              <article className="study-paper expanded-segment" key={s.id}>
                <h2>{s.title.en}</h2>
                <div className="segment-goal">
                  <CheckCircle2 size={20} />
                  <div>
                    <Dual value={s.objective} arabic={bilingual} />
                  </div>
                </div>
                <h3>The concept, in depth</h3>
                <Dual value={s.concept} arabic={bilingual} />
                <h3>From concept to application</h3>
                <Dual value={s.application} arabic={bilingual} />
                <div className="worked-case">
                  <span className="eyebrow">
                    ILLUSTRATIVE WORKED CLASSROOM EXAMPLE
                  </span>
                  <Dual value={s.workedExample} arabic={bilingual} />
                </div>
                <h3>Terms side by side</h3>
                <div className="comparison-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Concept</th>
                        <th>Meaning & distinction</th>
                      </tr>
                    </thead>
                    <tbody>
                      {s.comparison.map((r, i) => (
                        <tr key={i}>
                          <td>
                            <Dual value={r.term} arabic={bilingual} />
                          </td>
                          <td>
                            <Dual value={r.meaning} arabic={bilingual} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="dialect-callout">
                  <span className="eyebrow">
                    THE IDEA IN YOUR CHOSEN ARABIC DIALECT
                  </span>
                  <p lang="ar" dir="rtl">
                    {s.dialectExplanation[dialect]}
                  </p>
                </div>
                <div className="takeaway">
                  <Lightbulb size={22} />
                  <div>
                    <span className="eyebrow">COMMON MISCONCEPTION</span>
                    <Dual value={s.misconception} arabic={bilingual} />
                  </div>
                </div>
                <div className="segment-check">
                  <Dual value={s.selfCheck} arabic={bilingual} />
                  <details>
                    <summary>
                      Reveal the model answer
                      <ChevronDown size={14} />
                    </summary>
                    <Dual value={s.modelAnswer} arabic={bilingual} />
                  </details>
                </div>
                <CitationList
                  items={s.citations}
                  materials={materials}
                  sources={displayed.sources}
                />
              </article>
            ))}
          <div className="study-paper ai-question-bank">
            <h2>Apply what you’ve studied</h2>
            <p>
              Draft questions retain their author’s answer key. Check the
              independent audit above for disagreements; unsupported items
              require correction before use.
            </p>
            <div className="coverage-map">
              <h3>Coverage within this packet</h3>
              {displayPack.subtopics.map((s) => (
                <div key={s.id}>
                  <span>{s.title.en}</span>
                  <span>
                    {displayPack.questions
                      .filter((q) => q.subtopicId === s.id)
                      .map((q) => `${q.id} (${q.level})`)
                      .join(" · ") || "No question yet · coverage gap"}
                  </span>
                </div>
              ))}
            </div>
            {displayPack.questions.map((q, i) => (
              <div className="generated-question" key={q.id}>
                <span className="eyebrow">
                  QUESTION {i + 1} · {q.level.toUpperCase()} · {q.subtopicId}
                </span>
                <h3>{q.stem.en}</h3>
                {bilingual && (
                  <p className="arabic" dir="rtl" lang="ar">
                    {q.stem.ar}
                  </p>
                )}
                <div className="quiz-options">
                  {q.options.map((o, n) => (
                    <button
                      key={n}
                      disabled={checked.includes(q.id)}
                      className={`quiz-option ${quizChoices[q.id] === n ? "chosen" : ""} ${checked.includes(q.id) && q.correctIndex === n ? "correct" : ""} ${checked.includes(q.id) && quizChoices[q.id] === n && q.correctIndex !== n ? "incorrect" : ""}`}
                      onClick={() =>
                        setQuizChoices((v) => ({ ...v, [q.id]: n }))
                      }
                    >
                      <span className="option-letter">
                        {String.fromCharCode(65 + n)}
                      </span>
                      <div>
                        <Dual value={o} arabic={bilingual} />
                      </div>
                    </button>
                  ))}
                </div>
                {!checked.includes(q.id) ? (
                  <button
                    className="secondary"
                    disabled={quizChoices[q.id] === undefined}
                    onClick={() => setChecked((v) => [...v, q.id])}
                  >
                    Check against draft answer
                  </button>
                ) : (
                  <div className="answer-feedback">
                    <strong>
                      {quizChoices[q.id] === q.correctIndex
                        ? "Your choice matches the draft key."
                        : "Compare your reasoning with the draft key."}
                    </strong>
                    <Dual value={q.rationale} arabic={bilingual} />
                    <details>
                      <summary>Explanation of every option</summary>
                      {q.optionFeedback.map((f, n) => (
                        <div className="distractor" key={n}>
                          <strong>{String.fromCharCode(65 + n)}</strong>
                          <div>
                            <Dual value={f} arabic={bilingual} />
                          </div>
                        </div>
                      ))}
                    </details>
                    <CitationList
                      items={q.citations}
                      materials={materials}
                      sources={displayed.sources}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
