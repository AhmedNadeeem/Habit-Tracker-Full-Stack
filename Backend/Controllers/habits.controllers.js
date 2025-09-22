const { validateHabit } = require("../Auth/habit.auth");
const Habit = require("../models/habit.model")

const createHabit = async (req,res)=> {
    const { values, errors } = await validateHabit(req.body);
    if (errors) {
        console.error(errors)
        return res.status(400),json({ message: "Bad credentials.", details: errors});
    }
    console.log(values);
    const { userId, title, frequency } = values;
    console.log(`Id: ${userId}, Title: ${title}, Freq: ${frequency}`);
    try {
        const newHabit = await Habit.create({
            userId, title, frequency
        });
        return res.status(201).json({ message: "Habit created!", habit: newHabit })
    } catch (error) {
        return res.status(500).json({ message: "Failed to create habit.", details: error})
    }
}

const getAllHabits = async (req,res)=> {
    const userId = req.params.uId;
    if(!userId) return res.status(400).jsaon({ message: "Bad credentials. User Id is required!" })
    try {
        const allHabits = await Habit.find({ userId: userId });
        console.log(allHabits);
        return res.status(200).json({ message: "Got all habits!", habits: allHabits })
    } catch (error) {
        return res.status(500).json({ message : "Failed to get habits.", details: error })
    }
}

const getSingleHabit = async (req,res)=> {
    const habitId = req.params.hId;
    try {
        const habit = await Habit.findById(habitId);
        if (!habit) return res.status(400).json({ message: "Bad credentials. Habit Id is required." });
        return res.status(200).json({ message: "Habit found!", habit: habit })
    } catch (error) {
        return res.status(500).json({ message: "Failed to get habit.", details: error })
    }
}

const updateHabit = async (req,res)=> {
    const { _id, title, frequency } = req.body;
    try {
        const updateHabit = await Habit.findByIdAndUpdate(
            _id,
            { title: title, frequency: frequency },
            { new: true }
        );
        if(!updateHabit) return res.status(400).json({ message: "Bad credentials. Wrong habit id." });
        return res.status(200).json({ message: "Habit updated!", habit: updateHabit });
    } catch (error) {
        return res.status(500).json({ message: "Failed to update habit.", details: error });
    }
}

const deleteHabit = (req,res)=> {}

const markHabitDone = (req,res)=> {}

const getHabitHistory = (req,res)=> {}

module.exports = { createHabit, getAllHabits, getSingleHabit, updateHabit, deleteHabit, markHabitDone, getHabitHistory }