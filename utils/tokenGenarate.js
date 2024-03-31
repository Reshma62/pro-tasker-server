const jwt = require("jsonwebtoken");

const TokenGenerate = (user, res) => {
  const data = { email: user.email, id: user._id };
  const oneDay = 24 * 60 * 60 * 1000;
  const token = jwt.sign(data, process.env.JWT_SECRET_KEY, {
    expiresIn: oneDay,
  });

  // Set the cookie with a maximum age of one day and SameSite attribute
  res.cookie("token", token, {
    maxAge: oneDay,
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "Strict" : "none",
  });
};
module.exports = TokenGenerate;
