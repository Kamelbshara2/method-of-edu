# Fahm · فَهْم

A bilingual Methods of Teaching revision platform, with detailed academic study cards and a source-grounded AI author/reviewer workflow. Course identifier supplied by the user: **Al Ain University 0402526E**.

## Current midterm scope

The user supplied **three course guides (45 PDF pages)**: Introduction to Teaching, Writing ABCD Objectives, and Instructional Planning. The current app is scoped to these guides; the full course can be extended later. The full university syllabus and lecturer's exact examination have not been independently verified.

- **Three chapters, 18 detailed subtopic cards**, in English and formal Arabic, with conversational explanations in Egyptian, Jordanian, Emirati, and Syrian Arabic.
- **36 mapped practice MCQs** (two per subtopic), with full bilingual rationale, feedback for all four options, and original PDF page links.
- **18 written self-checks and three extended classroom cases**, with model responses and transparent answer criteria. The case lab is ungraded and keeps writing in session memory.
- Visual guides for PCK/TPACK, all seven TPACK domains, ADDIE, ASSURE, ABCD, backward design, planning levels, InTASC, and daily lesson components.
- A visible coverage map and clearly flagged source gaps, including Dick & Carey detail missing from the supplied chapter body.

Original PDFs are bundled in `public/materials/` and available to users of the deployed app. `src/midterm/sourcePages.json` retains the extracted page text; source citations are checked against it. These included guides are publicly accessible if the deployed app is public. Additional PDF uploads stay browser-local. See `COURSE_STATUS.md` for scope and qualifications.

## Run

Requires Node.js 22+ (validated on Node.js 24).

```sh
npm ci --cache /tmp/fahm-npm-cache
npm run dev
```

Reading, visual guides, quizzes, dialect switching, bookmarks, progress, and local PDF storage work without any credentials. PDF processing runs locally in a bundled PDF.js worker; fonts are bundled locally.

```sh
npm test
npm run build
npm run preview
```

`npm run dev` includes the AI API middleware. `npm run preview` serves static output only; use the development server or Vercel to exercise `/api/agent`.

## Enable the AI agent

Create an ignored `.env.local` for local development, or use Vercel **Project Settings → Environment Variables** for deployment. See `.env.example` for the variable names. Never put secrets in a `VITE_` variable: those are exposed in browser bundles.

| Server variable     | Purpose                                                                                                                                                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `FAHM_AI_API_KEY`   | Your OpenAI API key, with billing and access to the selected model. Server only.                                                                                                                             |
| `FAHM_REVIEW_TOKEN` | A random access token of at least 24 characters. Generate one locally with `openssl rand -hex 32`; set it on the server, then enter the same value in AI Studio. This is separate from the provider API key. |
| `FAHM_AI_MODEL`     | Optional model override. Default: `gpt-6-astra`, using high reasoning effort.                                                                                                                                |

Restart Vite or redeploy Vercel after changing server variables. Do not paste keys into chat or commit `.env.local`. AI Studio holds the workspace token in React memory only. It is not a user-account system; anyone given that token can make paid AI requests. Use Vercel deployment protection and provider spending limits for a shared deployment. A production service with public student accounts would need durable user authentication and rate limits.

The default model is a quality-focused choice, not a claim of measured superiority for this particular course. Its identifier was checked against OpenAI's official `openai-python` model catalogue at `https://raw.githubusercontent.com/openai/openai-python/main/src/openai/types/shared/chat_model.py`. Real model availability, cost, latency, Arabic quality, and source-grounded accuracy require evaluation with your API account and actual course documents. No paid live-model call was made during implementation because credentials were absent.

## AI Studio workflow

1. Add PDFs in **My materials**. Extraction preserves PDF page numbers; scanned pages require OCR, which is not included.
2. Open **AI Studio**. Select specific files and page ranges, enter the workspace access token, and consent to sending the selected extracted text to OpenAI. Neither the original PDF files nor unrelated library pages are uploaded by this workflow.
3. **Build study cards** creates a focused packet: up to four detailed subtopic cards and six questions. Cards include conceptual explanation, application, a worked example, comparisons, misconceptions, a self-check, a reasoned answer, and explanations in all four dialects. English/formal Arabic and canonical terminology remain paired.
4. A separate model call independently reviews the packet and every question. It audits the answer key, distractors, conceptual accuracy, cognitive demand, English/Arabic equivalence, feedback, and source support. This is a new context using the same model, so it can still make correlated errors. Disagreements remain visible and do not silently overwrite the author's key.
5. **Review questions** audits the current generated question set, or a chosen six-question batch from the 36-question midterm bank, against selected pages. **Answer feedback** assesses a student's written reasoning and offers strengths, corrections, next steps, and a model answer.
6. Accepted packets are kept as local browser collections, displayed as cards. Review the scope gaps and reviewer findings before relying on a packet. Build further focused packets for the remaining source pages; the system does not claim whole-course coverage from one excerpt.

Limits: 24 readable source pages, 80,000 characters total, and 16,000 characters per page per request. Sources are never silently truncated. Building a packet makes two provider calls and may take several minutes. The server has 115-second timeouts per provider call; Vercel is configured for a maximum 300-second function duration, subject to your account's limits. Narrow the focus or source range if output is incomplete.

## Source and review checks

- Inputs and structured model outputs are validated with Zod.
- Every generated citation must identify a supplied document/page and include an exact source quotation. Whitespace normalization accommodates extraction differences; invented pages and quotes are rejected.
- Every question must have exactly one reviewer entry. A changed key or major unresolved finding cannot receive an overall `supported` verdict. Supported reviewed answers require citations.
- Exact-quote matching establishes provenance, **not** semantic correctness. AI review is fallible and remains a draft requiring human review. Outline-only pages cannot establish full explanations or all midterm outcomes; the agent is instructed to state missing evidence.
- Raw PDF text, prompts, and student responses are treated as untrusted input. The provider key is never returned to the browser. API requests require the workspace token, have body/context limits, and use `store: false`; provider retention policies still apply.
- Request errors are surfaced without exposing upstream credentials. No automatic retry or self-publishing occurs.

## Browser storage

The three included course PDFs and their page text are bundled with the app. Additional uploaded PDFs and extracted text are stored in IndexedDB. Reading progress, bookmarks, and AI draft collections (including their selected excerpts) are stored in localStorage. No account or cloud synchronization is implemented. Clearing browser data removes these records; retain original PDFs. Excerpts only leave the browser after the explicit AI request and consent. Re-add the original PDFs if a saved collection no longer has its source files available locally.

## Deploy on Vercel

Import the Git repository and select the Vite preset. Build: `npm run build`; output: `dist`. `vercel.json` preserves `/api/agent` as a Node function and routes the remaining app paths to the SPA. Add the server variables above and redeploy. The deployment owner must connect/publish the repository. Without Vercel authentication in the execution session, importing the repository is the required deployment step. [Import this repository into Vercel](https://vercel.com/new).

Tests cover scoring, bilingual content integrity, detailed subtopics, citation forgery, review completeness, changed answer keys, separate author/reviewer requests, malformed/incomplete provider responses, context limits, HTTP authorization, and payload limits. Provider transport tests use fixtures, not paid AI calls. Browser checks should include mobile reading, the existing exam, source selection, generated cards, review findings, answer coaching, and failure states.

## Extending the course later

Keep the current three-guide midterm collection intact. Add new original documents and extracted pages to the source registry, add detailed subtopics with exact citations, extend the chapter metadata and question bank, and update the coverage map. Keep every question linked to a subtopic and actual source pages. AI Studio can generate focused draft collections from selected new pages; review those before incorporating them into the curated path.
