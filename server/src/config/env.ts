import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

<<<<<<< HEAD
const envSchema = z
    .object({
        NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
        PORT: z.coerce.number().default(5000),

        // Comma-separated list of allowed origins, e.g.
        // "http://localhost:5173,https://tripzee.vercel.app"
        CORS_ORIGINS: z.string().min(1).default("http://localhost:5173"),

        // Neon/Postgres connection string. Accept either name so the existing
        // NEON_URI in .env keeps working without renaming it.
        DATABASE_URL: z.string().min(1).optional(),
        NEON_URI: z.string().min(1).optional(),

        JWT_SECRET: z.string().min(1, "JWT_SECRET is required"),
    })
    .refine((data) => Boolean(data.DATABASE_URL || data.NEON_URI), {
        message: "DATABASE_URL or NEON_URI is required",
        path: ["DATABASE_URL"],
    });
=======
const envSchema = z.object({
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
    PORT: z.coerce.number().default(5000),
    CLIENT_ORIGIN: z.string().url().default("http://localhost:5173"),
    MONGO_URI: z.string().min(1, "MONGO_URI is required"),
    JWT_SECRET: z.string().min(1, "JWT_SECRET is required"),
});
>>>>>>> ee5df9a4864993e52cb5fba829cddd1c386b14a6

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
    console.error("Invalid environment variables:", parsed.error.flatten().fieldErrors);
    process.exit(1);
}

<<<<<<< HEAD
const data = parsed.data;

export const env = {
    ...data,
    DATABASE_URL: (data.DATABASE_URL || data.NEON_URI) as string,
    CORS_ORIGIN_LIST: data.CORS_ORIGINS.split(",").map((origin) => origin.trim()).filter(Boolean),
};
=======
export const env = parsed.data;
>>>>>>> ee5df9a4864993e52cb5fba829cddd1c386b14a6
