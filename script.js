const statsDiv = document.getElementById("stats");
const loginDiv = document.getElementById("login");
const nameDisplay = document.getElementById("nameDisplay");

const rankEl = document.getElementById("rank");
const moneyEl = document.getElementById("money");
const killsEl = document.getElementById("kills");
const deathsEl = document.getElementById("deaths");
const hoursEl = document.getElementById("hours");

const saveNameBtn = document.getElementById("saveName");
const changeNameBtn = document.getElementById("changeName");

const playerInput = document.getElementById("playerName");

// URL pública de GitHub Pages
const GITHUB_URL = "https://pekixpro.github.io/mc-stats/stats.json";

// Al cargar la página, revisar si ya guardó el nombre
document.addEventListener("DOMContentLoaded", () => {
  const savedName = localStorage.getItem("playerName");
  if (savedName) {
    showStats(savedName);
  }
});

// Guardar nombre
saveNameBtn.addEventListener("click", () => {
  const name = playerInput.value.trim();
  if (name.length === 0) return alert("Escribe un nombre de jugador");
  localStorage.setItem("playerName", name);
  showStats(name);
});

// Cambiar nombre
changeNameBtn.addEventListener("click", () => {
  localStorage.removeItem("playerName");
  statsDiv.classList.add("hidden");
  loginDiv.classList.remove("hidden");
});

// Función para mostrar estadísticas desde stats.json
async function showStats(name) {
  loginDiv.classList.add("hidden");
  statsDiv.classList.remove("hidden");
  nameDisplay.textContent = name;

  try {
    const res = await fetch(GITHUB_URL + "?_=" + Date.now());
    const data = await res.json();

    const player = data[name];
    if (!player) {
      rankEl.textContent = "Jugador no encontrado";
      moneyEl.textContent = "-";
      killsEl.textContent = "-";
      deathsEl.textContent = "-";
      hoursEl.textContent = "-";
      return;
    }

    rankEl.textContent = player.rank;
    moneyEl.textContent = player.money;
    killsEl.textContent = player.kills;
    deathsEl.textContent = player.deaths;
    hoursEl.textContent = player.hours;
  } catch (e) {
    console.error(e);
    rankEl.textContent = "Error cargando datos";
  }
}
