import type { CorsOptions } from "cors";
import { env } from "./env.js";

const allowedOrigins = new Set(env.CORS_ORIGIN_LIST);

export const corsOptions: CorsOptions = {
    origin(origin, callback) {
        // Allow non-browser requests (curl, server-to-server, health checks) that send no Origin header.
        if (!origin || allowedOrigins.has(origin)) {
            callback(null, true);
            return;
        }
        const error = Object.assign(new Error(`Origin "${origin}" is not allowed by CORS.`), {
            statusCode: 403,
        });
        callback(error);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
};
