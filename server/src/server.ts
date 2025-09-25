import express from "express";
import { userRouter } from "./routes/userRoutes";
import { errorHandler } from "./middlewares/errorHandler";

export const app = express();
app.use(express.json());

app.use("/api/users", userRouter);

app.use(errorHandler);
