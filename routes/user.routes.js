import express from "express";
import { registeUser, getAllUser, getSingleUser, updateUserDetails, removeUser } from "../controllers/user.controller.js";

const userRoutes = express.Router();

userRoutes.get('/view-users', getAllUser);
userRoutes.get('/view-user/:id', getSingleUser);
userRoutes.post('/add-user', registeUser);
userRoutes.put('/update-user/:id', updateUserDetails);
userRoutes.delete('/delete-user/:id', removeUser);

export default userRoutes;