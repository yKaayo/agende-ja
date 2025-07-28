import { createSlice } from "@reduxjs/toolkit";

const scheduleSlice = createSlice({
  name: "schedule",
  initialState: [],
  reducers: {
    setSchedules: (_, { payload }) => {
      return payload;
    },
  },
});

export const { setSchedules } = scheduleSlice.actions;
export default scheduleSlice.reducer;
