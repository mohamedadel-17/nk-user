import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productService } from '../../services';
import { 
  Product, 
  CreateProductRequest, 
  UpdateProductRequest, 
  ProductSearchParams,
  ApiResponse,
  PaginatedResponse 
} from '../../services/types';

// Query keys for products
export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (params?: ProductSearchParams) => [...productKeys.lists(), params] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: string) => [...productKeys.details(), id] as const,
  featured: () => [...productKeys.all, 'featured'] as const,
  search: (query: string) => [...productKeys.all, 'search', query] as const,
  byCategory: (categoryId: string) => [...productKeys.all, 'category', categoryId] as const,
};
// {
//   "admin":
// }
// Hook to get all products with optional filtering
export const useProducts = (params?: ProductSearchParams, enabled = true) => {
  return useQuery({
    queryKey: productKeys.list(params),
    queryFn: () => productService.getProducts(params),
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: (failureCount, error: any) => {
      // Don't retry on 404 errors
      if (error?.response?.status === 404) {
        return false;
      }
      return failureCount < 2;
    },
  });
};

// Hook to get single product by ID
export const useProduct = (id: string, enabled = true) => {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => productService.getProduct(id),
    enabled: enabled && !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
  });
};

// Hook to get featured products
export const useFeaturedProducts = (params?: ProductSearchParams, enabled = true) => {
  return useQuery({
    queryKey: [...productKeys.featured(), params],
    queryFn: () => productService.getFeaturedProducts(params),
    enabled,
    staleTime: 3 * 60 * 1000, // 3 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook to search products
export const useProductSearch = (query: string, params?: ProductSearchParams, enabled = true) => {
  return useQuery({
    queryKey: [...productKeys.search(query), params],
    queryFn: () => productService.searchProducts(query, params),
    enabled: enabled && !!query,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook to get products by category
export const useProductsByCategory = (categoryId: string, params?: ProductSearchParams, enabled = true) => {
  return useQuery({
    queryKey: [...productKeys.byCategory(categoryId), params],
    queryFn: () => productService.getProductsByCategory(categoryId, params),
    enabled: enabled && !!categoryId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook to check product stock
export const useProductStock = (id: string, enabled = true) => {
  return useQuery({
    queryKey: [...productKeys.detail(id), 'stock'],
    queryFn: () => productService.checkStock(id),
    enabled: enabled && !!id,
    staleTime: 30 * 1000, // 30 seconds
    gcTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Hook to create new product
export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProductRequest) => productService.createProduct(data),
    onSuccess: () => {
      // Invalidate products list queries
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    },
    onError: (error) => {
      console.error('Product creation failed:', error);
    },
  });
};

// Hook to update product
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProductRequest }) => 
      productService.updateProduct(id, data),
    onSuccess: (data, variables) => {
      // Update the specific product in cache
      queryClient.setQueryData(productKeys.detail(variables.id), data);
      
      // Invalidate list queries to reflect changes
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    },
    onError: (error) => {
      console.error('Product update failed:', error);
    },
  });
};

// Hook to delete product
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => productService.deleteProduct(id),
    onSuccess: (_, deletedId) => {
      // Remove the deleted product from cache
      queryClient.removeQueries({ queryKey: productKeys.detail(deletedId) });
      
      // Invalidate list queries
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    },
    onError: (error) => {
      console.error('Product deletion failed:', error);
    },
  });
};

// Hook to update product stock
export const useUpdateStock = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, stock }: { id: string; stock: number }) => 
      productService.updateStock(id, stock),
    onSuccess: (data, variables) => {
      // Update product data in cache
      queryClient.setQueryData(productKeys.detail(variables.id), data);
      
      // Invalidate stock check query
      queryClient.invalidateQueries({ 
        queryKey: [...productKeys.detail(variables.id), 'stock'] 
      });
      
      // Invalidate list queries
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    },
    onError: (error) => {
      console.error('Stock update failed:', error);
    },
  });
};

// Hook for bulk operations
export const useBulkUpdateProducts = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updates: Array<{ id: string; data: Partial<UpdateProductRequest> }>) => 
      productService.bulkUpdateProducts(updates),
    onSuccess: () => {
      // Invalidate all product queries
      queryClient.invalidateQueries({ queryKey: productKeys.all });
    },
    onError: (error) => {
      console.error('Bulk update failed:', error);
    },
  });
};

export const useBulkDeleteProducts = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ids: string[]) => productService.bulkDeleteProducts(ids),
    onSuccess: (_, deletedIds) => {
      // Remove deleted products from cache
      deletedIds.forEach(id => {
        queryClient.removeQueries({ queryKey: productKeys.detail(id) });
      });
      
      // Invalidate list queries
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    },
    onError: (error) => {
      console.error('Bulk deletion failed:', error);
    },
  });
};

// Combined hook for common product operations
export const useProductsManager = (params?: ProductSearchParams) => {
  const productsQuery = useProducts(params);
  const createProductMutation = useCreateProduct();
  const updateProductMutation = useUpdateProduct();
  const deleteProductMutation = useDeleteProduct();
  const updateStockMutation = useUpdateStock();
  const bulkUpdateMutation = useBulkUpdateProducts();
  const bulkDeleteMutation = useBulkDeleteProducts();

  return {
    // Queries
    products: productsQuery.data?.data || [],
    productsLoading: productsQuery.isLoading,
    productsError: productsQuery.error,
    pagination: productsQuery.data?.pagination,
    
    // Mutations
    createProduct: createProductMutation.mutateAsync,
    createProductLoading: createProductMutation.isPending,
    createProductError: createProductMutation.error,
    
    updateProduct: updateProductMutation.mutateAsync,
    updateProductLoading: updateProductMutation.isPending,
    updateProductError: updateProductMutation.error,
    
    deleteProduct: deleteProductMutation.mutateAsync,
    deleteProductLoading: deleteProductMutation.isPending,
    deleteProductError: deleteProductMutation.error,
    
    updateStock: updateStockMutation.mutateAsync,
    updateStockLoading: updateStockMutation.isPending,
    updateStockError: updateStockMutation.error,
    
    bulkUpdateProducts: bulkUpdateMutation.mutateAsync,
    bulkUpdateLoading: bulkUpdateMutation.isPending,
    bulkUpdateError: bulkUpdateMutation.error,
    
    bulkDeleteProducts: bulkDeleteMutation.mutateAsync,
    bulkDeleteLoading: bulkDeleteMutation.isPending,
    bulkDeleteError: bulkDeleteMutation.error,
    
    // Refetch
    refetchProducts: productsQuery.refetch,
  };
};
