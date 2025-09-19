const { Router } = require("express")
const { createHabit, getAllHabits, getSingleHabit, updateHabit, deleteHabit, markHabitDone, getHabitHistory } = require("../Controllers/habits.controllers")

const habitRouter = Router()

// Basic Habits routes
habitRouter.post("/", createHabit)

habitRouter.get("/", getAllHabits)

habitRouter.get("/:id", getSingleHabit)

habitRouter.put("/:id", updateHabit)

habitRouter.delete("/:id", deleteHabit)

// Habits Tracking routes
habitRouter.post("/:id/track", markHabitDone)

habitRouter.get("/:id/history", getHabitHistory)

module.exports = habitRouter;