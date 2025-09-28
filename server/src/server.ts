import express from "express";
import { userRouter } from "./routes/userRoutes";
import { errorHandler } from "./middlewares/errorHandler";
import { userMiddleware } from "./middlewares/userMiddleware";
import { categoriesRouter } from "./routes/categoryRoutes";
import { photoAlbumRouter } from "./routes/photoAlbumsRouter";

export const app = express();
app.use(express.json());

app.use(userMiddleware);
app.use("/api/users", userRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/photo-albums", photoAlbumRouter);

app.use(errorHandler);
