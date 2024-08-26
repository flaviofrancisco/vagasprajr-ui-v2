import { ActionReducerMapBuilder, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

export interface AuthorizationRequest {
  roles: string[];
}

export const AdminRole = '650d5e137ece568cd2f11a0a';

export const doAuthorization = createAsyncThunk(
  'authorization/doAuthorization',
  async ({ access_token, request, axiosPrivate }: { access_token: string; request: AuthorizationRequest; axiosPrivate: AxiosInstance }) => {
    try {
      const response = await axiosPrivate.post('/auth/authorize', request, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  }
);

export interface AuthorizationState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string;
  isAuthorized: boolean;
}

const authorizationSlice = createSlice({
  name: 'authorization',
  initialState: {
    status: 'idle',
    error: '',
    isAuthorized: false,
  } as AuthorizationState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<AuthorizationState>) => {
    builder.addCase(doAuthorization.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(doAuthorization.fulfilled, (state, action: PayloadAction<any>) => {
      state.status = 'succeeded';
      state.isAuthorized = action.payload.isAuthorized;
    });
    builder.addCase(doAuthorization.rejected, (state, action: any) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  },
});

export default authorizationSlice;
