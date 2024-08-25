import { AuthResponse } from '@/services/auth/authentication.service';
import axios from '@/services/axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loginUsingGoogle = createAsyncThunk('googleAuth/loginUsingGoogle', async (access_token: string) => {
  const response = await axios.post<any>(
    '/oauth/google',
    { access_token },
    {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    }
  );
  return response?.data;
});

const googleAuthSlice = createSlice({
  name: 'googleAuth',
  initialState: {
    status: 'idle',
    error: '',
    googleUserInfo: {} as AuthResponse,
    isLogin: false,
    isLogout: false,
  } as GoogleAuthState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUsingGoogle.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(loginUsingGoogle.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.googleUserInfo = action.payload as AuthResponse;
    });
    builder.addCase(loginUsingGoogle.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message as string;
    });
  },
});

export default googleAuthSlice;

export interface GoogleAuthState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string;
  googleUserInfo: AuthResponse;
  isLogin: boolean;
  isLogout: boolean;
}
