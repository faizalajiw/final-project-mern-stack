import { createSlice } from '@reduxjs/toolkit'
import apiSlice from '../api/apiSlice';

const initialState = [];

export const postSlice = createSlice({
  name: 'post',
  initialState,
  extraReducers: builder => {
    builder.addMatcher(apiSlice.endpoints.getAllPosts.matchFulfilled, (state, {payload}) => {
       return payload;
    })
  }
});

export default postSlice.reducer