//
//  Imports
//

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

// Route imports
const workoutRoutes = require("./routes/workoutRoute");
const userRoutes = require("./routes/userRoutes")

// Middleware imports
const errorHandler = require("./middleware/errorHandler");

//
//  Uses
//

// Express app
const app = express();

// Middleware
app.use(express.json());
app.use(errorHandler)
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes)

// DB connection and start app
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("DB Connection succesfull and the app is running");
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
