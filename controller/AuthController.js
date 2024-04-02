const bcrypt = require("bcryptjs");

const User = require("../models/user.model");
const TokenGenerate = require("../utils/tokenGenarate");
const deleteToken = require("../middleware/deleteToken");
// sign up
exports.RegisterController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Check if username is missing
    if (!name) {
      return res.status(400).json({ error: "Username is required" });
    }

    // Check if email is missing
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Check if password is missing
    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }

    // Check if the user already exists
    let user = await User.findOne({
      email,
    });

    if (user) {
      return res.json({
        error: "User  already exists",
      });
    }

    const hash = await bcrypt.hash(password, 10);

    // Create a new user instance
    user = new User({
      name,
      email,
      password: hash,
    });

    // Save the user to the database
    await user.save();

    // Send user data in response
    res.status(200).send({
      data: {
        name: user.name,
        userId: user._id,
      },
      message: "User registered successfully",
      status: "success",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
// login
exports.LoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if email is missing
    if (!email) {
      return res.json({ error: "Email Number is required" });
    }

    // Check if password is missing
    if (!password) {
      return res.json({ error: "Password is required" });
    }
    // Check if the user already exists
    let user = await User.findOne({
      email,
    });

    if (!user) {
      return res.json({ error: "User not found" });
    }
    const comparePassword = await bcrypt.compare(password, user.password);

    if (comparePassword) {
      // genarate token
      TokenGenerate(user, res);
      // Send user data in response
      return res.status(200).send({
        data: {
          name: user.name,
          email: user.email,
          _id: user._id,
        },
        message: "User Login  successfully",
        status: "success",
      });
    } else {
      // Password does not match
      return res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
// get auth user
exports.GetAuthUserController = async (req, res) => {
  try {
    const userId = req?.user.id;

    const { id } = req?.query;
    console.log(id);
    if (userId === id) {
      const user = await User.findOne({ _id: id });
      return res.status(200).send({
        user,
        message: "Auth users data",
        status: "success",
      });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error:" + error.message);
  }
};
// logout

exports.LogOutController = async (req, res) => {
  try {
    deleteToken(res);
    res.status(200).json({
      status: "success",
      message: "User logout",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message || "Internal server error",
    });
  }
};
// create tokem
exports.CreateTokenController = async (req, res) => {
  try {
    const user= req.body
   TokenGenerate(user, res)

    res.status(200).json({
      status: 'success',
      message: 'ServiceName',
      data: ServiceName
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error: error.message || 'Internal server error'
    });
  }
};