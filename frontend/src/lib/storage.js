const fallback = new Map();

export function readStorage(key) {
  if (fallback.has(key)) return fallback.get(key);
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeStorage(key, value) {
  try {
    localStorage.setItem(key, value);
    fallback.delete(key);
  } catch {
    fallback.set(key, String(value));
  }
}

export function readJSON(key, defaultValue = null) {
  try {
    return JSON.parse(readStorage(key)) ?? defaultValue;
  } catch {
    return defaultValue;
  }
}

export function writeJSON(key, value) {
  writeStorage(key, JSON.stringify(value));
}
