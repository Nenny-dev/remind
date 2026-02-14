function togglePassword() {
  const password = document.getElementById("password");
  const icon = event.target;

  if (password.type === "password") {
    password.type = "text";
    icon.classList.replace("fa-eye", "fa-eye-slash");
  } else {
    password.type = "password";
    icon.classList.replace("fa-eye-slash", "fa-eye");
  }
}

function register() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch("https://remind-production-c066.up.railway.app/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, password })
  })
  .then(async res => {
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Request failed");
    }
    return data;
  })
  .then(data => {
    document.getElementById("message").innerText = data.message;

    window.location.href = "../pages/login.html";
  })
  .catch(err => {
    console.error(err);
    alert(err.message);
  });
}