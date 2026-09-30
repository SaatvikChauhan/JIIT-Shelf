export function createCache({ ttl = 300000, maxEntries = 200, maxBytes = 16 * 1024 * 1024, maxPending = 16 } = {}) {
  const entries = new Map(), pending = new Map();
  let bytes = 0;
  return async (key, fetcher) => {
    const cached = entries.get(key);
    if (cached && cached.until > Date.now()) return cached.data;
    if (pending.has(key)) return pending.get(key);
    if (pending.size >= maxPending) throw Object.assign(new Error("Busy"), { status: 503 });
    const request = Promise.resolve().then(fetcher).then((data) => {
      const size = Buffer.byteLength(JSON.stringify(data));
      if (entries.has(key)) { bytes -= entries.get(key).size; entries.delete(key); }
      if (size <= maxBytes) {
        while (entries.size && (entries.size >= maxEntries || bytes + size > maxBytes)) {
          const oldest = entries.keys().next().value;
          bytes -= entries.get(oldest).size; entries.delete(oldest);
        }
        entries.set(key, { data, size, until: Date.now() + ttl }); bytes += size;
      }
      return data;
    }).finally(() => pending.delete(key));
    pending.set(key, request);
    return request;
  };
}
