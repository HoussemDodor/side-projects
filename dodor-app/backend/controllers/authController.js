const User = require("../models/userModel");
const { sign } = require("jsonwebtoken");
const bcrypt = require('bcrypt')

const createToken = (_id) => {
  return sign({ _id }, process.env.ACCES_TOKEN_SECRET, { expiresIn: "3d" });
};

// Refresh
const refresh = (req, res) => {
  console.log("Refresh Method not yet implemented")
}

// Login
const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.login(email, password)
    const acces_token = createToken(user._id)
    res.status(200).json({email: user.email, acces_token, role: user.role, profilePicture: user.profilePicture})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
};

// Signup
const signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);

    // create token
    const acces_token = createToken(user._id)

    res.status(200).json({ email: user.email, acces_token, role: user.role });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const logout = async (req, res) => {
    console.log("Signout function not implemented")
}

module.exports = { login, signup, logout, refresh };
