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

export interface TalentsState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string;
  talent_result: PagedResult<UserProfile>;
  filter: GetTalentsRequest;
  talent: UserProfile;
}

const initialState: TalentsState = {
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
    onResetState: (state) => {
      state.status = 'idle';
      state.error = '';
      state.talent_result = {
        Data: [],
        Page: 1,
        PerPage: 10,
        Total: 0,
      };
      state.filter = {
        sort: '',
        is_ascending: false,
        page: 1,
        page_size: 10,
      };
      state.talent = {} as UserProfile;
    },
    onSetFilter: (state, action: PayloadAction<GetTalentsRequest>) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<TalentsState>) => {
    builder.addCase(doGetTalentsPublic.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(doGetTalentsPublic.fulfilled, (state, action: PayloadAction<PagedResult<UserProfile>>) => {
      state.status = 'succeeded';
      if (action.payload.Page > 1) {
        state.talent_result = {
          ...state.talent_result,
          Data: [...state.talent_result.Data, ...action.payload.Data],
          Page: action.payload.Page,
        };
      } else {
        state.talent_result = action.payload;
      }
    });
    builder.addCase(doGetTalentsPublic.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message || '';
    });
  },
});

export default talentsSlice;
