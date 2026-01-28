// Show a demo user name
document.getElementById("userName").textContent = "Hello, Student";

// Logout button
document.getElementById("logoutBtn").addEventListener("click", () => {
  alert("You have logged out");
  window.location.href = "../pages/login.html";
});

const remindersUl = document.getElementById("remindersUl");

function addReminder() {
  const task = document.getElementById("taskInput").value.trim();
  const date = document.getElementById("dateInput").value;
  const time = document.getElementById("timeInput").value;

  if (!task || !date || !time) {
    alert("Please fill all fields");
    return;
  }

  // Create list item
  const li = document.createElement("li");
  li.innerHTML = `
    <span>${task} - ${date} ${time}</span>
    <button onclick="deleteReminder(this)">Delete</button>
  `;

  remindersUl.appendChild(li);

  // Clear inputs
  document.getElementById("taskInput").value = "";
  document.getElementById("dateInput").value = "";
  document.getElementById("timeInput").value = "";
}

// Delete function
function deleteReminder(button) {
  button.parentElement.remove();
}