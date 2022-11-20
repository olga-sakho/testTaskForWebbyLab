import { createMovie, getOneMovie, /*getMovieByTitle,*/ getListSort, updateMovie, deleteMovie } from "../controllers/movies.js";
import express from "express";
import { auth } from "../middlewares/jwtAuth.js";
const router = express();

router.post("/api/v1/movies", auth, createMovie);
router.get("/api/v1/movies/:id", auth, getOneMovie);
router.get("/api/v1/movies", auth, getListSort);
router.patch("/api/v1/movies/:id", auth, updateMovie);
router.delete("/api/v1/movies/:id", auth, deleteMovie);


export {router}