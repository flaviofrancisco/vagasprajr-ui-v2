import axios from '@/services/axios';
import { DEFAULT_PAGE_SIZE } from '@/constants';
import { ActionReducerMapBuilder, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export const PROVIDERS = 'providers';
export const LOCATIONS = 'locations';
export const SALARIES = 'salaries';
export const COMPANY_NAME = 'companies';

export interface SearchFilter {
  title: string;
  company_name: string;
  location: string;
  salary: string;
  provider: string;
  page: number;
  pageSize: number;
  isBookmarkedOnly?: boolean;
  companies: string[];
  locations: string[];
  salaries: string[];
  providers: string[];
}

export interface PagedResult<T> {
  Data: T[];
  Page: number;
  PerPage: number;
  Total: number;
}

export interface JobItem {
  id?: string;
  code: string;
  title: string;
  function: string;
  industry: string;
  company_name: string;
  created_at: string;
  location: string;
  job_date?: string;
  salary?: string;
  url?: string;
  provider: string;
  ad_item?: AdData;
  description?: string;
  job_short_url?: string;
  remote?: string;
  job_details_url?: string;
  is_bookmarked?: boolean;
  creator: string;
  is_approved: boolean;
  is_closed: boolean;
  qty_clicks: number;
  contract_type: string;
  home_office: string;
  affirmative_parameters: AffirmativeJobParameter;
  posted_on_twitter: boolean;
  posted_on_bluesky: boolean;
  posted_on_discord: boolean;
  posted_on_telegram: boolean;
  posted_on_facebook: boolean;
}

export interface AdData {
  url: string;
  image: string;
}

export interface AffirmativeJobParameter {
  is_black_person: boolean;
  is_women: boolean;
  is_lgbtqia: boolean;
  is_indigenous: boolean;
  is_person_with_disabilities: boolean;
}

export const doSearch = createAsyncThunk('search/doSearch', async ({ filter }: { filter: SearchFilter }) => {
  let pageResult: PagedResult<JobItem> = {
    Data: [],
    Page: 1,
    PerPage: DEFAULT_PAGE_SIZE,
    Total: 0,
  } as PagedResult<JobItem>;
  try {
    const response = await axios.post<PagedResult<JobItem>>('/search', { ...filter });
    pageResult = response.data;
    if (pageResult.Data === null) {
      pageResult.Data = [];
    }
  } catch (error) {
    console.error(error);
  }
  return pageResult;
});

export interface SearchState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  loadedItems: number;
  searchExecuted: boolean;
  searchResult: PagedResult<JobItem>;
  jobList: JobItem[];
  searchFilter: SearchFilter;
}

const initialState: SearchState = {
  status: 'idle',
  loadedItems: -1,
  searchExecuted: false,
  searchResult: {
    Data: [],
    Page: 1,
    PerPage: DEFAULT_PAGE_SIZE,
    Total: 0,
  } as PagedResult<JobItem>,
  jobList: [] as JobItem[],
  searchFilter: {
    title: '',
    company_name: '',
    location: '',
    salary: '',
    provider: '',
    page: 1,
    pageSize: DEFAULT_PAGE_SIZE,
    isBookmarkedOnly: false,
    companies: [],
    locations: [],
    salaries: [],
    providers: [],
  } as SearchFilter,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    onResetState: (state: SearchState, action: PayloadAction<string>) => {
      state.status = 'idle';
      state.loadedItems = -1;
      state.searchExecuted = false;
      state.searchResult = {
        Data: [],
        Page: 1,
        PerPage: DEFAULT_PAGE_SIZE,
        Total: 0,
      } as PagedResult<JobItem>;
      state.jobList = [] as JobItem[];
      state.searchFilter = {
        title: action.payload,
        company_name: '',
        location: '',
        salary: '',
        provider: '',
        page: 1,
        pageSize: DEFAULT_PAGE_SIZE,
        isBookmarkedOnly: false,
        companies: [],
        locations: [],
        salaries: [],
        providers: [],
      } as SearchFilter;
    },
    onUpdateSearchFilter: (state: SearchState, action: PayloadAction<SearchFilter>) => {
      state.searchFilter = action.payload;
    },
    onRefreshJobList: (state: SearchState, action: PayloadAction<JobItem[]>) => {
      state.jobList = action.payload;
    },
    onChangeFilterCollection(state: SearchState, action: PayloadAction<{ title: string; checked: boolean; section: string; value: string }>) {
      state.searchFilter.title = action.payload.title;
      if (action.payload.section === PROVIDERS) {
      } else if (action.payload.section === LOCATIONS) {
      } else if (action.payload.section === SALARIES) {
      } else if (action.payload.section === COMPANY_NAME) {
        if (action.payload.checked) {
          state.searchFilter.companies = [...state.searchFilter.companies, action.payload.value];
        } else {
          state.searchFilter.companies = state.searchFilter.companies.filter((item: string) => item !== action.payload.value);
        }
      }
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<SearchState>) => {
    builder.addCase(doSearch.fulfilled, (state, action: PayloadAction<PagedResult<JobItem>>) => {
      if (state.loadedItems !== 1 && state.loadedItems === action.payload.Total) {
        return;
      }
      state.searchResult = action.payload;
      state.searchExecuted = true;
      if (typeof state.jobList === 'undefined' || state.jobList === null || state.jobList.length === 0) {
        state.jobList = action.payload.Data;
      } else {
        state.jobList = [...state.jobList, ...state.searchResult.Data];
      }
      state.loadedItems = state.jobList.length;
      state.searchFilter.page = action.payload.Page;
      state.status = 'succeeded';
    });
    builder.addCase(doSearch.rejected, (state) => {
      state.searchResult = {} as PagedResult<JobItem>;
      state.status = 'failed';
    });
    builder.addCase(doSearch.pending, (state) => {
      state.searchResult = {} as PagedResult<JobItem>;
      state.status = 'loading';
    });
  },
});

export default searchSlice;