const API_BASE_URL = "http://localhost:5000/api";

// Types for API responses
export interface User {
  _id: string;
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "user" | "admin" | "super_admin";
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Decor {
  _id: string;
  name: string;
  slug: string;
  description: string;
  category: {
    _id: string;
    name: string;
    description?: string;
  };
  price: number;
  discountPrice?: number;
  images: string[];
  status: "active" | "inactive" | "out_of_stock";
  stock: number;
  stockQuantity?: number; // Keep for backward compatibility
  materials: string[];
  tags: string[];
  featured: boolean;
  rating: {
    average: number;
    count: number;
  };
  views: number;
  salesCount: number;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    accessToken: string;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

class ApiService {
  private accessToken: string | null = null;

  setAccessToken(token: string | null) {
    this.accessToken = token;
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;

    const headers: Record<string, string> = {
      ...((options.headers as Record<string, string>) || {}),
    };

    // Only set Content-Type if not already set and body is not FormData
    if (!headers["Content-Type"] && !(options.body instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }

    // Add access token to headers if available
    if (this.accessToken) {
      headers.Authorization = `Bearer ${this.accessToken}`;
    }

    const defaultOptions: RequestInit = {
      headers,
      credentials: "include", // Include cookies for refresh token
      ...options,
    };

    try {
      const response = await fetch(url, defaultOptions);

      // If token expired, try to refresh
      if (response.status === 401 && this.accessToken) {
        try {
          const refreshResponse = await this.refreshToken();
          if (refreshResponse.success) {
            this.setAccessToken(refreshResponse.data.accessToken);

            // Retry original request with new token
            const retryHeaders: Record<string, string> = { ...headers };
            retryHeaders.Authorization = `Bearer ${refreshResponse.data.accessToken}`;
            const retryResponse = await fetch(url, {
              ...defaultOptions,
              headers: retryHeaders,
            });

            if (retryResponse.ok) {
              return await retryResponse.json();
            }
          }
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);
          this.setAccessToken(null);
          throw new Error("Session expired. Please login again.");
        }
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  // Authentication endpoints
  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await this.request<AuthResponse["data"]>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    // Store access token for future requests
    if (response.success && response.data.accessToken) {
      this.setAccessToken(response.data.accessToken);
    }

    return response;
  }

  async register(userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }): Promise<AuthResponse> {
    return this.request<AuthResponse["data"]>("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  }

  async logout(): Promise<ApiResponse<null>> {
    const response = await this.request<null>("/auth/logout", {
      method: "POST",
    });

    // Clear stored access token
    this.setAccessToken(null);

    return response;
  }

  async getProfile(): Promise<ApiResponse<User>> {
    return this.request<User>("/auth/profile");
  }

  async refreshToken(): Promise<ApiResponse<{ accessToken: string }>> {
    return this.request<{ accessToken: string }>("/auth/refresh");
  }

  // Categories endpoints
  async getCategories(): Promise<
    ApiResponse<{ categories: Category[]; pagination: any }>
  > {
    return this.request<{ categories: Category[]; pagination: any }>(
      "/categories"
    );
  }

  async getCategory(id: string): Promise<ApiResponse<Category>> {
    return this.request<Category>(`/categories/${id}`);
  }

  async createCategory(categoryData: {
    name: string;
    description?: string;
  }): Promise<ApiResponse<Category>> {
    return this.request<Category>("/categories", {
      method: "POST",
      body: JSON.stringify(categoryData),
    });
  }

  async updateCategory(
    id: string,
    categoryData: {
      name?: string;
      description?: string;
      isActive?: boolean;
    }
  ): Promise<ApiResponse<Category>> {
    return this.request<Category>(`/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify(categoryData),
    });
  }

  async deleteCategory(id: string): Promise<ApiResponse<null>> {
    return this.request<null>(`/categories/${id}`, {
      method: "DELETE",
    });
  }

  // Decors endpoints
  async getDecors(params?: {
    category?: string;
    featured?: boolean;
    status?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<
    ApiResponse<{ decors: Decor[]; total: number; page: number; pages: number }>
  > {
    const queryParams = new URLSearchParams();

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }

    const queryString = queryParams.toString();
    const endpoint = queryString ? `/decors?${queryString}` : "/decors";

    return this.request<{
      decors: Decor[];
      total: number;
      page: number;
      pages: number;
    }>(endpoint);
  }

  async getDecor(id: string): Promise<ApiResponse<Decor>> {
    return this.request<Decor>(`/decors/${id}`);
  }

  async createDecor(
    decorData:
      | FormData
      | {
          name: string;
          description: string;
          category: string;
          price: number;
          discountPrice?: number;
          images: string[];
          stock: number;
          materials: string[];
          tags?: string[];
          featured?: boolean;
        }
  ): Promise<ApiResponse<Decor>> {
    const requestOptions: RequestInit = {
      method: "POST",
    };

    // Check if decorData is FormData or regular object
    if (decorData instanceof FormData) {
      requestOptions.body = decorData;
      // Don't set Content-Type header, let browser set it for FormData
    } else {
      requestOptions.body = JSON.stringify(decorData);
      requestOptions.headers = {
        "Content-Type": "application/json",
      };
    }

    return this.request<Decor>("/decors", requestOptions);
  }

  async updateDecor(
    id: string,
    decorData: Partial<Decor>
  ): Promise<ApiResponse<Decor>> {
    return this.request<Decor>(`/decors/${id}`, {
      method: "PUT",
      body: JSON.stringify(decorData),
    });
  }

  async deleteDecor(id: string): Promise<ApiResponse<null>> {
    return this.request<null>(`/decors/${id}`, {
      method: "DELETE",
    });
  }

  // Health check
  async healthCheck(): Promise<
    ApiResponse<{ status: string; timestamp: string }>
  > {
    return this.request<{ status: string; timestamp: string }>("/health");
  }
}

export const apiService = new ApiService();
export default apiService;
