const express = require('express');
const router = express.Router();
//const { sql, getPool } = require('../dbConfig'); // Importa el pool de conexiones
const { sql, getPool } = require('./dbconfig');
// Ruta para insertar un nuevo detalle de afiliado
router.post('/', async (req, res) => {

    const IdVisita = req.query.IdVisita || 0; //Default to empty string
    const TipoVisita = req.query.TipoVisita || null; // Default to empty string
    const IdArea = req.query.IdArea || 0; 
    const IdError = req.query.IdError || 0; 
    
    try {
        const pool = getPool();
        if (!pool) {
            return res.status(500).send('No hay conexión a la base de datos');
        }

        // Ejecutar el procedimiento almacenado
        await pool.request()
            .input('pIdVisita', sql.Int, IdVisita)
            .input('pTipoVisita', sql.Char(1), TipoVisita)
            .input('pIdArea', sql.Int, IdArea)
            .input('pIdError', sql.Int, IdError)
            .execute('Ins_Visita');
            
        res.status(201).send('Visita registrado exitosamente');
    } catch (error) {
        console.error('Error al registrar visita:', error);
        res.status(500).send('Error al registrar visita: ' + error.message);
    }
});

module.exports = router;