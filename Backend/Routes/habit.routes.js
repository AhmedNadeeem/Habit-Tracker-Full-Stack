const { Router } = require("express");
const { createHabit, getAllHabits, getSingleHabit, updateHabit, deleteHabit, markHabitDone, getHabitHistory } = require("../Controllers/habits.controllers");

const habitRouter = Router();

// Basic Habits routes
habitRouter.post("/create", createHabit);

habitRouter.get("/all/:uId", getAllHabits);

habitRouter.get("/habit/:hId", getSingleHabit);

habitRouter.put("/update", updateHabit);

habitRouter.delete("/delete/:hId", deleteHabit);

// Habits Tracking routes
// Get habits today status
// habitRouter.get("/status/:date", getHabitStatus);

habitRouter.post("/mark/:hId", markHabitDone);

habitRouter.get("/history/:hId", getHabitHistory);

module.exports = habitRouter;