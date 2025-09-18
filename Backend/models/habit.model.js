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
    frequency: {
        type: String,
        enum: ["daily", "weekly", "monthly"],
        required: true
    },
},
{
    timestamps: true
})

module.exports = model("Habit", habitSchema)