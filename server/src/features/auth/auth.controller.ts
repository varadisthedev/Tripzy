import type { Request, Response } from "express";
import { env } from "../../config/env.js";
import { UserModel } from "../../models/User.js";
import { authService } from "../../services/auth.service.js";

type AuthRequestBody = {
    name?: string;
    email?: string;
    password?: string;
};

function toPublicUser(user: { _id: unknown; name: string; email: string; role: string }) {
    return {
        id: String(user._id),
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

export async function signup(req: Request<unknown, unknown, AuthRequestBody>, res: Response): Promise<void> {
    try {
        const name = req.body.name?.trim();
        const email = req.body.email?.trim().toLowerCase();
        const password = req.body.password;

        if (!name || !email || !password) {
            res.status(400).json({ message: "Name, email, and password are required." });
            return;
        }

        const passwordCheck = authService.validatePassword(password);
        if (!passwordCheck.valid) {
            res.status(400).json({ message: passwordCheck.message });
            return;
        }

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            res.status(409).json({ message: "An account with that email already exists." });
            return;
        }

        const hashedPassword = await authService.hashPassword(password);
        const user = await UserModel.create({
            name,
            email,
            password: hashedPassword,
        });

        const payload = {
            userId: String(user._id),
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

export async function login(req: Request<unknown, unknown, AuthRequestBody>, res: Response): Promise<void> {
    try {
        const email = req.body.email?.trim().toLowerCase();
        const password = req.body.password;

        if (!email || !password) {
            res.status(400).json({ message: "Email and password are required." });
            return;
        }

        const user = await UserModel.findOne({ email });
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
            userId: String(user._id),
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

export async function me(req: Request, res: Response): Promise<void> {
    if (!req.user) {
        res.status(401).json({ message: "Authentication required." });
        return;
    }

    const user = await UserModel.findById(req.user.userId);
    if (!user) {
        res.status(404).json({ message: "User not found." });
        return;
    }

    res.status(200).json({ user: toPublicUser(user) });
}