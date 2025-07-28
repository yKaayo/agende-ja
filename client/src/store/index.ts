import { configureStore } from "@reduxjs/toolkit";

// Slices
import userSlice from "./slices/userSlice";
import scheduleSlice from "./slices/scheduleSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    schedules: scheduleSlice,
  },
});

export default store;
