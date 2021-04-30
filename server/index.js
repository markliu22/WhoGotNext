const express = require("express");
// UNINSTALL
// const bodyParser = require("body-parser");
const cors = require("cors");
const pool = require("./queries");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("wassupp yo you reached the api");
});

// get all users
app.get("/api/users", async (req, res) => {
  const allUsers = await pool.query(`SELECT * FROM users`);
  res.json(allUsers.rows);
});

// get single user
app.get("/api/users/:id", async (req, res) => {
  const id = req.params.id;
  const user = await pool.query(`SELECT * FROM users WHERE user_id = $1`, [id]);
  res.json(user.rows[0]);
});

// handle signup (create user)
app.post("/api/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const newUser = await pool.query(
    `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *`,
    [username, password]
  );
  const user = newUser.rows[0];
  // generate new token
  jwt.sign({ user: user }, "secretkey", (err, token) => {
    res.json({
      token: token,
    });
  });
});

// handle login
app.post("/api/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const findUser = await pool.query(
    `SELECT * FROM users WHERE username = $1 AND password = $2`,
    [username, password]
  );
  const user = findUser.rows[0];
  if (!user) {
    res.json({
      message: "user not found",
    });
  } else {
    jwt.sign({ user: user }, "secretkey", (err, token) => {
      res.json({
        token: token,
      });
    });
  }
});

// handle delete user
app.delete("/api/users/:id", async (req, res) => {
  const id = req.params.id;
  const deletedUser = await pool.query(`DELETE FROM users WHERE user_id = $1`, [
    id,
  ]);
  res.json({ id: id });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
