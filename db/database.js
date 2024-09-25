import mysql from "mysql2/promise";

const createDatabase = 'CREATE DATABASE IF NOT EXISTS BFIL';
const createUserTable = `CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL UNIQUE,
    user_contact VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    user_role ENUM('user', 'admin') NOT NULL DEFAULT 'user',
    user_status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(255) NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)`;
const createDailyReportTable = `CREATE TABLE IF NOT EXISTS daily_report (
        report_id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        user_report VARCHAR(255) NOT NULL,
        file_upload VARCHAR(255) NOT NULL UNIQUE,
        latitude VARCHAR(255) NOT NULL,
        longitude VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_by VARCHAR(255) NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
)`;

async function connectDb(){
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    });

    try{
        await connection.query(createDatabase);
        console.log(`Database created successfully.`);
        
        await connection.query(`USE BFIL`);
        console.log(`Database connected successfully.`);
        
        await connection.query(createUserTable);
        console.log(`User Table created successfully or already exists.`);
        
        await connection.query(createDailyReportTable);
        console.log(`Report Table created successfully or already exists.`);
    }
    catch(err){
        console.log('Error creating Db: ', err);
    }
    finally{
        await connection.end();
    }
}

export default connectDb;