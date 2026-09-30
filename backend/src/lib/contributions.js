const branches = new Map([
  ["CSE", new Set(["1", "2", "3", "4"])],
  ["ECE", new Set(["1", "2", "3", "4"])],
  ["IT", new Set(["1", "2", "3", "4"])],
  ["Mathematics and Computing (M&C)", new Set(["1", "2", "3", "4"])],
  ["Robotics and Artificial Intelligence", new Set(["1", "2"])],
]);
const types = new Map([
  ["lec", "Lec"], ["tut", "Tut"], ["pyq", "PYQ"], ["book", "Book"],
]);

function clean(value, limit) {
  return String(value || "")
    .normalize("NFKC")
    .replace(/__/g, "-")
    .replace(/[<>:"/\\|?*\x00-\x1f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, limit);
}

export function contributionDetails(input) {
  const branch = clean(input.branch, 60);
  const semester = String(input.semester || "");
  const course = clean(input.course, 140);
  const type = types.get(String(input.type || "").toLowerCase());
  const credit = clean(input.credit, 80);
  const original = clean(input.originalName, 180);
  const match = original.match(/^(.*)\.(pdf|pptx)$/i);
  if (!branches.get(branch)?.has(semester) || !course || !type || !credit || !match) return null;
  const title = clean(match[1], 120);
  if (!title) return null;
  const extension = match[2].toLowerCase();
  const mimeType = extension === "pdf" ? "application/pdf" : "application/vnd.openxmlformats-officedocument.presentationml.presentation";
  return {
    mimeType,
    extension,
    name: `${branch}__${semester}__${course}__${type}__${title}__credits=${credit}.${extension}`,
  };
}

export function hasExpectedSignature(buffer, extension) {
  if (!Buffer.isBuffer(buffer)) return false;
  if (extension === "pdf") return buffer.subarray(0, 5).toString() === "%PDF-";
  return extension === "pptx" && buffer.length >= 4 && buffer[0] === 0x50 && buffer[1] === 0x4b && buffer[2] === 0x03 && buffer[3] === 0x04;
}
