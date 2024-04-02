const express = require("express");
const {
  RegisterController,
  LoginController,
  GetAuthUserController,
  LogOutController,
  CreateTokenController,
} = require("../../controller/AuthController");
const verifiToken = require("../../middleware/verifiToken");

const _ = express.Router();
_.get("/getAuthUser", verifiToken, GetAuthUserController);
_.post("/signup", RegisterController);
_.post("/login", LoginController);
_.post("/logout", LogOutController);
_.post("/createToken", CreateTokenController);



module.exports = _;
