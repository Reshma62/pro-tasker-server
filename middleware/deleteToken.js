const deleteTokenCookie = (res) => {
  // Clear the token cookie
  res.clearCookie("token", {
    maxAge: 0,
    secure: true,
    sameSite: "none",
  });
};

module.exports = deleteTokenCookie;
