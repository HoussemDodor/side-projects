const User = require("../models/userModel");

const test = (req, res) => {
    res.json({
      message: 'API is working!',
    });
  };

const updateUser = async (res, req) => {
    console.log("UpdateUser method not implemented")
    res.status(400).json({message: "UpdateUser method not implemented"})
}

const deleteUser = async (res, req) => {    
    console.log("deleteUser method not implemented")
    res.status(400).json({message: "deleteUser method not implemented"})
}

module.exports = { updateUser, deleteUser, test }