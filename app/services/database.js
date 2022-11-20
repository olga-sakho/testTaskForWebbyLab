import {Sequelize} from 'sequelize';


const {DB_NAME, DB_USER, DB_PASSWORD} = process.env;

const sequelize = new Sequelize(
    DB_NAME,DB_USER,DB_PASSWORD,
    {   
        dialect: "sqlite",
        storage: "./db/database.sqlite"
    }
);


try {
    sequelize.authenticate();
    console.log('Connecting to DB');
} catch (error) {
    console.log(error);
}


export {sequelize}