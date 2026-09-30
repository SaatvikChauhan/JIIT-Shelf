export function limiter(limit, windowMs = 60000, maxKeys = 10000) {
  const buckets = new Map();
  return (key, now = Date.now()) => {
    let bucket = buckets.get(key);
    if (!bucket || now >= bucket.until) {
      if (!bucket && buckets.size >= maxKeys) {
        for (const [id, value] of buckets) if (now >= value.until) buckets.delete(id);
        if (buckets.size >= maxKeys) return false;
      }
      bucket = { count: 0, until: now + windowMs };
      buckets.set(key, bucket);
    }
    return ++bucket.count <= limit;
  };
}

export function byteBudget(limit, windowMs = 3600000) {
  let start = Date.now(), used = 0;
  return (bytes, now = Date.now()) => {
    if (now - start >= windowMs) { start = now; used = 0; }
    if (used + bytes > limit) return false;
    used += bytes;
    return true;
  };
}

export function positiveSetting(name, fallback) {
  const value = Number(process.env[name]);
  return Number.isSafeInteger(value) && value > 0 ? value : fallback;
}

export function createProtection() {
  const allowGlobal = limiter(positiveSetting("API_REQUESTS_PER_MINUTE", 3000));
  const spend = byteBudget(positiveSetting("EGRESS_MB_PER_HOUR", 100) * 1024 * 1024);
  let metrics = {};
  function record(route, bytes = 0, blocked = false, userAgent = "") {
    if (!metrics[route] && Object.keys(metrics).length >= 100) route = "other";
    const item = metrics[route] ||= { requests: 0, bytes: 0, blocked: 0, botRequests: 0 };
    item.requests++; item.bytes += bytes; item.blocked += Number(blocked);
    if (/bot|crawler|spider|headless/i.test(userAgent)) item.botRequests++;
  }
  const timer = setInterval(() => {
    if (Object.keys(metrics).length) console.log(JSON.stringify({ type: "traffic_summary", at: new Date().toISOString(), routes: metrics }));
    metrics = {};
  }, 60000);
  timer.unref();
  function middleware(req, res, next) {
    const route = /^\/api\/(drive|chat|stats|analytics)(?:\/|$)/.exec(req.path)?.[1] || "other";
    let bytes = 0;
    const end = res.end;
    res.end = function (chunk, encoding, callback) {
      if (chunk) bytes += Buffer.isBuffer(chunk) ? chunk.length : Buffer.byteLength(chunk, typeof encoding === "string" ? encoding : undefined);
      return end.call(this, chunk, encoding, callback);
    };
    res.once("finish", () => {
      const path = req.route?.path || "/";
      const folder = route === "drive" && /^[a-zA-Z0-9_-]{1,100}$/.test(req.params?.folderId || "") ? `:${req.params.folderId}` : "";
      record(`http:${req.method}:${route}${path}${folder}:${res.statusCode}`, bytes,
        res.statusCode === 429 || res.statusCode === 503, req.get("user-agent"));
    });
    res.set("X-Content-Type-Options", "nosniff");
    if (!allowGlobal("all")) {
      return res.set("Retry-After", "60").status(429).end();
    }
    if (!spend(256)) return res.set("Retry-After", "3600").status(503).end();
    if (req.url.length > 1024) return res.status(414).end();
    if (!["GET", "HEAD", "POST", "OPTIONS"].includes(req.method)) return res.status(405).end();
    const json = res.json;
    res.json = function (body) {
      const size = Buffer.byteLength(JSON.stringify(body));
      if (size > 512 * 1024) return res.set("Cache-Control", "no-store").status(413).end();
      if (!spend(size)) return res.set({ "Cache-Control": "no-store", "Retry-After": "3600" }).status(503).end();
      return json.call(this, body);
    };
    next();
  }
  return { middleware, spend, record };
}
