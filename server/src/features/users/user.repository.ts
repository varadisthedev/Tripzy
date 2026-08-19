import { eq } from "drizzle-orm";
import { db } from "../../db/client.js";
import { users, userProfiles, type UserRow, type UserProfileRow } from "../../db/schema.js";

export type NewUserInput = {
    name: string;
    email: string;
    password: string;
};

export const userRepository = {
    async findByEmail(email: string): Promise<UserRow | undefined> {
        const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);
        return user;
    },

    async findById(id: string): Promise<UserRow | undefined> {
        const [user] = await db.select().from(users).where(eq(users.id, id)).limit(1);
        return user;
    },

    async create(input: NewUserInput): Promise<UserRow> {
        const [user] = await db.insert(users).values(input).returning();
        return user;
    },

    async findProfileByUserId(userId: string): Promise<UserProfileRow | undefined> {
        const [profile] = await db
            .select()
            .from(userProfiles)
            .where(eq(userProfiles.userId, userId))
            .limit(1);
        return profile;
    },

    async isUsernameTaken(username: string, excludingUserId: string): Promise<boolean> {
        const [existing] = await db
            .select({ userId: userProfiles.userId })
            .from(userProfiles)
            .where(eq(userProfiles.username, username))
            .limit(1);
        return Boolean(existing && existing.userId !== excludingUserId);
    },

    async upsertProfile(
        userId: string,
        fields: Partial<Omit<UserProfileRow, "userId" | "createdAt" | "updatedAt">>
    ): Promise<UserProfileRow> {
        const [profile] = await db
            .insert(userProfiles)
            .values({ userId, ...fields })
            .onConflictDoUpdate({
                target: userProfiles.userId,
                set: { ...fields, updatedAt: new Date() },
            })
            .returning();
        return profile;
    },
};
