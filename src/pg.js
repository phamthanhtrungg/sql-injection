const { Pool } = require("pg");
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "root",
  port: 5432,
  database: "sql_injection",
});

module.exports = pool;
