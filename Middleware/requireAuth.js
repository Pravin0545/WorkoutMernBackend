const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");
const secret = process.env.SECRET;

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token require" });
  }
  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, secret);
    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    console.log(error);
    req.status(401).json({ error: "Request is not Authorize" });
  }
};

module.exports = requireAuth;
