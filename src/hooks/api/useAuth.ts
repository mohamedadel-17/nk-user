import { authService } from '../../services';
import { useProfile } from './useAuthProfile';
import {
  useLogin,
  useRegister,
  useLogout,
  useRefreshToken,
  useGoogleLogin,
  useGoogleCallback,
  useSendOtp,
  useLoginWithOtp,
  useVerifyOtp,
  useResendOtp,
} from './useAuthActions';
import { useAuthStatus } from './useAuthStatus';
import { useUpdateProfile } from './useAuthProfile';

// Hook to get current user profile - re-exported from useAuthProfile
export { useProfile } from './useAuthProfile';

// Authentication action hooks - re-exported from useAuthActions
export {
  useLogin,
  useRegister,
  useLogout,
  useRefreshToken,
  useGoogleLogin,
  useGoogleCallback,
  useSendOtp,
  useLoginWithOtp,
  useVerifyOtp,
  useResendOtp,
} from './useAuthActions';

// Re-export useUpdateProfile from useAuthProfile
export { useUpdateProfile } from './useAuthProfile';

// Authentication status hook - re-exported from useAuthStatus
export { useAuthStatus } from './useAuthStatus';


// Combined hook for authentication state and actions
export const useAuth = () => {
  const profileQuery = useProfile();
  const loginMutation = useLogin();
  const registerMutation = useRegister();
  const logoutMutation = useLogout();
  const updateProfileMutation = useUpdateProfile();
  const refreshTokenMutation = useRefreshToken();
  const authStatus = useAuthStatus();
  
  // Google OAuth mutations
  const googleLoginMutation = useGoogleLogin();
  const googleCallbackMutation = useGoogleCallback();
  
  // OTP mutations
  const sendOtpMutation = useSendOtp();
  const loginWithOtpMutation = useLoginWithOtp();
  const verifyOtpMutation = useVerifyOtp();
  const resendOtpMutation = useResendOtp();

  return {
    // State
    user: profileQuery.data?.data,
    isLoading: profileQuery.isLoading,
    isAuthenticated: authStatus.isAuthenticated,
    token: authStatus.token,
    
    // Queries
    profileQuery,
    
    // Mutations - Regular Auth
    login: loginMutation.mutateAsync,
    loginAsync: loginMutation.mutateAsync,
    loginLoading: loginMutation.isPending,
    loginError: loginMutation.error,
    
    register: registerMutation.mutateAsync,
    registerAsync: registerMutation.mutateAsync,
    registerLoading: registerMutation.isPending,
    registerError: registerMutation.error,
    
    logout: logoutMutation.mutateAsync,
    logoutAsync: logoutMutation.mutateAsync,
    logoutLoading: logoutMutation.isPending,
    logoutError: logoutMutation.error,
    
    updateProfile: updateProfileMutation.mutateAsync,
    updateProfileAsync: updateProfileMutation.mutateAsync,
    updateProfileLoading: updateProfileMutation.isPending,
    updateProfileError: updateProfileMutation.error,
    
    refreshToken: refreshTokenMutation.mutateAsync,
    refreshTokenAsync: refreshTokenMutation.mutateAsync,
    refreshTokenLoading: refreshTokenMutation.isPending,
    refreshTokenError: refreshTokenMutation.error,
    
    // Google OAuth
    googleLogin: googleLoginMutation.mutateAsync,
    googleLoginAsync: googleLoginMutation.mutateAsync,
    googleLoginLoading: googleLoginMutation.isPending,
    googleLoginError: googleLoginMutation.error,
    
    googleCallback: googleCallbackMutation.mutateAsync,
    googleCallbackAsync: googleCallbackMutation.mutateAsync,
    googleCallbackLoading: googleCallbackMutation.isPending,
    googleCallbackError: googleCallbackMutation.error,
    
    // OTP
    sendOtp: sendOtpMutation.mutateAsync,
    sendOtpAsync: sendOtpMutation.mutateAsync,
    sendOtpLoading: sendOtpMutation.isPending,
    sendOtpError: sendOtpMutation.error,
    
    loginWithOtp: loginWithOtpMutation.mutateAsync,
    loginWithOtpAsync: loginWithOtpMutation.mutateAsync,
    loginWithOtpLoading: loginWithOtpMutation.isPending,
    loginWithOtpError: loginWithOtpMutation.error,
    
    verifyOtp: verifyOtpMutation.mutateAsync,
    verifyOtpAsync: verifyOtpMutation.mutateAsync,
    verifyOtpLoading: verifyOtpMutation.isPending,
    verifyOtpError: verifyOtpMutation.error,
    
    resendOtp: resendOtpMutation.mutateAsync,
    resendOtpAsync: resendOtpMutation.mutateAsync,
    resendOtpLoading: resendOtpMutation.isPending,
    resendOtpError: resendOtpMutation.error,
    
    // Utility methods
    clearToken: authService.clearToken.bind(authService),
  };
};
