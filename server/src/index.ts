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
import { corsOptions } from "./config/cors.js";
import { connectDatabase } from "./db/client.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import router from "./routes/index.js";

// middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
app.use("/api", router);
app.use(errorMiddleware);

await connectDatabase();

app.listen(env.PORT, async () => {
  console.log(chalk.green(`###Server is running on port ${env.PORT}`));
  console.log(chalk.blue(`###Connected to Neon Postgres`));
  console.log(chalk.blue(`###Allowed origins: ${env.CORS_ORIGIN_LIST.join(", ")}`));
  console.log(chalk.yellow(`###NODE_ENV resolved to: "${env.NODE_ENV}"`));
});
