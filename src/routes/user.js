import express from "express";
import { authenticate, getUsers, updateUser } from "../controllers/user.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/auth", authenticate);
router.get("/", getUsers);
router.patch("/", [auth], updateUser);

export default router;
