const express = require("express")
const habitRouter = require("./Routes/habit.routes")
const userRouter = require("./Routes/user.routes")

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/v1/auth/", userRouter)
app.use("/api/v1/habits/", habitRouter)


app.listen(8000, console.log("App is listening to port 8000."))