let appointments = [];
loadAppointments() 
if (error) {
    console.error(error);
    table.innerHTML = `
    <tr>
        <td colspan="7">${error.message}</td>
    </tr>`;
    return;
}

appointments = data;

if (!data || data.length === 0) {
// ==============================
// CAREPLUS ADMIN DASHBOARD
// ==============================

async function loadAppointments() {

    const table = document.getElementById("appointmentTable");

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

    if (!data || data.length === 0) {
        table.innerHTML = `
        <tr>
            <td colspan="7">No Appointments Found</td>
        </tr>`;
        return;
    }

    table.innerHTML = "";

    let total = data.length;
    let pending = 0;
    let approved = 0;
    let rejected = 0;

    data.forEach(item => {

        if (item.status === "Pending") pending++;
        if (item.status === "Approved") approved++;
        if (item.status === "Rejected") rejected++;

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

    document.querySelectorAll(".dash-card h2")[0].innerText = total;
    document.querySelectorAll(".dash-card h2")[1].innerText = pending;
    document.querySelectorAll(".dash-card h2")[2].innerText = approved;
    document.querySelectorAll(".dash-card h2")[3].innerText = rejected;

}

// ==============================
// CHANGE STATUS
// ==============================

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

    loadAppointments();
}

// ==============================
// DELETE
// ==============================

async function deleteAppointment(id) {

    if (!confirm("Delete Appointment?")) return;

    const { error } = await window.db
        .from("appointments")
        .delete()
        .eq("id", id);

    if (error) {
        alert(error.message);
        return;
    }

    loadAppointments();

}

// ==============================
// LOGOUT
// ==============================

function logout() {

    localStorage.removeItem("adminLogin");

    window.location.href = "login.html";

}

// ==============================
// START
// ==============================

loadAppointments();

setInterval(loadAppointments, 5000);

document.getElementById("searchInput").addEventListener("input", function () {

    const value = this.value.toLowerCase();

    const filtered = appointments.filter(item =>

        item.full_name.toLowerCase().includes(value) ||

        item.phone.toLowerCase().includes(value)

    );

    renderTable(filtered);

});

function renderTable(data){

const table=document.getElementById("appointmentTable");

table.innerHTML="";

if(data.length===0){

table.innerHTML=`
<tr>
<td colspan="7">
No Appointment Found
</td>
</tr>
`;

return;

}

data.forEach(item=>{

table.innerHTML+=`
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
