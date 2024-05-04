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
  },
  { timestamps: true }
);

// Static signup method
userSchema.statics.signup = async function (email, password) {
  //Check if fields are empty
  if (!email || !password) throw Error("All fields must be filled");

  //Check if email is a valid one
  if (!validator.isEmail(email)) throw Error("Email is not valid");

  //Check password
  if (!validator.isStrongPassword(password)) throw Error("Password is not strong enough");

  // CHeck if the email is already in use
  const exists = await this.findOne({ email });
  if (exists) throw Error("Email already in use");

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
};

module.exports = mongoose.model("User", userSchema);
