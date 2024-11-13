const express = require('express');
const router = express.Router();
//const { sql, getPool } = require('../dbConfig'); // Importamos el pool
const { sql, getPool } = require('./dbconfig');
const { Int } = require('mssql');


router.get('/', async (req, res) => {
  // Obtener los parámetros de la consulta
  const id_Afiliado = parseInt(req.query.id_Afiliado) || 0; // Default to empty string
  console.log(id_Afiliado)
  if (id_Afiliado ==0)
    {
        return res.status(400).send('El campo idAfiliado es obligatorio');
     }
  
  try {
      // Conectar a la base de datos
      let pool = getPool(); // Obtener el pool de conexiones
      let result = await pool.request() // Usar el pool para hacer la solicitud
    //  let pool = await  sql.connect(dbConfig);
    //  let result = await pool.request()
      .input('pidAfiliado', sql.Int, id_Afiliado)
      
      .execute('SEL_controlAfiliado');
      // Enviar los datos en formato JSON
      res.json(result.recordset);
  } catch (err) {
      res.status(500).send('Error al conectar a la base de datos: ' + err.message);
  } 
  
});


module.exports = router;
