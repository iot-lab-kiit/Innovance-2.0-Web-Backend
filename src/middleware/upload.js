import dotenv from "dotenv";
import multer from "multer";
dotenv.config();

const storagePath = process.env.STORAGE_PATH || "FILES_STORAGE/";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, storagePath, (error) => {
      if (error) console.error("Error in destination callback:", error);
    });
  },
  filename: function (req, file, cb) {
    cb(null, req.user + "-" + Date.now() + "-" + file.originalname, (error) => {
      if (error) console.error("Error in filename callback:", error);
    });
  },
});

const upload = multer({ storage: storage });
export const uploadMiddleware = (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: "Unauthenticated." });
  upload.single("audioFile")(req, res, (err) => {
    if (err) {
      console.error("Error during file upload:", err);
      return res.status(500).json({ error: "File upload failed" });
    }
    next();
  });
};
