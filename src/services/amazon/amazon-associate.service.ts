import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from '../axios';
import { Filter } from '../common/filter-type';
import { AxiosInstance } from 'axios';
import { PagedResult } from '../search/search.service';
import { DEFAULT_PAGE_SIZE } from '@/constants';

export interface GetPagedAdReferenceRequest {
  sort: string;
  is_ascending: boolean;
  page: number;
  page_size: number;
  filters?: Filter[];
}

export const updateAdReference = createAsyncThunk('amazon/updateAdReference', async ({ axiosPrivate, id, adReference }: { axiosPrivate: AxiosInstance; id: string; adReference: AdReference }) => {
  const response = await axiosPrivate.put(`/admin/ad-references/${id}`, adReference);
  return response.data;
});

export const getAdReference = createAsyncThunk('amazon/getAdReference', async ({ axiosPrivate, id }: { axiosPrivate: AxiosInstance; id: string }) => {
  const response = await axiosPrivate.get(`/admin/ad-references/${id}`);
  return response.data;
});

export const getAdReferences = createAsyncThunk('amazon/getAdReferences', async () => {
  const response = await axios.get('/shopping/ad-references');
  return response.data;
});

export const getAdFilteredReferences = createAsyncThunk('amazon/getFilteredAdReferences', async ({ axiosPrivate, filters }: { axiosPrivate: AxiosInstance; filters: GetPagedAdReferenceRequest }) => {
  const response = await axiosPrivate.post('/admin/ad-references', filters);
  return response.data;
});

export interface AmazonAssociateState {
  status: 'idle' | 'loading' | 'failed' | 'succeeded';
  error: string;
  adReferences: AdReference[];
  adReferenceResult: PagedResult<AdReference>;
  filter: GetPagedAdReferenceRequest;
  adReference: AdReference | null;
}

export interface AdReference {
  description?: string;
  is_active?: boolean;
  created_at?: string;
  image_url?: string;
  url?: string;
}

const amazonAssociateSlice = createSlice({
  name: 'amazon',
  initialState: {
    status: 'idle',
    error: '',
    adReference: {
      description: '',
      is_active: false,
      created_at: '',
      image_url: '',
      url: '',
    },
    adReferences: [] as AdReference[],
    adReferenceResult: {
      Data: [],
      Page: 1,
      PerPage: DEFAULT_PAGE_SIZE,
      Total: 0,
    } as PagedResult<AdReference>,
    filter: {
      sort: '',
      is_ascending: true,
      page: 1,
      page_size: DEFAULT_PAGE_SIZE,
    } as GetPagedAdReferenceRequest,
  } as AmazonAssociateState,
  reducers: {
    onFilterChange: (state, action: PayloadAction<GetPagedAdReferenceRequest>) => {
      state.filter = action.payload;
    },
    onChangeFieldInput: (state, action: PayloadAction<Partial<AdReference>>) => {
      state.error = '';
      Object.keys(action.payload).forEach((key) => {
        const value = action.payload[key as keyof AdReference];
        if (value !== undefined) {
          state.adReference = {
            ...state.adReference,
            [key]: value as any, // Ensure the type matches
          };
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAdReferences.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getAdReferences.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.adReferences = action.payload;
    });
    builder.addCase(getAdReferences.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message || '';
    });
    builder.addCase(getAdFilteredReferences.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getAdFilteredReferences.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.adReferenceResult = action.payload;
    });
    builder.addCase(getAdFilteredReferences.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message || '';
    });
    builder.addCase(getAdReference.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getAdReference.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.adReference = action.payload;
    });
    builder.addCase(getAdReference.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message || '';
    });
    builder.addCase(updateAdReference.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(updateAdReference.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.adReference = action.payload;
    });
    builder.addCase(updateAdReference.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message || '';
    });
  },
});

export default amazonAssociateSlice;
