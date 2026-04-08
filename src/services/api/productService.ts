import { apiClient, API_ENDPOINTS, buildUrl } from '../index';
import {
  ApiResponse,
  PaginatedResponse,
  Product,
  CreateProductRequest,
  UpdateProductRequest,
  ProductSearchParams,
} from '../types';

class ProductService {
  // Get all products with optional filtering and pagination
  async getProducts(params?: ProductSearchParams): Promise<PaginatedResponse<Product>> {
    const url = params ? buildUrl(API_ENDPOINTS.PRODUCTS.LIST, params) : API_ENDPOINTS.PRODUCTS.LIST;
    const response = await apiClient.get<PaginatedResponse<Product>>(url);
    return response.data;
  }

  // Get single product by ID
  async getProduct(id: string): Promise<ApiResponse<Product>> {
    const response = await apiClient.get<ApiResponse<Product>>(API_ENDPOINTS.PRODUCTS.DETAIL(id));
    return response.data;
  }

  // Create new product
  async createProduct(data: CreateProductRequest): Promise<ApiResponse<Product>> {
    const response = await apiClient.post<ApiResponse<Product>>(API_ENDPOINTS.PRODUCTS.CREATE, data);
    return response.data;
  }

  // Update existing product
  async updateProduct(id: string, data: UpdateProductRequest): Promise<ApiResponse<Product>> {
    const response = await apiClient.put<ApiResponse<Product>>(API_ENDPOINTS.PRODUCTS.UPDATE(id), data);
    return response.data;
  }

  // Delete product
  async deleteProduct(id: string): Promise<ApiResponse<void>> {
    const response = await apiClient.delete<ApiResponse<void>>(API_ENDPOINTS.PRODUCTS.DELETE(id));
    return response.data;
  }

  // Search products
  async searchProducts(query: string, params?: ProductSearchParams): Promise<PaginatedResponse<Product>> {
    const searchParams = { ...params, search: query };
    const url = buildUrl(API_ENDPOINTS.PRODUCTS.SEARCH, searchParams);
    const response = await apiClient.get<PaginatedResponse<Product>>(url);
    return response.data;
  }

  // Get products by category
  async getProductsByCategory(categoryId: string, params?: ProductSearchParams): Promise<PaginatedResponse<Product>> {
    const url = params ? buildUrl(API_ENDPOINTS.PRODUCTS.BY_CATEGORY(categoryId), params) : API_ENDPOINTS.PRODUCTS.BY_CATEGORY(categoryId);
    const response = await apiClient.get<PaginatedResponse<Product>>(url);
    return response.data;
  }

  // Get featured products
  async getFeaturedProducts(params?: ProductSearchParams): Promise<PaginatedResponse<Product>> {
    const url = params ? buildUrl(API_ENDPOINTS.PRODUCTS.FEATURED, params) : API_ENDPOINTS.PRODUCTS.FEATURED;
    const response = await apiClient.get<PaginatedResponse<Product>>(url);
    return response.data;
  }

  // Check product stock
  async checkStock(id: string): Promise<ApiResponse<{ stock: number; available: boolean }>> {
    const response = await apiClient.get<ApiResponse<{ stock: number; available: boolean }>>(API_ENDPOINTS.PRODUCTS.STOCK_CHECK(id));
    return response.data;
  }

  // Update product stock
  async updateStock(id: string, stock: number): Promise<ApiResponse<Product>> {
    const response = await apiClient.patch<ApiResponse<Product>>(API_ENDPOINTS.PRODUCTS.UPDATE(id), { stock });
    return response.data;
  }

  // Get products with filters (advanced filtering)
  async getFilteredProducts(filters: {
    categories?: string[];
    brands?: string[];
    priceRange?: { min: number; max: number };
    rating?: number;
    inStock?: boolean;
    sortBy?: 'name' | 'price' | 'rating' | 'createdAt';
    sortOrder?: 'asc' | 'desc';
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<Product>> {
    const params: ProductSearchParams = {
      ...filters,
      // Convert arrays to comma-separated strings for URL
      ...(filters.categories && { category: filters.categories.join(',') }),
      ...(filters.brands && { brand: filters.brands.join(',') }),
      ...(filters.priceRange && {
        minPrice: filters.priceRange.min,
        maxPrice: filters.priceRange.max,
      }),
    };

    const url = buildUrl(API_ENDPOINTS.PRODUCTS.LIST, params);
    const response = await apiClient.get<PaginatedResponse<Product>>(url);
    return response.data;
  }

  // Bulk operations
  async bulkUpdateProducts(updates: Array<{ id: string; data: Partial<UpdateProductRequest> }>): Promise<ApiResponse<Product[]>> {
    const response = await apiClient.patch<ApiResponse<Product[]>>('/products/bulk', { updates });
    return response.data;
  }

  async bulkDeleteProducts(ids: string[]): Promise<ApiResponse<void>> {
    const response = await apiClient.delete<ApiResponse<void>>('/products/bulk', { data: { ids } });
    return response.data;
  }
}

export const productService = new ProductService();
export default productService;
