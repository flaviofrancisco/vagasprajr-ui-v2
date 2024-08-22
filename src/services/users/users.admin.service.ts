import { ActionReducerMapBuilder, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { PagedResult } from '../search/search.service';

export const doGetUsers = createAsyncThunk('users/get', async ({ axiosPrivate, filters }: { axiosPrivate: AxiosInstance; filters: GetUsersRequest }) => {
  try {
    const response = await axiosPrivate.post('/admin/users', filters);
    const result = response.data as PagedResult<UserView>;

    if (typeof result?.Data === 'undefined' || result?.Data === null) {
      return {
        Data: [],
        Page: 0,
        PerPage: 20,
        Total: 0,
      } as PagedResult<UserView>;
    }

    return result;
  } catch (error) {
    throw error;
  }
});

export interface GetUsersRequest {
  sort: string;
  is_ascending: boolean;
  page: number;
  page_size: number;
  filters?: Filter[];
}

export interface Filter {
  operator: 'and' | 'or';
  fields: Field[];
}

export interface Field {
  type: string;
  name: string;
  value?: string;
  min_value?: string;
  max_value?: string;
}

export interface UserView {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  user_name: string;
  city: string;
  state: string;
  created_at: string;
  last_update: string;
  last_login: string;
}

export interface UsersAdminState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string;
  usersResult: PagedResult<UserView>;
  filters: GetUsersRequest;
}

const usersAdminSlice = createSlice({
  name: 'usersAdmin',
  initialState: {
    status: 'idle',
    error: '',
    usersResult: {
      Data: [],
      Page: 0,
      PerPage: 20,
      Total: 0,
    },
    filters: {
      sort: 'created_at',
      is_ascending: false,
      page: 0,
      page_size: 20,
    },
  } as UsersAdminState,
  reducers: {
    onFilterChange: (state, action: PayloadAction<GetUsersRequest>) => {
      state.filters = action.payload;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<UsersAdminState>) => {
    builder.addCase(doGetUsers.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(doGetUsers.fulfilled, (state, action: PayloadAction<PagedResult<UserView>>) => {
      state.status = 'succeeded';
      state.usersResult = action.payload as PagedResult<UserView>;
    });
    builder.addCase(doGetUsers.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message || '';
    });
  },
});

export default usersAdminSlice;
