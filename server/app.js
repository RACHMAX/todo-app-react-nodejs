// Application Set Up File (config of middlewares, routes and error handlers)


// Start importing Express.js, make it available as a framework in this file and creating an express app instance based on it.
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

// import routes --------
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

// Middlewares --------
app.use(cors()); // allow frontend to connect by telling express to add headers so that frontend can talk to backend API even if they have diff ports locally.
app.use(express.json()); // tells the express app instance to parse or decode JSON requests and pass it to JS code that it can understand as objects and comprenhend.
app.use(morgan("dev")); // middleware for loggging HTTP requests in Express (creates logs of the requests)

// Mount routes with prefixes, meaning any route in each Route JS file will be prefixed for organizing routes, prevent conflicts, and make them clear API endpoints. --------
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/tasks", taskRoutes);

// defines a route handler for HTTP GET requests. Simple boot route to verify that the API server is up and running, when someone makes a GET req to the base URL of the server it'll respond with the 'Api running....'
app.get("/", (req, res) => {
  res.send("API running...");
});


module.exports = app;