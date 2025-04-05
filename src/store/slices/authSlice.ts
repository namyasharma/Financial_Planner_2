import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../../services/api';
import type { AuthTokens } from '../../types/api';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  accessToken: localStorage.getItem('accessToken'),
  refreshToken: localStorage.getItem('refreshToken'),
  isAuthenticated: !!localStorage.getItem('accessToken'),
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }: { username: string; password: string }) => {
    const response = await authApi.login(username, password);
    if (response.error) throw new Error(response.error);
    return response.data as AuthTokens;
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async ({ username, email, password }: { username: string; email: string; password: string }) => {
    const response = await authApi.register(username, email, password);
    if (response.error) throw new Error(response.error);
    // After registration, login automatically
    const loginResponse = await authApi.login(username, password);
    if (loginResponse.error) throw new Error(loginResponse.error);
    return loginResponse.data as AuthTokens;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    setTokens: (state, action) => {
      const { access, refresh } = action.payload;
      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);
      state.accessToken = access;
      state.refreshToken = refresh;
      state.isAuthenticated = true;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.access;
        state.refreshToken = action.payload.refresh;
        state.isAuthenticated = true;
        localStorage.setItem('accessToken', action.payload.access);
        localStorage.setItem('refreshToken', action.payload.refresh);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed';
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.access;
        state.refreshToken = action.payload.refresh;
        state.isAuthenticated = true;
        localStorage.setItem('accessToken', action.payload.access);
        localStorage.setItem('refreshToken', action.payload.refresh);
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Registration failed';
      });
  },
});

export const { logout, setTokens, clearError } = authSlice.actions;
export default authSlice.reducer;