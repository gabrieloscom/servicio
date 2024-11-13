const express = require('express');
const router = express.Router();
//const { sql, getPool } = require('../dbConfig'); // Importamos el pool
const { sql, getPool } = require('./dbconfig');
const { Int } = require('mssql');


router.get('/', async (req, res) => {
  // Obtener los parámetros de la consulta
  const tipo_visita = req.query.tipo_visita || null; // Default to 0
  
    
  
  try {
      // Conectar a la base de datos
      let pool = getPool(); // Obtener el pool de conexiones
      let result = await pool.request() // Usar el pool para hacer la solicitud
      .input('ptipoVisita', sql.VarChar(1), tipo_visita)
     
      .execute('SEL_tipoVisita');
      // Enviar los datos en formato JSON
      res.json(result.recordset);
  } catch (err) {
      res.status(500).send('Error al conectar a la base de datos: ' + err.message);
  } 
  console.log(id_visita)
});


module.exports = router;
