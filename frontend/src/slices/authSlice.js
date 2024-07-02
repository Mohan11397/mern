import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: document?.cookie && document?.cookie === "cache-x=true",
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    authLoggedIn: (state) => {
      state.isLoggedIn = true;
    },
    authLoggedout: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const { authLoggedIn, authLoggedout } = authSlice.actions;
export default authSlice.reducer;
