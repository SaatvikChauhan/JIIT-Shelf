import api, { API_ORIGIN } from "./axios.js";
import { readJSON, writeJSON } from "./storage.js";
import { isDriveItemList } from "./utils.js";
import { semIdMap } from "../data/data.js";

const key = `drive-cache-v1:${API_ORIGIN}`;
const freshFor = 60 * 60 * 1000;
const offlineFor = 7 * 24 * freshFor;
const pending = new Map();
const stored = readJSON(key, []);
const entries = new Map(Array.isArray(stored) ? stored.filter(entry => Array.isArray(entry) && entry[1]?.at > Date.now() - offlineFor) : []);
export function peekDrive(id) {
  const entry = entries.get(id);
  return entry && Date.now() - entry.at < freshFor ? entry.data : null;
}
function save(id, data, at = Date.now()) {
  entries.delete(id);
  entries.set(id, { at, data });
  let serialized = JSON.stringify([...entries]);
  while (entries.size > 80 || serialized.length > 1000000) {
    entries.delete(entries.keys().next().value);
    serialized = JSON.stringify([...entries]);
  }
  writeJSON(key, [...entries]);
}
async function cached(id, fetcher, shouldCache = () => true) {
  const hit = entries.get(id);
  if (hit && Date.now() - hit.at < freshFor) return { data: hit.data, at: hit.at };
  if (!pending.has(id)) pending.set(id, Promise.resolve().then(fetcher).then(data => {
    const at = Date.now();
    if (shouldCache(data)) save(id, data, at);
    return { data, at };
  }).catch(error => {
    if (!error.invalidResponse && (!error.response || error.response.status >= 500) && hit && Date.now() - hit.at < offlineFor) return { data: hit.data, at: hit.at };
    throw error;
  }).finally(() => pending.delete(id)));
  return pending.get(id);
}
export function getDrive(id) {
  return cached(id, async () => {
    const { data } = await api.get(`/drive/${encodeURIComponent(id)}`, { timeout: 30000 });
    if (!isDriveItemList(data) && !(data?.type === "file" && typeof data.content === "string")) throw Object.assign(new Error("Invalid material response"), { invalidResponse: true });
    return data;
  });
}
export async function getCourseCatalog() {
  const result = await cached("catalog", async () => {
    const { data } = await api.get("/drive/catalog", { timeout: 30000 });
    if (!data || typeof data !== "object" || Array.isArray(data) || !Object.values(data).every(isDriveItemList)) throw Object.assign(new Error("Invalid catalog"), { invalidResponse: true });
    return data;
  }, data => Object.values(semIdMap).every(id => data[id]));
  const at = result.at;
  for (const [id, courses] of Object.entries(result.data)) {
    if (!entries.has(id) || entries.get(id).at < at) save(id, courses, at);
  }
  return result.data;
}
