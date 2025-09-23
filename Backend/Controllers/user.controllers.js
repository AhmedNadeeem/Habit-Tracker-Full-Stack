const {
  validateUserRegister,
  validateUserLogin,
} = require("../Auth/user.auth");
const User = require("../models/user.model");
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
      const user = await User.findOne({ email: email });
      if (!user || !await user.comparePassword(password))
        return res.status(400).josn({ message: "Incorrect password!" });

      const accessToken = generateAccessToken( user._id, user.username, user.email );
      const refreshToken = generateRefreshToken( user._id );

      user.refreshToken = refreshToken;
      await user.save();

      res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      });
      res.status(200).json({ message: "User logged in!", accessToken: accessToken });
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: "Incorrect email. User not found!" });
    }
  }
};

const refreshToken = async(req,res)=>{
  try {
    const userData = req.user;
    const user = await User.findById(userData.usreId);

    if(!user || user.refreshToken !== token) {
      return res.status(401).json({ message: "Invalid refresh token!" });
    }
    
    const accessToken = generateAccessToken({
      userId: user._id,
      username: user.username,
      email: user.email,
    });
    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    user.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
    });

    return res.status(200).json({ message: "Access token generated", accessToken: accessToken });
  } catch (error) {
    return res.status(500).status({ message: "Failed to refresh token", details: error });
  }
};

const logout = async(req,res)=>{
  try {
    const userData = req.user;
    const user = await User.findById(userData.userId);

    if(user){
      user.refreshToken = null;
      await user.save();
    }

    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Logged out" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to logout", details: error});
  }
}

module.exports = { registerUser, loginUser, refreshToken, logout };
