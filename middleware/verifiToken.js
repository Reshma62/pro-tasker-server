const jwt = require("jsonwebtoken");

const TokenGenerate = (user, res) => {
  const data = { email: user.email, id: user._id };
  const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds
  const currentTime = Date.now(); // Current time in milliseconds
  const expirationTime = currentTime + oneDay; // Expiration time is current time plus one day

  const token = jwt.sign(data, process.env.JWT_SECRET_KEY, {
    expiresIn: expirationTime,
  });

  // Set the cookie with a maximum age of one day and SameSite attribute
  res.cookie("token", token, {
    maxAge: expirationTime - currentTime, // maxAge should be in milliseconds relative to the current time
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "Strict" : "None",
    secure: process.env.NODE_ENV === "production", // Set secure flag only in production
  });
};
module.exports = TokenGenerate;
