const { validateHabit } = require("../Auth/habit.auth");
const Habit = require("../models/habit.model")
const HabitTrack = require("../models/habitTrack.model")

const createHabit = async (req,res)=> {
    const { values, errors } = await validateHabit(req.body);
    if (errors) {
        console.error(errors)
        return res.status(400).json({ message: "Bad credentials.", details: errors});
    }
    console.log(values);
    const { userId, title, frequency, icon, description } = values;
    console.log(`Id: ${userId}, Title: ${title}, description: ${description}, Freq: ${frequency}, icon: ${icon}`);
    try {
        const newHabit = await Habit.create({
            userId, title, description, frequency, icon
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
    const { habitId, title, description, frequency, icon } = req.body;
    try {
        const updateHabit = await Habit.findByIdAndUpdate(
            habitId,
            { 
                title: title, 
                description: description,
                frequency: frequency,
                icon: icon
            },
            { new: true }
        );
        if(!updateHabit) return res.status(400).json({ message: "Bad credentials. Wrong habit id." });
        return res.status(200).json({ message: "Habit updated!", habit: updateHabit });
    } catch (error) {
        return res.status(500).json({ message: "Failed to update habit.", details: error });
    }
}

const deleteHabit = async(req,res)=> {
    try {
        const habitId = req.params.hId;
        if(!habitId) return res.status(401).json({ message: "Habit id is required" })

        const deletedHabit = await Habit.findByIdAndDelete(habitId);
        return res.status(200).json({ message: "Habit deleted", habit: deletedHabit })
    } catch (error) {
        return res.status(500).json({ message: "Failed to delete habit", details: error })
    }
}

const markHabitDone = async (req,res) => {
    try {
        const habitId = req.params.hId;
        if(!habitId) return res.status(401).json({ message: "Habit id required" });

        const { date, status } = req.body;
        if(!date || !status) return res.status(401).json({ message: "Date and status required" });

        const habitTrackPrev = await HabitTrack.findOne({ habitId: habitId, date: date });
        if(habitTrackPrev){
            habitTrackPrev.status = status,
            habitTrackPrev.save();

            return res.status(200).json({ message: "Habit status changed", updatedHabit: habitTrackPrev })
        } else {
            const newHabitTrack = await HabitTrack.create({
                habitId: habitId,
                date: date,
                status: status,
            });
            return res.status(201).json({ message: "Habit track marked", habitTrack: newHabitTrack })
        }

    } catch (error) {
        return res.status(500).json({ message: "Failed to mark habit", details: error })
    }
}

const getHabitHistory = async (req,res)=> {
    try {
        const habitId = req.params.hId;
        if(!habitId) return res.status(400).json({ message: "Habit id required" });

        const habitHistory = await HabitTrack.find({ habitId: habitId });
        if(!habitHistory) return res.status(400).json({ message: "Incorrect habit id" });

        return res.status(200).json({ message: "Habit history found", habitHistory: habitHistory })
    } catch (error) {
        return res.status(500).json({ message: "Failed to get habit history", details: error })
    }
}

module.exports = { createHabit, getAllHabits, getSingleHabit, updateHabit, deleteHabit, markHabitDone, getHabitHistory }