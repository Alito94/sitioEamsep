// Buscar facturas
async function buscarFacturas() {
  const nombre = document.getElementById('nombre').value;
  const cuenta = document.getElementById('cuenta').value;

  try {
    const res = await fetch(`http://localhost:3000/facturas/buscar?nombre=${encodeURIComponent(nombre)}&cuenta=${encodeURIComponent(cuenta)}`);
    if (!res.ok) throw new Error("Error en la búsqueda");

    const facturas = await res.json();

    if (facturas.length === 0) {
      alert("No se encontraron facturas con esos datos.");
    } else {
      mostrarFacturas(facturas);
    }
  } catch (err) {
    console.error("Error al buscar facturas:", err);
    alert("Hubo un problema al buscar las facturas. Revisa la consola para más detalles.");
  }
}

// Ver factura
async function verFactura(id) {
  try {
    const res = await fetch(`http://localhost:3000/facturas/${id}`);
    if (!res.ok) throw new Error("Factura no encontrada");

    const factura = await res.json();
    localStorage.setItem('facturaSeleccionada', JSON.stringify(factura));
    window.location.href = 'maquetaBoleta.html';
  } catch (err) {
    console.error("Error al obtener factura:", err);
    alert("No se pudo cargar la factura seleccionada.");
  }
}

// 👉 Nueva función para mostrar resultados
function mostrarFacturas(facturas) {
  const resultadosDiv = document.getElementById('resultados');
  resultadosDiv.innerHTML = ""; // limpiar resultados previos

  if (facturas.length === 0) {
    resultadosDiv.innerHTML = "<p>No se encontraron facturas.</p>";
    return;
  }

  const table = document.createElement("table");
  table.classList.add("tabla-facturas");

  // encabezado
  const header = document.createElement("tr");
  header.innerHTML = `
    <th>ID</th>
    <th>Nombre</th>
    <th>Cuenta</th>
    <th>Periodo</th>
    <th>Total</th>
    <th>Acciones</th>
  `;
  table.appendChild(header);

  // filas
  facturas.forEach(f => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${f.id}</td>
      <td>${f.titular.nombre}</td>
      <td>${f.cuenta}</td>
      <td>${f.periodo}</td>
      <td>${f.total}</td>
      <td>
        <button onclick="verFactura('${f.id}')">Ver</button>
        <a href="http://localhost:3000/facturas/${f.id}/pdf" target="_blank">PDF</a>
      </td>
    `;
    table.appendChild(row);
  });

  resultadosDiv.appendChild(table);
}