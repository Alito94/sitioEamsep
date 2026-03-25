const express = require('express');
const router = express.Router();
const facturas = require('../data/facturas.json');
const puppeteer = require('puppeteer');

// Función para normalizar texto (quita tildes y pasa a minúsculas)
function normalizarTexto(texto) {
  return texto
    ? texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    : "";
}

// Buscar facturas por nombre y cuenta
router.get('/buscar', (req, res) => {
  const { nombre, cuenta } = req.query;

  let resultados = facturas.filter(f => {
    const nombreFactura = f.titular?.nombre || "";
    return (
      normalizarTexto(nombreFactura).includes(normalizarTexto(nombre)) &&
      String(f.cuenta) === String(cuenta)
    );
  });

  // Ordenar por fecha ascendente
  resultados.sort((a, b) => new Date(a.fecha_emision) - new Date(b.fecha_emision));

  // Tomar las últimas 5
  resultados = resultados.slice(-5);

  res.json(resultados);
});

// Obtener datos JSON de una factura puntual
router.get('/:id', (req, res) => {
  const factura = facturas.find(f => String(f.id) === String(req.params.id));
  if (!factura) {
    return res.status(404).json({ error: 'Factura no encontrada' });
  }
  res.json(factura);
});

// Generar y descargar PDF dinámico
router.get('/:id/pdf', async (req, res) => {
  const factura = facturas.find(f => String(f.id) === String(req.params.id));
  if (!factura) {
    return res.status(404).json({ error: 'Factura no encontrada' });
  }

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Renderizar HTML con estilos
    await page.setContent(`
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <title>Factura ${factura.id}</title>
        <link rel="stylesheet" href="http://localhost:8080/boleta.css">
      </head>
      <body>
        <div class="boleta">
          <div class="boleta-header">
            <h2>Factura N° ${factura.id}</h2>
            <img src="http://localhost:8080/assets/img/icons/logo ente.jpg" class="logo">
          </div>
          <div class="boleta-info">
            <p><strong>Titular:</strong> ${factura.titular.nombre}</p>
            <p><strong>Dirección:</strong> ${factura.titular.direccion}</p>
            <p><strong>Cuenta:</strong> ${factura.cuenta}</p>
            <p><strong>Periodo:</strong> ${factura.periodo}</p>
            <p><strong>Fecha emisión:</strong> ${factura.fecha_emision}</p>
            <p><strong>Vencimiento:</strong> ${factura.vencimiento}</p>
          </div>
          <div class="boleta-detalle">
            <table>
              <thead>
                <tr><th>Concepto</th><th>Monto</th></tr>
              </thead>
              <tbody>
                <tr><td>Fondo obras</td><td>$${factura.cargos.fondo_obras}</td></tr>
                <tr><td>Fondo equipamiento</td><td>$${factura.cargos.fondo_equipamiento}</td></tr>
                <tr><td>Intereses</td><td>$${factura.cargos.intereses}</td></tr>
              </tbody>
            </table>
          </div>
          <div class="boleta-total">Total: $${factura.total}</div>
        </div>
      </body>
      </html>
    `, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({ format: 'A4' });
    await browser.close();

    res.contentType("application/pdf");
    res.send(pdfBuffer);
  } catch (err) {
    console.error("Error generando PDF:", err);
    res.status(500).send("Error al generar PDF");
  }
});

module.exports = router;