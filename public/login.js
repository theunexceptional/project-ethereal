async function login() {
    const username = document.getElementById("username").value;
    if (!username) {
        alert("Username is required!");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username })
        });

        const data = await response.json();

        if (data.success) {
            localStorage.setItem("username", username);
            window.location.href = "dashboard.html"; // Redirect to dashboard
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error("Login failed:", error);
    }
}
