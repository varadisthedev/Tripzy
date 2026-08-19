import rateLimit from "express-rate-limit";

// Scoped tightly to credential-guessing endpoints (login/signup) — brute-force /
// credential-stuffing protection. Keyed by IP by default.
export const authRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: "Too many attempts. Please try again later." },
});

// Refresh requires a valid signed refresh-token cookie already, so it isn't a
// credential-guessing surface — but the frontend calls it automatically on any
// 401, so it needs a much higher budget than login/signup or normal usage
// (multiple tabs, bursts of requests after an idle period) could trip it and
// lock a legitimate session out of both refresh and login at once.
export const refreshRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 60,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: "Too many refresh attempts. Please sign in again." },
});
