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

// Tiempo disponible para responder
let timeLeft = 10;

// Referencia al temporizador
let timerInterval;


// ========================
// MÉTRICAS
// ========================

// Actualiza los datos mostrados en pantalla
function updateMetrics() {

  // CPU aleatoria entre 0 y 99
  document.getElementById("cpu").textContent =
    Math.floor(Math.random() * 100);

  // Memoria aleatoria entre 0 y 99
  document.getElementById("memory").textContent =
    Math.floor(Math.random() * 100);

  // Usuarios entre 400 y 600
  document.getElementById("users").textContent =
    400 + Math.floor(Math.random() * 200);

  // Dinero actual
  document.getElementById("money").textContent =
    money;

  // Pods actuales
  document.getElementById("pods").textContent =
    pods;

  // SLA actual
  document.getElementById("sla").textContent =
    sla.toFixed(1);
}

// Actualizar métricas cada 3 segundos
setInterval(updateMetrics, 3000);


// ========================
// TEMPORIZADOR
// ========================

// Inicia el reloj de respuesta
function startTimer() {

  // Volvemos a 10 segundos
  timeLeft = 10;

  document.getElementById("timer").textContent =
    timeLeft;

  // Paramos cualquier temporizador anterior
  clearInterval(timerInterval);

  // Iniciamos uno nuevo
  timerInterval = setInterval(() => {

    timeLeft--;

    document.getElementById("timer").textContent =
      timeLeft;

    // Si el tiempo se agota
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

// Lista de incidencias
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

  // Reiniciar reloj
  startTimer();
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
    pods++;

    showMessage(
      "✅ CPU estabilizada: +10 puntos y +100€"
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
      "✅ Servicio recuperado"
    );

 
