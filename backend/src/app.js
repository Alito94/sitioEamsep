require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
const facturasRouter = require('./routes/facturas');
app.use('/facturas', facturasRouter);


// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ mensaje: 'Backend mock funcionando' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});