window.onload = function() {
  const content = document.getElementById("content");

  // Vista inicial: botones
  content.innerHTML = `
    <button class="button" id="btnBoletas">📄 Boletas</button>
    <button class="button" id="btnPagos">💳 Realizar Pagos</button>
  `;

  // Eventos
  document.getElementById("btnBoletas").onclick = showBoletas;
  document.getElementById("btnPagos").onclick = openPagos;
};

function showBoletas() {
  const content = document.getElementById("content");
  content.innerHTML = `
    <h2>Buscar Boletas</h2>
    <form id="boletasForm">
      <label for="nombre">Nombre:</label>
      <input type="text" id="nombre" name="nombre">
      <label for="cuenta">Cuenta:</label>
      <input type="number" id="cuenta" name="cuenta">
      <button type="submit" class="button">Buscar</button>
    </form>
    <div id="resultado"></div>
    <button class="button" id="btnVolver">⬅️ Volver</button>
  `;

  document.getElementById("boletasForm").onsubmit = buscarBoletas;
  document.getElementById("btnVolver").onclick = window.onload;
}

function buscarBoletas(event) {
  event.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const cuenta = document.getElementById("cuenta").value;
  document.getElementById("resultado").innerHTML = `
    <p>Nombre: ${nombre}</p>
    <p>Cuenta: ${cuenta}</p>
  `;
}

function openPagos() {
  window.open("https://oficinavirtual.live/apps/deuda/inicio", "_blank");
}