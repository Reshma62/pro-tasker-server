const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

// Middleware function to verify JWT token from cookie
const verifiToken = (req, res, next) => {
  // Get token from cookie
  const token = req.cookies.token;
  console.log(token);
  // Check if token does not exist
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Verify token
  jwt.verify(token, process.env.JWT_SECRET_KEY, async function (err, decoded) {
    // bar
    if (err) {
      return res.status(401).json({ msg: " authorization denied" });
    }
    // Add user from payload to request object
    const user = await User.findOne({ email: decoded.email });
    console.log(decoded, "decode");
    req.user = user;
    console.log(user, "decode user");
    next();
  });
};

module.exports = verifiToken;
