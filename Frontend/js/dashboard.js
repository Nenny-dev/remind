// top of dashboard.js
const userEmail = localStorage.getItem("userEmail");
const username = localStorage.getItem("username");


if (!userEmail || !username) {
  window.location.href = "../pages/login.html";
}

console.log("Logged in user:", userEmail);

const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const timeInput = document.getElementById("timeInput");
const addBtn = document.getElementById("addBtn");
const remindersUl = document.getElementById("remindersUl");
const logoutBtn = document.getElementById("logoutBtn");
const userNameSpan = document.getElementById("userName");

const usernameSpan = document.getElementById("username");

// Show username
usernameSpan.innerHTML = `👋 Hello, <strong>${username}</strong>`;

// Logout
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("userEmail");
  window.location.href = "../pages/login.html";
});

// -------------------- LOAD REMINDERS --------------------
async function loadReminders() {
  try {
    const res = await fetch(`https://remind-production-c066.up.railway.app/reminders/${encodeURIComponent(userEmail)}`);

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const reminders = await res.json();

    remindersUl.innerHTML = "";

    reminders.forEach(rem => {
      const date = new Date(rem.remindAt);
    
      const li = document.createElement("li");
      li.innerHTML = `
        <span>${rem.message} — ${date.toLocaleString()}</span>
        <button onclick="deleteReminder('${rem._id}')">Delete</button>
      `;
      remindersUl.appendChild(li);
    });
  } catch (err) {
    console.error("Failed to load reminders:", err);
  }
}

// Load reminders on page load
loadReminders();


addBtn.addEventListener("click", async (e) => {
  try {
    const task = taskInput.value.trim();
    const date = dateInput.value;
    const time = timeInput.value;

  console.log({ task, date, time, userEmail });

  if (!task || !date || !time) {
    alert("Please fill all fields");
    return;
  }

  const res = await fetch("https://remind-production-c066.up.railway.app/reminders/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userEmail, username, task, date, time })
  });

  const data = await res.json();
  console.log("Server response:", data);

  taskInput.value = "";
  dateInput.value = "";
  timeInput.value = "";

  // Reload reminders
  await loadReminders();
} catch (err) {
  console.error("Failed to add reminder:", err);
}
  });



// -------------------- DELETE REMINDER --------------------
async function deleteReminder(id) {
try {
  await fetch(`https://remind-production-c066.up.railway.app/reminders/${id}`, {
    method: "DELETE"
  });

  // Reload reminders after delete
  await loadReminders();
} catch (err) {
  console.error("Failed to delete reminder:", err);
}
}

// Make deleteReminder globally accessible for inline onclick
window.deleteReminder = deleteReminder;