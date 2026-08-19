import mongoose from "mongoose";
import { env } from "./env.js";
let mongoConnection = null;
export function connectMongo() {
    if (!mongoConnection) {
        mongoConnection = mongoose.connect(env.MONGO_URI);
    }
    return mongoConnection;
}
