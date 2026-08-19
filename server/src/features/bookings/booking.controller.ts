import type { Request, Response } from "express";
import { bookingRepository } from "./booking.repository.js";
import { createBookingSchema, updateBookingSchema } from "./booking.schema.js";

export async function listBookings(req: Request, res: Response): Promise<void> {
    if (!req.user) {
        res.status(401).json({ message: "Authentication required." });
        return;
    }

    const bookings = await bookingRepository.findAllByUserId(req.user.userId);
    res.status(200).json({ bookings });
}

export async function getBooking(req: Request, res: Response): Promise<void> {
    if (!req.user) {
        res.status(401).json({ message: "Authentication required." });
        return;
    }

    const booking = await bookingRepository.findByIdForUser(String(req.params.id), req.user.userId);
    if (!booking) {
        res.status(404).json({ message: "Booking not found." });
        return;
    }

    res.status(200).json({ booking });
}

export async function createBooking(req: Request, res: Response): Promise<void> {
    if (!req.user) {
        res.status(401).json({ message: "Authentication required." });
        return;
    }

    const parsed = createBookingSchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({ message: "Invalid booking data.", errors: parsed.error.flatten().fieldErrors });
        return;
    }

    const input = parsed.data;
    const booking = await bookingRepository.create(req.user.userId, {
        ...input,
        totalAmount: input.totalAmount !== undefined ? String(input.totalAmount) : undefined,
    });

    res.status(201).json({ message: "Booking created successfully.", booking });
}

export async function updateBooking(req: Request, res: Response): Promise<void> {
    if (!req.user) {
        res.status(401).json({ message: "Authentication required." });
        return;
    }

    const parsed = updateBookingSchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({ message: "Invalid booking data.", errors: parsed.error.flatten().fieldErrors });
        return;
    }

    const input = parsed.data;
    const booking = await bookingRepository.updateForUser(String(req.params.id), req.user.userId, {
        ...input,
        totalAmount: input.totalAmount !== undefined ? String(input.totalAmount) : undefined,
    });

    if (!booking) {
        res.status(404).json({ message: "Booking not found." });
        return;
    }

    res.status(200).json({ message: "Booking updated successfully.", booking });
}

export async function deleteBooking(req: Request, res: Response): Promise<void> {
    if (!req.user) {
        res.status(401).json({ message: "Authentication required." });
        return;
    }

    const deleted = await bookingRepository.deleteForUser(String(req.params.id), req.user.userId);
    if (!deleted) {
        res.status(404).json({ message: "Booking not found." });
        return;
    }

    res.status(200).json({ message: "Booking deleted successfully." });
}
