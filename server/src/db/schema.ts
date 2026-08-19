import {
    pgTable,
    pgEnum,
    uuid,
    varchar,
    text,
    boolean,
    timestamp,
    numeric,
    integer,
    date,
    jsonb,
    uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const userRoleEnum = pgEnum("user_role", ["user", "admin"]);

export const genderEnum = pgEnum("gender", ["male", "female", "other", "prefer_not_to_say"]);

export const bookingTypeEnum = pgEnum("booking_type", [
    "flight",
    "hotel",
    "package",
    "activity",
    "transport",
    "other",
]);

export const bookingStatusEnum = pgEnum("booking_status", [
    "pending",
    "confirmed",
    "cancelled",
    "completed",
]);

// ── users ────────────────────────────────────────────────────────────────
// Core account data collected at signup. Kept minimal on purpose — everything
// optional/extended lives in user_profiles.
export const users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 120 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    password: text("password").notNull(),
    role: userRoleEnum("role").notNull().default("user"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => ({
    emailUnique: uniqueIndex("users_email_unique").on(table.email),
}));

// ── user_profiles ───────────────────────────────────────────────────────
// 1:1 extension of users. Every field beyond the FK is nullable — profile
// completion is optional and incremental.
export const userProfiles = pgTable("user_profiles", {
    userId: uuid("user_id")
        .primaryKey()
        .references(() => users.id, { onDelete: "cascade" }),
    username: varchar("username", { length: 50 }),
    phoneNumber: varchar("phone_number", { length: 20 }),
    dateOfBirth: date("date_of_birth"),
    gender: genderEnum("gender"),
    bio: text("bio"),
    avatarUrl: text("avatar_url"),
    homeCity: varchar("home_city", { length: 100 }),
    homeCountry: varchar("home_country", { length: 100 }),
    // Travel interests as a free-form text array, e.g. ["beaches", "trekking", "wildlife"]
    travelInterests: text("travel_interests").array(),
    preferredTravelStyle: varchar("preferred_travel_style", { length: 50 }),
    budgetMin: numeric("budget_min", { precision: 12, scale: 2 }),
    budgetMax: numeric("budget_max", { precision: 12, scale: 2 }),
    budgetCurrency: varchar("budget_currency", { length: 3 }).default("INR"),
    preferredLanguage: varchar("preferred_language", { length: 50 }),
    marketingOptIn: boolean("marketing_opt_in").notNull().default(false),
    onboardingCompleted: boolean("onboarding_completed").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => ({
    usernameUnique: uniqueIndex("user_profiles_username_unique").on(table.username),
}));

// ── bookings ─────────────────────────────────────────────────────────────
// Every booking a user makes, FK'd to the user for history / search lookups.
export const bookings = pgTable("bookings", {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    type: bookingTypeEnum("type").notNull().default("other"),
    status: bookingStatusEnum("status").notNull().default("pending"),
    title: varchar("title", { length: 200 }).notNull(),
    destination: varchar("destination", { length: 150 }),
    origin: varchar("origin", { length: 150 }),
    startDate: date("start_date"),
    endDate: date("end_date"),
    guests: integer("guests").default(1),
    totalAmount: numeric("total_amount", { precision: 12, scale: 2 }),
    currency: varchar("currency", { length: 3 }).default("INR"),
    bookingReference: varchar("booking_reference", { length: 40 }),
    notes: text("notes"),
    // Arbitrary extra data (provider payload, itinerary details, etc.)
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => ({
    bookingReferenceUnique: uniqueIndex("bookings_reference_unique").on(table.bookingReference),
}));

// ── search_history ──────────────────────────────────────────────────────
// Lightweight log of what a user searched for, to power "recent searches"
// and personalization later.
export const searchHistory = pgTable("search_history", {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    query: varchar("query", { length: 255 }).notNull(),
    filters: jsonb("filters"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

// ── relations (for drizzle relational query API) ───────────────────────
export const usersRelations = relations(users, ({ one, many }) => ({
    profile: one(userProfiles, {
        fields: [users.id],
        references: [userProfiles.userId],
    }),
    bookings: many(bookings),
    searchHistory: many(searchHistory),
}));

export const userProfilesRelations = relations(userProfiles, ({ one }) => ({
    user: one(users, {
        fields: [userProfiles.userId],
        references: [users.id],
    }),
}));

export const bookingsRelations = relations(bookings, ({ one }) => ({
    user: one(users, {
        fields: [bookings.userId],
        references: [users.id],
    }),
}));

// ── row types ────────────────────────────────────────────────────────────
export type UserRow = typeof users.$inferSelect;
export type NewUserRow = typeof users.$inferInsert;
export type UserProfileRow = typeof userProfiles.$inferSelect;
export type NewUserProfileRow = typeof userProfiles.$inferInsert;
export type BookingRow = typeof bookings.$inferSelect;
export type NewBookingRow = typeof bookings.$inferInsert;
export type SearchHistoryRow = typeof searchHistory.$inferSelect;
export type NewSearchHistoryRow = typeof searchHistory.$inferInsert;

export const searchHistoryRelations = relations(searchHistory, ({ one }) => ({
    user: one(users, {
        fields: [searchHistory.userId],
        references: [users.id],
    }),
}));
