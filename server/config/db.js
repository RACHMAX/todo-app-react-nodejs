// File for MySQL connection

// Load environment variables, being dotenv the npm package to load env variables from a file named .env
require("dotenv").config();

// Node.js command that imports a lib specifically to interact with a MYSQL DB.
const mysql = require("mysql2/promise");

// Create a connection pool function, which is to handle multiple simultaneous requsts to the  server
const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Export a module, taking the 'db' connection pool object to be used in other files of the app.
module.exports = db;
