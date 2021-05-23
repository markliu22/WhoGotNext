const express = require("express");
const cors = require("cors");
const pool = require("./db");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("🌊 yo you reached the api");
});

// USERS --------------------------------------.

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

// signup (create user)
app.post("/api/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const newUser = await pool.query(
    `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *`,
    [username, password]
  );
  const user = newUser.rows[0];
  // generate new token
  jwt.sign({ user: user }, "secretkey", { expiresIn: "12h" }, (err, token) => {
    res.json({
      user_id: user.user_id,
      token: token,
    });
  });
});

// login
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
        user_id: user.user_id,
        token: token,
      });
    });
  }
});

// function authenticateToken(req, res, next) {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];
//   if (!token) return res.sendStatus(401);
//   jwt.verify(token, "secretkey", (err, decode) => {
//     if (err) return res.sendStatus(403);
//     req.user = decode;
//     next();
//   });
// }

// delete user
// authenticateToken runs before delete request
// app.delete("/api/users/:id", authenticateToken, async (req, res) => {
app.delete("/api/users/:id", async (req, res) => {
  const id = req.params.id;
  const deletedUser = await pool.query(`DELETE FROM users WHERE user_id = $1`, [
    id,
  ]);
  res.json({ id: id });
});

// BOOKINGS --------------------------------------

// get all bookings
app.get("/api/bookings", async (req, res) => {
  const allBookings = await pool.query(`SELECT * FROM bookings`);
  res.json(allBookings.rows);
});

// get single booking based on booking id
app.get("/api/bookings/:id", async (req, res) => {
  const id = req.params.id;
  const booking = await pool.query(
    `SELECT * FROM bookings WHERE booking_id = $1`,
    [id]
  );
  res.json(booking.rows[0]);
});

// get all bookings from a single user
app.get("/api/bookings/user/:id", async (req, res) => {
  const id = req.params.id;
  const bookings = await pool.query(
    `SELECT * FROM bookings WHERE booker_id = $1`,
    [id]
  );
  res.json(bookings.rows);
});

// create booking
// app.post("/api/bookings", authenticateToken, async (req, res) => {
app.post("/api/bookings", async (req, res) => {
  const booking_location = req.body.booking_location;
  const booking_date = req.body.booking_date;
  const start_time = req.body.start_time;
  const end_time = req.body.end_time;
  const booker_id = req.body.booker_id;

  // INSERT INTO bookings (booking_location, booking_date, start_time, end_time, booker_id) VALUES ('830 Paisley Blvd W, Mississauga, ON L5C 3P5', '2021-01-15', '00:00:00', '12:0:00', 0);
  const newBooking = await pool.query(
    `INSERT INTO bookings (booking_location, booking_date, start_time, end_time, booker_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [booking_location, booking_date, start_time, end_time, booker_id]
  );
  const booking = newBooking.rows[0];
  res.json({
    booking: booking,
  });
});

// "who else is coming?" feature
// get all bookings in same location, date, and overlapping time, then get all usernames from booker_id
// SELECT * FROM users WHERE user_id IN (SELECT booker_id FROM bookings WHERE booking_location = '1234 Cherry Rd W, Toronto, ON L5N 9V7' AND booking_date = '2021-03-03' AND start_time BETWEEN '00:00:00' AND '12:00:30');
// app.get("/api/bookings/users/:id", async (req, res) => {
app.get("/api/bookings/users/:id", async (req, res) => {
  const id = req.params.id;
  const findBooking = await pool.query(
    `SELECT * FROM bookings WHERE booking_id = $1`,
    [id]
  );
  const booking = findBooking.rows[0];
  const booking_location = booking.booking_location;
  const booking_date = booking.booking_date;
  const start_time = booking.start_time;
  const end_time = booking.end_time;
  // res.json(booking.rows[0]);
  const usernames = await pool.query(
    `SELECT username FROM users WHERE user_id IN (SELECT DISTINCT booker_id FROM bookings WHERE booking_location = $1 AND booking_date = $2 AND ((start_time >= $3 AND start_time <= $4) OR (end_time >= $3 AND end_time <= $4)));`,
    [booking_location, booking_date, start_time, end_time]
  );
  res.json(usernames.rows);
});

// delete booking
// authenticateToken runs before delete request
// app.delete("/api/bookings/:id", authenticateToken, async (req, res) => {
app.delete("/api/bookings/:id", async (req, res) => {
  const id = req.params.id;
  const deletedBooking = await pool.query(
    `DELETE FROM bookings WHERE booking_id = $1`,
    [id]
  );
  res.json({ id: id });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("🔥 Server is running on port " + PORT);
});
