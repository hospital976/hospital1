// =========================================
// CAREPLUS ADMIN DASHBOARD
// PART 1
// =========================================

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
        console.error(error);

        table.innerHTML = `
        <tr>
            <td colspan="7">${error.message}</td>
        </tr>`;

        return;
    }

    appointments = data || [];

    updateDashboard();

    renderAppointments();

}

// =========================================
// DASHBOARD
// =========================================

function updateDashboard() {

    document.querySelectorAll(".dash-card h2")[0].innerText = appointments.length;

    document.querySelectorAll(".dash-card h2")[1].innerText =
        appointments.filter(x => x.status === "Pending").length;

    document.querySelectorAll(".dash-card h2")[2].innerText =
        appointments.filter(x => x.status === "Approved").length;

    document.querySelectorAll(".dash-card h2")[3].innerText =
        appointments.filter(x => x.status === "Rejected").length;

}

// =========================================
// TABLE
// =========================================

function renderAppointments() {

    const table = document.getElementById("appointmentTable");

    table.innerHTML = "";

    if (appointments.length === 0) {

        table.innerHTML = `
        <tr>
            <td colspan="7">No Appointments Found</td>
        </tr>`;

        return;

    }

    appointments.forEach(item => {

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
// =========================================
// CAREPLUS ADMIN DASHBOARD
// PART 2
// =========================================

// APPROVE / REJECT

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

// DELETE

async function deleteAppointment(id) {

    if (!confirm("Delete this appointment?")) return;

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

// LOGOUT

function logout() {

    localStorage.removeItem("adminLogin");

    window.location.href = "login.html";

}

// START

loadAppointments();

setInterval(function () {

    loadAppointments();

}, 5000);
