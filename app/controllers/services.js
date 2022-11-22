import { Movies, Actors } from '../models/movies.js'
import { Actors_Movies } from '../models/actors_movies.js'
import { validateCreateMovie, validateActors } from "./validation.js";

function One(movie) {
    const [title, year, format, actors] = movie.split('\n');
  
    return { title, year: +year, format, actors: actors.split(', ') };
}
  
function importMany(data) {
    try {
        return data
        .replace(/Title: |Release Year: |Format: |Stars: /g, '')
        .trim()
        .split('\n\n')
        .map((movie) => One(movie));
    } catch (error) {
      return error.message;
    }
}

async function createMovieByImport (data) {
    try {
        let actor;
        let movie;
        let actorMovies;
        data = validateCreateMovie(data)
        const existMovie = await Movies.getOne(data)
        if (existMovie) {
            return (`This movie ${data.title} already exist`);
        } else if (!existMovie) {
            movie = await Movies.createMovie(data);
            let actors = data.actors.split(',')
            for (let i=0; i < actors.length; i++){
                actor = await Actors.createActor(actors[i]);
                actorMovies = await Actors_Movies.addNew(actor.id, movie.id)
            }
            movie = await Movies.getAllActors(movie.id)
            return movie;
        }
    } catch (err) {
        return err.message;
    } 
}

async function setManyFromFile(files) {
    let moviesCreation;
    let resultMovie = [];
          const movies = importMany(files.movies.data.toString('utf8'));
          for (let i = 0; i < movies.length; i++) {
              moviesCreation = createMovieByImport(movies[i])
              resultMovie.push(moviesCreation)
          }
          const imported = await Promise.allSettled(resultMovie);
          const importedSuccessfully = [];
          const notImported = [];
        
          imported.forEach((response) => {
            if (response.status === 'fulfilled') {
              importedSuccessfully.push(response.value);
            } else {
              notImported.push(response.reason.error);
            }
          });
        
          return [importedSuccessfully, imported.length, notImported];
  
  }

  async function getActorInfo(arr, movieId) {
    let actor;
    let actorMovies = [];
    let existActor;
    let actors = validateActors(arr.split(','))
      for (let i=0; i < actors.length; i++){
        existActor = await Actors.getByName(actors[i]);
        if(existActor){
            console.log(`This actor ${actors[i]} already exist`)
        }
        actor = await Actors.createActor(actors[i]);
        actorMovies.push(actor)
      }
      return actorMovies
  }

export { importMany, setManyFromFile, getActorInfo} 