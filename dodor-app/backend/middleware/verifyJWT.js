const { verify } = require("jsonwebtoken");
const User = require("../models/userModel");

const verifyJWT = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader)
    return res.status(401).json({ error: "Authorization token required" });

  const token = authHeader.split(" ")[1];

  try {
    const { _id } = verify(token, process.env.ACCES_TOKEN_SECRET);
    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = verifyJWT
