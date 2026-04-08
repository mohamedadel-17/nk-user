// API endpoints configuration
export const API_ENDPOINTS = {
  // Authentication endpoints
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    PROFILE: '/auth/profile',
    // Google OAuth endpoints
    GOOGLE: {
      LOGIN: '/auth/google',
      CALLBACK: '/auth/callback',
      ME: '/auth/google/me',
    },
    // OTP endpoints
    OTP: {
      SEND: '/auth/send-otp',
      LOGIN: '/auth/login-otp',
      VERIFY: '/auth/verify-otp',
      RESEND: '/auth/resend-otp',
    },
  },

  // User endpoints
  USERS: {
    LIST: '/users',
    DETAIL: (id: string) => `/users/${id}`,
    CREATE: '/users',
    UPDATE: (id: string) => `/users/${id}`,
    DELETE: (id: string) => `/users/${id}`,
  },

  // Example endpoints - modify according to your API
  POSTS: {
    LIST: '/posts',
    DETAIL: (id: string) => `/posts/${id}`,
    CREATE: '/posts',
    UPDATE: (id: string) => `/posts/${id}`,
    DELETE: (id: string) => `/posts/${id}`,
  },

  // Product endpoints (example)
  PRODUCTS: {
    LIST: '/products',
    DETAIL: (id: string) => `/products/${id}`,
    CREATE: '/products',
    UPDATE: (id: string) => `/products/${id}`,
    DELETE: (id: string) => `/products/${id}`,
    SEARCH: '/products/search',
    BY_CATEGORY: (categoryId: string) => `/products/category/${categoryId}`,
    FEATURED: '/products/featured',
    STOCK_CHECK: (id: string) => `/products/${id}/stock`,
  },

  // Category endpoints (example)
  CATEGORIES: {
    LIST: '/categories',
    DETAIL: (id: string) => `/categories/${id}`,
    CREATE: '/categories',
    UPDATE: (id: string) => `/categories/${id}`,
    DELETE: (id: string) => `/categories/${id}`,
  },
} as const;

// Helper function to build URLs with query parameters
export const buildUrl = (baseEndpoint: string, params?: Record<string, any>): string => {
  if (!params || Object.keys(params).length === 0) {
    return baseEndpoint;
  }

  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `${baseEndpoint}?${queryString}` : baseEndpoint;
};

// Example usage:
// const url = buildUrl(API_ENDPOINTS.POSTS.LIST, { page: 1, limit: 10, category: 'tech' });
// Result: "/posts?page=1&limit=10&category=tech"
