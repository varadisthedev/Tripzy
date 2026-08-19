import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { listSearchHistory, createSearchHistory } from "./search-history.controller.js";

const router = Router();

router.get("/", authMiddleware, listSearchHistory);
router.post("/", authMiddleware, createSearchHistory);

export default router;
