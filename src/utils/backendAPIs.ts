// src/constants/apiUrls.ts

type APIUrls = {
  TEST: {
    HEALTH: string;
  };
  AUTH: {
    LOGIN: string;
    LOGOUT: string;
    REGISTER: string;
  };
  POSTS: {
    GET_POST: (postId: number | string) => string;
    GET_ALL_POSTS: (page: number) => string; // Update the type to accept a page number
    SEARCH_POST: (filter: string) => string;
  };
};

const API_URLS: APIUrls = {
  TEST: {
    HEALTH: '/test/health',
  },
  AUTH: {
    LOGIN: '/auth/user/login',
    LOGOUT: '/auth/logout',
    REGISTER: '/auth/user/register',
  },
  POSTS: {
    GET_POST: (postId) => `/post/user/getPost/${postId}`,
    GET_ALL_POSTS: (page) => `/post/user/getAllPosts?page=${page}`, // Updated URL with page parameter
    SEARCH_POST: (filter) => `/posts/search?filter=${filter}`,
  },
};

export default API_URLS;
