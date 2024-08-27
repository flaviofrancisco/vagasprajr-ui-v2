import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import axios from '../axios';
import { Filter } from '../common/filter-type';
import { PagedResult } from '../search/search.service';
import { DEFAULT_PAGE_SIZE } from '@/constants';

export interface GetJobsRequest {
  sort: string;
  is_ascending: boolean;
  page: number;
  page_size: number;
  filters?: Filter[];
}

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
  is_approved: boolean;
  is_closed: boolean;
}

export interface Job {
  id: string;
  title: string;
  company_name: string;
  location: string;
  salary: string;
  url: string;
  description: string;
  code: string;
}

export const getJobs = createAsyncThunk('jobs/getAll', async ({ axiosPrivate, filters }: { axiosPrivate: AxiosInstance; filters: GetJobsRequest }) => {
  const response = await axiosPrivate.post('/admin/jobs', filters);
  return response.data;
});

export const updateJob = createAsyncThunk('jobs/update', async ({ axiosPrivate, body }: { axiosPrivate: AxiosInstance; body: Job }) => {
  const response = await axiosPrivate.put(`/admin/jobs/${body.code}`, body);
  return response.data;
});

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
  jobsResult: PagedResult<Job>;
  filter: GetJobsRequest;
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
  jobsResult: {
    Data: [],
    Page: 1,
    PerPage: 12,
    Total: 0,
  } as PagedResult<Job>,
  filter: {
    sort: '',
    is_ascending: true,
    page: 1,
    page_size: DEFAULT_PAGE_SIZE,
  } as GetJobsRequest,
};

const jobsSlice = createSlice({
  name: 'jobs',
  initialState: initialState,
  reducers: {
    onFilterChange: (state, action: PayloadAction<GetJobsRequest>) => {
      state.filter = action.payload;
    },
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
    builder.addCase(updateJob.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(updateJob.fulfilled, (state) => {
      state.status = 'succeeded';
    });
    builder.addCase(updateJob.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message || '';
    });
    builder.addCase(getJobs.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getJobs.fulfilled, (state, action) => {
      state.jobsResult = action.payload;
      state.status = 'succeeded';
    });
    builder.addCase(getJobs.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message || '';
    });
  },
});

export default jobsSlice;
