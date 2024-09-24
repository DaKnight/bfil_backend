import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { connectDb } from "./db/database";
const server = express();
const port = process.env.PORT || 3001;




async function main(){
    try{
        await connectDb();
        console.log(`Database connected successfully.`);
        server.listen(port);
        console.log(`Server is listening on port: http://localhost:${port}.`);
    }
    catch(err){
        console.error('Error occured: ',err);
    }
}

main();