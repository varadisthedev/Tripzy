import { z } from "zod";

const optionalTrimmed = (max: number) =>
    z.union([z.string().trim().max(max), z.literal("")]).optional();

export const updateProfileSchema = z.object({
    username: z.union([z.string().trim().min(3).max(50), z.literal("")]).optional(),
    phoneNumber: optionalTrimmed(20),
    dateOfBirth: optionalTrimmed(10),
    gender: z.enum(["male", "female", "other", "prefer_not_to_say"]).optional(),
    bio: optionalTrimmed(500),
    avatarUrl: optionalTrimmed(2048),
    homeCity: optionalTrimmed(100),
    homeCountry: optionalTrimmed(100),
    travelInterests: z.array(z.string().trim().toLowerCase().min(1)).optional(),
    preferredTravelStyle: optionalTrimmed(50),
    budgetMin: z.number().nonnegative().optional(),
    budgetMax: z.number().nonnegative().optional(),
    budgetCurrency: z.string().trim().length(3).optional(),
    preferredLanguage: optionalTrimmed(50),
    marketingOptIn: z.boolean().optional(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
