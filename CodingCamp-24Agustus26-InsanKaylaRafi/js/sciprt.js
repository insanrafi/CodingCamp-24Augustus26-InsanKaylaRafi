

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



const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

let tasks = [];

addTaskButton.addEventListener("click", function () {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(newTask);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    taskInput.value = "";

    renderTasks();
});

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function (task) {
        const li = document.createElement("li");

        li.innerHTML = `
            <span class="${task.completed ? "completed" : ""}">
                ${task.text}
            </span>

            <button onclick="completeTask(${task.id})">
                Done
            </button>

            <button onclick="editTask(${task.id})">
                Edit
            </button>

            <button onclick="deleteTask(${task.id})">
                Delete
            </button>
        `;

        taskList.appendChild(li);
    });
}


function completeTask(taskId) {
    const task = tasks.find(function (task) {
        return task.id === taskId;
    });

    if (task) {
    task.completed = !task.completed;

    localStorage.setItem("tasks", JSON.stringify(tasks));

    renderTasks();
    }
}


function editTask(taskId) {
    const task = tasks.find(function (task) {
        return task.id === taskId;
    });

    if (!task) {
        return;
    }

    const newText = prompt("Edit your task:", task.text);

    if (newText === null) {
        return;
    }

    const updatedText = newText.trim();

    if (updatedText === "") {
        alert("Task cannot be empty.");
        return;
    }

    task.text = updatedText;

    localStorage.setItem("tasks", JSON.stringify(tasks));

    renderTasks();
}



function deleteTask(taskId) {
    const confirmed = confirm("Are you sure you want to delete this task?");

    if (!confirmed) {
        return;
    }

    tasks = tasks.filter(function (task) {
     return task.id !== taskId;
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));

    renderTasks();
}


const savedTasks = localStorage.getItem("tasks");

if (savedTasks) {
    tasks = JSON.parse(savedTasks);
    renderTasks();
}




const linkNameInput = document.getElementById("linkNameInput");
const linkUrlInput = document.getElementById("linkUrlInput");
const addLinkButton = document.getElementById("addLinkBtn");
const quickLinksList = document.getElementById("quickLinksList");

let quickLinks = [];



addLinkButton.addEventListener("click", function () {
    const linkName = linkNameInput.value.trim();
    let linkUrl = linkUrlInput.value.trim();

    if (linkName === "" || linkUrl === "") {
        alert("Please enter website name and URL.");
        return;
    }

    
    if (!linkUrl.startsWith("http://") && !linkUrl.startsWith("https://")) {
        linkUrl = "https://" + linkUrl;
    }

    const newLink = {
        id: Date.now(),
        name: linkName,
        url: linkUrl
    };

    quickLinks.push(newLink);

    saveQuickLinks();

    linkNameInput.value = "";
    linkUrlInput.value = "";

    renderQuickLinks();
});



function renderQuickLinks() {
    quickLinksList.innerHTML = "";

    quickLinks.forEach(function (link) {
        const linkItem = document.createElement("div");

        linkItem.classList.add("link-item");

        linkItem.innerHTML = `
            <a href="${link.url}" target="_blank">
                ${link.name}
            </a>

            <button onclick="deleteQuickLink(${link.id})">
                Delete
            </button>
        `;

        quickLinksList.appendChild(linkItem);
    });
}



function deleteQuickLink(linkId) {
    quickLinks = quickLinks.filter(function (link) {
        return link.id !== linkId;
    });

    saveQuickLinks();
    renderQuickLinks();
}



function saveQuickLinks() {
    localStorage.setItem(
        "quickLinks",
        JSON.stringify(quickLinks)
    );
}



const savedQuickLinks = localStorage.getItem("quickLinks");

if (savedQuickLinks) {
    quickLinks = JSON.parse(savedQuickLinks);
    renderQuickLinks();
}