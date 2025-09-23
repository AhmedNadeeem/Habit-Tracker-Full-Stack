const { Router } = require("express")
const { registerUser, loginUser, refreshToken, logout } = require("../Controllers/user.controllers");
const authMiddleware = require("../Middlewares/auth.middleware.js")

const userRouter = Router()

userRouter.post("/register", registerUser);

userRouter.post("/login", loginUser);

userRouter.post("/logout", authMiddleware, refreshToken);

userRouter.post("/refresh", authMiddleware, refreshToken);

module.exports = userRouter;