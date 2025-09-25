import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user.slice";
import habitReducer from "./slices/habits.slice";
import trackHabitReducer from "./slices/trackHabits.slice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        habit: habitReducer,
        trackHabit: trackHabitReducer,
    }
})

