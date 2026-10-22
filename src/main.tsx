import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  LayoutDashboard,
  Layers3,
  ClipboardCheck,
  FolderOpen,
  Search,
  ChevronDown,
  ChevronRight,
  Check,
  Plus,
  X,
  Sparkles,
  Clock3,
  Globe2,
  GraduationCap,
  Leaf,
  Bookmark,
  Upload,
  FileText,
  Trash2,
  Download,
  CheckCircle2,
  Circle,
  RotateCcw,
  Lightbulb,
  Menu,
  ExternalLink,
  PanelLeftClose,
  Target,
  ListChecks,
  Info,
} from "lucide-react";
import {
  topics,
  questions,
  dialects,
  voice,
  type Dialect,
  type Topic,
} from "./content";
import EvidenceRegister from "./EvidenceRegister";
import TerminologyPanel from "./TerminologyPanel";
import MidtermVisuals from "./MidtermVisuals";
import SourceNotes from "./SourceNotes";
import { courseMaterials } from "./midterm/sources";
import DeepStudy from "./DeepStudy";
import CoverageMap from "./CoverageMap";
import CaseLab from "./CaseLab";
const AIStudio = lazy(() => import("./AIStudio"));
import { materialsDB, readSaved, scoreAnswers, type Material } from "./storage";
import "@fontsource-variable/dm-sans";
import "@fontsource-variable/manrope";
import "@fontsource-variable/noto-sans-arabic";
import "./styles.css";
import pdfWorkerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";
type Page =
  | "dashboard"
  | "topics"
  | "practice"
  | "library"
  | "saved"
  | "agent"
  | "evidence";
function App() {
  const [page, setPage] = useState<Page>("dashboard");
  const [dialect, setDialect] = useState<Dialect>(() =>
    readSaved("fahm-dialect", "jordanian"),
  );
  const [bilingual, setBilingual] = useState(true);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [topic, setTopic] = useState<Topic | null>(null);
  const [tab, setTab] = useState("overview");
  const [completed, setCompleted] = useState<string[]>(() =>
    readSaved("fahm-midterm-completed", []),
  );
  const [bookmarks, setBookmarks] = useState<string[]>(() =>
    readSaved("fahm-midterm-bookmarks", []),
  );
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState("");
  const [about, setAbout] = useState(false);
  const [materials, setMaterials] = useState<Material[]>(courseMaterials);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [drag, setDrag] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);
  const [exam, setExam] = useState(false);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState<string[]>([]);
  const [finished, setFinished] = useState(false);
  const [examTopic, setExamTopic] = useState("all");
  const [best, setBest] = useState<number>(() =>
    readSaved("fahm-midterm-best", 0),
  );
  useEffect(() => {
    materialsDB("list")
      .then((items) => setMaterials([...courseMaterials, ...items]))
      .catch(() =>
        setUploadError(
          "Browser storage is unavailable. Use a normal browser window to keep your PDFs.",
        ),
      );
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem("fahm-dialect", JSON.stringify(dialect));
      localStorage.setItem("fahm-midterm-completed", JSON.stringify(completed));
      localStorage.setItem("fahm-midterm-bookmarks", JSON.stringify(bookmarks));
      localStorage.setItem("fahm-midterm-best", JSON.stringify(best));
    } catch {
      setToast(
        "Your browser could not save progress. Progress will last for this session.",
      );
    }
  }, [dialect, completed, bookmarks, best]);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 4200);
    return () => clearTimeout(t);
  }, [toast]);
  const selectedDialect = dialects.find((d) => d.id === dialect)!;
  const activeQuestions = questions.filter(
    (q) => examTopic === "all" || q.topic === examTopic,
  );
  const result = scoreAnswers(answers, activeQuestions);
  const current = activeQuestions[index];
  const navigate = (p: Page) => {
    setPage(p);
    setTopic(null);
    setSearch("");
    setMobile(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const openTopic = (t: Topic) => {
    setTopic(t);
    setTab("deep");
    setPage("topics");
    setSearch("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const bookmark = (id: string) => {
    setBookmarks((v) =>
      v.includes(id) ? v.filter((x) => x !== id) : [...v, id],
    );
  };
  const startExam = () => {
    setAnswers({});
    setIndex(0);
    setRevealed([]);
    setFinished(false);
    setExam(true);
  };
  async function uploadFiles(files: FileList | File[] | null) {
    if (!files) return;
    setUploadError("");
    setUploading(true);
    const errors: string[] = [];
    try {
      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;
      for (const file of Array.from(files)) {
        if (!file.name.toLowerCase().endsWith(".pdf")) {
          errors.push(`${file.name}: please choose a PDF.`);
          continue;
        }
        if (file.size > 30 * 1024 * 1024) {
          errors.push(`${file.name}: maximum file size is 30 MB.`);
          continue;
        }
        try {
          const doc = await pdfjs.getDocument({
            data: new Uint8Array(await file.arrayBuffer()),
          }).promise;
          const parts: string[] = [];
          for (let n = 1; n <= doc.numPages; n++) {
            const p = await doc.getPage(n);
            const txt = await p.getTextContent();
            parts.push(
              `[Page ${n}]\n` +
                txt.items.map((i) => ("str" in i ? i.str : "")).join(" "),
            );
          }
          const m: Material = {
            id: crypto.randomUUID(),
            name: file.name,
            size: file.size,
            pages: doc.numPages,
            text: parts.join("\n\n"),
            added: new Date().toISOString(),
            blob: file,
          };
          await materialsDB("put", m);
          setMaterials((v) => [...v, m]);
          await doc.destroy();
        } catch (error) {
          console.error(
            "PDF processing failed",
            error instanceof Error ? error.message : String(error),
          );
          errors.push(
            `${file.name}: could not read this PDF. Check that it is valid and not password protected.`,
          );
        }
      }
    } catch {
      errors.push("PDF reader could not load. Please try again.");
    } finally {
      setUploadError(errors.join(" "));
      setUploading(false);
      if (fileInput.current) fileInput.current.value = "";
    }
  }
  async function removeMaterial(m: Material) {
    try {
      await materialsDB("delete", m.id);
      setMaterials((v) => v.filter((x) => x.id !== m.id));
      setToast("PDF removed from this browser.");
    } catch {
      setUploadError("Could not remove this file. Please try again.");
    }
  }
  const download = (m: Material) => {
    const u = m.url || (m.blob ? URL.createObjectURL(m.blob) : "");
    if (!u) return;
    const a = document.createElement("a");
    a.href = u;
    a.download = m.name;
    a.click();
    if (!m.url) setTimeout(() => URL.revokeObjectURL(u), 1000);
  };
  const filtered = topics.filter(
    (t) =>
      (page !== "saved" || bookmarks.includes(t.id)) &&
      (
        t.title +
        " " +
        t.ar +
        " " +
        t.description +
        " " +
        t.keywords.map((k) => k.en + " " + k.ar).join(" ")
      )
        .toLowerCase()
        .includes(search.toLowerCase()),
  );
  const topicCard = (t: Topic) => (
    <article key={t.id} className="topic-card">
      <div className={`topic-illustration ${t.color}`}>
        <span className="unit-number">CHAPTER {t.number}</span>
        <button
          className={`bookmark ${bookmarks.includes(t.id) ? "selected" : ""}`}
          onClick={() => bookmark(t.id)}
          aria-label={`${bookmarks.includes(t.id) ? "Unsave" : "Save"} ${t.title}`}
        >
          <Bookmark
            size={17}
            fill={bookmarks.includes(t.id) ? "currentColor" : "none"}
          />
        </button>
        <TopicArt kind={t.id} />
        <span className="illustration-tag">{t.ar}</span>
      </div>
      <div className="topic-card-body">
        <span className="eyebrow">{t.category}</span>
        <button className="topic-title" onClick={() => openTopic(t)}>
          {t.title}
          <ArrowUpRight size={19} />
        </button>
        <p>{t.description}</p>
        <div className="topic-card-footer">
          <span>
            <Clock3 size={13} />
            {t.minutes} min read
          </span>
          {completed.includes(t.id) ? (
            <span className="done">
              <Check size={14} />
              Reviewed
            </span>
          ) : (
            <button onClick={() => openTopic(t)}>
              Explore topic <ArrowRight size={14} />
            </button>
          )}
        </div>
      </div>
    </article>
  );
  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobile ? "mobile-open" : ""}`}>
        <a
          href="#"
          className="brand"
          onClick={(e) => {
            e.preventDefault();
            navigate("dashboard");
          }}
        >
          <span className="brand-mark">
            <BookOpen size={23} />
          </span>
          <span>
            fahm<span className="brand-dot">.</span>
            <small>فَهْم</small>
          </span>
        </a>
        <button
          className="mobile-close icon-button"
          onClick={() => setMobile(false)}
          aria-label="Close menu"
        >
          <X />
        </button>
        <div className="workspace-label">YOUR LEARNING SPACE</div>
        <nav>
          {[
            { id: "dashboard", label: "Overview", icon: LayoutDashboard },
            { id: "topics", label: "Study topics", icon: Layers3 },
            { id: "practice", label: "Practice & exams", icon: ClipboardCheck },
            { id: "library", label: "My materials", icon: FolderOpen },
            { id: "agent", label: "AI Studio", icon: Sparkles },
            { id: "saved", label: "Saved notes", icon: Bookmark },
            { id: "evidence", label: "Sources & review", icon: BookOpen },
          ].map((n) => (
            <button
              key={n.id}
              aria-label={n.label}
              className={page === n.id ? "nav-item active" : "nav-item"}
              onClick={() => navigate(n.id as Page)}
            >
              <n.icon size={19} />
              {n.label}
              {n.id === "library" && materials.length > 0 && (
                <span className="nav-count">{materials.length}</span>
              )}
              {page === n.id && <span className="active-dot" />}
            </button>
          ))}
        </nav>
        <div className="sidebar-course">
          <span className="tiny-label">CURRENT COURSE</span>
          <div className="course-symbol">
            <GraduationCap size={21} />
          </div>
          <strong>Methods of Teaching</strong>
          <span className="arabic" lang="ar">
            طرائق التدريس
          </span>
          <small dir="ltr">0402526E · CURRENT MIDTERM</small>
          <div className="course-term">
            MIDTERM COLLECTION <span>3 GUIDES</span>
          </div>
          <div className="progress-track">
            <div
              style={{ width: `${(completed.length / topics.length) * 100}%` }}
            />
          </div>
          <small>{completed.length} of 3 midterm chapters reviewed</small>
        </div>
        <div className="sidebar-bottom">
          <div className="little-leaf">
            <Leaf size={18} />
          </div>
          <p>
            A little progress.
            <br />A deeper understanding.
          </p>
          <button onClick={() => setAbout(true)}>
            <Info size={16} /> About this workspace <ArrowUpRight size={13} />
          </button>
        </div>
      </aside>
      {mobile && (
        <div className="sidebar-shade" onClick={() => setMobile(false)} />
      )}
      <div className="main-shell">
        <header className="topbar">
          <div className="breadcrumb">
            <button
              className="mobile-menu icon-button"
              aria-label="Open menu"
              onClick={() => setMobile(true)}
            >
              <Menu />
            </button>
            <span>My workspace</span>
            <ChevronRight size={14} />
            <strong>Methods of Teaching</strong>
          </div>
          <div className="topbar-actions">
            <span className="bilingual-tag">
              <span />
              Bilingual learning
            </span>
            <div className="language-picker">
              <button
                className="language-button"
                onClick={() => setLanguageOpen(!languageOpen)}
                aria-expanded={languageOpen}
              >
                <Globe2 size={16} />
                <span>EN + {selectedDialect.name} AR</span>
                <ChevronDown size={13} />
              </button>
              {languageOpen && (
                <div className="language-menu">
                  <span className="eyebrow">EXPLANATION LANGUAGE</span>
                  <p>Academic terms stay in standard Arabic.</p>
                  {dialects.map((d) => (
                    <button
                      key={d.id}
                      onClick={() => {
                        setDialect(d.id);
                        setLanguageOpen(false);
                      }}
                    >
                      <span>
                        {d.flag} English + {d.name}
                      </span>
                      <span lang="ar">{d.arabic}</span>
                      {dialect === d.id && <Check size={15} />}
                    </button>
                  ))}
                  <label className="bilingual-toggle">
                    <input
                      type="checkbox"
                      checked={bilingual}
                      onChange={(e) => setBilingual(e.target.checked)}
                    />{" "}
                    Show Arabic alongside English
                  </label>
                </div>
              )}
            </div>
            <div className="avatar" title="Local study workspace">
              S
            </div>
          </div>
        </header>
        <main>
          {page === "dashboard" && !topic && (
            <>
              <div className="page-heading">
                <div>
                  <div className="overline">
                    <span className="line" /> A LITTLE CLARITY, EVERY DAY
                  </div>
                  <h1>
                    Make room for understanding<span>.</span>
                  </h1>
                  <p>Your ideas, connected. Your learning, made clearer.</p>
                </div>
                <span className="heading-arabic" dir="rtl" lang="ar">
                  نفهمها، خطوة بخطوة <Sparkles size={17} />
                </span>
              </div>
              <section className="hero">
                <div className="hero-content">
                  <div className="hero-label">
                    <span className="pill-dot" /> YOUR MIDTERM, MADE MANAGEABLE
                  </div>
                  <h2>
                    Big ideas.
                    <br />A clearer picture.
                  </h2>
                  <p>
                    Go beyond memorizing. Connect the concepts,
                    <br className="desktop-break" /> see them in action, and
                    make them yours.
                  </p>
                  {bilingual && (
                    <p className="hero-arabic" dir="rtl" lang="ar">
                      {voice[dialect].intro}
                    </p>
                  )}
                  <button
                    className="primary"
                    onClick={() =>
                      openTopic(
                        topics.find((t) => !completed.includes(t.id)) ||
                          topics[0],
                      )
                    }
                  >
                    Let’s start learning <ArrowUpRight size={18} />
                  </button>
                  <div className="hero-footnote">
                    <BookOpen size={13} />
                    Methods of Teaching <span>·</span>Current midterm · 3
                    supplied guides
                  </div>
                </div>
                <div className="hero-art" aria-hidden="true">
                  <div className="orbit orbit-one" />
                  <div className="orbit orbit-two" />
                  <div className="art-spark spark-one">✦</div>
                  <div className="art-spark spark-two">✳</div>
                  <span className="art-word">فَهْم</span>
                  <div className="floating-note note-one">
                    <span className="note-icon peach">
                      <Lightbulb size={19} />
                    </span>
                    <div>
                      Connect the dots<small>اربط الأفكار ببعض</small>
                    </div>
                    <span className="note-tick">
                      <Check size={13} />
                    </span>
                  </div>
                  <div className="book-stack">
                    <div className="book-back" />
                    <div className="book-page" />
                    <div className="book-cover">
                      <span className="book-top">A LITTLE CURIOSITY</span>
                      <div className="book-flower">
                        <i />
                        <i />
                        <i />
                        <i />
                        <i />
                        <i />
                        <i />
                        <i />
                        <b />
                      </div>
                      <span className="book-title">
                        The art of
                        <br />
                        understanding.
                      </span>
                      <span className="book-bottom">
                        THINK · CONNECT · GROW
                      </span>
                    </div>
                  </div>
                  <div className="floating-note note-two">
                    <span className="note-icon sage">
                      <CheckCircle2 size={19} />
                    </span>
                    <div>
                      Understand. Don’t just memorize.
                      <small>الفهم قبل الحفظ</small>
                    </div>
                  </div>
                  <div className="art-caption">
                    GOOD THINGS TAKE UNDERSTANDING.
                  </div>
                </div>
              </section>
              <section className="stats-row">
                <Stat
                  icon={<Layers3 size={20} />}
                  label="Study topics"
                  value="03"
                  detail="Connected, not scattered"
                />
                <Stat
                  icon={<Globe2 size={20} />}
                  label="Ways to understand"
                  value="EN + AR"
                  detail="Your language. Your pace."
                />
                <Stat
                  icon={<ClipboardCheck size={20} />}
                  label="Practice questions"
                  value={String(questions.length)}
                  detail="Every answer has a why"
                />
                <Stat
                  icon={<Target size={20} />}
                  label="Your progress"
                  value={`${Math.round((completed.length / topics.length) * 100)}%`}
                  detail={`${completed.length} of 3 midterm chapters reviewed`}
                />
              </section>
              <div className="content-columns">
                <section className="learning-section">
                  <div className="section-heading">
                    <div>
                      <div className="overline">
                        THE BIG PICTURE, BROKEN DOWN
                      </div>
                      <h2>
                        Your learning path{" "}
                        <span className="count-badge">18 subtopics</span>
                      </h2>
                    </div>
                    <button
                      className="text-link"
                      onClick={() => navigate("topics")}
                    >
                      View all topics <ArrowRight size={15} />
                    </button>
                  </div>
                  <div className="topic-grid">
                    {topics.slice(0, 2).map(topicCard)}
                  </div>
                  <div className="demo-note">
                    <Info size={15} />
                    <span>
                      Includes 18 detailed subtopics. Current midterm scope is
                      the three supplied guides; the full university syllabus is
                      not assumed.
                    </span>
                  </div>
                </section>
                <aside className="right-column">
                  <div className="practice-promo">
                    <div className="promo-top">
                      <span className="note-icon lavender">
                        <Sparkles size={20} />
                      </span>
                      <span className="tiny-label">
                        PUT IDEAS INTO PRACTICE
                      </span>
                    </div>
                    <h3>
                      Knowing it is good.
                      <br />
                      Using it is better.
                    </h3>
                    <p>
                      Classroom scenarios that test your understanding, with
                      feedback that explains the why.
                    </p>
                    <div className="promo-meta">
                      <span>90 source-linked questions</span>
                      <span>Untimed</span>
                    </div>
                    <button onClick={() => navigate("practice")}>
                      Try a practice session <ArrowUpRight size={17} />
                    </button>
                  </div>
                  <div className="material-promo">
                    <div className="section-heading">
                      <h3>
                        Your material,
                        <br />a clearer starting point.
                      </h3>
                      <FolderOpen size={23} />
                    </div>
                    <p>
                      Three course guides, already included.
                      <br />
                      Read, trace, and build from the source.
                    </p>
                    <button
                      className="text-link"
                      onClick={() => navigate("agent")}
                    >
                      Build with AI Studio <Sparkles size={16} />
                    </button>
                  </div>
                </aside>
              </div>
              <div className="bottom-thought">
                <Leaf size={16} />
                <span>
                  Understanding isn’t about making ideas smaller. It’s about
                  making them clearer.
                </span>
                <span className="arabic" lang="ar">
                  الفكرة بعمقها، الشرح ببساطته.
                </span>
              </div>
            </>
          )}
          {(page === "topics" || page === "saved") && !topic && (
            <>
              <div className="page-heading">
                <div>
                  <div className="overline">
                    {page === "saved"
                      ? "KEEP THE IDEAS THAT MATTER"
                      : "ONE CONCEPT AT A TIME"}
                  </div>
                  <h1>
                    {page === "saved"
                      ? "Your saved notes"
                      : "Your learning path"}
                    <span>.</span>
                  </h1>
                  <p>
                    {page === "saved"
                      ? "The explanations you want to come back to."
                      : "A connected journey from educational theory to classroom practice."}
                  </p>
                </div>
              </div>
              <div className="collection-banner">
                <BookOpen size={20} />
                <div>
                  <strong>Current midterm collection</strong>
                  <p>
                    Based on the three uploaded topic guides, with 18 detailed
                    subtopics and 90 source-linked questions. This is the
                    current midterm scope; full-course material can be added
                    later.
                  </p>
                </div>
              </div>
              <div className="ai-collection-entry">
                <div>
                  <span className="eyebrow">
                    COURSE 0402526E · 18 DETAILED SUBTOPICS
                  </span>
                  <h3>Go deeper, then build from your own sources.</h3>
                  <p>
                    Open any chapter for detailed subtopic cards, or use AI
                    Studio to create and review a source-cited collection from
                    your PDFs.
                  </p>
                </div>
                <button className="secondary" onClick={() => navigate("agent")}>
                  <Sparkles size={16} />
                  Open AI Studio
                  <ArrowRight size={14} />
                </button>
              </div>
              <div className="filter-row">
                <span>
                  {filtered.length} {filtered.length === 1 ? "topic" : "topics"}
                </span>
                <label className="search-box">
                  <Search size={17} />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search concepts or Arabic terms…"
                  />
                  {search && (
                    <button
                      className="icon-button"
                      aria-label="Clear search"
                      onClick={() => setSearch("")}
                    >
                      <X size={14} />
                    </button>
                  )}
                </label>
              </div>
              <div className="topic-grid all-topics">
                {filtered.map(topicCard)}
              </div>
              {filtered.length === 0 && (
                <div className="empty-state">
                  <Bookmark size={34} />
                  <h3>
                    {page === "saved" && !search
                      ? "A place for your favorite ideas"
                      : "No topics found"}
                  </h3>
                  <p>
                    {page === "saved" && !search
                      ? "Tap the bookmark on a topic to save it here."
                      : "Try another concept or search in Arabic."}
                  </p>
                  <button
                    className="secondary"
                    onClick={() => {
                      navigate("topics");
                    }}
                  >
                    Explore study topics <ArrowRight size={15} />
                  </button>
                </div>
              )}
            </>
          )}
          {topic && (
            <>
              <button
                className="back-link"
                onClick={() => {
                  setTopic(null);
                  setPage("topics");
                }}
              >
                <ArrowLeft size={15} />
                All study topics
              </button>
              <div className="topic-header">
                <div>
                  <div className="overline">
                    CHAPTER {topic.number} · {topic.category}
                  </div>
                  <h1>
                    {topic.title}
                    <span>.</span>
                  </h1>
                  {bilingual && (
                    <h2 dir="rtl" className="arabic topic-ar-title" lang="ar">
                      {topic.ar}
                    </h2>
                  )}
                  <p>{topic.description}</p>
                </div>
                <button
                  className={`secondary ${bookmarks.includes(topic.id) ? "saved-button" : ""}`}
                  onClick={() => bookmark(topic.id)}
                >
                  <Bookmark
                    size={16}
                    fill={
                      bookmarks.includes(topic.id) ? "currentColor" : "none"
                    }
                  />
                  {bookmarks.includes(topic.id) ? "Saved" : "Save notes"}
                </button>
              </div>
              <div className="reader-tabs">
                {[
                  ["deep", "Detailed subtopics"],
                  ["overview", "Study notes"],
                  ["visual", "Visual guide"],
                  ["terms", "Key terms & sources"],
                ].map(([id, label]) => (
                  <button
                    key={id}
                    className={tab === id ? "active" : ""}
                    onClick={() => setTab(id)}
                  >
                    {label}
                  </button>
                ))}
              </div>
              {tab === "deep" && (
                <>
                  <DeepStudy
                    topicId={topic.id}
                    bilingual={bilingual}
                    dialect={dialect}
                  />
                  <div className="chapter-review-action">
                    <button
                      className="secondary"
                      onClick={() =>
                        setCompleted((v) =>
                          v.includes(topic.id)
                            ? v.filter((x) => x !== topic.id)
                            : [...v, topic.id],
                        )
                      }
                    >
                      <CheckCircle2 size={17} />
                      {completed.includes(topic.id)
                        ? "Chapter reviewed · undo"
                        : "Mark chapter as reviewed"}
                    </button>
                    <small>
                      Reading progress records review, not exam mastery.
                    </small>
                  </div>
                </>
              )}
              {tab === "overview" && (
                <div className="reader-layout">
                  <article className="study-paper">
                    <div className="eyebrow">
                      <Clock3 size={14} />
                      {topic.minutes} MIN READ · MIDTERM COURSE NOTES
                    </div>
                    <h2>The idea, clearly.</h2>
                    <p className="reading-text">{topic.explanation}</p>
                    {bilingual && (
                      <p
                        dir="rtl"
                        lang="ar"
                        className="reading-text arabic arabic-block"
                      >
                        {topic.arExplanation}
                      </p>
                    )}
                    <div className="dialect-callout">
                      <span className="eyebrow">
                        {selectedDialect.flag} IN EVERYDAY{" "}
                        {selectedDialect.name.toUpperCase()} ARABIC
                      </span>
                      <p dir="rtl" lang="ar">
                        {topic.dialect[dialect]}
                      </p>
                      <small>
                        Technical terms retain their standard Arabic meaning.
                      </small>
                    </div>
                    <h2>See it in the classroom</h2>
                    <div className="classroom-example">
                      <span className="note-icon peach">
                        <GraduationCap size={20} />
                      </span>
                      <p>{topic.example}</p>
                    </div>
                    {bilingual && (
                      <p dir="rtl" lang="ar" className="reading-text arabic">
                        {topic.arExample}
                      </p>
                    )}
                    <div className="takeaway">
                      <Lightbulb size={23} />
                      <div>
                        <span className="eyebrow">TAKE THIS WITH YOU</span>
                        <p>{topic.takeaway}</p>
                        {bilingual && (
                          <p className="arabic" dir="rtl" lang="ar">
                            {topic.arTakeaway}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="source-note">
                      <strong>
                        <BookOpen size={14} />
                        Source & scope
                      </strong>
                      <p>{topic.source}</p>
                    </div>
                  </article>
                  <aside className="reader-aside">
                    <div className="objectives">
                      <span className="eyebrow">
                        AFTER THIS TOPIC, YOU CAN…
                      </span>
                      {topic.objectives.map((o, i) => (
                        <div key={o}>
                          <CheckCircle2 size={17} />
                          <p>
                            {o}
                            {bilingual && (
                              <span className="arabic" dir="rtl" lang="ar">
                                {topic.arObjectives[i]}
                              </span>
                            )}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="review-card">
                      <h3>Make it stick.</h3>
                      <p>
                        Try a scenario and explain your reasoning before
                        revealing the answer.
                      </p>
                      <button
                        className="primary"
                        onClick={() => {
                          setTopic(null);
                          setPage("practice");
                          setExam(false);
                          setExamTopic(topic.id);
                        }}
                      >
                        Practice this topic <ArrowRight size={15} />
                      </button>
                    </div>
                    <button
                      className={`secondary review-button ${completed.includes(topic.id) ? "saved-button" : ""}`}
                      onClick={() =>
                        setCompleted((v) =>
                          v.includes(topic.id)
                            ? v.filter((x) => x !== topic.id)
                            : [...v, topic.id],
                        )
                      }
                    >
                      {completed.includes(topic.id) ? (
                        <CheckCircle2 size={17} />
                      ) : (
                        <Circle size={17} />
                      )}{" "}
                      {completed.includes(topic.id)
                        ? "Marked as reviewed"
                        : "Mark as reviewed"}
                    </button>
                    <small className="review-disclaimer">
                      Reviewed tracks reading progress, not mastery.
                    </small>
                  </aside>
                </div>
              )}
              {tab === "visual" && (
                <MidtermVisuals
                  topicId={topic.id}
                  bilingual={bilingual}
                  dialect={dialect}
                />
              )}
              {tab === "terms" && <TerminologyPanel topicId={topic.id} />}
            </>
          )}
          {page === "practice" && !topic && (
            <>
              <div className="page-heading">
                <div>
                  <div className="overline">
                    TURN KNOWLEDGE INTO UNDERSTANDING
                  </div>
                  <h1>
                    Practice with purpose<span>.</span>
                  </h1>
                  <p>
                    Think like a teacher. Explain the why. Learn from every
                    answer.
                  </p>
                </div>
                <span className="soft-badge">
                  <Sparkles size={14} /> MIDTERM PRACTICE BANK
                </span>
              </div>
              {!exam ? (
                <>
                  <div className="exam-intro">
                    <div className="exam-intro-main">
                      <span className="note-icon lavender">
                        <ClipboardCheck size={27} />
                      </span>
                      <h2>
                        A small challenge.
                        <br />A deeper understanding.
                      </h2>
                      <p>
                        Work through classroom scenarios and concept checks.
                        Each answer includes a rationale, an explanation of
                        every option, and the reference behind the idea.
                      </p>
                      <div className="exam-features">
                        <span>
                          <ListChecks size={17} />
                          {activeQuestions.length} questions
                        </span>
                        <span>
                          <Clock3 size={17} />
                          Untimed
                        </span>
                        <span>
                          <Globe2 size={17} />
                          English + Arabic
                        </span>
                      </div>
                      <label className="field-label" htmlFor="exam-topic">
                        What would you like to practice?
                      </label>
                      <select
                        id="exam-topic"
                        value={examTopic}
                        onChange={(e) => setExamTopic(e.target.value)}
                      >
                        <option value="all">
                          All midterm topics · 90 questions
                        </option>
                        {topics.map((t) => (
                          <option key={t.id} value={t.id}>
                            {t.title}
                          </option>
                        ))}
                      </select>
                      <button className="primary" onClick={startExam}>
                        Start practice <ArrowUpRight size={18} />
                      </button>
                    </div>
                    <aside className="exam-guidance">
                      <span className="overline">
                        A THOUGHTFUL WAY TO PRACTICE
                      </span>
                      <div>
                        <span>01</span>
                        <section>
                          <h3>Read the situation</h3>
                          <p>
                            Look for the learning mechanism, not just the
                            keywords.
                          </p>
                        </section>
                      </div>
                      <div>
                        <span>02</span>
                        <section>
                          <h3>Commit to a choice</h3>
                          <p>Decide why it is better than the alternatives.</p>
                        </section>
                      </div>
                      <div>
                        <span>03</span>
                        <section>
                          <h3>Learn from the feedback</h3>
                          <p>Use the explanation to refine your thinking.</p>
                        </section>
                      </div>
                      <p className="arabic" dir="rtl" lang="ar">
                        {voice[dialect].encourage}
                      </p>
                    </aside>
                  </div>
                  <CoverageMap />
                  <CaseLab bilingual={bilingual} />
                  <div className="collection-banner">
                    <Info size={20} />
                    <div>
                      <strong>Current midterm coverage & limits</strong>
                      <p>
                        90 questions map to all 18 subtopics from your three
                        guides. Practice combines recall and application. The
                        guides define this collection’s scope, not the
                        lecturer’s exact exam. Dick & Carey details remain a
                        flagged gap in the source.
                      </p>
                    </div>
                  </div>
                </>
              ) : finished ? (
                <div className="results-panel">
                  <span className="result-icon">
                    <GraduationCap size={38} />
                  </span>
                  <div className="overline">PRACTICE COMPLETE</div>
                  <h2>You’re building understanding.</h2>
                  <p>{voice[dialect].encourage}</p>
                  <div className="result-score">
                    {result.correct}
                    <span> / {result.total}</span>
                  </div>
                  <p>correct on your first submitted choices</p>
                  <div className="result-breakdown">
                    {topics
                      .filter((t) =>
                        activeQuestions.some((q) => q.topic === t.id),
                      )
                      .map((t) => {
                        const qs = activeQuestions.filter(
                          (q) => q.topic === t.id,
                        );
                        const s = scoreAnswers(answers, qs);
                        return (
                          <div key={t.id}>
                            <span>{t.title}</span>
                            <strong>
                              {s.correct}/{s.total}
                            </strong>
                            <button
                              className="text-link"
                              onClick={() => openTopic(t)}
                            >
                              Review notes <ArrowUpRight size={14} />
                            </button>
                          </div>
                        );
                      })}
                  </div>
                  <div className="result-actions">
                    <button
                      className="secondary"
                      onClick={() => {
                        setFinished(false);
                        setIndex(0);
                      }}
                    >
                      Review my answers
                    </button>
                    <button className="primary" onClick={startExam}>
                      <RotateCcw size={16} />
                      Try again
                    </button>
                  </div>
                </div>
              ) : (
                <div className="quiz-layout">
                  <div className="quiz-main">
                    <div className="quiz-top">
                      <span>
                        QUESTION {index + 1} OF {activeQuestions.length}
                      </span>
                      <button
                        className="text-link"
                        onClick={() => {
                          setExam(false);
                        }}
                      >
                        Exit practice <X size={14} />
                      </button>
                    </div>
                    <div className="progress-track quiz-progress">
                      <div
                        style={{
                          width: `${((index + 1) / activeQuestions.length) * 100}%`,
                        }}
                      />
                    </div>
                    <div className="question-type">
                      <span>{current.type}</span>
                      <span>
                        {topics.find((t) => t.id === current.topic)?.category}
                      </span>
                    </div>
                    <h2 className="question-stem">{current.stem}</h2>
                    {bilingual && (
                      <p className="question-ar arabic" dir="rtl" lang="ar">
                        {current.ar}
                      </p>
                    )}
                    <div className="quiz-options">
                      {current.options.map((o, i) => (
                        <button
                          key={o}
                          disabled={revealed.includes(current.id)}
                          className={`quiz-option ${answers[current.id] === i ? "chosen" : ""} ${revealed.includes(current.id) && i === current.correct ? "correct" : ""} ${revealed.includes(current.id) && answers[current.id] === i && i !== current.correct ? "incorrect" : ""}`}
                          onClick={() =>
                            setAnswers((v) => ({ ...v, [current.id]: i }))
                          }
                        >
                          <span className="option-letter">
                            {String.fromCharCode(65 + i)}
                          </span>
                          <div>
                            {o}
                            {bilingual && (
                              <span className="arabic" dir="rtl" lang="ar">
                                {current.arOptions[i]}
                              </span>
                            )}
                          </div>
                          {revealed.includes(current.id) &&
                            i === current.correct && <CheckCircle2 size={19} />}
                        </button>
                      ))}
                    </div>
                    {!revealed.includes(current.id) ? (
                      <button
                        className="primary check-answer"
                        disabled={answers[current.id] === undefined}
                        onClick={() => setRevealed((v) => [...v, current.id])}
                      >
                        Check my answer <ArrowRight size={16} />
                      </button>
                    ) : (
                      <div className="answer-feedback" aria-live="polite">
                        <h3>
                          {answers[current.id] === current.correct ? (
                            <>
                              <CheckCircle2 size={20} />
                              You’ve got the idea.
                            </>
                          ) : (
                            <>
                              <Lightbulb size={20} />
                              Let’s unpack this together.
                            </>
                          )}
                        </h3>
                        <p>{current.why}</p>
                        {bilingual && (
                          <p className="arabic" dir="rtl" lang="ar">
                            {current.arWhy}
                          </p>
                        )}
                        <details>
                          <summary>Why each option is right or wrong</summary>
                          {current.distractors.map((d, i) => (
                            <div className="distractor" key={d}>
                              <strong>{String.fromCharCode(65 + i)}</strong>
                              <p>
                                {d}
                                {bilingual && (
                                  <span className="arabic" dir="rtl" lang="ar">
                                    {current.arDistractors[i]}
                                  </span>
                                )}
                              </p>
                            </div>
                          ))}
                        </details>
                        <SourceNotes citations={current.citations} />
                        <button
                          className="primary"
                          onClick={() => {
                            if (index < activeQuestions.length - 1) {
                              setIndex(index + 1);
                            } else {
                              setFinished(true);
                              if (examTopic === "all")
                                setBest(
                                  Math.max(
                                    best,
                                    Math.round(
                                      (result.correct / result.total) * 100,
                                    ),
                                  ),
                                );
                            }
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                        >
                          {index < activeQuestions.length - 1
                            ? "Next question"
                            : "See my results"}
                          <ArrowRight size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                  <aside className="quiz-aside">
                    <span className="eyebrow">YOUR PRACTICE SESSION</span>
                    <div className="question-dots">
                      {activeQuestions.map((q, i) => (
                        <button
                          key={q.id}
                          className={`${index === i ? "current" : ""} ${revealed.includes(q.id) ? "answered" : ""}`}
                          disabled={i > index && !revealed.includes(q.id)}
                          onClick={() => setIndex(i)}
                          aria-label={`Go to question ${i + 1}`}
                        >
                          {revealed.includes(q.id) ? (
                            <Check size={17} />
                          ) : (
                            i + 1
                          )}
                        </button>
                      ))}
                    </div>
                    <div className="practice-hint">
                      <Lightbulb size={23} />
                      <h3>Pause. Picture the classroom.</h3>
                      <p>
                        What is the teacher trying to change? What evidence
                        would show learning?
                      </p>
                      <p dir="rtl" lang="ar" className="arabic">
                        {voice[dialect].hint}
                      </p>
                    </div>
                    <small>
                      Your choices lock after you check an answer. Review the
                      feedback before moving on.
                    </small>
                  </aside>
                </div>
              )}
            </>
          )}
          {page === "library" && !topic && (
            <>
              <div className="page-heading">
                <div>
                  <div className="overline">
                    EVERY GOOD EXPLANATION STARTS AT THE SOURCE
                  </div>
                  <h1>
                    Your material, together<span>.</span>
                  </h1>
                  <p>
                    A home for your lectures, reading, and the ideas we’ll
                    connect.
                  </p>
                </div>
              </div>
              <div className="library-layout">
                <section>
                  <div
                    className={`upload-zone ${drag ? "dragging" : ""}`}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDrag(true);
                    }}
                    onDragLeave={() => setDrag(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDrag(false);
                      if (!uploading) void uploadFiles(e.dataTransfer.files);
                    }}
                  >
                    <span className="upload-icon">
                      <Upload size={28} />
                    </span>
                    <h2>
                      {uploading
                        ? "Reading your PDFs…"
                        : "Bring your course into focus."}
                    </h2>
                    <p>
                      Drop your PDFs here, or choose files.
                      <br />
                      Multiple files welcome. Up to 30 MB per PDF.
                    </p>
                    <button
                      className="primary"
                      disabled={uploading}
                      onClick={() => fileInput.current?.click()}
                    >
                      <Plus size={17} />
                      {uploading ? "Processing…" : "Choose PDFs"}
                    </button>
                    <input
                      type="file"
                      accept="application/pdf,.pdf"
                      multiple
                      hidden
                      ref={fileInput}
                      onChange={(e) => void uploadFiles(e.target.files)}
                    />
                    <small>
                      <FolderOpen size={13} />
                      Added files stay in this browser until you use AI Studio.
                    </small>
                  </div>
                  {uploadError && (
                    <div className="error-notice" role="alert">
                      {uploadError}
                    </div>
                  )}
                  <div className="section-heading library-heading">
                    <h2>
                      My PDFs{" "}
                      <span className="count-badge">{materials.length}</span>
                    </h2>
                  </div>
                  {materials.length === 0 ? (
                    <div className="library-empty">
                      <FileText size={24} />
                      <p>A fresh page. Add your first PDF to begin.</p>
                    </div>
                  ) : (
                    <div className="material-list">
                      {materials.map((m) => (
                        <div className="material-item" key={m.id}>
                          <span className="file-icon">
                            <FileText size={23} />
                          </span>
                          <div>
                            <strong>{m.name}</strong>
                            <small>
                              {m.pages} pages ·{" "}
                              {(m.size / 1024 / 1024).toFixed(1)} MB ·{" "}
                              {m.text.replace(/\[Page \d+\]/g, "").trim()
                                .length < 30
                                ? "Scanned PDF · OCR needed"
                                : "Text extracted · ready for review"}
                            </small>
                            <span className="material-status">
                              {m.builtin
                                ? "Midterm source · linked to study cards"
                                : "Additional material · available in AI Studio"}
                            </span>
                            <details>
                              <summary>Preview extracted text</summary>
                              <pre>
                                {m.text.slice(0, 6000) ||
                                  "No readable text found. This file may need OCR."}
                                {m.text.length > 6000
                                  ? "\n[Preview limited to 6,000 characters]"
                                  : ""}
                              </pre>
                            </details>
                          </div>
                          <div className="material-actions">
                            <button
                              className="icon-button"
                              onClick={() => download(m)}
                              aria-label={`Download ${m.name}`}
                            >
                              <Download size={17} />
                            </button>
                            {!m.builtin && (
                              <button
                                className="icon-button"
                                onClick={() => void removeMaterial(m)}
                                aria-label={`Remove ${m.name}`}
                              >
                                <Trash2 size={17} />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
                <aside className="library-guide">
                  <span className="note-icon butter">
                    <Sparkles size={22} />
                  </span>
                  <h3>From source to clarity.</h3>
                  <p>
                    Your three midterm guides are included. Additional PDFs can
                    extend the collection with:
                  </p>
                  {[
                    "A topic-by-topic midterm map",
                    "Bilingual, source-linked study notes",
                    "Comparison tables & visual guides",
                    "Questions with detailed answer feedback",
                    "PDF names and page-level citations",
                  ].map((s) => (
                    <div className="guide-item" key={s}>
                      <CheckCircle2 size={16} />
                      <span>{s}</span>
                    </div>
                  ))}
                  <div className="guide-note">
                    <Info size={17} />
                    <p>
                      The in-app library stores and extracts PDFs locally. It
                      does not send files to this chat. Use AI Studio to develop
                      selected pages into detailed study cards with source-cited
                      questions and an independent review.
                    </p>
                  </div>
                  <p className="storage-note">
                    Clearing browser data removes this library and your local
                    progress. Keep your original PDFs. Scanned pages need OCR
                    before their text can be studied.
                  </p>
                </aside>
              </div>
            </>
          )}
          {page === "agent" && !topic && (
            <Suspense
              fallback={
                <div className="collection-banner" role="status">
                  Opening AI Studio…
                </div>
              }
            >
              <AIStudio
                materials={materials}
                dialect={dialect}
                bilingual={bilingual}
                onLibrary={() => navigate("library")}
              />
            </Suspense>
          )}
          {page === "evidence" && !topic && <EvidenceRegister />}
          <footer>
            <span className="footer-brand">
              fahm<span>.</span>
            </span>
            <span>Designed by Kamel Bshara</span>
            <span className="footer-right">
              METHODS OF TEACHING <span>·</span> YOUR CALMER STUDY SPACE
            </span>
          </footer>
        </main>
      </div>
      {toast && (
        <div className="toast" role="status">
          <Info size={18} />
          {toast}
          <button
            className="icon-button"
            onClick={() => setToast("")}
            aria-label="Dismiss notification"
          >
            <X size={15} />
          </button>
        </div>
      )}
      {about && (
        <div className="modal-backdrop" onClick={() => setAbout(false)}>
          <section
            className="about-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="about-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              autoFocus
              className="modal-close icon-button"
              aria-label="Close about"
              onClick={() => setAbout(false)}
            >
              <X />
            </button>
            <span className="brand-mark">
              <BookOpen size={25} />
            </span>
            <h2 id="about-title">A little more fahm.</h2>
            <p>
              Fahm means understanding. This is your bilingual workspace for
              studying Methods of Teaching with precision, context, and a calmer
              mind.
            </p>
            <p>
              The content now cites the supplied midterm guides. The three
              supplied guides define the current midterm coverage. Future
              material can extend this collection.
            </p>
            <p>
              The three course PDFs are included in the app. Additional uploads
              and study progress are saved in this browser, with no account or
              cloud synchronization. Dialect explanations are conversational;
              formal academic Arabic terms remain consistent.
            </p>
            <button className="primary" onClick={() => setAbout(false)}>
              Back to learning <ArrowRight size={16} />
            </button>
          </section>
        </div>
      )}
    </div>
  );
}
function Stat({
  icon,
  label,
  value,
  detail,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="stat">
      <div className="stat-label">
        {icon}
        <span>{label}</span>
      </div>
      <strong>{value}</strong>
      <p>{detail}</p>
    </div>
  );
}
function TopicArt({ kind }: { kind: string }) {
  return (
    <svg
      className="topic-art"
      viewBox="0 0 260 130"
      fill="none"
      aria-hidden="true"
    >
      {kind === "foundations" ? (
        <>
          <path d="M45 112h171" stroke="#657d66" strokeWidth="1.5" />
          <path
            d="M70 101V56h28v45m18 0V39h28v62m18 0V20h28v81"
            fill="#fbf9ec"
            stroke="#58775c"
            strokeWidth="1.8"
          />
          <path
            d="m65 39 36-19m0 0-11-2m11 2-5 10"
            stroke="#58775c"
            strokeWidth="1.6"
          />
          <circle cx="196" cy="46" r="15" fill="#bbcda3" />
          <path d="m190 46 4 4 8-9" stroke="#426348" strokeWidth="1.5" />
          <path
            d="M47 82q-18-18-4-28 16 5 4 28m0 0q20-12 24 1-11 13-24-1"
            fill="#9bb78b"
          />
          <path d="M48 81v31" stroke="#58775c" />
        </>
      ) : kind === "theories" ? (
        <>
          <circle
            cx="130"
            cy="65"
            r="28"
            fill="#fff9ec"
            stroke="#9c775f"
            strokeWidth="1.6"
          />
          <path
            d="M119 62c-9-10 1-19 10-12 8-11 20-1 13 9 13 7 3 19-6 15-5 13-20 7-16-3-10 1-13-9-1-9Z"
            stroke="#9c775f"
            strokeWidth="1.6"
          />
          <circle cx="60" cy="37" r="16" fill="#d4ad87" />
          <circle cx="202" cy="38" r="16" fill="#e8c79f" />
          <circle cx="81" cy="108" r="12" fill="#dfbd9b" />
          <circle cx="183" cy="104" r="13" fill="#bc977c" />
          <path
            d="m76 42 28 13m52-1 31-12m-76 42-20 16m59-16 23 13"
            stroke="#a17c62"
            strokeWidth="1.5"
            strokeDasharray="3 4"
          />
          <path
            d="m56 37 3 3 6-7m132 5h9m-5-5v10"
            stroke="#fff6e7"
            strokeWidth="1.8"
          />
        </>
      ) : kind === "strategies" ? (
        <>
          <rect
            x="63"
            y="31"
            width="135"
            height="78"
            rx="5"
            fill="#f9f6eb"
            stroke="#8a819c"
            strokeWidth="1.5"
          />
          <path
            d="M78 49h60m-60 13h37m-37 13h51"
            stroke="#b3a8c2"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="174" cy="78" r="24" fill="#b9afc9" />
          <path d="m163 78 8 8 15-17" stroke="#fff9ed" strokeWidth="2" />
          <path
            d="M90 109v10m81-10v10m-94 0h107"
            stroke="#8a819c"
            strokeWidth="2"
          />
        </>
      ) : (
        <>
          <rect
            x="88"
            y="17"
            width="92"
            height="106"
            rx="6"
            fill="#fffcef"
            stroke="#9b8c52"
            strokeWidth="1.5"
          />
          <rect x="113" y="10" width="43" height="14" rx="5" fill="#d1bf75" />
          {[42, 66, 90].map((y) => (
            <g key={y}>
              <path d={`m102 ${y} 4 4 7-9`} stroke="#8b804c" strokeWidth="2" />
              <path
                d={`M124 ${y}h39`}
                stroke="#c3b780"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </g>
          ))}
          <circle cx="184" cy="99" r="20" fill="#ddd099" />
          <path d="m175 99 6 6 11-13" stroke="#857441" strokeWidth="2" />
        </>
      )}
    </svg>
  );
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
