const express = require('express')

const { updateUser, deleteUser, test } = require('../controllers/userController')

const router = express.Router()

// Test
router.get("/", test)

// Update
router.patch("/update/:id", updateUser)

// Delete
router.delete("/delete/:id", deleteUser)


module.exports = router