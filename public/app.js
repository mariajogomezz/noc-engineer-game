function updateMetrics() {
  document.getElementById("cpu").textContent = 
    Math.floor(Math.random() * 100);

document.getElementById("memory").textContent = 
  Math.floor(Math.random() * 100);
document.getElementById("users").textContent = 
  400 + Math.floor(Math.random() * 200);
  document.getElementById("money").textContent =
    1000 + Math.floor(Math.random() * 500);

}
setInterval(updateMetrics, 3000);
