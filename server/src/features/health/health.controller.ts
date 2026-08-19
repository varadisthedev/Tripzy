import type { Request, Response } from "express";
import { pingDatabase } from "../../db/client.js";

const startedAt = Date.now();

function formatUptime(ms: number): string {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
}

function toMb(bytes: number): number {
    return Math.round((bytes / 1024 / 1024) * 100) / 100;
}

export async function getHealth(_req: Request, res: Response): Promise<void> {
    const start = Date.now();
    const database = await pingDatabase();
    const uptimeMs = Date.now() - startedAt;
    const memory = process.memoryUsage();

    res.status(database.ok ? 200 : 503).json({
        status: database.ok ? "ok" : "degraded",
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || "development",
        version: "1.0.0",
        uptime: {
            ms: uptimeMs,
            human: formatUptime(uptimeMs),
        },
        responseTimeMs: Date.now() - start,
        dependencies: {
            database: {
                type: "postgresql (neon)",
                connected: database.ok,
                latencyMs: database.latencyMs,
                ...(database.error ? { error: database.error } : {}),
            },
        },
        process: {
            pid: process.pid,
            nodeVersion: process.version,
            platform: process.platform,
            memoryMb: {
                rss: toMb(memory.rss),
                heapUsed: toMb(memory.heapUsed),
                heapTotal: toMb(memory.heapTotal),
                external: toMb(memory.external),
            },
        },
    });
}
