const express = require('express');
const router = express.Router();
//const { sql, getPool } = require('../dbConfig'); // Importa el pool de conexiones
const { sql, getPool } = require('./dbconfig');
// Ruta para insertar un nuevo detalle de afiliado
router.put('/', async (req, res) => {
    //const { idAfiliado, ordenCheque, correoElectronico, cbu, cuil } = req.body;

    // Validar los datos de entrada
 
    const id_afiliado = parseInt(req.query.id_afiliado) || 0; // Default 0
    console.log(id_afiliado);
    if (id_afiliado == 0) {
        return res.status(400).send('el campo id_afiliado es obligatorio');
     }
    const orden_cheque = req.query.orden_cheque || null; // Default to empty string
    const correo_electronico = req.query.correo_electronico || null; // Default 0
    //const cbu =  req.query.cbu || null; // Default null
    //const cuil = req.query.cuil ||  null; // Default null
    //console.log(correo_electronico);
    

    try {
        const pool = getPool();
        if (!pool) {
            return res.status(500).send('No hay conexión a la base de datos');
        }

        // Ejecutar el procedimiento almacenado
        await pool.request()
            .input('ID_AFILIADO', sql.Int, id_afiliado)
            .input('ORDEN_CHEQUE', sql.VarChar(100), orden_cheque)
            .input('CORREO_ELECTRONICO', sql.VarChar(100), correo_electronico)
      //      .input('CBU', sql.Char(26), cbu)
      //      .input('CUIL', sql.Char(11), cuil)
            .execute('OSCOM_AFILIADOS_DETALLE_UPDATE');
            
        res.status(201).send('Actualizacion de afiliado registrado exitosamente');
    } catch (error) {
        console.error('Error al actualizar detalle de afiliado:', error);
        res.status(500).send('Error al actualizar detalle de afiliado: ' + error.message);
    }
});

module.exports = router;