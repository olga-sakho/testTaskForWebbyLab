import { createUser } from "../controllers/user.js";
import express from "express";
const router = express();

router.post("/api/v1/users", createUser);

export {router}