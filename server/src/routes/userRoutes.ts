import express from "express";
import {
  createUserHandler,
  getUsersHandler,
  loginUserHandler,
} from "../handlers/userHandlers";
import {
  createUserValidator,
  loginUserValidator,
} from "../validators/userValidators";
import { validateBodyFields } from "../middlewares/validateBodyFields";

const r = express.Router();

r.post("/", createUserValidator(), validateBodyFields, createUserHandler);
r.post("/login", loginUserValidator(), validateBodyFields, loginUserHandler);
r.get("/", getUsersHandler);

export { r as userRouter };
