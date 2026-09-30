import api from "./axios.js";
import { readStorage, writeStorage, readJSON, writeJSON } from "./storage.js";

export function analyticsId() {
  return globalThis.crypto?.randomUUID?.() || `${Date.now().toString(36)}_${Math.random().toString(36).slice(2)}_${Math.random().toString(36).slice(2)}`;
}

export function trackEvent(type, details = {}, id = analyticsId()) {
  if (import.meta.env.DEV && import.meta.env.VITE_ANALYTICS_IN_DEV !== "true") return;
  try {
    let browser = readStorage("shelfAnalyticsBrowser");
    if (!browser) { browser = analyticsId(); writeStorage("shelfAnalyticsBrowser", browser); }
    const now = Date.now();
    const date = new Date(now + 19800000).toISOString().slice(0, 10);
    let visit = readJSON("shelfAnalyticsVisit");
    if (!visit?.id || !Number.isFinite(visit.last) || now - visit.last >= 1800000 || visit.date !== date) visit = { id: analyticsId(), date };
    writeJSON("shelfAnalyticsVisit", { ...visit, last: now });
    void api.post("/analytics/events", { ...details, type, id, browser, visit: visit.id }, { timeout: 5000 }).catch(() => { });
  } catch {
  }
}
