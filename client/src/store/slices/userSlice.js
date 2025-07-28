import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    email: "",
    authenticated: false,
    data: [
      {
        time: "",
        date: "",
      },
    ],
  },

  reducers: {
    setUser: (state, { payload }) => {
      return payload
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
