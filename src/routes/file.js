import express from "express";
import { uploadPage, uploader } from "../controllers/file.js";
import { auth } from "../middleware/auth.js";
import { uploadMiddleware } from "../middleware/upload.js";

const router = express.Router();

router.get("/", uploadPage);
router.post("/", [auth, uploadMiddleware], uploader);

export default router;
