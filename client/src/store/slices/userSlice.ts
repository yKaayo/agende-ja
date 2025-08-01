import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// API
import { verifyLogged } from "../../services/UserApi";
import { userAgenda } from "../../services/AgendaApi";

export const fetchUserAndAgenda = createAsyncThunk(
  "user/fetchUserAndAgenda",
  async (_, { rejectWithValue }) => {
    try {
      const status = await verifyLogged();
      if (!status.authenticated) return rejectWithValue("Not authenticated");

      const data = await userAgenda(status.user.email);

      const { authenticated, user } = status;

      return {
        id: user._id,
        name: user.name,
        email: user.email,
        authenticated: authenticated,
        data,
      };
    } catch (err) {
      console.error("Erro no fetchUserAndAgenda:", err);
      return rejectWithValue(err.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    id: null,
    name: "",
    email: "",
    authenticated: false,
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.name = "";
      state.email = "";
      state.authenticated = false;
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserAndAgenda.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserAndAgenda.fulfilled, (state, { payload }) => {
        Object.assign(state, payload);
        state.loading = false;
      })
      .addCase(fetchUserAndAgenda.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
