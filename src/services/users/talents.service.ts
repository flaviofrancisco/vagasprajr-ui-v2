import { ActionReducerMapBuilder, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { PagedResult } from '../search/search.service';
import { Filter } from '../common/filter-type';
import axios from '../axios';
import { UserProfile } from './users.service';

export interface GetTalentsRequest {
  sort: string;
  is_ascending: boolean;
  page: number;
  page_size: number;
  filters?: Filter[];
}

export const doGetTalentsPublic = createAsyncThunk('talents/GetTalents', async ({ request }: { request: GetTalentsRequest }) => {
  try {
    const response = await axios.post(`/talents`, request);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export interface JobsState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string;
  talent_result: PagedResult<UserProfile>;
  filter: GetTalentsRequest;
  talent: UserProfile;
}

const initialState: JobsState = {
  status: 'idle',
  error: '',
  talent_result: {
    Data: [],
    Page: 1,
    PerPage: 10,
    Total: 0,
  },
  filter: {
    sort: '',
    is_ascending: false,
    page: 1,
    page_size: 10,
  },
  talent: {} as UserProfile,
};

const talentsSlice = createSlice({
  name: 'talents',
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<GetTalentsRequest>) {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<JobsState>) => {
    builder.addCase(doGetTalentsPublic.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(doGetTalentsPublic.fulfilled, (state, action: PayloadAction<PagedResult<UserProfile>>) => {
      state.status = 'succeeded';
      state.talent_result = action.payload;
    });
    builder.addCase(doGetTalentsPublic.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message || '';
    });
  },
});

export default talentsSlice;
