/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosConfig";
import API_URLS from "../../utils/backendAPIs";
import { Post, CreatePostResponse, ApiError } from "../../utils/types";

interface CreatePostState {
  post: Post | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CreatePostState = {
  post: null,
  status: "idle",
  error: null,
};

export const createPost = createAsyncThunk<
  Post,
  Post,
  {
    rejectValue: string;
  }
>(
  "posts/createPost",
  async (post: Post, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<CreatePostResponse>(
        API_URLS.POSTS.CREATE_POST(),
        post
      );
      return response.data.post;
    } catch (error) {
      const apiError = error as ApiError;
      return rejectWithValue(
        apiError.message || 'An error occurred while creating the post'
      );
    }
  }
);

const createPostSlice = createSlice({
  name: "createpost",
  initialState,
  reducers: {
    resetPost: (_state) => {
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.status = "succeeded";
        state.post = action.payload;
        state.error = null;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? 'An error occurred';
      });
  },
});

export const { resetPost } = createPostSlice.actions;
export default createPostSlice.reducer;