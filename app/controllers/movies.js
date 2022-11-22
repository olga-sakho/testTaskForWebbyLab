import { validateCreateMovie, validateUpdateMovie } from "./validation.js";
import { Actors_Movies } from "../models/actors_movies.js";
import { Movies, Actors } from "../models/movies.js"
import { getActorInfo } from "./services.js"

const createMovie = async (req, res) => {
    try {
        let actor;
        let movie;
        let actorMovies;
        let existActor;
        req.body = validateCreateMovie(req.body)
        const existMovie = await Movies.getOne(req.body)
        if (existMovie) {
            return res.send(`This movie ${req.body.title} already exist`);
        } else if (!existMovie) {
            movie = await Movies.createMovie(req.body);
            let actors = req.body.actors.split(',')
            for (let i=0; i < actors.length; i++){
                existActor = await Actors.getByName(actors[i]);
                if(existActor){
                    console.log(`This actor ${actors[i]} already exist`)
                }
                actor = await Actors.createActor(actors[i]);
                actorMovies = await Actors_Movies.addNew(actor.id, movie.id)
            }
            movie = await Movies.getAllActors(movie.id)
            return res.status(201).json(movie);
        }
    } catch (err) {
        res.status(400).json(err.message);
    } 
}
  
const getOneMovie = async (req, res) => {
    try {
        const oneMovieById = await Movies.getOneById(req.params.id);
        if (oneMovieById) {
            return res.status(200).json(oneMovieById);
        } else if (!oneMovieById) {
            return res.status(404).json({
                message: "Not Found"
            });
        }
    } catch (err) {
        res.status(400).json(err.message);
    } 
}


  
const getListSort = async (req, res) => {
    try {
        let listMovie;
        if (Object.keys(req.query).length == 0) {
            const allMovies = await Movies.getAllMovies();
            if (allMovies) {
                return res.status(200).json({
                    status: 1,
                    data: allMovies,
                    meta: { total: allMovies.length }
                });
            } else if (!allMovies) {
                return res.status(404).json({
                    message: "Not Found"
                });
            }
        } else {
            listMovie = await Movies.getListByParams(req.query);
            if (req.query.sort === "title") {
                listMovie = listMovie.sort((movie1, movie2) => {
                  return movie1.title.localeCompare(movie2.title);
                });
              }
            if (listMovie) {
                return res.status(200).json({
                    status: 1,
                    data: listMovie,
                    meta: { total: listMovie.length }
                  });
            } else if (!listMovie) {
                return res.status(404).json({
                    message: "Not Found"
                });
            }
        }
       
    } catch (err) {
        res.status(400).json(err.message);
    } 
}
  
const updateMovie = async (req, res) => {
    try {
        let update;
        if (req.body.actors) {
            req.body = validateUpdateMovie(req.body)
            req.body.actors = req.body.actors.toString()
            update = await Movies.updateMovie(req.params.id, req.body)
            const actorInfo = await getActorInfo(req.body.actors, req.params.id);
            const result = await Movies.getOneById(update.id);

            return res.status(200).json({ 
                data: { 
                    id: result.id, 
                    title: result.title, 
                    format: result.format, 
                    createdAt: result.createdAt,
                    updatedAt: result.updatedAt,
                    actors: actorInfo 
                }, 
                status: 1 });
        } else {
            req.body = validateUpdateMovie(req.body)
            update = await Movies.updateMovie(req.params.id, req.body);
            const result = await Movies.getOneById(update.id);
            const actorInfo = await getActorInfo(
              result.dataValues.actors.split(",")
            );
        
            return res.status(200).json({ 
                data: { 
                    id: result.id, 
                    title: result.title, 
                    format: result.format, 
                    createdAt: result.createdAt,
                    updatedAt: result.updatedAt,
                    actors: actorInfo 
                }, 
                status: 1 });
        }
    } catch (err) {
        return res.status(400).json(err.message);
    } 
}
  
const deleteMovie = async (req, res) => {
    try {
        const oneMovieById = await Movies.getOneById(req.params.id);
        if (oneMovieById) {
            const deleteMovie = await Movies.deleteForeverMovies(req.params.id);
            return res.status(200).json({'status': 1});
        } else {
            return res.status(404).json({
                message: "Movie Not Found"
            });
        }
    } catch (err) {
        res.status(400).json(err.message);
    } 
}
  

  
export { 
    createMovie,
    getOneMovie,
    getListSort,
    updateMovie,
    deleteMovie
};