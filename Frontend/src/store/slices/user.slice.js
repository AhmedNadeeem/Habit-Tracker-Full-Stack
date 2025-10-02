import { createSlice } from "@reduxjs/toolkit";

const userState = localStorage.getItem("userLocal")

const initialState = {
  user: userState ? JSON.parse(userState) : {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      const { user, accessToken, refreshToken } = action.payload;
      state.user = { user, accessToken, refreshToken};
      localStorage.setItem("userLocal", JSON.stringify(state.user))
    },
    logout: (state) => {
      state = {};
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
