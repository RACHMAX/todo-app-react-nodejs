// importing the DB connection
require("dotenv").config(); // load .env variables
const db = require("./config/db"); // connection pool

// Start importing Express.js, make it available as a framework in this file and creating an express app instance based on it.
const express = require("express");
const app = express();

// We now set the constant PORT to the value of the env variable PORT if it exists, if that env variable doesn't exist or empty, then default to using port 5000.
const PORT = process.env.PORT || 5000;

// Now we tell the express app instance to parse or decode JSON requests and pass it to JS code that it can understand as objects and comprenhend.
app.use(express.json());

// defines a route handler for HTTP GET requests. Simple boot route to verify that the API server is up and running, when someone makes a GET req to the base URL of the server it'll respond with the 'Api running....'
app.get("/", (req, res) => {
  res.send("API running...");
});

// block to test the DB connection
db.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to MySQL:", err.message);
  } else {
    console.log("Connected to MySQL DB");
    connection.release(); // release connection back to pool
  }
});

// Line that actually starts the Express.js web server and accesible to receive requests on the 'PORT' described, once it starts print the consolelog message.
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
