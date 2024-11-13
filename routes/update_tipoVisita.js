const express = require('express');
const router = express.Router();
//const { sql, getPool } = require('../dbConfig'); // Importa el pool de conexiones
const { sql, getPool } = require('./dbconfig');
// Ruta para insertar un nuevo detalle de afiliado
router.put('/', async (req, res) => {
    //const { idAfiliado, ordenCheque, correoElectronico, cbu, cuil } = req.body;

    // Validar los datos de entrada
 
    const tipo_visita = req.query.tipo_visita || null; // Default 0
    console.log(tipo_visita);
    if (tipo_visita == 0) {
        return res.status(400).send('el campo tipo_visita es obligatorio');
     }
    const DescTipoVisita = req.query.DescTipoVisita || null; // Default to empty string
    
    

    try {
        const pool = getPool();
        if (!pool) {
            return res.status(500).send('No hay conexión a la base de datos');
        }

        // Ejecutar el procedimiento almacenado
        await pool.request()
            .input('pTipoVisita', sql.Char(1), tipo_visita)
            .input('pDescTipoVisita', sql.VarChar(30), DescTipoVisita)
            .execute('UPD_tipoVisita');
            
        res.status(201).send('Actualizacion de tipo visita registrado exitosamente');
    } catch (error) {
        console.error('Error al actualizar tipo visita:', error);
        res.status(500).send('Error al actualizar tipo visita: ' + error.message);
    }
});

module.exports = router;