import { createSlice } from "@reduxjs/toolkit";

let habitsData = localStorage.getItem("habitsData");

const initialState = {
  value: habitsData ? JSON.parse(habitsData) : {}
};

export const habitSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {
    setHabitsLength: (state, actions) => {
      const habitsLength = actions.payload;
      state.value = {
        habits: habitsLength,
        completed: 0,
      }
      localStorage.setItem("habitsData", JSON.stringify(state.value));
    },
    completeHabit: (state) => {
      state.value = {
        ...state,
        completed: state.completed + 1
      }
      localStorage.setItem("habitsData", JSON.stringify(state.value));
    },
    uncompleteHabit: (state) => {
      state.value = {
        ...state,
        completed: state.completed > 0 ? state.completed - 1 : 0
      }
      localStorage.setItem("habitsData", JSON.stringify(state.value));
    },
  },
});

export const { setHabitsLength, completeHabit, uncompleteHabit } =
  habitSlice.actions;

export default habitSlice.reducer;
