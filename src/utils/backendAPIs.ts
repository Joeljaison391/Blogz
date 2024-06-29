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
    GET_ALL_POSTS: string;
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
    GET_POST: (postId) => `/posts/getPost/${postId}`,
    GET_ALL_POSTS: '/post/user/getAllPosts',
    SEARCH_POST: (filter) => `/posts/search?filter=${filter}`,
  },
};

export default API_URLS;
