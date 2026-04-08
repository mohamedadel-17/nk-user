import { apiClient, API_ENDPOINTS, buildUrl } from '../index';
import {
  ApiResponse,
  PaginatedResponse,
  Post,
  CreatePostRequest,
  UpdatePostRequest,
  PostSearchParams,
} from '../types';
// api/v1/admin/login
class PostService {
  // Get all posts with optional filtering
  async getPosts(params?: PostSearchParams): Promise<PaginatedResponse<Post>> {
    const url = params ? buildUrl(API_ENDPOINTS.POSTS.LIST, params) : API_ENDPOINTS.POSTS.LIST;
    const response = await apiClient.get<PaginatedResponse<Post>>(url);
    return response.data;
  }

  // Get single post by ID
  async getPost(id: string): Promise<ApiResponse<Post>> {
    const response = await apiClient.get<ApiResponse<Post>>(API_ENDPOINTS.POSTS.DETAIL(id));
    return response.data;
  }

  // Create new post
  async createPost(data: CreatePostRequest): Promise<ApiResponse<Post>> {
    const response = await apiClient.post<ApiResponse<Post>>(API_ENDPOINTS.POSTS.CREATE, data);
    return response.data;
  }

  // Update existing post
  async updatePost(id: string, data: UpdatePostRequest): Promise<ApiResponse<Post>> {
    const response = await apiClient.put<ApiResponse<Post>>(API_ENDPOINTS.POSTS.UPDATE(id), data);
    return response.data;
  }

  // Delete post
  async deletePost(id: string): Promise<ApiResponse<void>> {
    const response = await apiClient.delete<ApiResponse<void>>(API_ENDPOINTS.POSTS.DELETE(id));
    return response.data;
  }

  // Search posts
  async searchPosts(query: string, params?: PostSearchParams): Promise<PaginatedResponse<Post>> {
    const searchParams = { ...params, search: query };
    const url = buildUrl(API_ENDPOINTS.POSTS.LIST, searchParams);
    const response = await apiClient.get<PaginatedResponse<Post>>(url);
    return response.data;
  }

  // Get posts by category
  async getPostsByCategory(categorySlug: string, params?: PostSearchParams): Promise<PaginatedResponse<Post>> {
    const searchParams = { ...params, category: categorySlug };
    const url = buildUrl(API_ENDPOINTS.POSTS.LIST, searchParams);
    const response = await apiClient.get<PaginatedResponse<Post>>(url);
    return response.data;
  }

  // Get posts by author
  async getPostsByAuthor(authorId: string, params?: PostSearchParams): Promise<PaginatedResponse<Post>> {
    const searchParams = { ...params, author: authorId };
    const url = buildUrl(API_ENDPOINTS.POSTS.LIST, searchParams);
    const response = await apiClient.get<PaginatedResponse<Post>>(url);
    return response.data;
  }
}

export const postService = new PostService();
export default postService;
