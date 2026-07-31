import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express();
import morgan from "morgan";
import helmet from "helmet";
// middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//routes
app.listen(process.env.PORT, async () => {
    console.clear();
    console.log(`Server is running on port ${process.env.PORT}`);
});
