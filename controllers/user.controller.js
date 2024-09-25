import { createUser, getUserById, getAllUsers, updateUser, deleteUser } from "../models/user.model.js"

export const registeUser = async (req, res) => {
    try{
        await createUser(req.body);
        res.status(201).json({ message: "User created successfully!" });
    }
    catch(err){
        console.error('Error creating user: ', err);
        res.status(500).json({ message:  "Internal server error." });
    }
};

export const getAllUser = async (req, res) => {
    try{
        const users = await getAllUsers();
        if(!users){
            return res.status(404).json({ message: "No user found!" });
        }
        res.status(200).json(users);
    }
    catch(err){
        console.error('Error fetching users: ', err);
        res.status(500).json({ message:  "Internal server error." });
    }
};

export const getSingleUser = async (req, res) => {
    try{
        const user = await getUserById(req.params.id);
        if(!user){
            return res.status(404).json({ message: "User not found!" });
        }
        res.status(200).json(user);
    }
    catch(err){
        console.error('Error fetching user: ', err);
        res.status(500).json({ message:  "Internal server error." });
    }
};

export const updateUserDetails = async (req, res) => {
    try{
        const result = await updateUser(req.params.id, req.body);
        if(!result.success) {
            return res.status(400).json({ message: result.message });
        }
        res.status(200).json({ message: result.message });
    }
    catch(err){
        console.error('Error updating user: ', err);
        res.status(500).json({ message: "Internal server error." });
    }
};

export const removeUser = async (req, res) => {
    try{
        await deleteUser(req.params.id);
        res.status(200).json({ message: "User deleted successfully!" });
    }
    catch(err){
        console.error('Error deleting user: ', err);
        res.status(500).json({ message: "Internal server error." });
    }
};