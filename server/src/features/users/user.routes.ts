import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = Router();

router.get("/stats", authMiddleware, (_req, res) => res.status(200).json({ stats: [] }));
router.get("/submissions", authMiddleware, (_req, res) => res.status(200).json({ submissions: [] }));

export default router;
