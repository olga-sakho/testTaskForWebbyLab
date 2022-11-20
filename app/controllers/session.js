import { Users } from "../models/users.js"

const authUser = async (req, res, next) => {
    let existingUser;
    try {
      existingUser = await Users.getUserByEmail(req.body.email);
    } catch {
      const error = new Error("Error! Something went wrong.");
      return next(error);
    }
    let token;
    try {
      token = jwt.sign(
        { userId: existingUser.id, email: existingUser.emailAddress },
        process.env.TOKEN_SECRET,
        { expiresIn: process.env.JWT_EXPIRE_TIME }
      );
    } catch (err) {
      const error = new Error("Error! Something went wrong.");
      return next(error);
    }
   
    res.status(200).json({token: token, status: 1})
};

export {authUser}
