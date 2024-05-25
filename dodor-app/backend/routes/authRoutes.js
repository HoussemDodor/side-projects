const express = require("express");

const { login, signup, logout, refresh } = require("../controllers/authController");
const loginLimiter = require('../middleware/loginLimiter')

const router = express.Router();

router.route("/login").post(loginLimiter, login);
router.post("/signup", signup);
router.post("/logout", logout);

router.get('/refresh', refresh)

module.exports = router;
