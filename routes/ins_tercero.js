const express = require('express');
const router = express.Router();
//const { sql, getPool } = require('../dbConfig'); // Importa el pool de conexiones
const { sql, getPool } = require('./dbconfig');
// Ruta para insertar un nuevo detalle de afiliado
router.post('/', async (req, res) => {

   
    const tipo_tercero = req.query.tipo_tercero || null; //Default to empty string
    if (tipo_tercero ===null)
        {
            return res.status(400).send('El campo tipo_tercero es obligatorio');
         }
    const tipo_documento = req.query.tipo_documento || null; // Default to empty string
    const nro_documento = req.query.nro_documento || 0; // Default 0
    const apellido =  req.query.apellido || null; // Default to empty string
    const nombres = req.query.nombres ||  null; // Default to empty string
    
    

    try {
        const pool = getPool();
        if (!pool) {
            return res.status(500).send('No hay conexión a la base de datos');
        }

        // Ejecutar el procedimiento almacenado
        await pool.request()
            .input('ptipoTercero', sql.Char(1), tipo_tercero)
            .input('pTipoDocumento', sql.Char(3), tipo_documento)
            .input('pNroDocumento', sql.Int, nro_documento)
            .input('pApellido', sql.Char(30), apellido)
            .input('pNombres', sql.Char(60), nombres)
            .execute('Ins_tercero');
            
        res.status(201).send('Tercero registrado exitosamente');
    } catch (error) {
        console.error('Error al registrar tercero:', error);
        res.status(500).send('Error al registrar tercero: ' + error.message);
    }
});

module.exports = router;