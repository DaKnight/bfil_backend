import mysql from "mysql2/promise";

const getConnection = async() => {
    return await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE_NAME
    });
};

export const createReport = async (reportData) => {
        const connection = await getConnection();
        const {user_id, user_report, file_upload, created_by} = reportData;
        const query = `INSERT INTO daily_report (user_id, user_report, file_upload, latitude, longitude, created_by) VALUES (?, ?, ?, ?)`;
        await connection.execute(query, [user_id, user_report, file_upload, created_by]);
        await connection.end();
};

export const getAllReport = async() => {
    const connection = await getConnection();
    const query = `SELECT * FROM daily_report`;
    const [result] = await connection.execute(query);
    await connection.end();
    return result;
};

export const getSingleReport = async(report_id) => {
    const connection = await getConnection();
    const query = `SELECT * FROM daily_report WHERE report_id = ?`;
    const [result] = await connection.execute(query, [report_id]);
    await connection.end();
    return result[0];
};

export const updateReport = async(report_id, reportData) => {
    const connection = await getConnection();
    const {user_id, user_report, file_upload, created_by} = reportData;
    const query = `Update daily_report SET user_id = ?, user_report = ?, file_upload = ?, latitude = ?, longitude = ? WHERE report_id = ?`;
    await connection.execute(query, [user_id, user_report, file_upload, latitude, longitude, report_id]);
    await connection.end();
};

export const deleteReport = async(report_id) => {
    const connection = await getConnection();
    const query = `DELETE FROM daily_report WHERE report_id = ?`;
    await connection.execute(query, [report_id]);
    await connection.end();
}; 