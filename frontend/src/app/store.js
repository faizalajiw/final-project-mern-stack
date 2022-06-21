import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/slice/userSlice";
import postSlice from "../features/slice/postSlice";
import apiSlice from "../features/api/apiSlice";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

const reducers = combineReducers({
  user: userSlice,
  posts: postSlice,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: [apiSlice.reducerPath],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk, apiSlice.middleware],
});

export default store;
