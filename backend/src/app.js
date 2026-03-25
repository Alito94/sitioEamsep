require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// 👉 Router de facturas en /facturas
const facturasRouter = require('./routes/facturas');
app.use('/facturas', facturasRouter);

// 👉 Servir carpeta frontend completa bajo /frontend
app.use('/frontend', express.static(path.join(process.cwd(), 'frontend')));

// 👉 Ruta principal: muestra pagina_principal.html
app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'frontend', 'pagina_principal.html'));
});

// 👉 Ruta directa a boletas.html
app.get('/frontend/boletas.html', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'frontend', 'boletas.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});