

function updateDateTime() {
    const now = new Date();

    
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    const currentTime = `${hours}:${minutes}:${seconds}`;

    
    const dateOptions = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    };

    const currentDate = now.toLocaleDateString("en-US", dateOptions);

    
    let greeting;

    if (now.getHours() < 12) {
        greeting = "Good Morning!";
    } else if (now.getHours() < 18) {
        greeting = "Good Afternoon!";
    } else {
        greeting = "Good Evening!";
    }

   
    document.getElementById("clock").textContent = currentTime;
    document.getElementById("date").textContent = currentDate;
    document.getElementById("greeting").textContent = greeting;
}


updateDateTime();


setInterval(updateDateTime, 1000);



let timer;
let timeLeft = 25 * 60; 
let isRunning = false;

const timerDisplay = document.getElementById("timerDisplay");
const startTimerBtn = document.getElementById("startTimer");
const stopTimerBtn = document.getElementById("stopTimer");
const resetTimerBtn = document.getElementById("resetTimer");


function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    
   
    timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}


startTimerBtn.addEventListener("click", () => {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay();
            } else {
                clearInterval(timer);
                isRunning = false;
                alert("Waktu fokus selesai! Istirahat dulu ya.");
            }
        }, 1000);
    }
});


stopTimerBtn.addEventListener("click", () => {
    clearInterval(timer);
    isRunning = false;
});


resetTimerBtn.addEventListener("click", () => {
    clearInterval(timer);
    isRunning = false;
    timeLeft = 25 * 60; 
    updateTimerDisplay();
});