const User = require('../models/userModel')

// Login 
const loginUser = async (req, res) => {
    res.json({message: 'User login'})
}

// Signup
const signupUser = async (req, res) => {
    res.json({message: 'User signup'})

}

module.exports = { loginUser, signupUser }