import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios';
import exp from 'constants';

export const getAdReferences = createAsyncThunk('amazon/getAdReferences', async () => {
  const response = await axios.get('/shopping/ad-references');
  return response.data;
});

export interface AmazonAssociateState {
  status: 'idle' | 'loading' | 'failed' | 'succeeded';
  error: string;
  adReferences: AdReference[];
}

export interface AdReference {
  id: string;
  description: string;
  is_active: boolean;
  created_at: string;
  image_url: string;
}

const amazonAssociateSlice = createSlice({
  name: 'amazon',
  initialState: {
    status: 'idle',
    error: '',
    adReferences: [] as AdReference[],
  } as AmazonAssociateState,
  reducers: {},
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
  },
});

export default amazonAssociateSlice;
