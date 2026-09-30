import test from "node:test";
import assert from "node:assert/strict";
import { readJSON, readStorage, writeJSON, writeStorage } from "../src/lib/storage.js";

test("corrupt JSON and blocked/quota-limited storage do not break page state", (t) => {
  const original = Object.getOwnPropertyDescriptor(globalThis, "localStorage");
  t.after(() => {
    if (original) Object.defineProperty(globalThis, "localStorage", original);
    else delete globalThis.localStorage;
  });

  const values = new Map([["broken", "{invalid"], ["theme", "dark"]]);
  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    value: {
      getItem: (key) => values.get(key) ?? null,
      setItem: () => { throw new Error("Quota exceeded"); },
    },
  });
  assert.deepEqual(readJSON("broken", []), []);
  writeStorage("theme", "light");
  assert.equal(readStorage("theme"), "light");
  writeJSON("subject-cache", [{ id: "abc", name: "Subject" }]);
  assert.deepEqual(readJSON("subject-cache"), [{ id: "abc", name: "Subject" }]);

  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    get() { throw new Error("Storage blocked"); },
  });
  assert.equal(readStorage("unknown-key"), null);
  writeStorage("chatHandle", "Student");
  assert.equal(readStorage("chatHandle"), "Student");
});
