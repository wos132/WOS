async function login() {
  const loginInput = document.getElementById("login").value;
  const pinInput = document.getElementById("pin").value;
  const error = document.getElementById("error");

  try {
    const res = await fetch("credentials.json");
    const data = await res.json();

    if (loginInput === data.login && pinInput === data.pin) {
      sessionStorage.setItem("auth", "true");
      window.location.replace("dashboard.html");
    } else {
      error.innerText = "Błędny login lub PIN";
    }

  } catch (e) {
    error.innerText = "Błąd odczytu credentials.json";
  }
}

function checkAuth() {
  if (sessionStorage.getItem("auth") !== "true") {
    window.location.replace("index.html");
  }
}

function logout() {
  sessionStorage.removeItem("auth");
  window.location.replace("index.html");
}

let timeLeft = 60;
let timerInterval;

function startTimer() {
  resetTimer();
  timerInterval = setInterval(updateTimer, 1000);

  document.addEventListener("mousemove", resetTimer);
  document.addEventListener("keydown", resetTimer);
  document.addEventListener("click", resetTimer);
}

function updateTimer() {
  timeLeft--;
  document.getElementById("timer").innerText = timeLeft;

  if (timeLeft <= 0) {
    logout();
  }
}

function resetTimer() {
  timeLeft = 60;
  const t = document.getElementById("timer");
  if (t) t.innerText = timeLeft;
}

