import { createSlice } from "@reduxjs/toolkit";

let habitsData = null;
if (typeof window !== "undefined") {
  try {
    const raw = localStorage.getItem("habitsData");
    habitsData = raw ? JSON.parse(raw) : null;
  } catch {
    habitsData = null;
  }
}

const initialState = {
  value: habitsData ?? { habits: 0, completed: 0 },
};

export const habitSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {
    setHabitsLength: (state, actions) => {
      const habitsLength = actions.payload;
      state.value = {
        ...state.value,
        habits: habitsLength,
      }
      localStorage.setItem("habitsData", JSON.stringify(state.value));
    },
    completeHabit: (state) => {
      if(!state.value) state.value = {habits: 0, completed: 0};
      state.value.completed = (state.value.completed || 0) + 1;
      localStorage.setItem("habitsData", JSON.stringify(state.value));
    },
    uncompleteHabits: (state) => {
      if(!state.value) state.value = { habits: 0, completed: 0 };
      if(state.value.completed > 0) {
        state.value.completed = (state.value.completed) - 1
      }
      localStorage.setItem("habitsData", JSON.stringify(state.value));
    }
  },
});

export const { setHabitsLength, completeHabit, uncompleteHabits } =
  habitSlice.actions;

export default habitSlice.reducer;
