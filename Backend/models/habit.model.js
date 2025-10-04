const { Schema, model } = require("mongoose")

const habitSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    title: {
        type: String,
        trim: true,
        required: true,
    },
    description:{
        type: String,
        trim: true,
        required: true,
    },
    frequency: {
        type: String,
        enum: ["daily", "weekly", "monthly"],
        required: true
    },
    icon: {
        type: String,
        enum: ["idea","work","study","art","entertainment","finance","health","home","meditation","social","sports"],
        required: true,
    },
},
{
    timestamps: true
})

module.exports = model("Habit", habitSchema)