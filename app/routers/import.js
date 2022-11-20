import { fileImport } from "../controllers/import.js";
import { auth } from "../middlewares/jwtAuth.js";
import express from "express";
const router = express();

router.post("/api/v1/movies/import", auth, fileImport);

export {router}