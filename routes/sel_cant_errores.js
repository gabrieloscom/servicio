const express = require('express');
const router = express.Router();
//const { sql, getPool } = require('../dbConfig.js'); // Importamos el pool
//const path = require('path');
//const { sql, getPool } = require(path.join(__dirname, '../dbConfig'));

const { sql, getPool } = require('./dbconfig');

router.get('/', async (req, res) => {
  // Obtener los parámetros de la consulta
  const fecha_desde = parseInt(req.query.fecha_desde) || 'Jan 01, 1901';
  const fecha_hasta = parseInt(req.query.fecha_hasta) || 'Jan 01, 1901';
   
   

  try {
      // Conectar a la base de datos
      let pool = getPool(); // Obtener el pool de conexiones
      let result = await pool.request() // Usar el pool para hacer la solicitud
    //  let pool = await  sql.connect(dbConfig);
    //  let result = await pool.request()
      .input('pFechaDesde', sql.Date, fecha_desde)
      .input('pFechaHasta', sql.Date, fecha_hasta)
      
      .execute('SEL_CantErrores');
      // Enviar los datos en formato JSON
      res.json(result.recordset);
  } catch (err) {
      res.status(500).send('Error al conectar a la base de datos: ' + err.message);
  } 
});


module.exports = router;

