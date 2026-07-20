const form = document.getElementById("loginForm");

const username = document.getElementById("username");
const password = document.getElementById("password");

const loginBtn = document.getElementById("loginBtn");
const btnText = document.getElementById("btnText");

const errorBox = document.getElementById("loginError");

const togglePassword = document.getElementById("togglePassword");

// Show / Hide Password
togglePassword.addEventListener("click", () => {

    if (password.type === "password") {
        password.type = "text";
        togglePassword.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
    } else {
        password.type = "password";
        togglePassword.innerHTML = '<i class="fa-solid fa-eye"></i>';
    }

});

// Login
form.addEventListener("submit", (e) => {

    e.preventDefault();

    errorBox.style.display = "none";

    loginBtn.disabled = true;

    btnText.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Signing In...';

    setTimeout(() => {

        if (
            username.value.trim() === "admin" &&
            password.value.trim() === "123456"
        ) {

            localStorage.setItem("adminLogin", "true");

            btnText.innerHTML =
                '<i class="fa-solid fa-circle-check"></i> Success';

            setTimeout(() => {

                window.location.href = "admin.html";

            }, 600);

        } else {

            loginBtn.disabled = false;

            btnText.innerHTML = "Login";

            errorBox.style.display = "block";

            errorBox.innerHTML =
                '<i class="fa-solid fa-circle-xmark"></i> Invalid Username or Password';

            password.value = "";

            password.focus();

        }

    }, 1200);

});
