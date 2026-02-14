// Toggle password visibility
function togglePassword(inputId, icon) {
  const password = document.getElementById(inputId);

  if (!password) {
    console.error("Password input not found:", inputId);
    return;
  }

  if (password.type === "password") {
    password.type = "text";
    icon.classList.replace("fa-eye", "fa-eye-slash");
  } else {
    password.type = "password";
    icon.classList.replace("fa-eye-slash", "fa-eye");
  }
}

function login() {
  const emailInput = document.getElementById("loginEmail");
  const passwordInput = document.getElementById("loginPassword");

  if (!emailInput || !passwordInput) {
    alert("Login inputs not found in HTML");
    console.error("Missing inputs:", emailInput, passwordInput);
    return;
  }

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    alert("Please fill all fields");
    return;
  }

  fetch("http://localhost:5000/api/auth/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ email, password })
})
    .then(res => res.json())
    .then(data => {
      console.log("Login response:", data);
      
      if (data.message === "Login successful") {
        localStorage.setItem("userEmail", data.email);
        localStorage.setItem("username", data.username); // must come from backend
    
        window.location.href = "../pages/dashboard.html";
      } else {
        alert(data.message);
      }
    })
    .catch(err => {
      console.error(err);
      alert("Server error");
    });
}