function togglePassword(inputId, icon) {
  const input = document.getElementById(inputId);

  if (!input) return;

  if (input.type === "password") {
    input.type = "text";
    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");
  } else {
    input.type = "password";
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");
  }
}

// function register() {
//   const name = document.getElementById("name").value.trim();
//   const email = document.getElementById("email").value.trim();
//   const password = document.getElementById("password").value.trim();

//   if (name === "" || email === "" || password === "") {
//     alert("Please fill in all fields");
//     return;
//   }

//   // Temporary storage (backend will replace this)
//   const user = {
//     name: name,
//     email: email,
//     password: password
//   };

//   localStorage.setItem("user", JSON.stringify(user));

//   alert("Account created successfully!");
//   window.location.href = "../js/login.js";
// }

async function login() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  if (!email || !password) {
    alert("Please fill in all fields");
    return;
  }

  const res = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (res.status === 200) {
    sessionStorage.setItem("userId", data.userId);
    sessionStorage.setItem("userName", data.name);
    window.location.href = "../pages/dashboard.html";
  } else {
    alert(data.message);
  }
}

//   const savedUser = JSON.parse(localStorage.getItem("user"));

//   if (!savedUser) {
//     alert("No account found. Please register.");
//     return;
//   }

//   if (email === savedUser.email && password === savedUser.password) {
//     alert("Login successful!");
//     window.location.href = "../js/dashboard.js";
//   } else {
//     alert("Incorrect email or password");
//   }
// }