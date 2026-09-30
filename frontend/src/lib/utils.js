export const isDriveItemList = (value) => Array.isArray(value) && value.every(
  (item) => item && typeof item.id === "string" && typeof item.name === "string"
);

export const parseSubjectName = (fullName) => {
  if (typeof fullName !== "string" || !fullName) {
    return {
      code: "",
      title: "",
      icon: "Folder",
      credits: 0,
    };
  }

  const parts = fullName.split("__");

  const code = parts[0] || "";
  const title = parts[1] || "";
  const rawIcon = parts[2] || "folder";
  const rawCredits = parts[3] || 0;

  const toPascalCase = (str) =>
    str
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");

  const icon = toPascalCase(rawIcon);
  const parsedCredits = Number(rawCredits);
  const credits = Number.isFinite(parsedCredits) && parsedCredits > 0 ? parsedCredits : 0;
  return { code, title, icon, credits };
};

export function parseYouTubeText(text) {
  if (typeof text !== "string") return [];
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  const arr = [];

  for (let i = 0; i < lines.length; i += 3) {
    const title = lines[i] || "Unknown Channel";
    const link = lines[i + 1] || "";
    const logo = lines[i + 2] || "";

    if (!isHttpUrl(link)) continue;
    arr.push({
      title,
      link,
      logo: isHttpUrl(logo) ? logo : "",
    });
  }

  return arr;
}

function isHttpUrl(value) {
  try {
    return ["https:", "http:"].includes(new URL(value).protocol);
  } catch {
    return false;
  }
}

export function extractNumber(name) {
  const match = name.match(/(\d+)/);
  return match ? parseInt(match[1]) : null;
}

export const formatTime = (dateString) => {
  const d = new Date(dateString);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export const getDateLabel = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const isSameDay = (d1, d2) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  if (isSameDay(date, today)) return "Today";
  if (isSameDay(date, yesterday)) return "Yesterday";

  return date.toLocaleDateString([], {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
