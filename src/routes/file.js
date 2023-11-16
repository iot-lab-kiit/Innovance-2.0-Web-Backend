import express from "express";
import {
  uploadPage,
  uploader,
  listFiles,
  deleteFile,
} from "../controllers/file.js";
import { auth } from "../middleware/auth.js";
import { uploadMiddleware } from "../middleware/upload.js";
import { authAdmin } from "../middleware/authAdmin.js";
const router = express.Router();

router.get("/", uploadPage);
router.post("/", [auth, uploadMiddleware], uploader);
router.get("/listFiles", [authAdmin], listFiles);
router.delete("/delete/:id", [authAdmin], deleteFile);

export default router;
