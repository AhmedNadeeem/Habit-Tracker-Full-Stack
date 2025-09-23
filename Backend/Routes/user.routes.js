const { Router } = require("express")
const { registerUser, loginUser, refreshToken, logout } = require("../Controllers/user.controllers")

const userRouter = Router()

userRouter.post("/register", registerUser);

userRouter.post("/login", loginUser);

userRouter.post("/logout", refreshToken);

userRouter.post("/refresh", refreshToken);

module.exports = userRouter;