import { createSlice } from "@reduxjs/toolkit";
import {getPosts} from "../modules/HandlePost";


// async function loadPosts() {
//   console.log('loadPosts');
//   try {
//     const posts = await getPosts();
//     // console.log(posts);
//     return posts
//   } catch (error) {
//     console.error(error);
//   }
// }

export const loadPostsSlice = createSlice({
  name: "loadPosts",
  initialState: {
    value: [],
  },
  reducers: {
    setPosts: (state, action) => {
      state.value = [...state.value, action.payload];
    },
  },
});

export const { setPosts } = loadPostsSlice.actions;
export default loadPostsSlice.reducer;
