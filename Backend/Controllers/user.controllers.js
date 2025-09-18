const validateUser = require("../Auth/user.auth")

const registerUser = async (req,res)=> {
    const { values, errors } = await validateUser(req.body)
    if(errors) {
        console.log(errors)
    } else {
    console.log(values)
    }
    res.send("geristerUser")
}

const loginUser = (req,res)=> {}

const logoutUser = (req,res)=> {}

const getUserInfo = (req,res)=> {}


module.exports = { registerUser, loginUser, logoutUser, getUserInfo }