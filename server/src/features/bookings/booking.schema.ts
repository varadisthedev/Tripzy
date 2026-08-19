import { z } from "zod";

export const bookingTypeValues = ["flight", "hotel", "package", "activity", "transport", "other"] as const;
export const bookingStatusValues = ["pending", "confirmed", "cancelled", "completed"] as const;

export const createBookingSchema = z.object({
    type: z.enum(bookingTypeValues).default("other"),
    status: z.enum(bookingStatusValues).default("pending"),
    title: z.string().trim().min(1).max(200),
    destination: z.string().trim().max(150).optional(),
    origin: z.string().trim().max(150).optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    guests: z.number().int().positive().default(1),
    totalAmount: z.number().nonnegative().optional(),
    currency: z.string().trim().length(3).optional(),
    bookingReference: z.string().trim().max(40).optional(),
    notes: z.string().max(1000).optional(),
    metadata: z.record(z.string(), z.any()).optional(),
});

export const updateBookingSchema = createBookingSchema.partial();

export type CreateBookingInput = z.infer<typeof createBookingSchema>;
export type UpdateBookingInput = z.infer<typeof updateBookingSchema>;
