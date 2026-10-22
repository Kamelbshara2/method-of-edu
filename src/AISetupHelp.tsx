import { useState } from "react";
import { Check, Copy, KeyRound, RefreshCw } from "lucide-react";
export default function AISetupHelp() {
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  function generate() {
    const bytes = crypto.getRandomValues(new Uint8Array(32));
    setPassword(
      Array.from(bytes, (n) => n.toString(16).padStart(2, "0")).join(""),
    );
    setCopied(false);
    setError("");
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
    } catch {
      setError(
        "Copy is unavailable in this browser. Select the generated password and copy it manually.",
      );
    }
  }
  return (
    <details className="ai-setup-help">
      <summary>
        <KeyRound size={16} />
        First-time AI setup · one API key, one access password
      </summary>
      <p>
        You do not need a separate model API key. In Vercel → Project Settings →
        Environment Variables, add:
      </p>
      <div className="setup-variable">
        <code>FAHM_AI_API_KEY</code>
        <span>Your OpenAI API key. Keep it in Vercel, never in this form.</span>
        <p className="arabic" lang="ar" dir="rtl">
          مفتاح OpenAI الخاص فيك. ضيفه بإعدادات Vercel، مش هون.
        </p>
      </div>
      <div className="setup-variable">
        <code>FAHM_REVIEW_TOKEN</code>
        <span>
          An access password you create. It controls who can use this app’s paid
          AI requests; it is not another provider key.
        </span>
        <p className="arabic" lang="ar" dir="rtl">
          هاي كلمة مرور إنت بتعملها عشان تتحكّم بمين بستخدم الذكاء الاصطناعي
          المدفوع. مش مفتاح API ثاني.
        </p>
        <button className="secondary" onClick={generate}>
          <RefreshCw size={14} />
          {password
            ? "Generate a new access password"
            : "Create an access password"}
        </button>
        {password && (
          <>
            <div className="generated-password">
              <input
                aria-label="Generated AI access password"
                type={show ? "text" : "password"}
                value={password}
                readOnly
                onFocus={(e) => e.target.select()}
              />
              <button className="text-link" onClick={() => setShow(!show)}>
                {show ? "Hide" : "Show"}
              </button>
              <button className="secondary" onClick={() => void copy()}>
                {copied ? <Check size={14} /> : <Copy size={14} />}{" "}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <p>
              Copy this value into FAHM_REVIEW_TOKEN in Vercel. After
              redeploying, enter the same value in the “AI access password”
              field above. This generator does not configure Vercel or save the
              password.
            </p>
          </>
        )}
        {error && <p role="alert">{error}</p>}
      </div>
      <div className="setup-variable">
        <code>FAHM_AI_MODEL</code>
        <span>
          Optional model name only. Leave this unset to use the server default.
          There is no model key to buy or generate.
        </span>
        <p className="arabic" lang="ar" dir="rtl">
          هذا اسم النموذج فقط، مش مفتاح. بتقدر تتركه فاضي وتستخدم الإعداد
          الافتراضي.
        </p>
      </div>
      <p>
        Save the variables and redeploy. The reading notes and practice exam
        work without AI configuration. Never use a VITE_ prefix for any secret.
      </p>
    </details>
  );
}
