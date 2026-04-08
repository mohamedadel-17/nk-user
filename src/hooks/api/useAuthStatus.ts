import { useCallback } from 'react';
import { authService } from '../../services';

export const useAuthStatus = () => {
  const isAuthenticated = authService.isAuthenticated();
  const token = authService.getToken();

  const clearToken = useCallback(() => {
    authService.clearToken();
  }, []);

  return {
    isAuthenticated,
    token,
    isLoading: false,
    clearToken,
  };
};
