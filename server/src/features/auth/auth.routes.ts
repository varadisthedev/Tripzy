import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { login, logout, me, signup } from "./auth.controller.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", authMiddleware, me);

export default router;