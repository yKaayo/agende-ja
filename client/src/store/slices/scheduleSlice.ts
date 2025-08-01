import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// API
import { getGenerateSchedules } from "../../services/AgendaApi";

// Type
import type { UserData } from "../../types/type";

interface scheduleSlice {
  schedules: UserData[];
  loading: boolean;
  error: string | null;
}

export const getAllAgenda = createAsyncThunk(
  "agenda/getAllAgenda",
  async (_, { rejectWithValue }) => {
    try {
      const schedule = await getGenerateSchedules();
      return schedule;
    } catch (err) {
      console.error("Erro no getAllAgenda:", err);
      return rejectWithValue(err.message);
    }
  }
);

const initialState: scheduleSlice = {
  schedules: [],
  loading: false,
  error: null,
};

const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllAgenda.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllAgenda.fulfilled, (state, { payload }) => {
        state.schedules = payload;
        state.loading = false;
      })
      .addCase(getAllAgenda.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export default scheduleSlice.reducer;
