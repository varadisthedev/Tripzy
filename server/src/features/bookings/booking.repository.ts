import { and, desc, eq } from "drizzle-orm";
import { db } from "../../db/client.js";
import { bookings, type BookingRow, type NewBookingRow } from "../../db/schema.js";

export const bookingRepository = {
    async findAllByUserId(userId: string): Promise<BookingRow[]> {
        return db.select().from(bookings).where(eq(bookings.userId, userId)).orderBy(desc(bookings.createdAt));
    },

    async findByIdForUser(id: string, userId: string): Promise<BookingRow | undefined> {
        const [booking] = await db
            .select()
            .from(bookings)
            .where(and(eq(bookings.id, id), eq(bookings.userId, userId)))
            .limit(1);
        return booking;
    },

    async create(
        userId: string,
        input: Partial<Omit<NewBookingRow, "id" | "userId" | "createdAt" | "updatedAt">>
    ): Promise<BookingRow> {
        const [booking] = await db
            .insert(bookings)
            .values({ ...input, userId } as NewBookingRow)
            .returning();
        return booking;
    },

    async updateForUser(
        id: string,
        userId: string,
        fields: Partial<Omit<NewBookingRow, "id" | "userId" | "createdAt" | "updatedAt">>
    ): Promise<BookingRow | undefined> {
        const [booking] = await db
            .update(bookings)
            .set({ ...fields, updatedAt: new Date() })
            .where(and(eq(bookings.id, id), eq(bookings.userId, userId)))
            .returning();
        return booking;
    },

    async deleteForUser(id: string, userId: string): Promise<boolean> {
        const result = await db
            .delete(bookings)
            .where(and(eq(bookings.id, id), eq(bookings.userId, userId)))
            .returning({ id: bookings.id });
        return result.length > 0;
    },
};
