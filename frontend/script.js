const API = "http://localhost:3000";
let currentUser = "";

// Signup
async function signup() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (!username || !password) {
    alert("Enter username and password");
    return;
  }

  await fetch(API + "/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  alert("Signup successful");
}

// Login
async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch(API + "/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  if (res.ok) {
    currentUser = username;

    // UI switch
    document.getElementById("auth").style.display = "none";
    document.getElementById("app").style.display = "block";

    // Welcome text
    document.getElementById("welcome").innerText = "Hello, " + username;

    loadTasks();
  } else {
    alert("Invalid credentials");
  }
}

// Load tasks
async function loadTasks() {
  const res = await fetch(`${API}/tasks?username=${currentUser}`);
  const data = await res.json();

  const list = document.getElementById("taskList");
  list.innerHTML = "";

  data.forEach((task, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${task.name}
      <button onclick="deleteTask(${index})">Delete</button>
    `;

    list.appendChild(li);
  });
}

// Add task
async function addTask() {
  const input = document.getElementById("taskInput");

  if (!input.value) {
    alert("Enter a task");
    return;
  }

  await fetch(API + "/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: input.value,
      username: currentUser
    })
  });

  input.value = "";
  loadTasks();
}

// Delete task
async function deleteTask(id) {
  await fetch(`${API}/tasks/${id}`, {
    method: "DELETE"
  });

  loadTasks();
}

// Logout (FIXED)
function logout() {
  currentUser = "";

  document.getElementById("app").style.display = "none";
  document.getElementById("auth").style.display = "block";

  document.getElementById("username").value = "";
  document.getElementById("password").value = "";

  document.getElementById("taskList").innerHTML = "";
  document.getElementById("welcome").innerText = "";
}