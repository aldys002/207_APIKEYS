const API_DASH = "http://localhost:3000";

async function fetchUsers() {
    const token = localStorage.getItem("admin_token");

    const res = await fetch(`${API_DASH}/admin/users`, {
        headers: { Authorization: "Bearer " + token }
    });

    const users = await res.json();

    let html = `
        <tr>
            <th>ID</th><th>Firstname</th><th>Lastname</th><th>Email</th><th>Delete</th>
        </tr>`;

    users.forEach(u => {
        html += `
        <tr>
            <td>${u.id}</td>
            <td>${u.firstname}</td>
            <td>${u.lastname}</td>
            <td>${u.email}</td>
            <td><button onclick="deleteUser(${u.id})">X</button></td>
        </tr>`;
    });

    document.getElementById("userTable").innerHTML = html;
}

async function fetchApiKeys() {
    const token = localStorage.getItem("admin_token");

    const res = await fetch(`${API_DASH}/admin/api-keys`, {
        headers: { Authorization: "Bearer " + token }
    });

    const keys = await res.json();

    let html = `
        <tr>
            <th>ID</th><th>Key</th><th>User ID</th><th>Status</th><th>Out Date</th><th>Delete</th>
        </tr>`;

    keys.forEach(k => {
        html += `
        <tr>
            <td>${k.id}</td>
            <td>${k.key}</td>
            <td>${k.user_id}</td>
            <td>${k.status}</td>
            <td>${k.out_date}</td>
            <td><button onclick="deleteKey(${k.id})">X</button></td>
        </tr>`;
    });

    document.getElementById("keyTable").innerHTML = html;
}

async function deleteUser(id) {
    const token = localStorage.getItem("admin_token");

    await fetch(`${API_DASH}/admin/delete-user/${id}`, {
        method: "DELETE",
        headers: { Authorization: "Bearer " + token }
    });

    fetchUsers();
}

async function deleteKey(id) {
    const token = localStorage.getItem("admin_token");

    await fetch(`${API_DASH}/admin/delete-key/${id}`, {
        method: "DELETE",
        headers: { Authorization: "Bearer " + token }
    });

    fetchApiKeys();
}

function logout() {
    localStorage.removeItem("admin_token");
    window.location.href = "login_admin.html";
}

fetchUsers();
fetchApiKeys();
