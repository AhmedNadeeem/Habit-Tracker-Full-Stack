import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    name: "Ahmed"
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      const { user, accessToken, refreshToken } = action.payload;
      state.user = { user, accessToken, refreshToken};
      console.log("User saved", state.user);
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
