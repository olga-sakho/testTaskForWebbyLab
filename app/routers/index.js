import express from "express";
//import { authorization } from "../../../middlewares/auth.js";
import { router as movieRouter } from "./movies.js";
import { router as sessionRouter } from "./session.js";
import { router as userRouter } from "./user.js";
import { router as importRouter } from "./import.js";
const router = express();

router.use("/", sessionRouter);
router.use("/", movieRouter);
router.use("/", userRouter);
router.use("/", importRouter);

export { router };