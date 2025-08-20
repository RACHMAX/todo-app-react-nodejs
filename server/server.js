
// Server Entry Point

// File that loads environment variables, imports app.js, starts actual server and handles DB connection boots checks if needed.

require("dotenv").config(); // load .env variables
const db = require("./config/db"); // MySQL connection pool
const app = require("./app"); // importing express app

// We now set the constant PORT to the value of the env variable PORT if it exists, if that env variable doesn't exist or empty, then default to using port 5000.
const PORT = process.env.PORT || 5000;

// Test DB connection before starting server
db.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Error connecting to MySQL:", err.message);
  } else {
    console.log("✅ Connected to MySQL DB");
    connection.release();

    // Line that actually starts the Express.js web server and accesible to receive requests on the 'PORT' described, once it starts print the consolelog message.
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  }
});


