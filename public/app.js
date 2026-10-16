// Esta función actualiza las métricas del panel
function updateMetrics() {

  // Genera un valor aleatorio entre 0 y 99 para la CPU
  document.getElementById("cpu").textContent =
    Math.floor(Math.random() * 100);

  // Genera un valor aleatorio entre 0 y 99 para la memoria
  document.getElementById("memory").textContent =
    Math.floor(Math.random() * 100);

  // Genera entre 400 y 599 usuarios
  document.getElementById("users").textContent =
    400 + Math.floor(Math.random() * 200);

  // Genera dinero entre 1000 y 1499 €
  document.getElementById("money").textContent =
    1000 + Math.floor(Math.random() * 500);
}

// Ejecuta la función cada 3 segundos
setInterval(updateMetrics, 3000);
