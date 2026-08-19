import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { env } from "../config/env.js";
import crypto from "crypto";
export class AuthService {
    generateAccessToken(payload) {
        return jwt.sign({ ...payload, type: "access" }, env.JWT_SECRET, {
            expiresIn: "15m",
        });
    }
    generateRefreshToken(payload) {
        return jwt.sign({ ...payload, type: "refresh" }, env.JWT_SECRET, {
            expiresIn: "7d",
        });
    }
    verifyToken(token) {
        try {
            const decoded = jwt.verify(token, env.JWT_SECRET);
            return decoded;
        }
        catch (error) {
            throw new Error("Invalid or expired token");
        }
    }
    hashToken(token) {
        return crypto.createHash("sha256").update(token).digest("hex");
    }
    validatePassword(password) {
        if (!password || typeof password !== "string") {
            return { valid: false, message: "Password is required" };
        }
        // Limit to 72 bytes to prevent bcrypt DoS attacks
        if (Buffer.byteLength(password, "utf8") > 72) {
            return { valid: false, message: "Password cannot exceed 72 bytes" };
        }
        if (password.length < 8) {
            return { valid: false, message: "Password must be at least 8 characters long" };
        }
        return { valid: true };
    }
    async hashPassword(password) {
        const { valid, message } = this.validatePassword(password);
        if (!valid) {
            throw new Error(message || "Invalid password");
        }
        return bcrypt.hash(password, 12);
    }
    async comparePasswords(password, hashed) {
        if (!password || !hashed)
            return false;
        return bcrypt.compare(password, hashed);
    }
}
export const authService = new AuthService();
