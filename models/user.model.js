import mysql from "mysql2/promise";
import bcrypt from "bcrypt";

const getConnection = async() => {
    return await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE_NAME
    });
};

export const createUser = async(userData) => {
    try{
        const connection = await getConnection();
        const { user_name, user_email, user_password, user_role, user_status, user_contact, created_by } = userData;

        const hashPassword = await bcrypt.hash(user_password, 12);

        const query = `INSERT INTO users (user_name, user_email, user_password, user_role, user_status, user_contact, created_by) VALUES(?, ?, ?, ?, ?, ?, ?)`;
        await connection.execute(query, [user_name, user_email, hashPassword, user_role, user_status, user_contact, created_by]);
        await connection.end();
        return 1;
    }
    catch(err){
        console.error(`Error occured : `, err);
        return err;
    }
};

export const getAllUsers = async() => {
    const connection = await getConnection();
    const query = `SELECT * FROM users`;
    const [users] = await connection.execute(query);
    await connection.end();
    return users;
};

export const getUserById = async(uid) => {
    const connection = await getConnection();
    const query = `Select * FROM users WHERE user_id = ?`;
    const[users] = await connection.execute(query, [uid]);
    await connection.end();
    return users[0];
};

export const getUserByEmail = async(user_email) => {
    const connection = await getConnection();
    const query = `Select * FROM users WHERE user_email = ?`;
    const[users] = await connection.execute(query, [user_email]);
    await connection.end();
    return users[0];
};

export const updateUser = async(uid, user_data) => {
    const connection = await getConnection();
    const { user_name, user_email, user_contact, user_password, user_role, user_status } = user_data;
    try{
        const existingUserQuery = `SELECT * FROM users WHERE (user_email = ? OR user_contact = ?) AND user_id != ?`;
        const [existingUser] = await connection.query(existingUserQuery, [user_email, user_contact, uid]);

        const hashPassword = await bcrypt.hash(user_password, 12);

        if(existingUser.length > 0) {
            const existingField = existingUser[0].user_email === user_email ? "email" : "contact";
            return { success: false, message: `${existingField.charAt(0).toUpperCase() + existingField.slice(1)} already exists.`};
        }
        const getSpecificuser = `SELECT user_email FROM users WHERE user_email = ? OR user_contact = ?`;
        const query = `Update users SET user_name = ?, user_email = ?, user_contact = ?, user_password = ?, user_role = ?, user_status = ? WHERE user_id = ?`;
        await connection.execute(query, [user_name, user_email, user_contact, hashPassword, user_role, user_status, uid]);
        return { success: true, message: "User updated successfully." };
    }
    catch(err){
        console.error('Error occured: ', err);
        return { success: false, message: "Internal server error." };
    }
    finally{
        await connection.end();
    }
};

export const deleteUser = async (uid) => {
    const connection = await getConnection();
    const query = `DELETE FROM users WHERE user_id = ?`;
    await connection.execute(query, [uid]);
    await connection.end();
};