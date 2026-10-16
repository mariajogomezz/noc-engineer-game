// Guarda la incidencia actual
let currentIncident = "";

// Guarda la puntuación del jugador
let score = 0;

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

// Lista de incidencias posibles
const incidents = [
  "🚨 CPU al 95%",
"🚨 Memoria al 98%",
"🚨 Pod caído",
"🚨 Latencia elevada",
"🚨 Error HTTP 500"
  ];
// Genera una incidencia aleatoria
function generateIncident() {

  const randomIndex =
    Math.floor(Math.random() * incidents.length);

  currentIncident = incidents[randomIndex];

  document.getElementById("incident").textContent =
    currentIncident;
}
// Genera una incidencia cada 10 segundos 
setInterval(generateIncident, 10000);
// Escalar pods
function scalePods() {

  if (currentIncident === "🚨 CPU al 95%") {

    score += 10;

  } else {

    score -= 5;

  }

  updateScore();
}

// Reiniciar servicio
function restartService() {

  if (
    currentIncident === "🚨 Pod caído" ||
    currentIncident === "🚨 Memoria al 98%"
  ) {

    score += 10;

  } else {

    score -= 5;

  }

  updateScore();
}

// Ignorar incidencia
function ignoreIncident() {

  score -= 10;

  updateScore();
}
// Actualiza los puntos mostrados en pantalla
function updateScore() {

  document.getElementById("score").textContent = score;
}
