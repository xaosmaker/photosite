import express from "express";
import createUserHandler from "../handlers/userHandlers";
import { createUserValidator } from "../validators/userValidators";
import { validateBodyFields } from "../middlewares/validateBodyFields";

const r = express.Router();

r.post("/", createUserValidator(), validateBodyFields, createUserHandler);

export { r as userRouter };
