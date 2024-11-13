// server.js
const express = require('express');
const { connectToDatabase } = require('./dbconfig');
const path = require('path');


const app = express();
const port = 3000;

// Conexión a la base de datos
connectToDatabase();

// Middlewares
app.use(express.json());


// Rutas de la API
app.use('/api/update_afiliados_detalle', require(path.resolve(__dirname, 'routes', 'update_afiliados_detalle.js'))); // Ruta absoluta
//app.use('/api/sel_visita', require('./routes/sel_visita'));
app.use('/api/sel_visita', require(path.resolve(__dirname, 'routes', 'sel_visita.js'))); // Ruta absoluta
//app.use('/api/sel_control_afiliado', require('./routes/sel_control_afiliado'));
app.use('/api/ins-terceros', require(path.resolve(__dirname, 'routes', 'ins_tercero.js'))); // Ruta absoluta
app.use('/api/ins-tipo-visita', require(path.resolve(__dirname, 'routes', 'ins_tipovisita.js'))); // Ruta absoluta
app.use('/api/ins-visita', require(path.resolve(__dirname, 'routes', 'ins_visita.js'))); // Ruta absoluta
app.use('/api/sel-area', require(path.resolve(__dirname, 'routes', 'sel_area.js'))); // Ruta absoluta
app.use('/api/sel-cantErrores', require(path.resolve(__dirname, 'routes', 'sel_cant_errores.js'))); // Ruta absoluta
app.use('/api/sel-ingresos', require(path.resolve(__dirname, 'routes', 'sel_ingresos.js'))); // Ruta absoluta
app.use('/api/sel-sector', require(path.resolve(__dirname, 'routes', 'sel_sector.js'))); // Ruta absoluta
app.use('/api/sel-tipo-visita', require(path.resolve(__dirname, 'routes', 'sel_tipo_visita.js'))); // Ruta absoluta
app.use('/api/control-afiliado', require(path.resolve(__dirname, 'routes', 'sel_tipo_visita.js'))); // Ruta absoluta
app.use('/api/update-tipo-visita', require(path.resolve(__dirname, 'routes', 'update_tipoVisita.js'))); // Ruta absoluta











// Inicio del servidor
//app.listen(port, () => {
//    console.log(`Servidor corriendo en http://localhost:${port}`);
//});
app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

