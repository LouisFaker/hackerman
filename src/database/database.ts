import mysql from "mysql2/promise";

async function iniciarConexao() {
    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        database: "hackerman",
    });

    return connection;
}

export default iniciarConexao();
