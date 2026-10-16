// ========================
// VARIABLES DEL JUEGO
// ========================

// Incidencia actual
let currentIncident = "";

// Puntuación
let score = 0;

// Número de pods inicial
let pods = 3;

// SLA inicial
let sla = 99.9;


// ========================
// MÉTRICAS
// ========================

function updateMetrics() {

  // CPU aleatoria
  document.getElementById("cpu").textContent =
    Math.floor(Math.random() * 100);

  // Memoria aleatoria
  document.getElementById("memory").textContent =
    Math.floor(Math.random() * 100);

  // Usuarios entre 400 y 600
  document.getElementById("users").textContent =
    400 + Math.floor(Math.random() * 200);

  // Dinero entre 1000 y 1500
  document.getElementById("money").textContent =
    1000 + Math.floor(Math.random() * 500);

  // Mostrar pods actuales
  document.getElementById("pods").textContent = pods;

  // Mostrar SLA actual
  document.getElementById("sla").textContent = sla.toFixed(1);
}

// Actualiza métricas cada 3 segundos
setInterval(updateMetrics, 3000);


// ========================
// INCIDENCIAS
// ========================

const incidents = [
  "🚨 CPU al 95%",
  "🚨 Memoria al 98%",
  "🚨 Pod caído",
  "🚨 Latencia elevada",
  "🚨 Error HTTP 500"
];

function generateIncident() {

  const randomIndex =
    Math.floor(Math.random() * incidents.length);

  currentIncident = incidents[randomIndex];

  document.getElementById("incident").textContent =
    currentIncident;
}

// Nueva incidencia cada 10 segundos
setInterval(generateIncident, 10000);


// ========================
// ACCIONES
// ========================

function scalePods() {

  if (currentIncident === "🚨 CPU al 95%") {

    score += 10;

    // Se añade un pod
    pods++;

    clearIncident();

  } else {

    score -= 5;
  }

  updateScore();
}

function restartService() {

  if (
    currentIncident === "🚨 Pod caído" ||
    currentIncident === "🚨 Memoria al 98%"
  ) {

    score += 10;

    clearIncident();

  } else {

    score -= 5;
  }

  updateScore();
}

function ignoreIncident() {

  score -= 10;

  // Ignorar afecta al SLA
  sla -= 0.1;

  updateScore();
  updateMetrics();
}


// ========================
// PUNTUACIÓN
// ========================

function updateScore() {

  document.getElementById("score").textContent =
    score;
}


// ===
