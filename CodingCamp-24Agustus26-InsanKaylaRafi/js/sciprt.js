

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




let timerDuration = 25 * 60;
let timeLeft = timerDuration;
let timerInterval = null;

const timerDisplay = document.getElementById("timerDisplay");
const startTimerButton = document.getElementById("startTimer");
const stopTimerButton = document.getElementById("stopTimer");
const resetTimerButton = document.getElementById("resetTimer");


function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    timerDisplay.textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}


startTimerButton.addEventListener("click", function () {
    
    if (timerInterval !== null) {
        return;
    }

    timerInterval = setInterval(function () {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimerDisplay();
        } else {
            clearInterval(timerInterval);
            timerInterval = null;
            alert("Focus session completed!");
        }
    }, 1000);
});


stopTimerButton.addEventListener("click", function () {
    clearInterval(timerInterval);
    timerInterval = null;
});


resetTimerButton.addEventListener("click", function () {
    clearInterval(timerInterval);
    timerInterval = null;

    timeLeft = timerDuration;
    updateTimerDisplay();
});


updateTimerDisplay();