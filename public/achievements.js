function showAchievementPopup(name, description) {
    const popup = document.createElement("div");
    popup.classList.add("achievement-popup");
    popup.innerHTML = `
        <h3>🎖️ Achievement Unlocked!</h3>
        <p><strong>${name}</strong></p>
        <p>${description}</p>
    `;
    document.body.appendChild(popup);

    setTimeout(() => {
        popup.style.opacity = "0";
        setTimeout(() => popup.remove(), 500);
    }, 3000);
}

showAchievementPopup("Code Beginner", "You wrote your first line of code!");
