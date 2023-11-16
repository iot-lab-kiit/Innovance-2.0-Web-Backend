import path from "path";

import { dirname } from "path";
import { fileURLToPath } from "url";

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
