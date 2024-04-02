const jwt = require("jsonwebtoken");

const TokenGenerate = (user, res) => {
  const data = { email: user.email, id: user._id };
  const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds
  const currentTime = Date.now(); // Current time in milliseconds
  const expirationTime = currentTime + oneDay; // Expiration time is current time plus one day

  const token = jwt.sign(data, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });

  // Set the cookie with a maximum age of one day and SameSite attribute
  res.cookie("token", token, {
    maxAge: oneDay, // maxAge should be in milliseconds relative to
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
};
module.exports = TokenGenerate;
