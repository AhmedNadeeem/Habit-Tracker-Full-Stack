import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const habitSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {
    setHabits: (state, actions) => {
      const allHabits = actions.payload;
      const statefulHabits = allHabits.map((habit) => ({
        ...habit,
        status: false,
      }));
      state = [...statefulHabits];
      return true;
    },
    addHabit: (state, actions) => {
      const newHabit = actions.payload;
      const statefullNewHabits = {
        ...newHabit,
        state: false,
      };
      state = state.push(newHabit);
      return true;
    },
    updateHabit: (state, actions) => {
      const updatedHabit = actions.payload;
      const filteredHabits = state.filter(
        (habit) => habit._id != updatedHabit._id
      );
      filteredHabits.push(updatedHabit);
      state = [...filteredHabits];
      return true;
    },
    deleteHabit: (state, actions) => {
      const deleteHabitId = actions.payload;
      const filteredHabits = state.filter(
        (habit) => habit._id != deleteHabitId
      );
      state = [...filteredHabits];
      return true;
    },
  },
});

export const { setHabits, addHabit, updateHabit, deleteHabit } =
  habitSlice.actions;

export default habitSlice.reducer;
