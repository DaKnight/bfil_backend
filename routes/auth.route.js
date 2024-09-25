import express from "express";
import bcrypt from "bcrypt";
import {getUserByEmail} from "../models/user.model.js";
import jwt from "jsonwebtoken";

const authRouter = express.Router();

authRouter.post('/', async (req, res)=>{
    const { user_email, user_password } = req.body;

    try{
        const user = await getUserByEmail(user_email);
        if(!user){
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        const isPasswordvalid = await bcrypt.compare(user_password, user.user_password);
        if(!isPasswordvalid){
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        const token = jwt.sign({ user_name: user.user_name }, process.env.JWT_SECRET, { expiresIn: '5h' });
        res.cookie('token', token, { httpOnly: false, secure: process.env.NODE_ENV === 'devlopement', maxAge: 1*60*60*1000 });
        res.status(200).json({ message: "Login successfull!" });

    }
    catch(err){
        console.error('Login error:', err);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

export default authRouter;