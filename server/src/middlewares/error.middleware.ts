import type { NextFunction, Request, Response } from "express";
import { env } from "../config/env.js";

type ErrorLike = {
    message?: string;
    stack?: string;
    statusCode?: number;
    status?: number;
    code?: string;
};

function getStackLocation(stack?: string): string | null {
    if (!stack) return null;

    const stackLines = stack.split("\n").map((line) => line.trim());
    const frameLine = stackLines.find((line) => line.startsWith("at "));
    if (!frameLine) return null;

    const match = frameLine.match(/^at\s+(?:(.+?)\s+)?\(?(.+?):(\d+):(\d+)\)?$/);
    if (!match) return frameLine;

    const [, functionName, filePath, lineNumber, columnNumber] = match;
    const location = `${filePath}:${lineNumber}:${columnNumber}`;
    return functionName ? `${functionName} (${location})` : location;
}

export function errorMiddleware(error: unknown, req: Request, res: Response, _next: NextFunction): void {
    const knownError = error as ErrorLike;
    const statusCode = knownError.statusCode || knownError.status || 500;
    const isServerError = statusCode >= 500;
    const includeInternals = env.NODE_ENV !== "production";
    const stackLocation = getStackLocation(knownError.stack);

    // Never leak internal error details to the client in production, and never
    // leak an unexpected 500's raw message either (it may echo DB/driver internals).
    const message =
        isServerError && !includeInternals
            ? "Unexpected server error."
            : knownError.message || "Unexpected server error.";

    console.error({
        message: knownError.message || "Unexpected server error.",
        method: req.method,
        path: req.originalUrl,
        location: stackLocation,
        code: knownError.code,
        stack: knownError.stack,
    });

    res.status(statusCode).json({
        message,
        ...(includeInternals
            ? {
                  error: {
                      method: req.method,
                      path: req.originalUrl,
                      location: stackLocation,
                      code: knownError.code,
                  },
              }
            : {}),
    });
}
