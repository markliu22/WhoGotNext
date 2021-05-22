// "connection pooling": don't have to open a client and close it every time we make a query

const Pool = require("pg").Pool;
require("dotenv").config();

// https://www.digitalocean.com/community/questions/can-t-connect-to-managed-database-self_signed_cert_in_chain-error
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
