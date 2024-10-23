import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const postsSlice = createSlice({
  name: "userPosts",
  initialState: {
    posts: [],
  } as {
    posts: any[];
  },
  reducers: {
    addPost: (state, action) => {
      state.posts?.push(action.payload);
    },
  },
});

export const {
  addPost
} = postsSlice.actions;

export default postsSlice.reducer;

// const selectMetzagesList = (state: RootState) => {
//   return state.socketReducer.metzages;
// };

// const selectCurrentUser = (state: RootState) =>
//   state.socketReducer.currentUserID;

// const selectMetzages = createSelector(
//   [selectMetzagesList, selectCurrentUser],
//   (list: any, to: any) => list?.filter((v: any) => v?.for === to)
// );
// export { selectMetzages };
