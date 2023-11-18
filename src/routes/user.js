import express from "express";
import {
  authenticate,
  getUsers,
  updateUser,
  authToken,
} from "../controllers/user.js";
import { auth } from "../middleware/auth.js";
import { authAdmin } from "../middleware/authAdmin.js";

const router = express.Router();

router.get("/", [authAdmin], getUsers);
router.get("/auth", [auth], authToken);
router.post("/auth", authenticate);
router.patch("/", [auth], updateUser);

export default router;
