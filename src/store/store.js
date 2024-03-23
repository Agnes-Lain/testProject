import { configureStore } from "@reduxjs/toolkit";
// import loadPostsSlice from "./loadPostsSlice";
import { setupListeners } from '@reduxjs/toolkit/query'
import { postsApi } from '../services/postsApi'

const store = configureStore({
  reducer: {
    // loadPosts: loadPostsSlice,
    [postsApi.reducerPath]:postsApi.reducer,
   },
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApi.middleware),
});

setupListeners(store.dispatch)

export default store;
