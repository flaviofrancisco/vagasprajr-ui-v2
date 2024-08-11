import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import axios from '../axios';
import { on } from 'events';

export const forgottenPassword = createAsyncThunk('auth/forgottenPassword', async (email: string) => {
  try {
    const response = await axios.post('/auth/forgotten-password', { email });
    return response.data;
  } catch (error: AxiosError | any) {
    throw error?.response?.data?.error;
  }
});

export const verifyResetToken = createAsyncThunk('auth/verifyResetToken', async (token: string) => {
  try {
    const response = await axios.post('/auth/verify-reset-token', { token });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
});

export const resetPassword = createAsyncThunk('auth/resetPassword', async ({ token, password }: { token: string; password: string }) => {
  try {
    const response = await axios.post('/auth/reset-password', { token, password });
    return response.data;
  } catch (error: AxiosError | any) {
    throw error?.response?.data?.error;
  }
});

interface AuthPasswordResetState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  isPasswordReset: boolean;
  isTokenValid: boolean;
  isValidPassword: boolean;
  isPasswordMatched: boolean;
  error: string;
  resetPasswordForm: ResetPasswordForm;
}

interface ResetPasswordForm {
  password: string;
  confirmPassword: string;
}

const passwordResetSlice = createSlice({
  name: 'passwordReset',
  initialState: {
    status: 'idle',
    error: '',
    isPasswordReset: false,
    isTokenValid: false,
    isValidPassword: false,
    isPasswordMatched: false,
    resetPasswordForm: {
      password: '',
      confirmPassword: '',
    },
  } as AuthPasswordResetState,
  reducers: {
    resetPasswordState: (state) => {
      state.isPasswordReset = false;
      state.isTokenValid = false;
      state.isValidPassword = false;
      state.isPasswordMatched = false;
      state.error = '';
      state.status = 'idle';
      state.resetPasswordForm = {
        password: '',
        confirmPassword: '',
      };
    },
    onChangeField: (state, action) => {
      Object.keys(action.payload).forEach((key) => {
        state.resetPasswordForm = {
          ...state.resetPasswordForm,
          [key]: action.payload[key],
        };
      });
    },
    onValidPassword: (state, action) => {
      state.isValidPassword = action.payload;
    },
    onPasswordMatch: (state, action) => {
      state.isPasswordMatched = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(forgottenPassword.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(forgottenPassword.fulfilled, (state) => {
      state.status = 'succeeded';
    });
    builder.addCase(forgottenPassword.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message as string;
    });
    builder.addCase(verifyResetToken.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(verifyResetToken.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.isTokenValid = action.payload;
    });
    builder.addCase(verifyResetToken.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message as string;
    });
    builder.addCase(resetPassword.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(resetPassword.fulfilled, (state) => {
      state.status = 'succeeded';
      state.isPasswordReset = true;
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message as string;
    });
  },
});

export default passwordResetSlice;
