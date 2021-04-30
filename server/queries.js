// "connection pooling": don't have to open a client and close it every time we make a query

const Pool = require("pg").Pool;
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: "localhost",
  database: "whogotnext",
  password: process.env.DB_PASSWORD,
  port: 5432,
});

module.exports = pool;
