import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../features/posts/postsSlice';
import createpostReducer from '../features/posts/createpostSlice'

const store = configureStore({
  reducer: {
    posts: postsReducer,
    createpost: createpostReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
