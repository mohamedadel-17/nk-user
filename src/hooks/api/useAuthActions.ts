import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '../../services';
import { 
  LoginRequest, 
  RegisterRequest, 
  AuthResponse, 
  ApiResponse,
  GoogleCallbackParams,
  GoogleAuthResponse,
  SendOtpRequest,
  LoginOtpRequest,
  VerifyOtpRequest,
  VerifyOtpResponse,
  ResendOtpRequest,
  RefreshTokenRequest
} from '../../services/types';
import { authKeys } from './useAuthProfile';

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: LoginRequest) => authService.login(credentials),
    onSuccess: (data: ApiResponse<AuthResponse>) => {
      if (data.success && data.data) {
        // Only update user profile if verification is not required
        if (!data.data.requiresVerification) {
          queryClient.setQueryData(authKeys.profile(), {
            success: true,
            data: data.data.user,
          });
        }
      }
    },
    onError: (error: any) => {
      console.error('Login failed:', error);
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: RegisterRequest) => authService.register(userData),
    onSuccess: (data: ApiResponse<AuthResponse>) => {
      if (data.success && data.data) {
        queryClient.setQueryData(authKeys.profile(), {
          success: true,
          data: data.data.user,
        });
      }
    },
    onError: (error: any) => {
      console.error('Registration failed:', error);
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: authKeys.all });
      queryClient.clear();
    },
    onError: (error: any) => {
      console.error('Logout failed:', error);
      queryClient.removeQueries({ queryKey: authKeys.all });
      queryClient.clear();
    },
  });
};

export const useRefreshToken = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RefreshTokenRequest) => authService.refreshToken(data),
    onError: (error: any) => {
      console.error('Token refresh failed:', error);
      queryClient.removeQueries({ queryKey: authKeys.all });
      authService.clearToken();
    },
  });
};

export const useGoogleLogin = () => {
  return useMutation({
    mutationFn: () => authService.googleLogin(),
    onError: (error: any) => {
      console.error('Google login failed:', error);
    },
  });
};

export const useGoogleCallback = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: GoogleCallbackParams) => authService.handleGoogleCallback(params),
    onSuccess: (data: ApiResponse<GoogleAuthResponse>) => {
      if (data.success && data.data) {
        queryClient.setQueryData(authKeys.profile(), {
          success: true,
          data: data.data.user,
        });
      }
    },
    onError: (error: any) => {
      console.error('Google callback failed:', error);
    },
  });
};

export const useSendOtp = () => {
  return useMutation({
    mutationFn: (data: SendOtpRequest) => authService.sendOtp(data),
    onError: (error: any) => {
      console.error('Send OTP failed:', error);
    },
  });
};

export const useLoginWithOtp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginOtpRequest) => authService.loginWithOtp(data),
    onSuccess: (data: ApiResponse<AuthResponse>) => {
      if (data.success && data.data) {
        queryClient.setQueryData(authKeys.profile(), {
          success: true,
          data: data.data.user,
        });
      }
    },
    onError: (error: any) => {
      console.error('OTP login failed:', error);
    },
  });
};

export const useVerifyOtp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: VerifyOtpRequest) => authService.verifyOtp(data),
    onSuccess: (data: ApiResponse<VerifyOtpResponse>) => {
      if (data.success && data.data.user) {
        // Update user profile in cache
        queryClient.setQueryData(authKeys.profile(), {
          success: true,
          data: data.data.user,
        });
      }
    },
    onError: (error: any) => {
      console.error('OTP verification failed:', error);
    },
  });
};

export const useResendOtp = () => {
  return useMutation({
    mutationFn: (data: ResendOtpRequest) => authService.resendOtp(data),
    onError: (error: any) => {
      console.error('Resend OTP failed:', error);
    },
  });
};
