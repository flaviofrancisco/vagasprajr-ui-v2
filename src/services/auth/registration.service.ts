import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import axios from '../axios';

export const doRegistration = createAsyncThunk('authRegistration/doRegistration', async (userInfo: UserInfo) => {
  try {
    const response = await axios.post('/auth/registration', userInfo, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: AxiosError | any) {
    throw error?.response?.data?.error;
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

interface UserInfo {
  email: string;
  password: string;
  confirmPassword: string;
}

interface AuthRegistrationState {
  isRegistered: boolean;
}

export interface AuthRegistrationSliceState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string;
  userInfo: UserInfo;
  registrationStatus: AuthRegistrationState;
  isEmailFocused: boolean;
  isEmailLostFocus: boolean;
  isValidEmail: boolean;
  isValidPassword: boolean;
  isPasswordMatch: boolean;
  isPasswordChanged: boolean;
}

const authRegistrationSlice = createSlice({
  name: 'authRegistration',
  initialState: {
    status: 'idle',
    error: '',
    userInfo: {
      email: '',
      password: '',
      confirmPassword: '',
      is_candidate: true,
      is_company: false,
      is_recruiter: false,
    } as UserInfo,
    registrationStatus: {
      isRegistered: false,
    } as AuthRegistrationState,
    isEmailFocused: false,
    isEmailLostFocus: false,
    isValidEmail: false,
    isValidPassword: false,
    isPasswordMatch: false,
    isPasswordChanged: false,
  } as AuthRegistrationSliceState,
  reducers: {
    onChangeFieldInput: (state, action) => {
      Object.keys(action.payload).forEach((key) => {
        state.userInfo = {
          ...state.userInfo,
          [key]: action.payload[key],
        };
      });
    },
    onSetError: (state, action) => {
      state.error = action.payload;
    },
    onEmailFocus: (state, action) => {
      state.isEmailFocused = action.payload;
    },
    onEmailBlur: (state, action) => {
      state.isEmailLostFocus = action.payload;
    },
    onValidEmail: (state, action) => {
      state.isValidEmail = action.payload;
    },
    onValidPassword: (state, action) => {
      state.isValidPassword = action.payload;
    },
    onPasswordMatch: (state, action) => {
      state.isPasswordMatch = action.payload;
    },
    onReset: (state) => {
      state.status = 'idle';
      state.error = '';
      state.userInfo = {
        email: '',
        password: '',
        confirmPassword: '',
      } as UserInfo;
      state.registrationStatus = {
        isRegistered: false,
      } as AuthRegistrationState;
      state.isEmailFocused = false;
      state.isEmailLostFocus = false;
      state.isValidEmail = false;
      state.isValidPassword = false;
      state.isPasswordMatch = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(doRegistration.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(doRegistration.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.registrationStatus = action.payload;
    });
    builder.addCase(doRegistration.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message ?? 'Não podemos registrar o usuário no momento.';
    });
    builder.addCase(resetPassword.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.isPasswordChanged = true;
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message ?? 'Senha não pode ser alterada no momento.';
    });
  },
});

export default authRegistrationSlice;
