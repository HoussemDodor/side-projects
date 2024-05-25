const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
  windowMs: 1000 * 60 * 5, // Timeout set to 5 minutes
  max: 5, // limits each IP to 5 login request per minute
  message: {
    message:
      "Too many login attempts from this IP, please try again in 60 seconds",
  },
  handler: (req, res, next, options) => {
    res.status(options.statusCode).send(options.message);
  },
  standardHeader: true,
  legacyHeader: false,
});

module.exports = loginLimiter
