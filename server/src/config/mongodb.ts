import mongoose from "mongoose";
import { env } from "./env.js";

let mongoConnection: Promise<typeof mongoose> | null = null;

export function connectMongo(): Promise<typeof mongoose> {
    if (!mongoConnection) {
        mongoConnection = mongoose.connect(env.MONGO_URI);
    }

    return mongoConnection;
}
