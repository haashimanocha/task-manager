const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let users = [];
let tasks = [];

app.get("/", (req, res) => {
  res.send("Task Manager Backend Running 🚀");
});
// Signup
app.post("/signup", (req, res) => {
  const { username, password } = req.body;
  users.push({ username, password });
  res.send("User registered");
});

// Login
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (user) {
    res.json({ message: "Login successful", username });
  } else {
    res.status(401).send("Invalid credentials");
  }
});

// Get tasks (only for logged user)
app.get("/tasks", (req, res) => {
  const username = req.query.username;
  const userTasks = tasks.filter(t => t.username === username);
  res.json(userTasks);
});

// Add task
app.post("/tasks", (req, res) => {
  const task = req.body;
  tasks.push(task);
  res.json(task);
});

// Delete task
app.delete("/tasks/:id", (req, res) => {
  const id = req.params.id;
  tasks.splice(id, 1);
  res.send("Deleted");
});

const PORT = 3000;
app.listen(PORT, () => console.log("Server running on port 3000"));