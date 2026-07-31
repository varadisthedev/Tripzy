export type UserRole = "user" | "admin";

export interface JWTPayload {
    userId: string;
    email: string;
    role: UserRole;
    type?: "access" | "refresh";
}

declare global {
    namespace Express {
        interface Request {
            user?: JWTPayload;
        }
    }
}
