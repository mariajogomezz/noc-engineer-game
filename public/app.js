// ========================
// VARIABLES DEL JUEGO
// ========================

let currentIncident = null;

let score = 0;
let money = 1000;
let pods = 3;
let sla = 99.9;

let timeLeft = 10;
let timerInterval;


// ========================
// INCIDENCIAS
// ========================

const incidents = [
  {
    text: "🚨 CPU al 95%",
    solution: "scale"
  },
  {
    text: "🚨 Memoria al 98%",
    solution: "restart"
  },
  {
    text: "🚨 Pod caído",
    solution: "restart"
  }
];


// ========================
// ACTUALIZAR PANTALLA
// ========================

function updateDashboard() {

  document.getElementById("cpu").textContent =
    Math.floor(Math.random() * 100);

  document.getElementById("memory").textContent =
    Math.floor(Math.random() * 100);

  document.getElementById("users").textContent =
    400 + Math.floor(Math.random() * 200);

  document.getElementById("money").textContent =
    money;

  document.getElementById("pods").textContent =
    pods;

  document.getElementById("sla").textContent =
    sla.toFixed(1);

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
// TEMPORIZADOR
// ========================

function startTimer() {

  clearInterval(timerInterval);

  timeLeft = 10;

  document.getElementById("timer").textContent =
    timeLeft;

  timerInterval = setInterval(() => {

    timeLeft--;

    document.getElementById("timer").textContent =
      timeLeft;

    if (timeLeft <= 0) {

      clearInterval(timerInterval);

      score -= 10;
      money -= 100;
      sla -= 0.5;

      showMessage(
        "⏰ Tiempo agotado"
      );

      updateDashboard();

      generateIncident();
    }

  }, 1000);
}


// ========================
// GENERAR INCIDENCIA
// ========================

function generateIncident() {

  const randomIndex =
    Math.floor(Math.random() * incidents.length);

  currentIncident =
    incidents[randomIndex];

  document.getElementById("incident").textContent =
    currentIncident.text;

  startTimer();
}


// ========================
// RESOLVER INCIDENCIA
// ========================

function solveIncident(action) {

  if (!currentIncident) {
    return;
  }

  clearInterval(timerInterval);

  if (action === currentIncident.solution) {

    score += 10;
    money += 100;
    sla += 0.1;

    if (action === "scale") {
      pods++;
    }

    showMessage(
      "✅ Incidencia resuelta correctamente"
    );

  } else {

    score -= 5;
    money -= 50;
    sla -= 0.2;

    showMessage(
      "❌ Acción incorrecta"
    );
  }

  currentIncident = null;

  document.getElementById("incident").textContent =
    "✅ Incidencia resuelta";

  updateDashboard();

  setTimeout(() => {
    generateIncident();
  }, 2000);
}


// ========================
// BOTONES
// ========================

function scalePods() {
  solveIncident("scale");
}

function restartService() {
  solveIncident("restart");
}

function ignoreIncident() {

  clearInterval(timerInterval);

  score -= 10;
  money -= 100;
  sla -= 0.5;

  showMessage(
    "⚠️ Incidencia ignorada"
  );

  currentIncident = null;

  document.getElementById("incident").textContent =
    "⚠️ Incidencia ignorada";

  updateDashboard();

  setTimeout(() => {
    generateIncident();
  }, 2000);
}


// ========================
// INICIO
// ========================

updateDashboard();

showMessage(
  "Bienvenido al NOC Engineer Simulator"
);

generateIncident();
