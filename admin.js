// ===================================
// CAREPLUS ADMIN PANEL
// ===================================

let appointments = [];

async function loadAppointments() {

    const table = document.getElementById("appointmentTable");

    table.innerHTML = `
    <tr>
        <td colspan="7">Loading...</td>
    </tr>`;

    const { data, error } = await window.db
        .from("appointments")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {

        table.innerHTML = `
        <tr>
            <td colspan="7">${error.message}</td>
        </tr>`;

        console.error(error);

        return;

    }

    appointments = data || [];

    updateDashboard();

    renderTable(appointments);

}

// ===================================
// DASHBOARD
// ===================================

function updateDashboard() {

    const total = appointments.length;

    const pending = appointments.filter(a => a.status === "Pending").length;

    const approved = appointments.filter(a => a.status === "Approved").length;

    const rejected = appointments.filter(a => a.status === "Rejected").length;

    document.querySelectorAll(".dash-card h2")[0].innerText = total;

    document.querySelectorAll(".dash-card h2")[1].innerText = pending;

    document.querySelectorAll(".dash-card h2")[2].innerText = approved;

    document.querySelectorAll(".dash-card h2")[3].innerText = rejected;

}

// ===================================
// TABLE
// ===================================

function renderTable(data) {

    const table = document.getElementById("appointmentTable");

    table.innerHTML = "";

    if (data.length === 0) {

        table.innerHTML = `
        <tr>
            <td colspan="7">No Appointments Found</td>
        </tr>`;

        return;

    }

    data.forEach(item => {

        table.innerHTML += `

<tr>

<td>${item.full_name}</td>

<td>${item.phone}</td>

<td>${item.doctor}</td>

<td>${item.appointment_date}</td>

<td>${item.appointment_time}</td>

<td>

<span class="status ${item.status.toLowerCase()}">

${item.status}

</span>

</td>

<td>

<button class="action-btn approve-btn"

onclick="changeStatus(${item.id},'Approved')">

Approve

</button>

<button class="action-btn reject-btn"

onclick="changeStatus(${item.id},'Rejected')">

Reject

</button>

<button class="action-btn delete-btn"

onclick="deleteAppointment(${item.id})">

Delete

</button>

</td>

</tr>

`;

    });

}
// ===================================
// APPROVE / REJECT
// ===================================

async function changeStatus(id, status) {

    const { error } = await window.db
        .from("appointments")
        .update({
            status: status
        })
        .eq("id", id);

    if (error) {
        alert(error.message);
        return;
    }

    await loadAppointments();

}

// ===================================
// DELETE
// ===================================

async function deleteAppointment(id) {

    const ok = confirm("Delete this appointment?");

    if (!ok) return;

    const { error } = await window.db
        .from("appointments")
        .delete()
        .eq("id", id);

    if (error) {
        alert(error.message);
        return;
    }

    await loadAppointments();

}

// ===================================
// LOGOUT
// ===================================

function logout() {

    localStorage.removeItem("adminLogin");

    location.href = "login.html";

}
