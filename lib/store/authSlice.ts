import { createSlice } from "@reduxjs/toolkit";

export type AuthState = {
  isLoggedIn: boolean;
  loading: boolean;
};

const initialState: AuthState = {
  isLoggedIn: false,
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loggedIn(state) {
      state.isLoggedIn = true;
    },
    loggedOut(state) {
      state.isLoggedIn = false;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { loggedIn, loggedOut, setLoading } = authSlice.actions;
export default authSlice.reducer;
