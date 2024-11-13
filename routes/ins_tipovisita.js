const express = require('express');
const router = express.Router();
//const { sql, getPool } = require('../dbConfig'); // Importa el pool de conexiones
const { sql, getPool } = require('./dbconfig');
// Ruta para insertar un nuevo detalle de afiliado
router.post('/', async (req, res) => {

    const tipovisita = req.query.tipovisita || null; //Default to empty string
    //const tipovisita = req.query.tipovisita || null; //Default to empty string
    const DescTipoVisita = req.query.DescTipoVisita || null; // Default to empty string
    console.log(tipovisita);
    console.log(DescTipoVisita);

    try {
        const pool = getPool();
        if (!pool) {
            return res.status(500).send('No hay conexión a la base de datos');
        }

        // Ejecutar el procedimiento almacenado
        await pool.request()
            .input('ptipoVisita', sql.Char(1), tipovisita)
            .input('pDescTipoVisita', sql.Char(30), DescTipoVisita)
            .execute('Ins_tipoVisita');
            
        res.status(201).send('Tipo visita registrado exitosamente');
    } catch (error) {
        console.error('Error al registrar tipo visita:', error);
        res.status(500).send('Error al registrar tipo visita: ' + error.message);
    }
});

module.exports = router;