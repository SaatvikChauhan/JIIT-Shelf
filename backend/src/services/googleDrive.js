import { google } from "googleapis";
import dotenv from "dotenv";
import { isDriveId } from "../lib/validation.js";
import { createCache } from "../lib/cache.js";
import { limiter } from "../lib/protection.js";
import { driveRoots } from "../config/driveRoots.js";
import { createDriveAccess } from "../lib/driveAccess.js";
import { Readable } from "node:stream";
dotenv.config();
let credentials;
try { credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY); }
catch { throw new Error("GOOGLE_SERVICE_ACCOUNT_KEY must contain valid JSON."); }
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/drive.readonly", "https://www.googleapis.com/auth/drive.file"],
});
const drive = google.drive({ version: "v3", auth });
function contributionClient() {
  const clientId = process.env.GOOGLE_DRIVE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_DRIVE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_DRIVE_REFRESH_TOKEN;
  if (!clientId || !clientSecret || !refreshToken) {
    throw Object.assign(new Error("Google Drive contribution OAuth is not configured"), { code: "CONFIG" });
  }
  const client = new google.auth.OAuth2(clientId, clientSecret);
  client.setCredentials({ refresh_token: refreshToken });
  return google.drive({ version: "v3", auth: client });
}
const cache = createCache();
const metadataCache = createCache({ maxEntries: 500 });
const allowMiss = limiter(120);
const options = { timeout: 15000, retry: false };
const fail = (status, message) => Object.assign(new Error(message), { status });
const folderMime = "application/vnd.google-apps.folder";
const listingCache = createCache();
let contributionFolderCheck;
async function folderEntries(id) {
  return listingCache(id, async () => {
    const entries = []; let pageToken;
    for (let page = 0; page < 10; page++) {
      const { data } = await drive.files.list({
        q: `'${id}' in parents and trashed=false`, pageSize: 100, pageToken,
        fields: "nextPageToken,files(id,name,mimeType,webViewLink,webContentLink)",
      }, options);
      entries.push(...(data.files || []).map(file => ({ ...file, type: file.mimeType === folderMime ? "folder" : "file" })));
      if (Buffer.byteLength(JSON.stringify(entries)) > 256 * 1024) throw fail(413, "Folder listing too large");
      pageToken = data.nextPageToken;
      if (!pageToken) return entries;
    }
    throw fail(413, "Folder contains too many entries");
  });
}
const authorize = createDriveAccess({ roots: driveRoots, listChildren: folderEntries });

async function authorizedMetadata(id) {
  const known = await authorize(id);
  if (known?.mimeType === folderMime) return known;
  const data = await metadataCache(id, async () => {
    const response = await drive.files.get({ fileId: id, fields: "id,name,mimeType,size,trashed" }, options);
    return response.data;
  });
  if (data.trashed) throw fail(404, "Material has been removed");
  return data;
}

export async function listFolderContents(id) {
  if (!isDriveId(id) || id.length > 100) throw fail(400, "Invalid Drive ID");
  const result = await cache(id, async () => {
    if (!allowMiss("all")) throw fail(503, "Drive lookup budget reached");
    const meta = await authorizedMetadata(id);
    if (meta.mimeType !== folderMime) {
      if (meta.name.toLowerCase() !== "yt.txt") throw fail(403, "Open material directly on Google Drive");
      if (Number(meta.size) > 65536) throw fail(413, "Text list too large");
      const { data: stream } = await drive.files.get({ fileId: id, alt: "media" }, { ...options, responseType: "stream" });
      const chunks = []; let bytes = 0;
      const timer = setTimeout(() => stream.destroy(new Error("Drive read timed out")), 15000);
      try {
        for await (const chunk of stream) {
          bytes += chunk.length;
          if (bytes > 65536) { stream.destroy(); throw fail(413, "Text list too large"); }
          chunks.push(Buffer.from(chunk));
        }
      } finally { clearTimeout(timer); }
      return { id, name: meta.name, mimeType: meta.mimeType, type: "file", content: Buffer.concat(chunks).toString("utf8") };
    }
    return folderEntries(id);
  });
  if (Array.isArray(result)) authorize.rememberChildren(id, result);
  return result;
}

export async function uploadContribution({ name, mimeType, data }) {
  const folderId = process.env.GOOGLE_DRIVE_CONTRIBUTIONS_FOLDER_ID;
  if (!isDriveId(folderId) || driveRoots.includes(folderId)) throw Object.assign(new Error("Contributions folder is not configured"), { code: "CONFIG" });
  const contributionDrive = contributionClient();
  if (!contributionFolderCheck) contributionFolderCheck = contributionDrive.files.get({
    fileId: folderId,
    fields: "id,name,mimeType,trashed,capabilities(canAddChildren)",
    supportsAllDrives: true,
  }, options).then(({ data: folder }) => {
    if (folder.trashed || folder.mimeType !== folderMime || folder.name.trim().toLowerCase() !== "contributions" || folder.capabilities?.canAddChildren === false) {
      throw Object.assign(new Error("Contributions folder is invalid"), { code: "CONFIG" });
    }
    return true;
  }).catch(error => { contributionFolderCheck = null; throw error; });
  await contributionFolderCheck;
  const response = await contributionDrive.files.create({
    requestBody: { name, parents: [folderId] },
    media: { mimeType, body: Readable.from(data) },
    fields: "id,name",
    supportsAllDrives: true,
  }, { timeout: 60000, retry: false });
  return response.data;
}
