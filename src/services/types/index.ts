// Common API response types
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
}

export interface PaginatedResponse<T = any> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number
  };
  message?: string;
}

// Authentication types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface AuthResponse {
  user: User;
  access_token: string;
  refresh_token?: string;
  requiresVerification?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'user' | 'moderator';
  roles?: string[];
  authProvider?: 'google' | 'email' | null;
  providerId?: string | null;
  isActive?: boolean;
  isVerified?: boolean;
  createdAt: string;
  updatedAt: string;
}

// Google OAuth types
export interface GoogleAuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

export interface GoogleCallbackParams {
  code: string;
  state: string;
  error?: string;
}

// OTP types
export interface SendOtpRequest {
  email: string;
}

export interface SendOtpResponse {
  message: string;
  otp?: string; // For testing only
}

export interface LoginOtpRequest {
  email: string;
  otp: string;
}

export interface VerifyOtpRequest {
  email: string;
  otp: string;
}

export interface VerifyOtpResponse {
  message: string;
  verified: boolean;
  user?: User;
  token?: string;
}

export interface ResendOtpRequest {
  email: string;
  type: 'login' | 'register' | 'password_reset';
}

export interface ResendOtpResponse {
  message: string;
}

export interface RefreshTokenRequest {
  token: string;
}

export interface RefreshTokenResponse {
  access_token: string;
  refresh_token: string;
}

// Post types (example)
export interface Post {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  author: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  category?: {
    id: string;
    name: string;
    slug: string;
  };
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePostRequest {
  title: string;
  content: string;
  excerpt?: string;
  categoryId?: string;
  tags: string[];
  status?: 'draft' | 'published';
}

export interface UpdatePostRequest extends Partial<CreatePostRequest> {
  id: string;
}

// Product types (example)
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  images: string[];
  category: {
    id: string;
    name: string;
    slug: string;
  };
  brand?: string;
  sku: string;
  stock: number;
  rating?: number;
  reviews?: number;
  status: 'active' | 'inactive' | 'discontinued';
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  currency?: string;
  categoryId: string;
  brand?: string;
  sku: string;
  stock: number;
  images: string[];
  status?: 'active' | 'inactive';
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {
  id: string;
}

// Category types
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
  children?: Category[];
  productCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryRequest {
  name: string;
  slug?: string;
  description?: string;
  image?: string;
  parentId?: string;
}

export interface UpdateCategoryRequest extends Partial<CreateCategoryRequest> {
  id: string;
}

// Query parameters types
export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface SearchParams extends PaginationParams {
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PostSearchParams extends SearchParams {
  category?: string;
  author?: string;
  tags?: string[];
  status?: string;
}

export interface ProductSearchParams extends SearchParams {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  inStock?: boolean;
}

// Error types
export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}

// Form types
export interface FormFieldError {
  field: string;
  message: string;
}

export interface FormErrors {
  [key: string]: string;
}
