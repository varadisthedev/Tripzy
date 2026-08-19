import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { sql } from "drizzle-orm";

import { env } from "../config/env.js";
import * as schema from "./schema.js";

export const pool = new Pool({
    connectionString: env.DATABASE_URL,
    max: 10,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 10_000,
});

pool.on("error", (error) => {
    console.error("Unexpected error on idle Postgres client", error);
});

export const db = drizzle(pool, { schema });

export async function pingDatabase(): Promise<{ ok: boolean; latencyMs: number; error?: string }> {
    const start = Date.now();
    try {
        await db.execute(sql`select 1`);
        return { ok: true, latencyMs: Date.now() - start };
    } catch (error) {
        return {
            ok: false,
            latencyMs: Date.now() - start,
            error: error instanceof Error ? error.message : "Unknown database error",
        };
    }
}

export async function connectDatabase(): Promise<void> {
    const result = await pingDatabase();
    if (!result.ok) {
        throw new Error(`Unable to connect to Postgres: ${result.error}`);
    }
}
