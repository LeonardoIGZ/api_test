const mysql = require('mysql2/promise'); // Librería para conectar a MySQL
require('dotenv').config(); // Carga las variables de entorno desde .env

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
});

pool.getConnection()
    .then(() => console.log('Conexión exitosa a MySQL'))
    .catch((error) => console.error('Error de conexión a MySQL:', error));

module.exports = pool;
