import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosConfig';
import API_URLS from '../../utils/backendAPIs';

// Define the interface for the post author
interface Author {
  username: string;
}

// Define the interface for a single post
export interface Post {
  postId: number;
  title: string;
  content: string;
  author: Author;
  imageUrl?: string | null; // Optional imageUrl
  publishAt: string; // Assuming publishAt is a string date
  status: string; // Assuming status is a string
}

// Define the interface for the posts slice state
interface PostsState {
  posts: Post[];
  post: Post | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Initial state for the posts slice
const initialState: PostsState = {
  posts: [],
  post: null,
  status: 'idle',
  error: null,
};

// Async thunks to fetch post data
export const fetchPostById = createAsyncThunk(
  'posts/fetchPostById',
  async (postId: number) => {
    const response = await axiosInstance.get(API_URLS.POSTS.GET_POST(postId));
    return response.data.post; // Assuming the response structure matches the Post interface
  }
);

export const fetchAllPosts = createAsyncThunk(
  'posts/fetchAllPosts',
  async () => {
    const response = await axiosInstance.get(API_URLS.POSTS.GET_ALL_POSTS);
    console.log(response.data.posts);
    return response.data.posts; // Assuming the response structure matches the Post interface array
  }
);

export const searchPosts = createAsyncThunk(
  'posts/searchPosts',
  async (filter: string) => {
    const response = await axiosInstance.get(API_URLS.POSTS.SEARCH_POST(filter));
    return response.data.posts; // Assuming the response structure matches the Post interface array
  }
);

// Create the posts slice
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.post = action.payload; // Update the single post in state
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch post';
      })
      .addCase(fetchAllPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload; // Update all posts in state
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch posts';
      })
      .addCase(searchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload; // Update posts with search results
      })
      .addCase(searchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to search posts';
      });
  },
});

export default postsSlice.reducer;
