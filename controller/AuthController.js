const bcrypt = require("bcrypt");

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

    bcrypt.hash(password, 10, async function (err, hash) {
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
      return res.status(400).json({ error: "Email Number is required" });
    }

    // Check if password is missing
    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }
    // Check if the user already exists
    let user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    bcrypt.compare(password, user.password, async function (err, result) {
      if (err) {
        console.log(err.message);
        return res.status(401).send(err.message);
      }

      if (result) {
        // genarate token
        TokenGenerate(user, res);
        // Send user data in response
        return res.status(200).send({
          data: {
            name: user.name,
            email: user.email,
            userId: user._id,
          },
          message: "User Login  successfully",
        });
      } else {
        // Password does not match
        return res.status(401).json({ error: "Invalid credentials" });
      }
    });
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
