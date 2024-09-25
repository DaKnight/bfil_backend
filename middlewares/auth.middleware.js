import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    // const token = req.headers;

    if(!token){
        return res.sendStatus(401).json({ message: 'Invalid token.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
        if(err){
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
};