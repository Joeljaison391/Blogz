type APIUrls = {
  TEST: {
    HEALTH: string;
  };
  AUTH: {
    LOGIN: string;
    LOGOUT: string;
    REGISTER: string;
    REQUEST_RESET_PASSWORD: string;
    RESET_PASSWORD: string;
  };
  POSTS: {
    GET_POST: (postId: number | string) => string;
    GET_ALL_POSTS: (page: number) => string; // Update the type to accept a page number
    SEARCH_POST: (filter: string) => string;
    CREATE_POST: () => string;
    GET_POSTAUTHORS_BY_IDS: (authorIds: number[]) => string; 

  };
  PROFILE: {
    GET_PROFILE: string;
    UPDATE_PROFILE: string;
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
    REQUEST_RESET_PASSWORD: '/auth/user/request-password-reset',
    RESET_PASSWORD: '/auth/user/reset-password',
  },
  POSTS: {
    GET_POST: (postId) => `/post/user/getPost/${postId}`,
    GET_ALL_POSTS: (page) => `/post/user/getAllPosts?page=${page}`, // Updated URL with page parameter
    SEARCH_POST: (filter) => `/posts/search?filter=${filter}`,
    CREATE_POST: () => '/post/user/createPost',
    GET_POSTAUTHORS_BY_IDS: (authorIds: number[]) => {
      const authorIdsStr = authorIds.join(','); // Convert the array of numbers to a comma-separated string
      return `/post/user/getPostAuthorsByIds?authorIds=${authorIdsStr}`;
    }

  },
  PROFILE: {
    GET_PROFILE: '/auth/user/get-authenticated-user',
    UPDATE_PROFILE: '/user/update-profile',
  }
};

export default API_URLS;
