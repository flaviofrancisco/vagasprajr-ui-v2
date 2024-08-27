import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import axios from '../axios';

export interface CreateJobBody {
  title: string;
  company_name: string;
  location: string;
  salary: string;
  url: string;
  description: string;
}

export interface JobView {
  code: string;
  title: string;
  proivder: string;
  created_at: string;
  company_name: string;
  location: string;
  salary: string;
  url: string;
  description: string;
}

export interface Job {
  id: string;
  title: string;
  company_name: string;
  location: string;
  salary: string;
  url: string;
  description: string;
}

export const createJob = createAsyncThunk('jobs/create', async ({ axiosPrivate, body }: { axiosPrivate: AxiosInstance; body: CreateJobBody }) => {
  const response = await axiosPrivate.post('/jobs', body);
  return response.data;
});

export const getJob = createAsyncThunk('jobs/get', async ({ code }: { code: string }) => {
  const response = await axios.get(`/jobs/${code}`);
  return response.data;
});

export interface JobsState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string;
  createBody: CreateJobBody;
  jobView: JobView;
}

const initialState: JobsState = {
  status: 'idle',
  error: '',
  createBody: {
    title: '',
    company_name: '',
    location: '',
    salary: '',
    url: '',
    description: '',
  } as CreateJobBody,
  jobView: {
    code: '',
    title: '',
    proivder: '',
    created_at: '',
    company_name: '',
    location: '',
    salary: '',
    url: '',
    description: '',
  } as JobView,
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
    builder.addCase(getJob.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getJob.fulfilled, (state, action) => {
      state.jobView = action.payload;
      state.status = 'succeeded';
    });
    builder.addCase(getJob.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message || '';
    });
  },
});

export default jobsSlice;
