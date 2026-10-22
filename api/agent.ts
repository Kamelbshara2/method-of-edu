import type { IncomingMessage, ServerResponse } from "node:http";
type VercelRequest = IncomingMessage & { body?: unknown };
type VercelResponse = ServerResponse & {
  status: (status: number) => VercelResponse;
  json: (body: unknown) => void;
};
import {
  authorized,
  runAgent,
  safeAgentError,
  configurationStatus,
} from "../server/agent";
export const maxDuration = 300;
export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Content-Type-Options", "nosniff");
  if (req.method === "GET")
    return res.status(200).json(configurationStatus(process.env));
  if (req.method !== "POST") {
    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ error: "Use POST." });
  }
  if (
    !process.env.FAHM_REVIEW_TOKEN ||
    process.env.FAHM_REVIEW_TOKEN.length < 24
  )
    return res.status(503).json({
      error:
        "AI access is not configured. Set a random FAHM_REVIEW_TOKEN of at least 24 characters in Vercel and redeploy.",
    });
  if (!authorized(req.headers.authorization, process.env.FAHM_REVIEW_TOKEN))
    return res
      .status(401)
      .json({
        error:
          "The AI access password is missing or incorrect. Use the value you set as FAHM_REVIEW_TOKEN in Vercel.",
      });
  if (!req.headers["content-type"]?.includes("application/json"))
    return res.status(415).json({ error: "Use an application/json request." });
  let payload: unknown;
  try {
    payload = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    if (Buffer.byteLength(JSON.stringify(payload) || "") > 200000)
      return res.status(413).json({
        error: "This request is too large. Select fewer source pages.",
      });
  } catch {
    return res.status(400).json({ error: "Invalid JSON request." });
  }
  try {
    return res.status(200).json(await runAgent(payload, process.env));
  } catch (e) {
    const err = safeAgentError(e);
    return res.status(err.status).json({ error: err.message });
  }
}
