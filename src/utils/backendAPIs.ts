const API_URLS = {
    TEST: {
      HEALTH: '/test/health',
    },
    AUTH: {
      LOGIN: '/v2/auth/user/login',
      LOGOUT: '/auth/logout',
      REGISTER: '/v2/auth/user/register',
    },
  } as const;
  
  export default API_URLS;
  