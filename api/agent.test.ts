import { beforeEach, afterEach, describe, it, expect, vi } from "vitest";
import handler from "./agent";
import type { IncomingMessage, ServerResponse } from "node:http";
const original = process.env.FAHM_REVIEW_TOKEN;
function mockRequest(
  body: unknown = {},
  method = "POST",
  token = "a".repeat(32),
) {
  return {
    body,
    method,
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
  } as IncomingMessage & { body: unknown };
}
function response() {
  const out = {
    code: 0,
    payload: null as unknown,
    headers: {} as Record<string, string>,
    setHeader(k: string, v: string) {
      this.headers[k] = v;
      return this;
    },
    status(c: number) {
      this.code = c;
      return this;
    },
    json(p: unknown) {
      this.payload = p;
    },
  };
  return out;
}
beforeEach(() => {
  process.env.FAHM_REVIEW_TOKEN = "a".repeat(32);
});
afterEach(() => {
  if (original) process.env.FAHM_REVIEW_TOKEN = original;
  else delete process.env.FAHM_REVIEW_TOKEN;
  vi.restoreAllMocks();
});
describe("AI HTTP boundary", () => {
  it("rejects unsupported methods and disables caching", async () => {
    const r = response();
    await handler(
      mockRequest({}, "GET"),
      r as unknown as Parameters<typeof handler>[1],
    );
    expect(r.code).toBe(405);
    expect(r.headers["Cache-Control"]).toBe("no-store");
  });
  it("rejects unauthorized callers before processing content", async () => {
    const r = response();
    await handler(
      mockRequest({}, "POST", "wrong"),
      r as unknown as Parameters<typeof handler>[1],
    );
    expect(r.code).toBe(401);
  });
  it("rejects oversized payloads", async () => {
    const r = response();
    await handler(
      mockRequest({ text: "a".repeat(200001) }),
      r as unknown as Parameters<typeof handler>[1],
    );
    expect(r.code).toBe(413);
  });
  it("rejects malformed JSON and a missing server token clearly", async () => {
    const r = response();
    await handler(
      mockRequest("bad-json"),
      r as unknown as Parameters<typeof handler>[1],
    );
    expect(r.code).toBe(400);
    delete process.env.FAHM_REVIEW_TOKEN;
    const r2 = response();
    await handler(
      mockRequest(),
      r2 as unknown as Parameters<typeof handler>[1],
    );
    expect(r2.code).toBe(503);
  });
});
