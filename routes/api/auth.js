const express = require("express");
const {
  RegisterController,
  LoginController,
  GetAuthUserController,
} = require("../../controller/AuthController");
const verifiToken = require("../../middleware/verifiToken");

const _ = express.Router();
_.get("/getAuthUser", verifiToken, GetAuthUserController);
_.post("/signup", RegisterController);
_.post("/login", LoginController);
_.post("/logout", LoginController);



module.exports = _;
