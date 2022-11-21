import { Users } from "../models/users.js"
import { validateUserSession } from "./validation.js"
import jwt from "jsonwebtoken"

const authUser = async (req, res, next) => {
    let existingUser;
    let token;
    try {
      req.body = validateUserSession(req.body)
      existingUser = await Users.getUserByEmail(req.body.email);
      if (!existingUser) {
        return new Error(`User with ${req.body.email} doesn't exists!`);
      } else {
        token = jwt.sign(
          { userId: existingUser.dataValues.id, email: existingUser.dataValues.emailAddress },
          process.env.TOKEN_SECRET,
          { expiresIn: process.env.JWT_EXPIRE_TIME }
        );
        res.status(200).json({token: token, status: 1})
      }
    } catch (err) {
      return res.status(400).json(err.message)
    }
};

export {authUser}

