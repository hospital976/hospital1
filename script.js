alert("Script Loaded");
const form = document.getElementById("appointmentForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const full_name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const doctor = document.getElementById("doctor").value;
    const appointment_date = document.getElementById("date").value;
    const appointment_time = document.getElementById("time").value;
    const problem = document.getElementById("problem").value.trim();

    if (!full_name || !phone || !appointment_date || !appointment_time) {
        alert("Please fill all required fields.");
        return;
    }

    const { error } = await supabase
        .from("appointments")
        .insert([
            {
                full_name,
                email,
                phone,
                doctor,
                appointment_date,
                appointment_time,
                problem
            }
        ]);

    if (error) {
        console.error(error);
        alert("Appointment booking failed.");
        return;
    }

    alert("Appointment booked successfully!");

    form.reset();
});
