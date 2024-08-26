import { ActionReducerMapBuilder, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

export interface CreateJobBody {
  title: string;
  company_name: string;
  location: string;
  salary: string;
  url: string;
}

export interface Job {
  id: string;
  title: string;
  company_name: string;
  location: string;
  salary: string;
  url: string;
}

export const createJob = createAsyncThunk('jobs/create', async ({ axiosPrivate, body }: { axiosPrivate: AxiosInstance; body: CreateJobBody }) => {
  const response = await axiosPrivate.post('/jobs', body);
  return response.data;
});

export interface JobsState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string;
  createBody: Job;
}

const initialState: JobsState = {
  status: 'idle',
  error: '',
  createBody: {
    id: '',
    title: '',
    company_name: '',
    location: '',
    salary: '',
    url: '',
  },
};

const jobsSlice = createSlice({
  name: 'jobs',
  initialState: initialState,
  reducers: {
    onChangeCreateJobValue: (state, action) => {
      Object.keys(action.payload).forEach((key) => {
        state.createBody = {
          ...state.createBody,
          [key]: action.payload[key],
        };
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createJob.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(createJob.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.createBody = initialState.createBody;
    });
    builder.addCase(createJob.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message || '';
    });
  },
});

export default jobsSlice;
