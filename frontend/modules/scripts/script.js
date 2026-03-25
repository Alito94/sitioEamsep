function loadView() {
  const params = new URLSearchParams(window.location.search);
  const view = params.get("view");
  const content = document.getElementById("content");

  if (!view) {
    content.innerHTML = `
      <div class="card" onclick="goTo('descarga')">📄 Descargar Facturas</div>
      <div class="card" onclick="goTo('pagos')">💳 Realizar Pagos</div>
    `;
  } else if (view === "descarga") {
    content.innerHTML = `
      <h2>Descarga de Facturas</h2>
      <p>Aquí aparecerá la lista de facturas disponibles.</p>
    `;
  } else if (view === "pagos") {
    content.innerHTML = `
      <h2>Opciones de Pago</h2>
      <p>Aquí aparecerán las opciones de pago (QR, tarjetas, billeteras).</p>
    `;
  }
}

function goTo(view) {
  window.location.search = "?view=" + view;
}

window.onload = loadView;