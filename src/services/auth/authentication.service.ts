import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios';

export const emailConfirmation = createAsyncThunk('authentication/emailConfirmation', async (token: string) => {
  try {
    const response = await axios.get(`/auth/validate-token`, {
      params: {
        token,
      },
    });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
});

export const doAuthentication = createAsyncThunk('authentication/doAuthentication', async (request: AuthRequest) => {
  try {
    const response = await axios.post('/auth/login', request, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
});

export const fetchRefreshToken = createAsyncThunk('authentication/fetchRefreshToken', async () => {
  const response = await axios.get('/auth/refresh-token', {
    withCredentials: true,
  });

  return response.data;
});

export const logoutUser = createAsyncThunk('auth/logout', async () => {
  await axios.get('/auth/logout', {
    withCredentials: true,
  });
  return;
});

export const requestPasswordReset = createAsyncThunk('auth/requestPasswordReset', async ({ email }: { email: string }) => {
  const response = await axios.post('/auth/recovery', { email });
  return response.data;
});

export interface AuthenticationState {
  status: 'idle' | 'loading' | 'failed' | 'succeeded';
  error: string;
  isAuthenticated: boolean;
  isLogout: boolean;
  authSession: AuthResponse;
  refreshToken: string;
  isEmailConfirmed: boolean;
}

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: {
    status: 'idle',
    error: '',
    isAuthenticated: false,
    isLogout: false,
    authSession: {} as AuthResponse,
    refreshToken: '',
    isEmailConfirmed: false,
  } as AuthenticationState,
  reducers: {
    onLogout: (state) => {
      state.isLogout = true;
      state.isAuthenticated = false;
      state.authSession = {} as AuthResponse;
    },
    onSetToken: (state, action) => {
      state.isLogout = false;
      state.isAuthenticated = true;
      state.authSession = action.payload as AuthResponse;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(doAuthentication.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(doAuthentication.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.status = 'failed';
        state.error = action.payload.error;
        state.isAuthenticated = false;
        state.authSession = {} as AuthResponse;
        state.isLogout = false;
        return;
      }

      state.error = '';
      state.isAuthenticated = true;
      state.isLogout = false;
      state.status = 'succeeded';
      state.authSession = action.payload as AuthResponse;
      state.isAuthenticated = state.authSession.success;
    });
    builder.addCase(doAuthentication.rejected, (state, action) => {
      state.status = 'failed';
      state.error = (action?.error?.message as string) ?? 'Verifique seu e-mail e senha e tente novamente.';
      state.isAuthenticated = false;
      state.authSession = {} as AuthResponse;
      state.isLogout = false;
    });
    builder.addCase(fetchRefreshToken.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(fetchRefreshToken.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.refreshToken = action.payload.access_token;
      state.isAuthenticated = state.authSession.success;
    });
    builder.addCase(fetchRefreshToken.rejected, (state, action) => {
      state.status = 'failed';
      state.error = (action?.error?.message as string) ?? 'Verifique seu e-mail e senha e tente novamente.';
      state.isAuthenticated = false;
      state.authSession = {} as AuthResponse;
      state.isLogout = false;
    });
    builder.addCase(logoutUser.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.isLogout = true;
      state.isAuthenticated = false;
      state.authSession = {
        access_token: '',
        success: false,
        user_info: {
          id: '',
          email: '',
          first_name: '',
          last_name: '',
        },
      };
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.status = 'failed';
      state.error = (action?.error?.message as string) ?? 'Verifique seu e-mail e senha e tente novamente.';
      state.isAuthenticated = false;
      state.authSession = {} as AuthResponse;
      state.isLogout = false;
    });
    builder.addCase(emailConfirmation.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(emailConfirmation.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.isEmailConfirmed = action.payload?.isValid ?? false;
    });
    builder.addCase(emailConfirmation.rejected, (state, action) => {
      state.status = 'failed';
      state.error = (action?.error?.message as string) ?? 'Token inválido.';
      state.isAuthenticated = false;
      state.authSession = {} as AuthResponse;
      state.isLogout = false;
    });
    builder.addCase(requestPasswordReset.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(requestPasswordReset.fulfilled, (state, action) => {
      state.status = 'succeeded';
    });
    builder.addCase(requestPasswordReset.rejected, (state, action) => {
      state.status = 'failed';
      state.error = (action?.error?.message as string) ?? 'Token inválido.';
      state.isAuthenticated = false;
      state.authSession = {} as AuthResponse;
      state.isLogout = false;
    });
  },
});

export default authenticationSlice;

export interface AuthResponse {
  access_token: string;
  success: boolean;
  user_info: UserInfo;
}

export interface RefreshTokenResponse {
  access_token: string;
}

export interface AuthRequest {
  email: string;
  password: string;
}

export interface UserInfo {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
}
