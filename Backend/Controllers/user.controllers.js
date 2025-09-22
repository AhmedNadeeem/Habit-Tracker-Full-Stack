const {
  validateUserRegister,
  validateUserLogin,
} = require("../Auth/user.auth");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken } = require("../Utils/jwt.utils");

const registerUser = async (req, res) => {
  const { values, errors } = await validateUserRegister(req.body);
  if (errors) {
    console.log(errors);
    return res.status(400).json({ error: "Bad credentials!", details: errors });
  } else {
    const { username, email, password } = values;
    console.log(`name: ${username}, email: ${email}, pass: ${password}`);
    try {
      await User.create({
        username: username,
        email: email,
        password: password,
      });
      res.status(201).json({ message: "User registered!" });
    } catch (tryErr) {
      res
        .status(500)
        .json({ error: "Failed to register user!", details: tryErr });
    }
  }
};

const loginUser = async (req, res) => {
  const { values, errors } = await validateUserLogin(req.body);
  if (errors) {
    console.log(errors);
    return res.status(400).json({ error: "Bad credentials!", details: errors });
  } else {
    const { email, password } = values;
    try {
      const user = await User.find({ email: email });
      const passCheck = await user.comparePassword(password);
      if (!passCheck)
        return res.status(400).josn({ message: "Incorrect password!" });
      const accessToken = generateAccessToken( user._id, user.username, user.email );
      const refreshToken = generateRefreshToken( user._id );
      user.refreshToken = refreshToken;
      await user.save();
      res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      });
      res.status(200).json({ message: "User logged in!", token: accessToken });
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: "Incorrect email. User not found!" });
    }
  }
};

module.exports = { registerUser, loginUser };
