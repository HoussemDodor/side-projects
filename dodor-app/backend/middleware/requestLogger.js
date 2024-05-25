const requestLoggerMiddleware = (req, res, next) => {
    console.log(`Incoming request to ${req.path} from ${req.ip}`);
  
    next();
  };

module.exports = requestLoggerMiddleware