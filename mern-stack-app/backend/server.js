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
const { verifyJWT } = require("./middleware/verifyJWT");

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

// Unprotected Routes
app.use("/api/user", userRoutes)

// Protected Routes
app.use(verifyJWT)
app.use("/api/workouts", workoutRoutes);

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
