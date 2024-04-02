const jwt = require("jsonwebtoken");

const TokenGenerate = (user, res) => {
  const data = { email: user.email, id: user._id };
  const token = jwt.sign(data, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });

  // Set the cookie with a maximum age of one day and SameSite attribute
  res.cookie("token", token, {
    maxAge: 24 * 60 * 60 * 1000, // maxAge should be in milliseconds relative to
    httpOnly: true,
    secure: true,
    sameSite: "none",
    expiresIn: 24 * 60 * 60 * 1000,
  });
};
module.exports = TokenGenerate;
