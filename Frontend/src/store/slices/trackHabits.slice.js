import { createSlice } from "@reduxjs/toolkit";
import normalizeToDay from "../../utils/dateNormalize.util";

const initialState = {
  value: [],
};

export const trackHabitSlice = createSlice({
  name: "trackHabits",
  initialState,
  reducers: {
    changeStatus: (state, actions) => {
      const { filterHabitId, date, status } = actions.payload;
      const normalDate = normalizeToDay(date);
      let filterHabit = state.filter(
        (habit) =>
          habit.habitId == filterHabitId && normalDate == normalDate(habit.date)
      );
      if (filterHabit) {
        filterHabit.status = status;
      } else {
        filterHabit = {
          habitId: filterHabitId,
          date: date,
          status: status,
        };
      }
      const otherHabits = state.filter(
        (habit) =>
          habit.habitId != filterHabitId && normalDate != normalDate(habit.date)
      );
      otherHabits.push(filterHabit);
    },
  },
});

export const { changeStatus } = trackHabitSlice.actions;

export default trackHabitSlice.reducer;
