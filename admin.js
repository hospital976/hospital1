// ==========================
// CAREPLUS ADMIN PANEL
// ==========================

// Supabase Config

const supabase = window.supabase.createClient(
    "https://YOUR_PROJECT.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdheW1peHhwc25sbGFwaXRoa2FiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM0Mzg1NzMsImV4cCI6MjA5OTAxNDU3M30._c9AQ6Wj7IQGNKTp_C3UP8AmlrkSOzfQgwIK5KSwC0E"
);

// HTML Elements

const table = document.getElementById("appointmentTable");

// Load Data

loadAppointments();

async function loadAppointments(){

const { data, error } = await supabase

.from("appointments")

.select("*")

.order("created_at",{ascending:false});

if(error){

console.log(error);

return;

}

showAppointments(data);

updateCards(data);

}

// Table

function showAppointments(data){

if(data.length==0){

table.innerHTML=`

<tr>

<td colspan="7">

No Appointment Found

</td>

</tr>

`;

return;

}

table.innerHTML="";

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

<button
class="action-btn approve-btn"
onclick="approve('${item.id}')">

Approve

</button>

<button
class="action-btn reject-btn"
onclick="reject('${item.id}')">

Reject

</button>

<button
class="action-btn delete-btn"
onclick="removeAppointment('${item.id}')">

Delete

</button>

</td>

</tr>

`;

});

}

// Dashboard Cards

function updateCards(data){

document.querySelectorAll(".dash-card h2")[0].innerHTML=data.length;

document.querySelectorAll(".dash-card h2")[1].innerHTML=data.filter(x=>x.status=="Pending").length;

document.querySelectorAll(".dash-card h2")[2].innerHTML=data.filter(x=>x.status=="Approved").length;

document.querySelectorAll(".dash-card h2")[3].innerHTML=data.filter(x=>x.status=="Rejected").length;

}
// ==========================
// APPROVE APPOINTMENT
// ==========================

async function approve(id){

const { error } = await supabase
.from("appointments")
.update({
status:"Approved"
})
.eq("id",id);

if(error){

alert(error.message);

return;

}

loadAppointments();

}

// ==========================
// REJECT APPOINTMENT
// ==========================

async function reject(id){

const { error } = await supabase
.from("appointments")
.update({
status:"Rejected"
})
.eq("id",id);

if(error){

alert(error.message);

return;

}

loadAppointments();

}

// ==========================
// DELETE APPOINTMENT
// ==========================

async function removeAppointment(id){

if(!confirm("Delete this appointment?")) return;

const { error } = await supabase
.from("appointments")
.delete()
.eq("id",id);

if(error){

alert(error.message);

return;

}

loadAppointments();

}

// ==========================
// AUTO REFRESH
// ==========================

setInterval(()=>{

loadAppointments();

},5000);
