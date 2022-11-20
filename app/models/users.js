import { DataTypes } from 'sequelize';
import {sequelize} from "../services/database.js";


const attributes = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    fullName: {
        type: DataTypes.STRING,
        field: 'full_name'
    },
    emailAddress: {
        type: DataTypes.STRING,
        field: 'email_address'
    },
    password: {
        type: DataTypes.STRING,
        field: 'user_password'
    },
}

const options = {timestamps: false, tableName: 'users', sequelize: sequelize};

const Users = sequelize.define("Users", attributes, options);

Users.createUser = async (data) => {
    data.fullName = data.name
    data.emailAddress = data.email
    return Users.create(data)
}

Users.getUserByEmail = (email) => {
    return Users.findOne({
        where: { 
            emailAddress: email
        }
    })
}

export {Users};

