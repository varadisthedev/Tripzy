import { authService } from "../services/auth.service.js";
export function authMiddleware(req, res, next) {
    try {
        let token = req.cookies?.accessToken || req.cookies?.token;
        // Fallback to Authorization header
        if (!token && req.headers.authorization?.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
        }
        if (!token) {
            res.status(401).json({ message: "Authentication required" });
            return;
        }
        const payload = authService.verifyToken(token);
        if (payload.type && payload.type !== "access") {
            res.status(401).json({ message: "Invalid session token type" });
            return;
        }
        req.user = payload;
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Invalid or expired session token" });
    }
}
export function requireRole(...allowedRoles) {
    return (req, res, next) => {
        if (!req.user) {
            res.status(401).json({ message: "Authentication required" });
            return;
        }
        if (!allowedRoles.includes(req.user.role)) {
            res.status(403).json({ message: "Access denied. Insufficient permissions." });
            return;
        }
        next();
    };
}
