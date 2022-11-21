import jwt from "jsonwebtoken"
import { Users } from "../models/users.js"
import { validateUser } from "./validation.js"

const createUser =  async (req, res) => {
    let token;
    try {
        console.log(req.body, '1')
        req.body = validateUser(req.body);
        console.log(req.body, '2')
        const userInDb = await Users.getUserByEmail(req.body.email); 
        if (!userInDb){
          if (req.body.password === req.body.confirmPassword) {
            const user = await Users.createUser(req.body);
            token = jwt.sign(
                { userId: user.id, email: user.emailAddress },
                process.env.TOKEN_SECRET,
                { expiresIn: process.env.JWT_EXPIRE_TIME }
              );
              res.status(201).json({
                token: token, 
                status: 1
              });
          } else {
              res.status(400).json({
                message:'Password confirmation does not match password'
              })
          }
        } else if (userInDb) {
          res.status(400).json({
            message:`User with ${req.body.email} already exists!`
          })
        }
      } catch (err) {
        return res.status(400).json(err.message)
      }
  };

export {createUser}