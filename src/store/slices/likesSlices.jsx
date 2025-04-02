import { createSlice } from "@reduxjs/toolkit";

const likesSlice = createSlice({
  name: "likes",
  initialState: {
    likes: [],
  },
  reducers: {
    setLikes(state, action) {
      state.likes = action.payload;
    },
  },
});

export const { setLikes } = likesSlice.actions;
export default likesSlice.reducer;
