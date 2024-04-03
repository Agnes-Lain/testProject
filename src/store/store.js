import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query'
import { postsApi } from '../services/postsApi'
import authReducer from "./authSlice";
// import { authApi } from "../services/authAPI";


export const store = configureStore({
  reducer: {
    authStatus: authReducer,
    [postsApi.reducerPath]:postsApi.reducer,
   },
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApi.middleware),
});

setupListeners(store.dispatch)
