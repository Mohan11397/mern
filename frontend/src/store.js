import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./slices/tasksSlice.js";
import authReducer from "./slices/authSlice.js";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    auth: authReducer,
  },
});
