import express from "express";
import {
  addResults,
  addPrompt,
  getAllMusicPrompts,
  //   getPromptsIn7Days,
} from "../controllers/music.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/", [auth], addPrompt);
router.patch("/:id", [auth], addResults);
router.get("/prompts/:id", [auth], getAllMusicPrompts);
// router.get("/latest", [auth], getPromptsIn7Days);

export default router;
