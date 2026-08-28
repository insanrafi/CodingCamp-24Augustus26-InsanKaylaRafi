

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