import express from "express";
import {
  authenticate,
  getUsers,
  updateUser,
  authToken,
} from "../controllers/user.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/auth", [auth], authToken);
router.post("/auth", authenticate);
router.patch("/", [auth], updateUser);

export default router;
