import { ORDER } from "../data/data.js";

const natural = new Intl.Collator(undefined, { numeric: true, sensitivity: "base" });
const ranks = new Map(Object.entries(ORDER).map(([name, rank]) => [name.toLowerCase(), rank]));
export const compareNames = (a, b) => natural.compare(materialLabel(a.name).title, materialLabel(b.name).title);
export function compareSections(a, b) {
  const rank = (name) => {
    const normalized = name.trim().toLowerCase();
    if (/^module\s+\d+$/i.test(normalized)) return 4;
    return ranks.get(normalized) ?? 100;
  };
  return rank(a.name) - rank(b.name) || compareNames(a, b);
}

export function materialLabel(name, isPyq = false) {
  const extension = name.match(/\.(pdf|pptx?|docx?|xlsx?|txt|zip|rar|png|jpe?g|csv|mp4)$/i)?.[1] || "";
  const title = extension ? name.slice(0, -extension.length - 1) : name;
  const contributed = title.match(/^(.+?)__(\d+)__(.+?)__(Lec|Tut|PYQ|Book)__(.+?)__credits=(.+)$/i);
  const displayTitle = contributed?.[5] || title;
  const credit = contributed?.[6] || null;
  const year = isPyq ? displayTitle.match(/(?:^|\D)((?:19|20)\d{2})(?!\d)/)?.[1] || null : null;
  return { title: displayTitle, type: extension.toUpperCase() || "FILE", year, credit };
}
