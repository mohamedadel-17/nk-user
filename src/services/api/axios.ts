import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';

// API base URL - change this to your actual API URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

class ApiClient {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_BASE_URL,
      timeout: 20000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }
  // http://localhost:3001/api
  private setupInterceptors(): void {
    // Request interceptor
    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // Add auth token if available
        const token = this.getToken();
        if (token) {
          config.headers = config.headers || {};
          config.headers.Authorization = `Bearer ${token}`;
        }

        // Add request timestamp for debugging
        console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`, {
          data: config.data,
          params: config.params,
        });

        return config;
      },
      (error: AxiosError) => {
        console.error('[API Request Error]', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        console.log(`[API Response] ${response.config.method?.toUpperCase()} ${response.config.url}`, {
          status: response.status,
          data: response.data,
        });

        return response;
      },
      (error: AxiosError) => {
        console.error('[API Response Error]', error);

        // Handle common error scenarios
        if (error.response) {
          const status = error.response.status;
          
          switch (status) {
            case 401:
              // Unauthorized - clear token and redirect to login
              this.clearToken();
              // You can add redirect logic here
              console.warn('Unauthorized access - token cleared');
              break;
            case 403:
              console.warn('Forbidden - insufficient permissions');
              break;
            case 404:
              console.warn('Resource not found');
              break;
            case 500:
              console.error('Server error');
              break;
            default:
              console.error(`HTTP Error ${status}`);
          }
        } else if (error.request) {
          console.error('Network error - no response received');
        } else {
          console.error('Request setup error', error.message);
        }

        return Promise.reject(error);
      }
    );
  }

  private getToken(): string | null {
    // Get token from localStorage (client-side only)
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken');
    }
    return null;
  }

  private clearToken(): void {
    // Clear token from localStorage (client-side only)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
    }
  }

  // Public methods for HTTP requests
  public get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.get<T>(url, config);
  }

  public post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.post<T>(url, data, config);
  }

  public put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.put<T>(url, data, config);
  }

  public patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.patch<T>(url, data, config);
  }

  public delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.delete<T>(url, config);
  }

  // Method to set token manually (e.g., after login)
  public setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', token);
    }
  }

  // Get the axios instance for custom requests
  public getInstance(): AxiosInstance {
    return this.axiosInstance;
  }
}

// Create and export singleton instance
export const apiClient = new ApiClient();
export default apiClient;
