import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDb from "./db/database.js";
import userRoutes from "./routes/user.routes.js";
const server = express();
const port = process.env.PORT || 3001;

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// User Routes
server.use('/api/user', userRoutes);

async function main(){
    try{
        await connectDb();
        console.log(`Database connected successfully.`);
        await server.listen(port);
        console.log(`Server is listening on port: http://localhost:${port}.`);
    }
    catch(err){
        console.error('Error occured: ',err);
    }
}

main();