import path from "path";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config();
const storagePath = process.env.STORAGE_PATH || "./FILES_STORAGE";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const uploadPage = async (req, res) => {
  try {
    res.sendFile(path.join(__dirname + "../../../index.html"));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const uploader = async (req, res) => {
  if (!req.user) return res.status(401).json({ message: "Unauthenticated." });
  const file = req.file;
  if (!file) return res.status(400).json({ error: "No file provided" });
  return res.json({
    message: "upload success",
    filename: file.filename,
    size: file.size,
    mimetype: file.mimetype,
  });
};

export const deleteFile = async (req, res) => {
  const keyword = req.params.id;
  try {
    const items = await fs.promises.readdir(storagePath);
    const filesToDelete = items.filter((item) => item.startsWith(keyword));
    await Promise.all(
      filesToDelete.map(async (file) => {
        const filePath = path.join(storagePath, file);
        await fs.promises.unlink(filePath);
      })
    );
    res.json({ message: `File(s) starting with "${keyword}" deleted` });
  } catch (error) {
    console.error("Error deleting files:", error);
    res.status(500).send("Error deleting files");
  }
};

export const listFiles = (req, res) => {
  fs.readdir(storagePath, { withFileTypes: true }, (err, items) => {
    if (err) return res.status(500).send("Error reading directory");
    const files = items
      .filter((item) => item.isFile())
      .map((item) => item.name);
    const folders = items
      .filter((item) => item.isDirectory())
      .map((item) => item.name);
    res.json({ files, folders });
  });
};
