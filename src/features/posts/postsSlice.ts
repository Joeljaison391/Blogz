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
  async (postId: number) => {
    const response = await axiosInstance.get(API_URLS.POSTS.GET_POST(postId));
    return response.data.post;
  }
);

export const fetchAllPosts = createAsyncThunk(
  "posts/fetchAllPosts",
  async () => {
    const response = await axiosInstance.get(API_URLS.POSTS.GET_ALL_POSTS(1));
    return response.data.posts;
  }
);

export const searchPosts = createAsyncThunk(
  "posts/searchPosts",
  async (filter: string) => {
    const response = await axiosInstance.get(API_URLS.POSTS.SEARCH_POST(filter));
    return response.data.posts;
  }
);

export const fetchPostsByPage = createAsyncThunk(
  "posts/fetchPostsByPage",
  async (page: number) => {
    console.log("fetching posts by page"+page);
    const response = await axiosInstance.get(API_URLS.POSTS.GET_ALL_POSTS(page));
    return response.data.posts;
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
        state.error = action.error.message || "Failed to fetch post";
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
        state.error = action.error.message || "Failed to fetch posts";
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
        state.error = action.error.message || "Failed to search posts";
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
        state.error = action.error.message || "Failed to fetch posts by page";
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
        state.error = action.error.message || "Failed to reset posts";
      });
  },
});

export default postsSlice.reducer;
