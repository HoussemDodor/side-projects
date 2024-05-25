const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: "user",
    },
    profilePicture: {
      type: String,
      default:
        "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg",
    },
  },
  { timestamps: true }
);

// Static signup method
userSchema.statics.signup = async function (email, password) {
  // First make email all lowercase
  email = email.toLowerCase();

  //Check if fields are empty
  if (!email || !password) throw Error("All fields must be filled");

  //Check if email is a valid one
  if (!validator.isEmail(email)) throw Error("Email is not valid");

  //Check password
  //if (!validator.isStrongPassword(password))
  //  throw Error("Password is not strong enough");

  // Check if the email is already in use
  const exists = await this.findOne({ email });
  if (exists) throw Error("Email already in use");

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash }); // TODO: Handle possible error

  return user;
};

// Login method
userSchema.statics.login = async function (email, password) {
  // First make email all lowercase
  email = email.toLowerCase();

  //Check if fields are empty
  if (!email || !password) throw Error("All fields must be filled");

  //check if user exists
  const user = await this.findOne({ email }); // TODO: Handle Possible Error
  if (!user) throw Error("Incorrect email");

  //check if password matches
  const match = await bcrypt.compare(password, user.password);
  if (!match) throw Error("Invalid email/password");

  return user;
};

module.exports = mongoose.model("User", userSchema);
