import { ActionReducerMapBuilder, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

export interface UserProfile {
  first_name: string;
  last_name: string;
  email: string;
  links: UserLink[];
  profile_image_url: string;
  city?: string;
  state?: string;
}

export interface UserLink {
  url: string;
}

export const doGetUserProfile = createAsyncThunk('users/profile', async ({ axiosPrivate }: { axiosPrivate: AxiosInstance }) => {
  try {
    const response = await axiosPrivate.get('http://localhost:3001/users/profile');
    return response.data;
  } catch (error) {
    throw error;
  }
});

interface UsersState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string;
  profile: UserProfile;
}

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    status: 'idle',
    error: '',
    profile: {
      profile_image_url: '',
      first_name: '',
      last_name: '',
      email: '',
      links: [],
    },
  } as UsersState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<UsersState>) => {
    builder.addCase(doGetUserProfile.pending, (state: UsersState) => {
      state.status = 'loading';
    });
    builder.addCase(doGetUserProfile.fulfilled, (state: UsersState, action: PayloadAction<UserProfile>) => {
      state.status = 'succeeded';
      state.profile = action.payload;
    });
    builder.addCase(doGetUserProfile.rejected, (state: UsersState) => {
      state.status = 'failed';
    });
  },
});

export default usersSlice;
