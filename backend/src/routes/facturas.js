const express = require('express');
const router = express.Router();
const facturas = require('../data/facturas.json');
const path = require('path');

router.get('/:id/pdf', (req, res) => {
  const factura = facturas.find(f => f.id === req.params.id);
  if (!factura) {
    return res.status(404).json({ error: 'Factura no encontrada' });
  }

  const filePath = path.join(__dirname, '..', 'public', 'pdfs', `${factura.id}.pdf`);
  console.log('Buscando archivo en:', filePath); // 👈 para depuración

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error('Error al enviar PDF:', err);
      res.status(500).json({ error: 'No se pudo enviar el PDF' });
    }
  });
});


module.exports = router;