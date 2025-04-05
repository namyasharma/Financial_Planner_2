import { create } from 'zustand';
import { authApi } from '../services/api';
import type { AuthTokens } from '../types/api';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  setTokens: (tokens: AuthTokens) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: localStorage.getItem('accessToken'),
  refreshToken: localStorage.getItem('refreshToken'),
  isAuthenticated: !!localStorage.getItem('accessToken'),
  
  setTokens: (tokens: AuthTokens) => {
    localStorage.setItem('accessToken', tokens.access);
    localStorage.setItem('refreshToken', tokens.refresh);
    set({ 
      accessToken: tokens.access, 
      refreshToken: tokens.refresh,
      isAuthenticated: true 
    });
  },

  login: async (username: string, password: string) => {
    const response = await authApi.login(username, password);
    if (response.data) {
      localStorage.setItem('accessToken', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh);
      set({ 
        accessToken: response.data.access,
        refreshToken: response.data.refresh,
        isAuthenticated: true 
      });
      return true;
    }
    return false;
  },

  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    set({ 
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false 
    });
  },
}));