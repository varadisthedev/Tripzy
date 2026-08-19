import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

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

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
    console.error("Invalid environment variables:", parsed.error.flatten().fieldErrors);
    process.exit(1);
}

const data = parsed.data;

export const env = {
    ...data,
    DATABASE_URL: (data.DATABASE_URL || data.NEON_URI) as string,
    // Trailing slashes are stripped because browsers never send one in the
    // Origin header (it's scheme+host+port only) — a trailing slash left in
    // here would silently fail to match and block a legitimate origin.
    CORS_ORIGIN_LIST: data.CORS_ORIGINS.split(",")
        .map((origin) => origin.trim().replace(/\/+$/, ""))
        .filter(Boolean),
};
