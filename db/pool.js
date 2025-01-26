const { Pool } = require("pg");

module.exports = new Pool({
  host: "localhost", // or wherever the db is hosted
  database: "inventory",
  user: process.env.USER,
  password: process.env.PASSWORD,
  port: 5432, // The default port
});
