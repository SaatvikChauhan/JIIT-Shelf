import { google } from "googleapis";
import dotenv from "dotenv";
dotenv.config();

const SCOPES = ["https://www.googleapis.com/auth/drive.readonly"];

const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: SCOPES,
});

const drive = google.drive({ version: "v3", auth });

export async function listFolderContents(id) {
  try {
    const meta = await drive.files.get({
      fileId: id,
      fields: "id, name, mimeType",
    });

    const mime = meta.data.mimeType;

    if (mime !== "application/vnd.google-apps.folder") {
      const fileRes = await drive.files.get(
        {
          fileId: id,
          alt: "media",
        },
        { responseType: "text" }
      );

      return {
        id,
        name: meta.data.name,
        mimeType: mime,
        type: "file",
        content: fileRes.data,
      };
    }

    const res = await drive.files.list({
      q: `'${id}' in parents and trashed=false`,
      fields: "files(id, name, mimeType, webViewLink, webContentLink)",
    });

    const files = res.data.files.map(file => ({
      id: file.id,
      name: file.name,
      mimeType: file.mimeType,
      type: file.mimeType === "application/vnd.google-apps.folder" ? "folder" : "file",
      webViewLink: file.webViewLink || null,
      webContentLink: file.webContentLink || null,
    }));

    return files;

  } catch (error) {
    console.error("Error listing folder contents:", error);
    throw error;
  }
}
