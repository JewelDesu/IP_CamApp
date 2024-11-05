import mysql from "mysql2/promise"

export default async function handler(req,res) {

    const dbconnection = await mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
    });
    const sql = "SELECT * FROM active_ips";
    const values = [];
    const [ips] = await dbconnection.execute(sql, values);
    dbconnection.end();
    res.status(200).json({adress: ips});
}