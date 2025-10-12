const { Router } = require("express");
const { createHabit, getAllHabits, getSingleHabit, updateHabit, deleteHabit, markHabitDone, getHabitHistory, getTodaysStatus, getTodayProgress, getWeekProgress } = require("../Controllers/habits.controllers");

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

habitRouter.post("/today/stat", getTodaysStatus);

habitRouter.post("/progress/today", getTodayProgress)

habitRouter.post("/mark/:hId", markHabitDone);

habitRouter.post("/progress/week", getWeekProgress)

habitRouter.get("/history/:hId", getHabitHistory);

module.exports = habitRouter;