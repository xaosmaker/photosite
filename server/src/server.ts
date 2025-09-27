import express from "express";
import { userRouter } from "./routes/userRoutes";
import { errorHandler } from "./middlewares/errorHandler";
import { userMiddleware } from "./middlewares/userMiddleware";

export const app = express();
app.use(express.json());

app.use(userMiddleware);
app.use("/api/users", userRouter);

app.use(errorHandler);
