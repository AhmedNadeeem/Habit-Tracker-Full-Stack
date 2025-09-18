const { Schema, model } = require("mongoose")

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
},
{
    timestamps: true
})

module.exports = model("User", userSchema)