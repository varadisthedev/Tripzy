import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { listBookings, getBooking, createBooking, updateBooking, deleteBooking } from "./booking.controller.js";

const router = Router();

router.get("/", authMiddleware, listBookings);
router.post("/", authMiddleware, createBooking);
router.get("/:id", authMiddleware, getBooking);
router.patch("/:id", authMiddleware, updateBooking);
router.delete("/:id", authMiddleware, deleteBooking);

export default router;
