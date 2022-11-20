import { DataTypes, Op, Model} from 'sequelize';
import {sequelize} from "../services/database.js";

class Movies extends Model {}
Movies.init(
  {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        field: 'title'
    },
    year: {
        type: DataTypes.NUMBER,
        field: 'year'
    },
    format: {
        type: DataTypes.ENUM,
        values: ['VHS', 'DVD', 'Blu-ray'],
        field: 'format'
    },
    actors:{
        type: DataTypes.STRING,
        field: 'actors'
    },
    createdAt: {
        type: DataTypes.DATE,
        field: 'created_at'
    },
    updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at'
    },
  },
  {
    sequelize,
    tableName: 'movies',
    modelName: 'Movies'
  }
);

class Actors extends Model {}
Actors.init(
  {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        field: 'full_name'
    },
    createdAt: {
        type: DataTypes.DATE,
        field: 'created_at'
    },
    updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at'
    },
  },
  { sequelize, tableName: 'actors', modelName: 'Actors' }
);

Movies.belongsToMany(Actors, { through: 'Actors_Movies', foreignKey: "moviesId"});
Actors.belongsToMany(Movies, { through: 'Actors_Movies', foreignKey: "actorsId" });

Movies.createMovie = async (data) => {
    data.actors = data.actors.join()
    data.title = data.title
    data.emailAddress = data.email
    data.createdAt = new Date()
    data.updatedAt = new Date()
    return Movies.create(data)
}

Movies.getOne = async (data) => {
    return Movies.findOne({
        where: { 
            title: data.title,
            year: data.year,
            format: data.format
        },
        attributes: {
            exclude: ['actors']
        },
    })
}

Movies.getOneById = async (id) => {
    return Movies.findOne({
        where: { 
            id: id
        },
        attributes: {
            exclude: ['actors']
        },
        include: [
            {
                model: Actors,
                through: {
                  attributes: []
                }
            }
          ]
    })
}

Movies.getOneByTitle = async (title) => {
    return Movies.findOne({
        where: { 
            title: title
        },
        attributes: {
            exclude: ['actors']
        },
    })
}

Movies.getListByParams = async (params) => {
    return await Movies.findAll({
        limit: +params.limit || 20,
        offset: +params.offset || 0,
        where: {
          title: {
            [Op.substring]: params.title || ''
          },
          [Op.or]: {
            title: { [Op.substring]: params.search || '' },
            actors: { [Op.substring]: params.search || '' }
          }
        },
        order: [[params.sort || 'id', params.order || 'ASC']],
        include: [
          {
            model: Actors,
            where: {
              name: {
                [Op.substring]: params.actor || ''
              }
            },
            attributes: [],
            through: {
              attributes: []
            },
            duplicating: false
          }
        ]
      });
}

Movies.updateMovie = async (id, body) => {
    body.updatedAt = new Date()
    const updateResult = await Movies.update({title: body.title, year: body.year, format: body.format, actors: body.actors}, {
        where: {id: id},
    })

    return await Movies.findOne({
        where: {id: id},
        attributes: {
            exclude: ['actors']
        },
    });
}

Movies.deleteForeverMovies = async (id) => {
    const result = await Movies.findOne({
        where: {id: id}
    })

    await Movies.destroy({
        where: {id: id},
    })

}

Actors.createActor = async (name) => {
    let data = {}
    data.name = name;
    data.createdAt = new Date();
    data.updatedAt = new Date();
    return Actors.create(data)
}

Actors.getByName = async (name) => {
    return Actors.findOne({
        where: {name: name},
    });
}

Movies.getAllActors = async (movieId) => {
    return await Movies.findAll({
        where: {id: movieId},
        attributes: {
            exclude: ['actors']
        },
        include: [
            {
                model: Actors,
                through: {
                  attributes: []
                }
            }
          ]
        });
};

export { Movies, Actors };