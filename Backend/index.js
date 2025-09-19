const express = require("express")
const habitRouter = require("./Routes/habit.routes")
const userRouter = require("./Routes/user.routes")
const mongoose = require('mongoose');
const dotenv = require("dotenv")

dotenv.config()

mongoose.connect(process.env.MONGO_URL)
.then (() => console.log("Connected to mongoDB!"))
.catch((err) => console.error(`Failed to connect to mongoDB. Error details: ${err}`));

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/v1/auth/", userRouter)
app.use("/api/v1/habits/", habitRouter)


app.listen(8000, console.log("App is listening to port 8000."))