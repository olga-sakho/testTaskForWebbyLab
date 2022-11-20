import jwt from "jsonwebtoken"

const auth = async (req, res, next) => {
 
    try {
        const token = req.headers['authorization'];
        const resultToken = token.split(' ')[1];
  
        const verified = jwt.verify(resultToken, process.env.TOKEN_SECRET);

        if (verified) {
            //res.send("Successfully Verified");
            next()
        } else {
            return res.status(401).send('Unauthorized');
        }
    } catch (error) {
        return res.status(401).json(error.message);
    }
};

export {auth}