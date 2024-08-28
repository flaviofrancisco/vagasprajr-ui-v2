import { ActionReducerMapBuilder, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import axios from '../axios';

export interface UserProfile {
  first_name: string;
  last_name: string;
  email: string;
  about_me?: string;
  links: UserLink[];
  profile_image_url: string;
  city?: string;
  state?: string;
  experiences?: UserExperience[];
  educations?: UserEducation[];
  certifications?: UserCertification[];
  idioms_info?: UserIdiomInfo[];
  tech_experiences?: UserTechExperience[];
}

export interface UserIdiomInfo {
  id: number;
  name: string;
  level: string;
}

export interface UserCertification {
  id: number;
  name: string;
  credential_id: string;
  credential_url: string;
  issuing_company: string;
  start_date: string;
  end_date: string;
}

export interface UserTechExperience {
  id: number;
  experience_number: number;
  experience_time: string;
  technology: string;
}

export interface UserExperience {
  id: number;
  company: string;
  position: string;
  description: string;
  start_date: string;
  end_date: string;
}

export interface UserEducation {
  id: number;
  course: string;
  degree: string;
  description: string;
  start_date: string;
  end_date: string;
  field_of_study: string;
  grade: string;
  institution: string;
}

export interface UserLink {
  url: string;
}

export const doGetUserPublicProfile = createAsyncThunk('users/publicProfile', async ({ userName }: { userName: string }) => {
  try {
    const response = await axios.get(`/users/profile/${userName}`);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const doGetUserProfile = createAsyncThunk('users/profile', async ({ axiosPrivate, userId }: { axiosPrivate: AxiosInstance; userId?: string }) => {
  try {
    if (typeof userId === 'undefined' || userId === null || userId === '') {
      const response = await axiosPrivate.get('/users/profile');
      return response.data;
    } else {
      const response = await axiosPrivate.get(`/admin/users/${userId}`);
      return response.data;
    }
  } catch (error) {
    throw error;
  }
});

export const doUpdateUserProfile = createAsyncThunk('users/update', async ({ axiosPrivate, profile }: { axiosPrivate: AxiosInstance; profile: UserProfile }) => {
  try {
    const response = await axiosPrivate.put('/users/profile', profile);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const tryUpdateUserName = createAsyncThunk('users/updateUserName', async ({ axiosPrivate, user_name }: { axiosPrivate: AxiosInstance; user_name: string }) => {
  try {
    const response = await axiosPrivate.post(`/users/username`, { user_name });
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.error) {
      throw new Error(error.response?.data?.error);
    }
    throw error;
  }
});

export interface UsersState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string;
  profile: UserProfile;
  success_message?: string;
}

const initialState: UsersState = {
  status: 'idle',
  error: '',
  profile: {
    profile_image_url: '',
    first_name: '',
    last_name: '',
    email: '',
    links: [],
    about_me: '',
  },
};

const usersSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    onResetMessages: (state) => {
      state.error = '';
      state.success_message = '';
    },
    onChangeFieldInput: (state, action) => {
      state.error = '';
      state.success_message = '';
      Object.keys(action.payload).forEach((key) => {
        state.profile = {
          ...state.profile,
          [key]: action.payload[key],
        };
      });
    },
  },
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
    builder.addCase(doUpdateUserProfile.pending, (state: UsersState) => {
      state.status = 'loading';
    });
    builder.addCase(doUpdateUserProfile.fulfilled, (state: UsersState, action: PayloadAction<UserProfile>) => {
      state.status = 'succeeded';
      state.profile = action.payload;
    });
    builder.addCase(doUpdateUserProfile.rejected, (state: UsersState) => {
      state.status = 'failed';
    });
    builder.addCase(tryUpdateUserName.pending, (state: UsersState) => {
      state.status = 'loading';
    });
    builder.addCase(tryUpdateUserName.fulfilled, (state: UsersState, action: PayloadAction<any>) => {
      state.status = 'succeeded';
      state.success_message = action.payload.message;
      state.error = '';
    });
    builder.addCase(tryUpdateUserName.rejected, (state: UsersState, action: any) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
    builder.addCase(doGetUserPublicProfile.pending, (state: UsersState) => {
      state.status = 'loading';
    });
    builder.addCase(doGetUserPublicProfile.fulfilled, (state: UsersState, action: PayloadAction<UserProfile>) => {
      state.status = 'succeeded';
      state.profile = action.payload;
    });
    builder.addCase(doGetUserPublicProfile.rejected, (state: UsersState) => {
      state.status = 'failed';
    });
  },
});

export default usersSlice;
