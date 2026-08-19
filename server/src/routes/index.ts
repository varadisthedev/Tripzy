import { Router } from "express";

import authRoutes from "../features/auth/auth.routes.js";
import userRoutes from "../features/users/user.routes.js";
import bookingRoutes from "../features/bookings/booking.routes.js";
import searchHistoryRoutes from "../features/search-history/search-history.routes.js";
import healthRoutes from "../features/health/health.routes.js";

const router = Router();

router.use("/health", healthRoutes);
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/bookings", bookingRoutes);
router.use("/search-history", searchHistoryRoutes);

export default router;
