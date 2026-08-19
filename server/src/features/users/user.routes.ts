import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { getProfile, updateProfile } from "./user.controllers.js";

const router = Router();

router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);

router.get("/stats", authMiddleware, (_req, res) => res.status(200).json({ stats: [] }));
router.get("/submissions", authMiddleware, (_req, res) => res.status(200).json({ submissions: [] }));

export default router;
