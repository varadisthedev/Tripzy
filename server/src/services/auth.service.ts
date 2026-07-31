import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { env } from "../config/env.js";
import { JWTPayload } from "../types/auth.types.js";

import crypto from "crypto";

export class AuthService {
    generateAccessToken(payload: JWTPayload): string {
        return jwt.sign({ ...payload, type: "access" }, env.JWT_SECRET, {
            expiresIn: "15m",
        });
    }

    generateRefreshToken(payload: JWTPayload): string {
        return jwt.sign({ ...payload, type: "refresh" }, env.JWT_SECRET, {
            expiresIn: "7d",
        });
    }

    verifyToken(token: string): JWTPayload {
        try {
            const decoded = jwt.verify(token, env.JWT_SECRET) as JWTPayload;
            return decoded;
        } catch (error) {
            throw new Error("Invalid or expired token");
        }
    }

    hashToken(token: string): string {
        return crypto.createHash("sha256").update(token).digest("hex");
    }

    validatePassword(password: string): { valid: boolean; message?: string } {
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

    async hashPassword(password: string): Promise<string> {
        const { valid, message } = this.validatePassword(password);
        if (!valid) {
            throw new Error(message || "Invalid password");
        }
        return bcrypt.hash(password, 12);
    }

    async comparePasswords(password: string, hashed: string): Promise<boolean> {
        if (!password || !hashed) return false;
        return bcrypt.compare(password, hashed);
    }
}

export const authService = new AuthService();
