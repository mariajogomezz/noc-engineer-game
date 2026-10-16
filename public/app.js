// ========================
// VARIABLES DEL JUEGO
// ========================

// Incidencia activa
let currentIncident = "";

// Puntos del jugador
let score = 0;

// Número de pods
let pods = 3;

// SLA inicial
let sla = 99.9;

// Dinero disponible
let money = 1000;


// ========================
// MÉTRICAS
// ========================

// Actualiza los valores mostrados en pantalla
function updateMetrics() {

  // CPU aleatoria entre 0 y 99
  document.getElementById("cpu").textContent =
    Math.floor(Math.random() * 100);

  // Memoria aleatoria entre 0 y 99
  document.getElementById("memory").textContent =
    Math.floor(Math.random() * 100);

  // Usuarios entre 400 y 599
  document.getElementById("users").textContent =
    400 + Math.floor(Math.random() * 200);

  // Dinero actual
  document.getElementById("money").textContent =
    money;

  // Pods actuales
  document.getElementById("pods").textContent =
    pods;

  // SLA con un decimal
  document.getElementById("sla").textContent =
    sla.toFixed(1);
}

// Actualiza métricas cada 3 segundos
setInterval(updateMetrics, 3000);


// ========================
// INCIDENCIAS
// ========================

// Posibles problemas del sistema
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

  currentIncident =
    incidents[randomIndex];

  document.getElementById("incident").textContent =
    currentIncident;
}

// Nueva incidencia cada 10 segundos
setInterval(generateIncident, 10000);


// ========================
// ACCIONES DEL JUGADOR
// ========================

// Escalar pods
function scalePods() {

  if (currentIncident === "🚨 CPU al 95%") {

    score += 10;
    money += 100;
    sla += 0.1;

    // Añadimos un pod
    pods++;

    showMessage(
      "✅ CPU estabilizada. +10 puntos y +100€"
    );

    clearIncident();

  } else {

    score -= 5;
    money -= 50;
    sla -= 0.2;

    showMessage(
      "❌ Acción incorrecta. -5 puntos"
    );
  }

  updateScore();
  updateMetrics();
}

// Reiniciar servicio
function restartService() {

  if (
    currentIncident === "🚨 Pod caído" ||
    currentIncident === "🚨 Memoria al 98%"
  ) {

    score += 10;
    money += 100;
    sla += 0.1;

    showMessage(
      "✅ Servicio recuperado. +10 puntos y +100€"
    );

    clearIncident();

  } else {

    score -= 5;
    money -= 50;
    sla -= 0.2;

    showMessage(
      "❌ Acción incorrecta. -5 puntos"
    );
  }

  updateScore();
  updateMetrics();
}

// Ignorar incidencia
function ignoreIncident() {

  score -= 10;
  money -= 100;
  sla -= 0.5;

  showMessage(
    "⚠️ Has ignorado la incidencia"
  );

  updateScore();
  updateMetrics();

  checkGameOver();
}


// ========================
// PUNTUACIÓN
// ========================

// Actualiza puntos en pantalla
function updateScore() {

  document.getElementById("score").textContent =
    score;
}


// ========================
// MENSAJES
// ========================

// Muestra mensajes al jugador
function showMessage(text) {

  document.getElementById("message").textContent =
    text;
}


// ========================
// LIMPIAR INCIDENCIA
// ========================

// Elimina la incidencia actual
function clearIncident() {

  currentIncident = "";

  document.getElementById("incident").textContent =
    "✅ Sin incidencias";
}


// ========================
// GAME OVER
// ========================

function checkGameOver() {

  if (sla <= 95) {

    alert(
      "💀 GAME OVER. El SLA ha caído por debajo del 95%."
    );

    location.reload();
  }

  if (money <= 0) {

    alert(
      "💀 GAME OVER. La empresa se ha quedado sin dinero."
    );

    location.reload();
  }
}


// ========================
// INICIO DEL JUEGO
// ========================

// Mostrar estado inicial
updateMetrics();

// Mostrar puntos iniciales
updateScore();

// Mostrar mensaje inicial
showMessage(
  "Bienvenido al NOC Engineer Simulator"
);
