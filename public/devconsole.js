console.log("🛠️ DevConsole.js Loaded!");

document.addEventListener("DOMContentLoaded", function() {
    console.log("DevConsole Loaded ✅");

    // Get username from localStorage
    const username = localStorage.getItem("username");
    if (!username) {
        console.error("❌ No user logged in! Achievements won't be saved.");
    } else {
        console.log(`🔹 Logged in as: ${username}`);
    }
});


// 🔹 Function to Save Achievement to Backend
function unlockAchievement(name, description) {
    const username = localStorage.getItem("username");
    
    if (!username) {
        console.error("❌ Cannot unlock achievement: No user logged in!");
        return;
    }
    console.log("🔍 Sending achievement:", { username, achievementName: name, description });
    fetch("http://localhost:5000/api/achievements/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            username: username, 
            achievementName: name,  // Correct key
            description 
        }),        
        credentials: "include"
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            console.error("❌ Error saving achievement:", data.error);
        } else {
            console.log("✅ Achievement Saved:", data);
        }
    })
    .catch(error => console.error("❌ Network error while saving achievement:", error));
}


document.addEventListener("keydown", function(event) {
    if (event.key === "`") { // Opens console on tilde key (~)
        let consoleInput = document.getElementById("devConsole");
        let outputDiv = document.getElementById("consoleOutput");
        consoleInput.style.display = "block";
        outputDiv.style.display = "block";
        consoleInput.focus();
    }
});

document.getElementById("devConsole").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        let command = event.target.value.trim().toLowerCase();
        let outputDiv = document.getElementById("consoleOutput");

        if (command === "unlock-treasure") {
            document.getElementById("treasure").style.display = "block";
            outputDiv.innerHTML += `<div style='color: gold;'>💎 Secret Treasure Unlocked!</div>`;
        } else if (command === "dark-mystic-theme") {
            document.body.className = "cyberpunk-mode";
            outputDiv.innerHTML += `<div style='color: cyan;'>🌌 Dark Mystic Theme Activated!</div>`;
        } else if (command === "achievement-hacker") {
            outputDiv.innerHTML += `<div style='color: lime;'>🏆 Achievement Unlocked: Console Hacker!</div>`;
            unlockAchievement("Console Hacker", "Unlocked a secret achievement using dev console!");
        } else {
            try {
                let result = eval(command);
                outputDiv.innerHTML += `<div>> ${command}</div>`;
                outputDiv.innerHTML += `<div style='color: lime;'>${result}</div>`;
            } catch (error) {
                outputDiv.innerHTML += `<div style='color: red;'>Error: ${error}</div>`;
            }
        }
        
        event.target.value = "";
    }
});