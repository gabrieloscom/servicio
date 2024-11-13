const express = require('express');
const router = express.Router();
//const { sql, getPool } = require('../dbConfig'); // Importamos el pool
const { sql, getPool } = require('./dbconfig');
const { Int } = require('mssql');


router.get('/', async (req, res) => {
  // Obtener los parámetros de la consulta
  const tipo_visita = req.query.tipo_visita || null; // Default to 0
  const id_visita = parseInt(req.query.id_visita) || 0; // Default to empty string
  if (id_visita ===0)
    {
        return res.status(400).send('El campo id_visita es obligatorio');
     }
  const fechaDesde = req.query.fechaDesde || 'Jan 01, 1901'; // Default to 0   
     if (fechaDesde === 'Jan 01, 1901')
        {
            return res.status(400).send('El campo fechaDesde es obligatorio');
         }
  
  const fechaHasta = req.query.fechaHasta || 'Jan 01, 2010'; // Default to 0
  if (fechaHasta === 'Jan 01, 2010')
    {
        return res.status(400).send('El campo fechaHasta es obligatorio');
     }
  
  try {
      // Conectar a la base de datos
      let pool = getPool(); // Obtener el pool de conexiones
      let result = await pool.request() // Usar el pool para hacer la solicitud
    //  let pool = await  sql.connect(dbConfig);
    //  let result = await pool.request()
      .input('ptipoVisita', sql.VarChar(1), tipo_visita)
      .input('pidVisita', sql.Int, id_visita)
      .input('pFechaDesde', sql.Date, fechaDesde)
      .input('pFechaHasta', sql.Date, fechaHasta)
    
      .execute('SEL_Visita');
      // Enviar los datos en formato JSON
      res.json(result.recordset);
  } catch (err) {
      res.status(500).send('Error al conectar a la base de datos: ' + err.message);
  } 
  console.log(id_visita)
});


module.exports = router;
