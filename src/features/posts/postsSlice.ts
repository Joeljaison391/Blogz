/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosConfig";
import API_URLS from "../../utils/backendAPIs";

interface Author {
  username: string;
}

export interface Post {
  postId: number;
  title: string;
  content: string;
  author: Author;
  imageUrl?: string | null;
  publishAt: string;
  status: string;
}

interface PostsState {
  posts: Post[];
  post: Post | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  page: number;
  hasMore: boolean;
}

const initialState: PostsState = {
  posts: [],
  post: null,
  status: "idle",
  error: null,
  page: 1,
  hasMore: true,
};

export const fetchPostById = createAsyncThunk(
  "posts/fetchPostById",
  async (postId: number, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(API_URLS.POSTS.GET_POST(postId));
      return response.data.post;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchAllPosts = createAsyncThunk(
  "posts/fetchAllPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(API_URLS.POSTS.GET_ALL_POSTS(1));
      return response.data.posts;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const searchPosts = createAsyncThunk(
  "posts/searchPosts",
  async (filter: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(API_URLS.POSTS.SEARCH_POST(filter));
      return response.data.posts;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchPostsByPage = createAsyncThunk(
  "posts/fetchPostsByPage",
  async (page: number, { rejectWithValue }) => {
    try {
      console.log("fetching posts by page " + page);
      const response = await axiosInstance.get(API_URLS.POSTS.GET_ALL_POSTS(page));
      return response.data.posts;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const resetPosts = createAsyncThunk("posts/resetPosts", async () => {
  return [];
});

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.post = action.payload;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(fetchAllPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(searchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(searchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(fetchPostsByPage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPostsByPage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = [...state.posts, ...action.payload];
      })
      .addCase(fetchPostsByPage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(resetPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(resetPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default postsSlice.reducer;
