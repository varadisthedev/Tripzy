import type { Request, Response } from "express";
import { env } from "../../config/env.js";
import { userRepository } from "../users/user.repository.js";
import { authService } from "../../services/auth.service.js";
import type { UserRow } from "../../db/schema.js";
import { signupSchema, loginSchema } from "./auth.schema.js";

function toPublicUser(user: Pick<UserRow, "id" | "name" | "email" | "role">) {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
    };
}

function cookieOptions(maxAge: number) {
    return {
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        sameSite: env.NODE_ENV === "production" ? ("none" as const) : ("lax" as const),
        maxAge,
        path: "/",
    };
}

function setAuthCookies(res: Response, accessToken: string, refreshToken: string): void {
    res.cookie("accessToken", accessToken, cookieOptions(15 * 60 * 1000));
    res.cookie("refreshToken", refreshToken, cookieOptions(7 * 24 * 60 * 60 * 1000));
}

function clearAuthCookies(res: Response): void {
    const clearOptions = {
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        sameSite: env.NODE_ENV === "production" ? ("none" as const) : ("lax" as const),
        path: "/",
    };

    res.clearCookie("accessToken", clearOptions);
    res.clearCookie("refreshToken", clearOptions);
}

export async function signup(req: Request, res: Response): Promise<void> {
    try {
        const parsed = signupSchema.safeParse(req.body);
        if (!parsed.success) {
            res.status(400).json({ message: "Invalid signup data.", errors: parsed.error.flatten().fieldErrors });
            return;
        }

        const { name, email, password } = parsed.data;

        const passwordCheck = authService.validatePassword(password);
        if (!passwordCheck.valid) {
            res.status(400).json({ message: passwordCheck.message });
            return;
        }

        const existingUser = await userRepository.findByEmail(email);
        if (existingUser) {
            res.status(409).json({ message: "An account with that email already exists." });
            return;
        }

        const hashedPassword = await authService.hashPassword(password);
        const user = await userRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        const payload = {
            userId: user.id,
            email: user.email,
            role: user.role,
        };

        const accessToken = authService.generateAccessToken(payload);
        const refreshToken = authService.generateRefreshToken(payload);
        setAuthCookies(res, accessToken, refreshToken);

        res.status(201).json({
            message: "Account created successfully.",
            user: toPublicUser(user),
        });
    } catch (_error) {
        res.status(500).json({ message: "Unable to create account." });
    }
}

export async function login(req: Request, res: Response): Promise<void> {
    try {
        const parsed = loginSchema.safeParse(req.body);
        if (!parsed.success) {
            res.status(400).json({ message: "Invalid login data.", errors: parsed.error.flatten().fieldErrors });
            return;
        }

        const { email, password } = parsed.data;

        const user = await userRepository.findByEmail(email);
        if (!user) {
            res.status(401).json({ message: "Invalid email or password." });
            return;
        }

        const passwordMatches = await authService.comparePasswords(password, user.password);
        if (!passwordMatches) {
            res.status(401).json({ message: "Invalid email or password." });
            return;
        }

        const payload = {
            userId: user.id,
            email: user.email,
            role: user.role,
        };

        const accessToken = authService.generateAccessToken(payload);
        const refreshToken = authService.generateRefreshToken(payload);
        setAuthCookies(res, accessToken, refreshToken);

        res.status(200).json({
            message: "Signed in successfully.",
            user: toPublicUser(user),
        });
    } catch (_error) {
        res.status(500).json({ message: "Unable to sign in." });
    }
}

export async function logout(_req: Request, res: Response): Promise<void> {
    clearAuthCookies(res);
    res.status(200).json({ message: "Signed out successfully." });
}

export async function refresh(req: Request, res: Response): Promise<void> {
    const token = req.cookies?.refreshToken;
    if (!token) {
        res.status(401).json({ message: "Refresh token is required." });
        return;
    }

    let payload;
    try {
        payload = authService.verifyToken(token);
    } catch {
        clearAuthCookies(res);
        res.status(401).json({ message: "Invalid or expired refresh token." });
        return;
    }

    if (payload.type !== "refresh") {
        clearAuthCookies(res);
        res.status(401).json({ message: "Invalid refresh token." });
        return;
    }

    const user = await userRepository.findById(payload.userId);
    if (!user) {
        clearAuthCookies(res);
        res.status(401).json({ message: "Invalid refresh token." });
        return;
    }

    const newPayload = {
        userId: user.id,
        email: user.email,
        role: user.role,
    };

    // Rotate both tokens on every refresh so a stolen refresh token has a short
    // effective lifetime once the legitimate client refreshes again.
    const accessToken = authService.generateAccessToken(newPayload);
    const refreshToken = authService.generateRefreshToken(newPayload);
    setAuthCookies(res, accessToken, refreshToken);

    res.status(200).json({ user: toPublicUser(user) });
}

export async function me(req: Request, res: Response): Promise<void> {
    if (!req.user) {
        res.status(401).json({ message: "Authentication required." });
        return;
    }

    const user = await userRepository.findById(req.user.userId);
    if (!user) {
        res.status(404).json({ message: "User not found." });
        return;
    }

    res.status(200).json({ user: toPublicUser(user) });
}
