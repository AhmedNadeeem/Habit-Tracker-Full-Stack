const jwt = require("jsonwebtoken");

const generateAccessToken = (userId, username, userEmail) => {
    return jwt.sign({
          id: userId,
          name: username,
          email: userEmail,
        }, 
        process.env.JWT_SECRET, 
        { expiresIn: "1d" });
}

const generateRefreshToken = (userId) => {
    return jwt.sign({ userId }, process.env.REFRESH_JWT_SECRET, { expiresIn: "30d" });
}

const verifyAccessToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}

const verifyRefreshToken = (token) => {
    return jwt.verify(token, process.env.REFRESH_JWT_SECRET);
}


module.exports = { generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken }