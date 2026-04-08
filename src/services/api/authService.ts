import axios from 'axios';
import { apiClient, API_ENDPOINTS } from '../index';
import { 
  ApiResponse, 
  LoginRequest, 
  RegisterRequest, 
  AuthResponse, 
  User,
  GoogleCallbackParams,
  GoogleAuthResponse,
  SendOtpRequest,
  SendOtpResponse,
  LoginOtpRequest,
  VerifyOtpRequest,
  VerifyOtpResponse,
  ResendOtpRequest,
  ResendOtpResponse,
  RefreshTokenRequest,
  RefreshTokenResponse
} from '../types';

class AuthService {
  // Login user
  async login(credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(API_ENDPOINTS.AUTH.LOGIN, credentials);
    console.log("response",response);
    
    // Store token only if login is successful and doesn't require verification
    if (response.data.status===200 && response.data.data && !response.data.data.requiresVerification) {
      if (response.data.data.token) {
        apiClient.setToken(response.data.access_token);
      }
    }
    
    return response.data;
  }

  // Register new user
  async register(userData: RegisterRequest): Promise<ApiResponse<AuthResponse>> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(API_ENDPOINTS.AUTH.REGISTER, userData);
    
    // Store token if registration is successful
    if (response.data.status===200 && response.data.access_token) {
      apiClient.setToken(response.data.access_token);
    }
    
    return response.data;
  }

  // Logout user
  async logout(): Promise<ApiResponse<void>> {
    try {
      const response = await apiClient.post<ApiResponse<void>>(API_ENDPOINTS.AUTH.LOGOUT);
      return response.data;
    } finally {
      // Always clear token on logout
      this.clearToken();
    }
  }

  // Get current user profile
  async getProfile(): Promise<ApiResponse<User>> {
   
    const response = await apiClient.get<ApiResponse<User>>(API_ENDPOINTS.AUTH.PROFILE);
// http://localhost:3001/api/auth/login

    return response.data;
  }

  // Update user profile
  async updateProfile(userData: Partial<User>): Promise<ApiResponse<User>> {
    const response = await apiClient.put<ApiResponse<User>>(API_ENDPOINTS.AUTH.PROFILE, userData);
    return response.data;
  }

  // Clear stored token (for manual logout)
  clearToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
    }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('authToken');
    }
    return false;
  }

  // Get stored token
  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken');
    }
    return null;
  }

  // Google OAuth methods
  async googleLogin(): Promise<void> {
    // Redirect to Google OAuth endpoint
    if (typeof window !== 'undefined') {
      const baseURL = apiClient.getInstance().defaults.baseURL;
      window.location.href = `${baseURL}${API_ENDPOINTS.AUTH.GOOGLE.LOGIN}`;
    }
  }

  async handleGoogleCallback(params: GoogleCallbackParams): Promise<ApiResponse<GoogleAuthResponse>> {
    const response = await apiClient.get<ApiResponse<GoogleAuthResponse>>(
      API_ENDPOINTS.AUTH.GOOGLE.CALLBACK,
      { params }
    );
    
    // Store token if authentication is successful
    if (response.data.success && response.data.data.token) {
      apiClient.setToken(response.data.data.token);
    }
    
    return response.data;
  }

  async getGoogleProfile(): Promise<ApiResponse<User>> {
    const response = await apiClient.get<ApiResponse<User>>(API_ENDPOINTS.AUTH.GOOGLE.ME);
    return response.data;
  }

  // OTP methods
  async sendOtp(data: SendOtpRequest): Promise<ApiResponse<SendOtpResponse>> {
    const response = await apiClient.post<ApiResponse<SendOtpResponse>>(API_ENDPOINTS.AUTH.OTP.SEND, data);
    return response.data;
  }

  async loginWithOtp(data: LoginOtpRequest): Promise<ApiResponse<AuthResponse>> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(API_ENDPOINTS.AUTH.OTP.LOGIN, data);
    
    // Store token if login is successful
    if (response.data.success && response.data.data.token) {
      apiClient.setToken(response.data.data.token);
    }
    
    return response.data;
  }

  async verifyOtp(data: VerifyOtpRequest): Promise<ApiResponse<VerifyOtpResponse>> {
    const response = await apiClient.post<ApiResponse<VerifyOtpResponse>>(API_ENDPOINTS.AUTH.OTP.VERIFY, data);
    
    // Store token if verification is successful and token is returned
    if (response.data.success && response.data.data.token) {
      apiClient.setToken(response.data.data.token);
    }
    
    return response.data;
  }

  async resendOtp(data: ResendOtpRequest): Promise<ApiResponse<ResendOtpResponse>> {
    const response = await apiClient.post<ApiResponse<ResendOtpResponse>>(API_ENDPOINTS.AUTH.OTP.RESEND, data);
    return response.data;
  }

  // Refresh token method
  async refreshToken(data: RefreshTokenRequest): Promise<ApiResponse<RefreshTokenResponse>> {
    const response = await apiClient.post<ApiResponse<RefreshTokenResponse>>(API_ENDPOINTS.AUTH.REFRESH, data);
    
    // Update stored token if refresh is successful
    if (response.data.success && response.data.data.access_token) {
      apiClient.setToken(response.data.data.access_token);
    }
    
    return response.data;
  }
}

export const authService = new AuthService();
export default authService;
