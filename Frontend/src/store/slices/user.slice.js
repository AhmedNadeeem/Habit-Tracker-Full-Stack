import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, actions) => {
      const { user, token } = actions.payload;
      state = { user: { ...user }, token: token };
      return true;
    },
    logout: (state) => {
      state = {};
      return true;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
