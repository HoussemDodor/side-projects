//
//  Imports
//
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const cors = require("cors");
const corsOptions = require("./config/corsOptions");

// Route imports
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const customerRoutes = require("./routes/customerRoutes");
const tileRoutes = require("./routes/tileRoutes");

// Middleware imports
const verifyJWT = require("./middleware/verifyJWT");
const credentials = require("./middleware/credentials");
const requestLogger = require("./middleware/requestLogger");

//
//  Uses
//
const app = express();
app.set("trust proxy", 1);
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Middleware
app.use(express.json());
app.use(credentials);
app.use(cors(corsOptions));
app.use(requestLogger);

// Unprotected Routes
app.use("/auth", authRoutes);

// Protected Routes
app.use(verifyJWT);
app.use("/user", userRoutes);
app.use("/customer", customerRoutes);
app.use("/tile", tileRoutes);

// DB connection and start app
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB connection successful");
  })
  .catch((error) => {
    console.error("DB connection error:", error.message);
  });

// Local testing
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     app.listen(process.env.PORT, () => {
//       console.log(
//         `DB Connection succesful and the app is running on PORT ${process.env.PORT}`
//       );
//     });
//   })
//   .catch((error) => {
//     console.log(error.message);
//   });

module.exports = app