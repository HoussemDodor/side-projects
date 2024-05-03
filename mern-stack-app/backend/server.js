require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workoutRoute");
const errorHandler = require("./middleware/errorHandler");

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

// DB connection
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
