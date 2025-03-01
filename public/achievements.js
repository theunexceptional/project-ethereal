// achievements.js

document.addEventListener("DOMContentLoaded", function() {
    console.log("Achievements script loaded!");
    fetchAchievements();
});

function fetchAchievements() {
    fetch("/api/achievements")
        .then(response => response.text())  // 👈 Use `.text()` to debug
        .then(data => console.log("Raw Response:", data))
        .catch(error => console.error("Error fetching achievements:", error));

}

function displayAchievements(achievements) {
    let container = document.createElement("div");
    container.classList.add("achievements-container");
    achievements.forEach(ach => {
        let achElement = document.createElement("div");
        achElement.classList.add("achievement");
        achElement.innerHTML = `<h3>${ach.name}</h3><p>${ach.description}</p>`;
        container.appendChild(achElement);
    });
    document.body.appendChild(container);
}

async function loadAchievements() {
    try {
        const response = await fetch("http://localhost:5000/api/achievements");

        // ✅ Debugging - Show raw response if there's an issue
        const textData = await response.text();
        console.log("Raw API Response:", textData);

        const achievements = JSON.parse(textData);

        // ✅ Display Achievements
        const achievementsList = document.createElement("ul");
        achievements.forEach(a => {
            const item = document.createElement("li");
            item.textContent = `${a.name} - ${a.description}`;
            achievementsList.appendChild(item);
        });

        document.body.appendChild(achievementsList);

    } catch (error) {
        console.error("Error fetching achievements:", error);
    }
}

// Call function when page loads
document.addEventListener("DOMContentLoaded", loadAchievements);
