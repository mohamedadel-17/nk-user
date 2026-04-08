import { useQuery, useMutation, useQueryClient, QueryClient } from '@tanstack/react-query';
import { postService } from '../../services';
import {
  Post,
  CreatePostRequest,
  UpdatePostRequest,
  PostSearchParams,
  PaginatedResponse,
  ApiResponse,
} from '../../services/types';

// Query keys for posts
export const postKeys = {
  all: ['posts'] as const,
  lists: () => [...postKeys.all, 'list'] as const,
  list: (params: PostSearchParams) => [...postKeys.lists(), params] as const,
  details: () => [...postKeys.all, 'detail'] as const,
  detail: (id: string) => [...postKeys.details(), id] as const,
  search: (query: string, params?: PostSearchParams) => 
    [...postKeys.all, 'search', query, params] as const,
  byCategory: (categorySlug: string, params?: PostSearchParams) => 
    [...postKeys.all, 'category', categorySlug, params] as const,
  byAuthor: (authorId: string, params?: PostSearchParams) => 
    [...postKeys.all, 'author', authorId, params] as const,
};

// Hook to get all posts
export const usePosts = (params?: PostSearchParams) => {
  return useQuery({
    queryKey: postKeys.list(params || {}),
    queryFn: () => postService.getPosts(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });
};

// Hook to get single post
export const usePost = (id: string, enabled = true) => {
  return useQuery({
    queryKey: postKeys.detail(id),
    queryFn: () => postService.getPost(id),
    enabled: enabled && !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
  });
};

// Hook to search posts
export const useSearchPosts = (query: string, params?: PostSearchParams) => {
  return useQuery({
    queryKey: postKeys.search(query, params),
    queryFn: () => postService.searchPosts(query, params),
    enabled: !!query,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook to get posts by category
export const usePostsByCategory = (categorySlug: string, params?: PostSearchParams) => {
  return useQuery({
    queryKey: postKeys.byCategory(categorySlug, params),
    queryFn: () => postService.getPostsByCategory(categorySlug, params),
    enabled: !!categorySlug,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook to get posts by author
export const usePostsByAuthor = (authorId: string, params?: PostSearchParams) => {
  return useQuery({
    queryKey: postKeys.byAuthor(authorId, params),
    queryFn: () => postService.getPostsByAuthor(authorId, params),
    enabled: !!authorId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook to create a post
export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePostRequest) => postService.createPost(data),
    onSuccess: () => {
      // Invalidate and refetch posts list
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
    },
    onError: (error) => {
      console.error('Failed to create post:', error);
    },
  });
};

// Hook to update a post
export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePostRequest }) => 
      postService.updatePost(id, data),
    onSuccess: (data, variables) => {
      // Update the specific post in cache
      queryClient.setQueryData(postKeys.detail(variables.id), data);
      
      // Invalidate posts list
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
    },
    onError: (error) => {
      console.error('Failed to update post:', error);
    },
  });
};

// Hook to delete a post
export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => postService.deletePost(id),
    onSuccess: (_, postId) => {
      // Remove the specific post from cache
      queryClient.removeQueries({ queryKey: postKeys.detail(postId) });
      
      // Invalidate posts list
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
    },
    onError: (error) => {
      console.error('Failed to delete post:', error);
    },
  });
};

// Hook to prefetch post data
export const usePrefetchPost = () => {
  const queryClient = useQueryClient();

  const prefetchPost = (id: string) => {
    queryClient.prefetchQuery({
      queryKey: postKeys.detail(id),
      queryFn: () => postService.getPost(id),
      staleTime: 10 * 60 * 1000, // 10 minutes
    });
  };

  return { prefetchPost };
};
