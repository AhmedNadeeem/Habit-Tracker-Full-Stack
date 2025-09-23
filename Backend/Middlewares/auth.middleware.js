const { verifyRefreshToken } = require("../Utils/jwt.utils");

const authMiddleware = (req, res, next) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ message: "No refresh token" });

  try {
    const data = verifyRefreshToken(token);
    req.user = data;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token", details: error });
  }
};

module.exports = authMiddleware;