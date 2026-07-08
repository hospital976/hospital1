import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
  "https://gaymixxpsnllapithkab.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdheW1peHhwc25sbGFwaXRoa2FiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM0Mzg1NzMsImV4cCI6MjA5OTAxNDU3M30._c9AQ6Wj7IQGNKTp_C3UP8AmlrkSOzfQgwIK5KSwC0E"
);

const form = document.getElementById("appointmentForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const { error } = await supabase.from("appointments").insert([
    {
      full_name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      doctor: document.getElementById("doctor").value,
      appointment_date: document.getElementById("date").value,
      appointment_time: document.getElementById("time").value,
      problem: document.getElementById("problem").value,
      status: "Pending"
    }
  ]);

  if (error) {
    alert(error.message);
    return;
  }

  alert("Appointment Booked Successfully");
  form.reset();
});
