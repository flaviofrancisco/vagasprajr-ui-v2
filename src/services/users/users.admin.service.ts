import { ActionReducerMapBuilder, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { PagedResult } from '../search/search.service';
import { Filter } from '../common/filter-type';

const DEFAULT_PAGE_SIZE = 12;

export const doGetUsers = createAsyncThunk('users/get', async ({ axiosPrivate, filters }: { axiosPrivate: AxiosInstance; filters: GetUsersRequest }) => {
  try {
    const response = await axiosPrivate.post('/admin/users', filters);
    const result = response.data as PagedResult<UserView>;

    if (typeof result?.Data === 'undefined' || result?.Data === null) {
      return {
        Data: [],
        Page: 0,
        PerPage: DEFAULT_PAGE_SIZE,
        Total: 0,
      } as PagedResult<UserView>;
    }

    return result;
  } catch (error) {
    throw error;
  }
});

export const doDeleteUser = createAsyncThunk('users/delete', async ({ axiosPrivate, userId }: { axiosPrivate: AxiosInstance; userId: string }) => {
  try {
    await axiosPrivate.delete(`/admin/users/${userId}`);
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
      PerPage: DEFAULT_PAGE_SIZE,
      Total: 0,
    },
    filters: {
      sort: 'created_at',
      is_ascending: false,
      page: 0,
      page_size: DEFAULT_PAGE_SIZE,
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
    builder.addCase(doDeleteUser.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(doDeleteUser.fulfilled, (state) => {
      state.status = 'succeeded';
    });
    builder.addCase(doDeleteUser.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message || '';
    });
  },
});

export default usersAdminSlice;
