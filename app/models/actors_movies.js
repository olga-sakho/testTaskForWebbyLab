import { DataTypes, Model } from 'sequelize';
import {sequelize} from "../services/database.js";
import { Movies, Actors } from "./movies.js";
//import { Actors } from "./actors.js";


class Actors_Movies extends Model {
    static associate() {
        // define association here
        Actors.belongsToMany(Movies, {
          through: Actors_Movies,
          foreignKey: "actors_id",
        });
        Movies.belongsToMany(Actors, {
            through: Actors_Movies,
            foreignKey: "movies_id",
          });
      }
    
}

const attributes = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    actorsId: {
        type: DataTypes.STRING,
        defaultValue: 'actors_id'
    },
    moviesId: {
        type: DataTypes.STRING,
        defaultValue: 'movies_id'
    },
};

const options = {timestamps: false, tableName: 'actors_movies', sequelize: sequelize};
Actors_Movies = sequelize.define('Actors_Movies', attributes, options);

// Movies.belongsToMany(Actors, {
//     through: Actors_Movies,
//     foreignKey: "movies_id"
// });

// Actors.belongsToMany(Movies, {
//     through: Actors_Movies,
//     foreignKey: "actors_id"
// });



Actors_Movies.addNew = async (actorId, movieId) => {
    let data = {}
    data.actorsId = actorId
    data.moviesId = movieId
    return Actors_Movies.create(data)
};

Actors_Movies.getAll = async (movieId) => {
    return Actors_Movies.findAll({
        where: {
            moviesId: movieId
            //[Op.or]: [{title: params.title},{title: params.search}]
        },
        include: [{
            model: Actors,
            attributes: ['id', 'name', 'createdAt', 'updatedAt'],
        }],
    })
};




export {Actors_Movies}