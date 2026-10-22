import { useCallback, useEffect, useState } from "react";
import { CheckCircle2, Info, RefreshCw } from "lucide-react";
type Status = {
  providerKeyConfigured: boolean;
  accessPasswordConfigured: boolean;
  model: string;
};
export default function AIConnectionStatus() {
  const [status, setStatus] = useState<Status | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const check = useCallback(async () => {
    setBusy(true);
    setError("");
    try {
      const r = await fetch("/api/agent", {
        method: "GET",
        cache: "no-store",
        signal: AbortSignal.timeout(12000),
      });
      if (!r.ok || !r.headers.get("content-type")?.includes("application/json"))
        throw new Error(
          "Server status is unavailable here. Use the deployed app or the development server.",
        );
      const data = await r.json();
      if (
        typeof data.providerKeyConfigured !== "boolean" ||
        typeof data.accessPasswordConfigured !== "boolean"
      )
        throw new Error(
          "This server does not yet expose configuration status. Wait for the latest deployment.",
        );
      setStatus(data);
    } catch (e) {
      setStatus(null);
      setError(
        e instanceof Error ? e.message : "Could not check server settings.",
      );
    } finally {
      setBusy(false);
    }
  }, []);
  useEffect(() => {
    void check();
  }, [check]);
  return (
    <div className="ai-connection-status">
      <div>
        <strong>
          <Info size={16} />
          AI server settings
        </strong>
        <button
          className="text-link"
          disabled={busy}
          onClick={() => void check()}
        >
          <RefreshCw size={13} className={busy ? "spin" : ""} />
          {busy ? "Checking…" : "Check again"}
        </button>
      </div>
      {status ? (
        <>
          <p>
            <CheckCircle2 size={14} />
            {status.providerKeyConfigured
              ? "API key variable is set."
              : "API key variable is missing: add FAHM_AI_API_KEY in Vercel."}
          </p>
          <p>
            <Info size={14} />
            {status.accessPasswordConfigured
              ? "AI access password is configured."
              : "Access password is not configured: create one below and set FAHM_REVIEW_TOKEN in Vercel."}
          </p>
          <small>
            Model setting: {status.model}. This check reads configuration
            presence only; it does not validate the provider key, billing, model
            access, or generate a paid request.
          </small>
        </>
      ) : (
        <p role="status">{busy ? "Checking configuration presence…" : error}</p>
      )}
    </div>
  );
}
