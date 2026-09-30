import test from "node:test";
import assert from "node:assert/strict";
import { limiter, byteBudget } from "../src/lib/protection.js";
import { createCache } from "../src/lib/cache.js";
import { chatPayload } from "../src/lib/chatPayload.js";

test("rate limits reset, isolate keys, and fail closed when the key table fills", () => {
  const allow = limiter(2, 1000, 2);
  assert.equal(allow("a", 0), true);
  assert.equal(allow("a", 1), true);
  assert.equal(allow("a", 2), false);
  assert.equal(allow("b", 2), true);
  assert.equal(allow("c", 3), false);
  assert.equal(allow("c", 1002), true);
});

test("egress reservation rejects oversized broadcasts without consuming the remaining budget", () => {
  const now = Date.now();
  const spend = byteBudget(100, 1000);
  assert.equal(spend(70, now), true);
  assert.equal(spend(31, now), false);
  assert.equal(spend(30, now), true);
  assert.equal(spend(1, now), false);
  assert.equal(spend(100, now + 1001), true);
});

test("cache coalesces concurrent lookups and rejects excess distinct work", async () => {
  const cache = createCache({ maxPending: 1 });
  let resolve, calls = 0;
  const fetch = () => { calls++; return new Promise(done => { resolve = done; }); };
  const first = cache("a", fetch);
  const second = cache("a", fetch);
  await assert.rejects(cache("b", fetch), { status: 503 });
  resolve(["material"]);
  assert.deepEqual(await first, ["material"]);
  assert.deepEqual(await second, ["material"]);
  assert.deepEqual(await cache("a", fetch), ["material"]);
  assert.equal(calls, 1);
});

test("cache retries failures, expires entries, and evicts oversized/old entries", async () => {
  const cache = createCache({ maxEntries: 1, maxBytes: 20 });
  await assert.rejects(cache("fail", () => { throw new Error("offline"); }));
  assert.equal(await cache("fail", () => "ok"), "ok");
  await cache("b", () => "new");
  let calls = 0;
  await cache("fail", () => { calls++; return "retry"; });
  assert.equal(calls, 1);
  await cache("large", () => "x".repeat(100));
  assert.equal(await cache("large", () => "not retained"), "not retained");
  const expired = createCache({ ttl: 0 });
  await expired("a", () => "old");
  assert.equal(await expired("a", () => "new"), "new");
});

test("legacy chat records cannot expand response payloads indefinitely", () => {
  const source = { content: "x".repeat(10000), senderName: "a".repeat(200), senderId: "i".repeat(1000), likes: Array(5000).fill("l".repeat(1000)), privateField: "omit" };
  const payload = chatPayload(source);
  assert.equal(payload.content.length, 2000);
  assert.equal(payload.senderName.length, 80);
  assert.equal(payload.senderId.length, 128);
  assert.equal(payload.likes.length, 100);
  assert.equal(payload.likes[0].length, 128);
  assert.equal(payload.privateField, undefined);
  assert.equal(source.likes.length, 5000);
});
