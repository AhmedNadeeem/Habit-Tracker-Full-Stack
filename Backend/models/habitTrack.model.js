const { Schema, model } = require("mongoose")

const habitTrackSchema = new Schema({
    habitId: {
        type: Schema.Types.ObjectId,
        ref: "habit",
        required: true,
    },
    date: {
        type: Date,
        requierd: true,
    },
    status: {
        type: Boolean,
        default: false
    }
})

module.exports = model("habitTrack", habitTrackSchema)