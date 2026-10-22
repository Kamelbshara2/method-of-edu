import type { Plugin } from "vite";
import {
  authorized,
  runAgent,
  safeAgentError,
  configurationStatus,
} from "./agent";
export function agentPlugin(env: Record<string, string>): Plugin {
  return {
    name: "fahm-local-agent",
    configureServer(server) {
      server.middlewares.use("/api/agent", async (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Cache-Control", "no-store");
        const send = (status: number, payload: unknown) => {
          res.statusCode = status;
          res.end(JSON.stringify(payload));
        };
        if (req.method === "GET") return send(200, configurationStatus(env));
        if (req.method !== "POST") return send(405, { error: "Use POST." });
        if (!env.FAHM_REVIEW_TOKEN || env.FAHM_REVIEW_TOKEN.length < 24)
          return send(503, {
            error:
              "AI access is not configured. Add FAHM_AI_API_KEY and a random FAHM_REVIEW_TOKEN (at least 24 characters) to .env.local, then restart Vite.",
          });
        if (!authorized(req.headers.authorization, env.FAHM_REVIEW_TOKEN))
          return send(401, {
            error:
              "The AI access password is missing or incorrect. Use the value you set as FAHM_REVIEW_TOKEN in Vercel.",
          });
        if (!req.headers["content-type"]?.includes("application/json"))
          return send(415, { error: "Use application/json." });
        try {
          let body = "";
          for await (const chunk of req) {
            body += chunk.toString();
            if (Buffer.byteLength(body) > 200000)
              return send(413, { error: "Select fewer source pages." });
          }
          let parsed;
          try {
            parsed = JSON.parse(body);
          } catch {
            return send(400, { error: "Invalid JSON request." });
          }
          send(200, await runAgent(parsed, env));
        } catch (e) {
          const err = safeAgentError(e);
          send(err.status, { error: err.message });
        }
      });
    },
  };
}
