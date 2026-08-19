import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();
import chalk from "chalk";
import morgan from "morgan";
import helmet from "helmet";
import { env } from "./config/env.js";
import { connectMongo } from "./config/mongodb.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import router from "./routes/index.js";
// middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(cors({
    origin: env.CLIENT_ORIGIN,
    credentials: true,
}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//routes
app.use("/api", router);
app.use(errorMiddleware);
await connectMongo();
app.listen(env.PORT, async () => {
    console.clear();
    console.log(chalk.green(`Server is running on port ${env.PORT}`));
});
