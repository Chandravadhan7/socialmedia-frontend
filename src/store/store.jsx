// filepath: c:\Users\Chandra Vadhan Manga\javascript\social-media\src\store\index.js
import { configureStore } from "@reduxjs/toolkit";
import likesReducer from '../store/slices/likesSlices';

const store = configureStore({
  reducer: {
    likes: likesReducer,
    // ...other reducers...
  },
});

export default store;
