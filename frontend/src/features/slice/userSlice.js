import { createSlice } from "@reduxjs/toolkit";
import apiSlice from "../api/apiSlice";

const initialState = {};

export const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addMatcher(
      apiSlice.endpoints.signupUser.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
      }
    );

    builder.addMatcher(
      apiSlice.endpoints.loginUser.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
      }
    );

    // builder.addMatcher(apiSlice.endpoints.logout.matchFulfilled, (state) => {
    //   delete state.user;
    //   delete state.token;
    // });
  },
});

export default userSlice.reducer;
