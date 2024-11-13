// dbConfig.js
const sql = require('mssql');
//require('dotenv').config();

const dbConfig = {
    user: 'user', // Usuario de la base de datos
    password: 'pass', // Contraseña del usuario
    server: 'ip', // Nombre o dirección IP del servidor
    database: 'nombre bd', // Nombre de la base de datos
    options: {
        encrypt: true, // Usar 'true' si usas Azure
        trustServerCertificate: true // Cambiar a 'true' si no usas SSL
    },
    
};

async function connectToDatabase() {
    try {
        // Conectar y crear un pool de conexiones
        pool = await sql.connect(dbConfig);
        console.log('Conectado a la base de datos SQL Server');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
}

// Función para obtener el pool de conexiones
function getPool() {
    return pool;
}

module.exports = {
    connectToDatabase,
    sql,
    getPool // Exporta la función para obtener el pool
};