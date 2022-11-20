import { authUser } from "../controllers/session.js";
import express from "express";
const router = express();


router.post("/api/v1/sessions", authUser);

export {router}