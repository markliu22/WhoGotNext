const express = require("express");
// UNINSTALL
// const bodyParser = require("body-parser");
const cors = require("cors");
const pool = require("./queries");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("wahoo");
});

// get all users
app.post("/api/users", async (req, res) => {
  const allUsers = await pool.query(`SELECT * FROM users ORDER BY username`);
  res.json(allTodos.rows);
});

app.post("/api/signup", async (req, res) => {
  const { username } = req.body;
  const { password } = req.body;
  const newUser = await pool.query(
    `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *`,
    [username, password]
  );
  res.json(newUser);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
