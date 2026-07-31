import { Router } from "express";


const router = Router();

router.get("/stats", authMiddleware, (req, res) => dsaController.getStats(req, res));
router.get("/submissions", authMiddleware, (req, res) => dsaController.getSubmissions(req, res));

export default router;
