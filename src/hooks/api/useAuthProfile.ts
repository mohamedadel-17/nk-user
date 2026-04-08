import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '../../services';
import { User, ApiResponse } from '../../services/types';

export const authKeys = {
  all: ['auth'] as const,
  profile: () => [...authKeys.all, 'profile'] as const,
};

export const useProfile = (enabled = true) => {
  return useQuery({
    queryKey: authKeys.profile(),
    queryFn: () => authService.getProfile(),
    enabled: enabled && authService.isAuthenticated(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: (failureCount, error: any) => {
      if (error?.response?.status === 401) {
        return false;
      }
      return failureCount < 3;
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: Partial<User>) => authService.updateProfile(userData),
    onSuccess: (data: ApiResponse<User>) => {
      if (data.success) {
        queryClient.setQueryData(authKeys.profile(), data);
      }
    },
    onError: (error: any) => {
      console.error('Profile update failed:', error);
    },
  });
};
