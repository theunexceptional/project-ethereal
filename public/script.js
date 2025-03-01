document.addEventListener("DOMContentLoaded", function() {
    console.log("Script Loaded ✅");
});

let autoRefresh = true;
window.onload = function() {
    let savedTheme = localStorage.getItem("theme");
    if (savedTheme) document.body.classList.add(savedTheme);
    else document.body.classList.add("dark-mode");
    updateOutput();
};

document.getElementById("themeToggle").addEventListener("click", function() {
    let themes = ["dark-mode", "light-mode", "cyberpunk-mode", "interstellar-mode"];
    let currentTheme = document.body.classList[0];
    let nextTheme = themes[(themes.indexOf(currentTheme) + 1) % themes.length];
    document.body.className = nextTheme;
    localStorage.setItem("theme", nextTheme);
});

function updateOutput() {
    if (!autoRefresh) return;
    let html = document.getElementById("htmlCode").value;
    let css = "<style>" + document.getElementById("cssCode").value + "</style>";
    let js = "<script>" + document.getElementById("jsCode").value + "<\/script>";
    let outputFrame = document.getElementById("output").contentWindow.document;
    outputFrame.open();
    outputFrame.write(html + css + js);
    outputFrame.close();
}

document.querySelectorAll("textarea").forEach(area => area.addEventListener("input", updateOutput));

// 🔹 Login Popup Logic
document.getElementById("loginBtn").addEventListener("click", function() {
    document.getElementById("loginPopup").style.display = "block";
});

function closeLoginPopup() {
    document.getElementById("loginPopup").style.display = "none";
}

// 🔹 Open devconsole.html on tilde key (`)
document.addEventListener("keydown", function(event) {
    if (event.key === "`") {
        window.open("devconsole.html", "_blank");
    }
});

// 🔹 DevConsole Secret Codes
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
