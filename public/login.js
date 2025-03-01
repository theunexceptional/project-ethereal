async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include" // Ensures cookies (JWT) are sent
    });

    const data = await response.json();

    if (response.ok) {
        document.getElementById("message").innerText = "✅ Login successful!";
        setTimeout(() => {
            window.location.href = "/dashboard.html"; // Redirect after login
        }, 1000);
    } else {
        document.getElementById("message").innerText = "❌ " + data.error;
    }
}