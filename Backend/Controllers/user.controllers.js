const {
  validateUserRegister,
  validateUserLogin,
} = require("../Auth/user.auth");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  const { values, errors } = await validateUserRegister(req.body);
  if (errors) {
    console.log(errors);
    return res.status(400).json({ error: "Bad credentials!", details: errors });
  } else {
    const { username, email, password } = values;
    console.log(`name: ${username}, email: ${email}, pass: ${password}`);
    const saltValue = parseInt(process.env.SALT_ROUNDS);
    const hashPass = await bcrypt.hash(values.password, saltValue);
    console.log("Hashed pass: ", hashPass);
    try {
      const newUser = await User.create({
        username: username,
        email: email,
        password: hashPass,
      });
      res.status(201).json({ message: "User registered!" });
    } catch (tryErr) {
      res
        .status(500)
        .json({ error: "Failed to register user!", details: tryErr });
    }

    // console.log("values: ", values)
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
      const passCheck = bcrypt.compare(password, user.password);
      if (!passCheck)
        return res.status(400).josn({ message: "Incorrect password!" });
      const token = jwt.sign(
        {
          id: user._id,
          name: user.username,
          email: user.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: ACCESS_EXPIRES,
        }
      );
      res.status(200).json({ message: "User logged in!", token: token });
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: "Incorrect email. User not found!" });
    }
  }
};

module.exports = { registerUser, loginUser };
