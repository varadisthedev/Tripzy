import { z } from "zod";

export const signupSchema = z.object({
    name: z.string().trim().min(1, "Name is required").max(120),
    email: z.string().trim().toLowerCase().email("Enter a valid email address"),
    password: z.string(),
});

export const loginSchema = z.object({
    email: z.string().trim().toLowerCase().email("Enter a valid email address"),
    password: z.string().min(1, "Password is required"),
});

export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
