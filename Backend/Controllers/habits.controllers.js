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
        // console.log(allHabits);
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

//-> Stats <-//

const getTodaysStatus = async (req, res) => {
    try {
        const {habitId, userId} = req.body;
        if(!habitId || !userId) return res.status(401).json({ message: "Bad creds! User, and post id required" });

        const habitTodayStat = await HabitTrack.find({ habitId: habitId, userId: userId });
        if(!habitTodayStat) return res.status(401).json({ message: "Habit status not completed!" });

        const habitDate = habitTodayStat?.filter((habit)=> {
            let tempHabitDate = habit.date;
            tempHabitDate = new Date(tempHabitDate);
            let today = new Date();
            if(tempHabitDate.toDateString() === today.toDateString()){
                return true;
            } else {
                return false;
            }
        })
        if(habitDate.length > 0){
            return res.status(200).json({ message: "Habit status found", habitTrack: habitTodayStat })
        } 
        
        return res.status(204).json({ message: "Habit status not found" });
    } catch (error) {
        console.error(error, "\n\n")
        return res.status(500).json({ message: "Failed to get habit stat", details: (error) })
    }
}

const getTodayProgress = async (req, res) => {
    try {
        const {userId} = req.body;
        if(!userId) return res.status(401).json({ message: "Bad creds! User id required" });

        const unfilteredHabits = await HabitTrack.find({ userId: userId });
        if(!unfilteredHabits) return res.status(401).json({ message: "Habit status not completed!" });

        const filteredHabits = unfilteredHabits?.filter((habit)=> {
            let tempHabitDate = habit.date;
            tempHabitDate = new Date(tempHabitDate);
            let today = new Date();
            if(tempHabitDate.toDateString() === today.toDateString()){
                return true;
            } else {
                return false;
            }
        }) 
        
        return res.status(200).json({ message: "Completed habits", completedHabits: filteredHabits.length });
    } catch (error) {
        console.error(error, "\n\n")
        return res.status(500).json({ message: "Failed to get completed habits number", details: (error) })
    }
}

const markHabitDone = async (req,res) => {
    try {
        const hId = req.params.hId;
        if(!hId) return res.status(401).json({ message: "Habit id required" });
        
        const { date, status, userId } = req.body;
        if(!date || !status || !userId) return res.status(401).json({ message: "Date, status, and userId required" });

        const habitTrackPrev = await HabitTrack.findOne({ habitId: hId, userId: userId, date: date });
        if(habitTrackPrev){
            
            habitTrackPrev.status = status,
            habitTrackPrev.save();
            
            return res.status(200).json({ message: "Habit status changed", updatedHabit: habitTrackPrev })
        } else {
            const newHabitTrack = await HabitTrack.create({
                habitId: hId,
                userId: userId,
                date: date,
                status: status,
            });
            console.log(newHabitTrack)
            return res.status(201).json({ message: "Habit track marked", habitTrack: newHabitTrack })
        }

    } catch (error) {
        return res.status(500).json({ message: "Failed to mark habit", details: error })
    }
}

const getWeekProgress = async (req, res) => {
    try {
        const { userId, habitId, weekDates }  = req.body;
        console.log(`User id: ${userId}, week dates: ${weekDates}`)
        if(!userId || !habitId || !weekDates.length > 0) return res.status(400).json({ message: "User, habit id and week dates required" });

        
        const allStats = await HabitTrack.find({ userId, habitId });
        if(!allStats) return res.status(400).json({ message: "Invalid user id" });

        const weekStatsArr = weekDates.map((date) => {
            const found = allStats.find((habit) => {
                return new Date(habit.date).toDateString() === new Date(date).toDateString()
            });
            return found || { date: date, status: false }
        })

        console.log(weekStatsArr);
        
        res.status(200).json({ message: "Weekly stats found!", weeklyStat: weekStatsArr })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Failed to get habit history", details: error })
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

module.exports = { createHabit, getAllHabits, getSingleHabit, updateHabit, deleteHabit, markHabitDone, getHabitHistory, getTodaysStatus, getTodayProgress, getWeekProgress }