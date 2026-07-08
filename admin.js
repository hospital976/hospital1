// ==============================
// CAREPLUS ADMIN DASHBOARD
// ==============================

async function loadAppointments() {

    const { data, error } = await supabase
        .from("appointments")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error(error);
        return;
    }

    const table = document.getElementById("appointmentTable");

    if (!data || data.length === 0) {

        table.innerHTML = `
        <tr>
            <td colspan="7">No Appointments Found</td>
        </tr>`;

        return;
    }

    table.innerHTML = "";

    let pending = 0;
    let approved = 0;
    let rejected = 0;

    data.forEach(item => {

        if(item.status==="Pending") pending++;
        if(item.status==="Approved") approved++;
        if(item.status==="Rejected") rejected++;

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

        </tr>`;
    });

    document.querySelectorAll(".dash-card h2")[0].innerText = data.length;
    document.querySelectorAll(".dash-card h2")[1].innerText = pending;
    document.querySelectorAll(".dash-card h2")[2].innerText = approved;
    document.querySelectorAll(".dash-card h2")[3].innerText = rejected;

}

// ==============================

async function changeStatus(id,status){

const {error}=await supabase

.from("appointments")

.update({

status:status

})

.eq("id",id);

if(error){

alert(error.message);

return;

}

loadAppointments();

}

// ==============================

async function deleteAppointment(id){

if(!confirm("Delete Appointment?")) return;

const {error}=await supabase

.from("appointments")

.delete()

.eq("id",id);

if(error){

alert(error.message);

return;

}

loadAppointments();

}

// ==============================

function logout(){

localStorage.removeItem("adminLogin");

window.location.href="login.html";

}

// ==============================

loadAppointments();

setInterval(loadAppointments,5000);
