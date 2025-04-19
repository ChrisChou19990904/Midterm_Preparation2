let interval;
let running = false;

const timerDisplay = document.getElementById("timer");
const targetInput = document.getElementById("targetTime");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");

function updateTimer() {
    const now = new Date();
    const target = new Date(targetInput.value);

    let diff = Math.floor((target - now) / 1000);

    if (diff <= 0) {
        clearInterval(interval);
        timerDisplay.textContent = "00:00:00";
        startBtn.textContent = "開始";
        running = false;
        return;
    }

    const hours = String(Math.floor(diff / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((diff % 3600) / 60)).padStart(2, '0');
    const seconds = String(diff % 60).padStart(2, '0');

    timerDisplay.textContent = `${hours}:${minutes}:${seconds}`;
}

startBtn.addEventListener("click", () => {
    const target = new Date(targetInput.value);
    const now = new Date();

    // (3a) 未輸入時間就點開始
    if (!targetInput.value) {
        alert("請先設定目標日期與時間！");
        return;
    }

    // (3b) 過去的時間
    if (target <= now) {
        alert("目標時間已過，請重新設定！");
        return;
    }

    if (!running) {
        updateTimer();
        interval = setInterval(updateTimer, 1000);
        startBtn.textContent = "暫停";
        running = true;
    } else {
        clearInterval(interval);
        startBtn.textContent = "開始";
        running = false;
    }
});

resetBtn.addEventListener("click", () => {
    clearInterval(interval);
    timerDisplay.textContent = "00:00:00";
    targetInput.value = "";
    startBtn.textContent = "開始";
    running = false;
});
