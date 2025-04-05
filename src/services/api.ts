import axios from 'axios';
import { Budget, Expense, Investment, User, ApiResponse, AuthTokens } from '../types/api';
import { useAuthStore } from '../store/authStore';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Add response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error is 401 and we haven't tried to refresh the token yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        const response = await axios.post(`${API_URL}/auth/token/refresh/`, {
          refresh: refreshToken,
        });

        const { access } = response.data;
        useAuthStore.getState().setTokens({ access, refresh: refreshToken });

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${access}`;
        return axios(originalRequest);
      } catch (refreshError) {
        // If refresh fails, log out the user
        useAuthStore.getState().logout();
        throw refreshError;
      }
    }

    return Promise.reject(error);
  }
);

export const authApi = {
  login: async (username: string, password: string): Promise<ApiResponse<AuthTokens>> => {
    try {
      const response = await api.post('/auth/token/', { username, password });
      return { data: response.data };
    } catch (error: any) {
      console.error('Login error:', error.response?.data);
      return { 
        data: null, 
        error: error.response?.data?.detail || error.response?.data?.error || 'Login failed' 
      };
    }
  },

  register: async (username: string, email: string, password: string): Promise<ApiResponse<User>> => {
    try {
      const response = await api.post('/auth/register/', {
        username,
        email,
        password,
        password2: password
      });
      return { data: response.data };
    } catch (error: any) {
      console.error('Registration error:', error.response?.data);
      
      let errorMessage = 'Registration failed';
      
      if (error.response?.data) {
        const data = error.response.data;
        if (typeof data === 'string') {
          errorMessage = data;
        } else if (data.detail) {
          errorMessage = data.detail;
        } else if (data.error) {
          errorMessage = data.error;
        } else if (typeof data === 'object') {
          const fieldErrors = Object.entries(data)
            .map(([field, errors]) => `${field}: ${Array.isArray(errors) ? errors.join(', ') : errors}`)
            .join('; ');
          if (fieldErrors) {
            errorMessage = fieldErrors;
          }
        }
      }
      
      return { 
        data: null, 
        error: errorMessage
      };
    }
  },
};

export const budgetApi = {
  getBudgets: async (): Promise<ApiResponse<Budget[]>> => {
    try {
      const response = await api.get('/budgets/');
      return { data: response.data };
    } catch (error: any) {
      return { 
        data: [], 
        error: error.response?.data?.detail || 'Failed to fetch budgets' 
      };
    }
  },
  createBudget: async (budget: Omit<Budget, 'id' | 'user'>): Promise<ApiResponse<Budget>> => {
    try {
      const response = await api.post('/budgets/', budget);
      return { data: response.data };
    } catch (error: any) {
      return { 
        data: null, 
        error: error.response?.data?.detail || 'Failed to create budget' 
      };
    }
  },
};

export const expenseApi = {
  getExpenses: async (): Promise<ApiResponse<Expense[]>> => {
    try {
      const response = await api.get('/expenses/');
      return { data: response.data };
    } catch (error: any) {
      return { 
        data: [], 
        error: error.response?.data?.detail || 'Failed to fetch expenses' 
      };
    }
  },
  createExpense: async (expense: Omit<Expense, 'id' | 'user'>): Promise<ApiResponse<Expense>> => {
    try {
      const response = await api.post('/expenses/', expense);
      return { data: response.data };
    } catch (error: any) {
      return { 
        data: null, 
        error: error.response?.data?.detail || 'Failed to create expense' 
      };
    }
  },
};

export const investmentApi = {
  getInvestments: async (): Promise<ApiResponse<Investment[]>> => {
    try {
      const response = await api.get('/investments/');
      return { data: response.data };
    } catch (error: any) {
      return { 
        data: [], 
        error: error.response?.data?.detail || 'Failed to fetch investments' 
      };
    }
  },
  createInvestment: async (investment: Omit<Investment, 'id' | 'user'>): Promise<ApiResponse<Investment>> => {
    try {
      const response = await api.post('/investments/', investment);
      return { data: response.data };
    } catch (error: any) {
      return { 
        data: null, 
        error: error.response?.data?.detail || 'Failed to create investment' 
      };
    }
  },
};