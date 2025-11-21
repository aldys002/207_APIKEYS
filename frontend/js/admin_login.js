const API = "http://localhost:3000";

async function adminLogin() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const res = await fetch(`${API}/admin/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (data.token) {
            localStorage.setItem("admin_token", data.token);
            alert("Login berhasil!");
            window.location.href = "dashboard_admin.html";
        } else {
            alert("Login gagal: " + data.error);
        }
    } catch (err) {
        alert("Error: " + err.message);
    }
}
