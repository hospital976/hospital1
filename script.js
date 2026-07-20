// ================================
// CAREPLUS APPOINTMENT SYSTEM
// ================================

const form = document.getElementById("appointmentForm");

if(form){

form.addEventListener("submit", async function(e){

e.preventDefault();

const button = form.querySelector("button");
button.disabled = true;
button.innerText = "Booking...";

const appointment = {

full_name:document.getElementById("name").value.trim(),

email:document.getElementById("email").value.trim(),

phone:document.getElementById("phone").value.trim(),

doctor:document.getElementById("doctor").value,

appointment_date:document.getElementById("date").value,

appointment_time:document.getElementById("time").value,

problem:document.getElementById("problem").value.trim(),

status:"Pending"

};

const { error } = await window.db
.from("appointments")
.insert([appointment]);

button.disabled = false;
button.innerText = "Book Appointment";

if(error){

console.error(error);

alert("❌ " + error.message);

return;

}

alert("✅ Appointment Booked Successfully!");

form.reset();

});

}
// ================================
// MOBILE MENU
// ================================

const menuToggle = document.getElementById("menu-toggle");
const nav = document.querySelector("nav");

if (menuToggle && nav) {

    menuToggle.addEventListener("click", () => {

        nav.classList.toggle("active");

        const icon = menuToggle.querySelector("i");

        if (nav.classList.contains("active")) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");
        } else {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }

    });

}
