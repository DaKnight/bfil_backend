import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDb from "./db/database.js";
import userRoutes from "./routes/user.routes.js";
import reportRoutes from "./routes/report.routes.js";
import authRouter from "./routes/auth.route.js";
import {authenticateToken} from "./middlewares/auth.middleware.js";
const server = express();
const port = process.env.PORT || 3001;

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Login Routes
server.use('/api/login', authRouter);

// User Routes
server.use('/api/user', authenticateToken, userRoutes);
// server.use('/api/user', userRoutes);

// Report Routes
server.use('/api/report', authenticateToken, reportRoutes);

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