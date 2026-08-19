import type { Request, Response } from "express";
import { userRepository } from "./user.repository.js";
import { updateProfileSchema } from "./profile.schema.js";
import type { NewUserProfileRow } from "../../db/schema.js";

function toPublicUser(user: { id: string; name: string; email: string; role: string; createdAt: Date }) {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
    };
}

function toPublicProfile(profile: NonNullable<Awaited<ReturnType<typeof userRepository.findProfileByUserId>>> | undefined) {
    if (!profile) return null;

    return {
        username: profile.username,
        phoneNumber: profile.phoneNumber,
        dateOfBirth: profile.dateOfBirth,
        gender: profile.gender,
        bio: profile.bio,
        avatarUrl: profile.avatarUrl,
        homeCity: profile.homeCity,
        homeCountry: profile.homeCountry,
        travelInterests: profile.travelInterests ?? [],
        preferredTravelStyle: profile.preferredTravelStyle,
        budgetMin: profile.budgetMin,
        budgetMax: profile.budgetMax,
        budgetCurrency: profile.budgetCurrency,
        preferredLanguage: profile.preferredLanguage,
        marketingOptIn: profile.marketingOptIn,
        onboardingCompleted: profile.onboardingCompleted,
        updatedAt: profile.updatedAt,
    };
}

// Blank strings mean "clear this field" — convert to null before hitting the DB.
function blankToNull<T extends string | undefined>(value: T): string | null | undefined {
    if (value === undefined) return undefined;
    return value === "" ? null : value;
}

export async function getProfile(req: Request, res: Response): Promise<void> {
    if (!req.user) {
        res.status(401).json({ message: "Authentication required." });
        return;
    }

    const user = await userRepository.findById(req.user.userId);
    if (!user) {
        res.status(404).json({ message: "User not found." });
        return;
    }

    const profile = await userRepository.findProfileByUserId(user.id);

    res.status(200).json({
        user: toPublicUser(user),
        profile: toPublicProfile(profile),
    });
}

export async function updateProfile(req: Request, res: Response): Promise<void> {
    if (!req.user) {
        res.status(401).json({ message: "Authentication required." });
        return;
    }

    const parsed = updateProfileSchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({ message: "Invalid profile data.", errors: parsed.error.flatten().fieldErrors });
        return;
    }

    const input = parsed.data;

    if (input.username) {
        const taken = await userRepository.isUsernameTaken(input.username, req.user.userId);
        if (taken) {
            res.status(409).json({ message: "That username is already taken." });
            return;
        }
    }

    const fields: Partial<NewUserProfileRow> = {
        username: blankToNull(input.username),
        phoneNumber: blankToNull(input.phoneNumber),
        dateOfBirth: blankToNull(input.dateOfBirth),
        gender: input.gender,
        bio: blankToNull(input.bio),
        avatarUrl: blankToNull(input.avatarUrl),
        homeCity: blankToNull(input.homeCity),
        homeCountry: blankToNull(input.homeCountry),
        travelInterests: input.travelInterests,
        preferredTravelStyle: blankToNull(input.preferredTravelStyle),
        budgetMin: input.budgetMin !== undefined ? String(input.budgetMin) : undefined,
        budgetMax: input.budgetMax !== undefined ? String(input.budgetMax) : undefined,
        budgetCurrency: input.budgetCurrency,
        preferredLanguage: blankToNull(input.preferredLanguage),
        marketingOptIn: input.marketingOptIn,
    };

    // Drop untouched keys so a partial update doesn't overwrite existing values with undefined.
    const cleanedFields = Object.fromEntries(
        Object.entries(fields).filter(([, value]) => value !== undefined)
    ) as Partial<NewUserProfileRow>;

    const profile = await userRepository.upsertProfile(req.user.userId, cleanedFields);

    res.status(200).json({
        message: "Profile updated successfully.",
        profile: toPublicProfile(profile),
    });
}
