export const API_ENDPOINTS = {
  AUTH: {
    REQUEST_OTP: '/auth/otp',
    AUTHENTICATE: '/auth/authenticate',
    REFRESH_TOKEN: '/auth/refresh',
    LOGOUT: '/auth/logout',
  },

  USERS: {
    PROFILE: '/users/profile',
    PROFILE_PHOTO: '/users/profile/photo',
    PROFILE_ADDRESS: '/users/profile/address',

    PREFERENCES_EXIST: '/users/preference/exists',
    PREFERENCES: '/users/preference',

    BLOCK: '/users/block',
    UNBLOCK: '/users/unblock',
    BOOKMARKS: '/users/bookmarks',
  },

  POSTINGS: {
    CREATE: '/postings',
    LISTS: '/postings/lists',
    UPDATE: (id: string) => `/postings/${id}`,
    CLOSE: (id: string) => `/postings/${id}/close`,
    IMAGES: '/postings/images',
    GET: (id: string) => `/postings/${id}`,
    USER_POSTING: '/postings/user-posting',
  },

  LOCATIONS: {
    PROVINCES: '/locations/provinces',
    NEIGHBORHOODS_SEARCH: '/locations/neighborhoods/search',
    NEIGHBORHOODS: (districtId: number) =>
      `/locations/districts/${districtId}/neighborhoods`,
    DISTRICTS: (provinceId: number) =>
      `/locations/provinces/${provinceId}/districts`,
  },

  SWIPES: {
    SWIPE: '/swipes',
  },

  MATCHES: {
    LIST: '/matches',
    UNMATCH: (id: string) => `/matches/${id}`,
  },

  FEED: {
    GET: '/feeds',
  },

  MESSAGING: {
    CONVERSATIONS: '/messaging/conversations',
  },
} as const;
