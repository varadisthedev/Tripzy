import { desc, eq } from "drizzle-orm";
import { db } from "../../db/client.js";
import { searchHistory, type SearchHistoryRow, type NewSearchHistoryRow } from "../../db/schema.js";

export const searchHistoryRepository = {
    async findAllByUserId(userId: string, limit = 20): Promise<SearchHistoryRow[]> {
        return db
            .select()
            .from(searchHistory)
            .where(eq(searchHistory.userId, userId))
            .orderBy(desc(searchHistory.createdAt))
            .limit(limit);
    },

    async create(
        userId: string,
        input: Omit<NewSearchHistoryRow, "id" | "userId" | "createdAt">
    ): Promise<SearchHistoryRow> {
        const [entry] = await db
            .insert(searchHistory)
            .values({ ...input, userId })
            .returning();
        return entry;
    },
};
