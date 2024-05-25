//
//  Imports
//
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");
const corsOptions = require("./config/corsOptions");

// Route imports
const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")


// Middleware imports
const verifyJWT = require("./middleware/verifyJWT");
const credentials = require("./middleware/credentials")
const requestLogger = require("./middleware/requestLogger")

//
//  Uses
//
const app = express();
app.use( express.static( 'public' ));
app.get( "/", ( req, res ) => {
  res.sendFile( path.join( __dirname + "/public/index.html" ));
});

// Middleware
app.use(express.json());
app.use(credentials);
app.use(cors(corsOptions));
app.use(requestLogger);

// Unprotected Routes
app.use("/api/auth", authRoutes)

// Protected Routes
app.use(verifyJWT)
app.use("/api/user", userRoutes)

// DB connection and start app
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`DB Connection succesful and the app is running on PORT ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
