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

// Tiempo para responder
let timeLeft = 10;

// Referencia al temporizador
let timerInterval;


// ========================
// MÉTRICAS
// ========================

// Actualiza los datos mostrados en pantalla
function updateMetrics() {

  // CPU aleatoria
  document.getElementById("cpu").textContent =
    Math.floor(Math.random() * 100);

  // Memoria aleatoria
  document.getElementById("memory").textContent =
    Math.floor(Math.random() * 100);

  // Usuarios aleatorios
  document.getElementById("users").textContent =
    400 + Math.floor(Math.random() * 200);

  // Dinero
  document.getElementById("money").textContent =
    money;

  // Pods
  document.getElementById("pods").textContent =
    pods;

  // SLA
  document.getElementById("sla").textContent =
    sla.toFixed(1);
}


// ========================
// TEMPORIZADOR
// ========================

function startTimer() {

  // Reinicia el contador
  timeLeft = 10;

  document.getElementById("timer").textContent =
    timeLeft;

  // Eliminar temporizador anterior
  clearInterval(timerInterval);

  timerInterval = setInterval(() => {

    timeLeft--;

    document.getElementById("timer").textContent =
      timeLeft;

    // Se acaba el tiempo
    if (timeLeft <= 0) {

      clearInterval(timerInterval);

      score -= 15;
      money -= 100;
      sla -= 0.5;

      showMessage(
        "⏰ Tiempo agotado. -15 puntos y -100€"
      );

      updateScore();
      updateMetrics();

      checkGameOver();

      // Nueva incidencia
      generateIncident();
    }

  }, 1000);
}


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

  currentIncident =
    incidents[randomIndex];

  document.getElementById("incident").textContent =
    currentIncident;

  startTimer();
}


// ========================
// ACCIONES
// ========================

// Escalar pods
function scalePods() {

  if (currentIncident === "🚨 CPU al 95%") {

    score += 10;
    money += 100;
    sla += 0.1;
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
      "❌ Acción incorrecta"
    );
  }

  updateScore();
  updateMetrics();
  checkGameOver();
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
      "❌ Acción incorrecta"
    );
  }

  updateScore();
  updateMetrics();
  checkGameOver();
}


// Ignorar incidencia
function ignoreIncident() {

  score -= 10;
  money -= 100;
  sla -= 0.5;

  showMessage(
    "⚠️ Incidencia ignorada"
  );

  clearIncident();

  updateScore();
  updateMetrics();
  checkGameOver();
}


// ========================
// PUNTUACIÓN
// ========================

function updateScore() {

  document.getElementById("score").textContent =
    score;
}


// ========================
// MENSAJES
// ========================

function showMessage(text) {

  document.getElementById("message").textContent =
    text;
}


// ========================
// LIMPIAR INCIDENCIA
// ========================

function clearIncident() {

  clearInterval(timerInterval);

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
      "💀 GAME OVER. El SLA ha caído por debajo del 95%"
    );

    location.reload();
  }

  if (money <= 0) {

    alert(
      "💀 GAME OVER. La empresa se ha quedado sin dinero"
    );

    location.reload();
  }
}


// ========================
// ACTUALIZACIÓN PERIÓDICA
// ========================

// Métricas cada 3 segundos
setInterval(updateMetrics, 3000);

// Nueva incidencia cada 15 segundos
setInterval(() => {

  if (currentIncident === "") {
    generateIncident();
  }

}, 15000);


// ========================
// INICIO DEL JUEGO
// ========================

updateMetrics();

updateScore();

showMessage(
  "Bienvenido al NOC Engineer Simulator"
);

generateIncident();
