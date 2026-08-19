import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.DATABASE_URL || process.env.NEON_URI;

if (!connectionString) {
    throw new Error("DATABASE_URL or NEON_URI is required to run drizzle-kit.");
}

export default defineConfig({
    schema: "./src/db/schema.ts",
    out: "./drizzle",
    dialect: "postgresql",
    dbCredentials: {
        url: connectionString,
    },
    strict: true,
    verbose: true,
});
