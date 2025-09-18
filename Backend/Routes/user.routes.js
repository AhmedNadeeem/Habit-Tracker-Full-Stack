const { Router } = require("express")
const { registerUser, loginUser, logoutUser, getUserInfo } = require("../Controllers/user.controllers")

const userRouter = Router()

userRouter.post("/register", registerUser)

userRouter.post("/login", loginUser)

userRouter.post("/logout", logoutUser)

userRouter.get("/me", getUserInfo)

module.exports = userRouter