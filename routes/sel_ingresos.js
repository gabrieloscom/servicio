const express = require('express');
const router = express.Router();
//const { sql, getPool } = require('../dbConfig.js'); // Importamos el pool
//const path = require('path');
//const { sql, getPool } = require(path.join(__dirname, '../dbConfig'));

const { sql, getPool } = require('./dbconfig');

router.get('/', async (req, res) => {
  // Obtener los parámetros de la consulta
  const fecha_desde = req.query.fecha_desde || 'Jan 01, 1901';
  const fecha_hasta = req.query.fecha_hasta || 'Jan 01, 1901';
  const IdError1 = parseInt(req.query.IdError1) || 0;
  const IdError2 = parseInt(req.query.IdError2) || 0;
  const IdError3 = parseInt(req.query.IdError3) || 0;
  const IdError4 = parseInt(req.query.IdError4) || 0;
  const IdError5 = parseInt(req.query.IdError5) || 0;
  const IdError6 = parseInt(req.query.IdError6) || 0;
  console.log(IdError1);   

  try {
      // Conectar a la base de datos
      let pool = getPool(); // Obtener el pool de conexiones
      let result = await pool.request() // Usar el pool para hacer la solicitud
    //  let pool = await  sql.connect(dbConfig);
    //  let result = await pool.request()
      .input('pFechaDesde', sql.Date, fecha_desde)
      .input('pFechaHasta', sql.Date, fecha_hasta)
      .input('pIdError1', sql.Int, IdError1)
      .input('pIdError2', sql.Int, IdError2)
      .input('pIdError3', sql.Int, IdError3)
      .input('pIdError4', sql.Int, IdError4)
      .input('pIdError5', sql.Int, IdError5)
      .input('pIdError6', sql.Int, IdError6)
      
      .execute('SEL_ingresos');
      // Enviar los datos en formato JSON
      res.json(result.recordset);
  } catch (err) {
      res.status(500).send('Error al conectar a la base de datos: ' + err.message);
  } 
});


module.exports = router;

