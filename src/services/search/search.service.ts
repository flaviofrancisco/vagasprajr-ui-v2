import axios from '@/services/axios';
import { DEFAULT_PAGE_SIZE } from '@/constants';
import { ActionReducerMapBuilder, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export const PROVIDERS = 'providers';
export const LOCATIONS = 'locations';
export const SALARIES = 'salaries';
export const COMPANY_NAME = 'companies';

export interface SimpleSearchFilter {
  searchString: string;
  page: number;
  pageSize: number;
}

export interface AdvancedSearchFilter {
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

export const doSimpleSearch = createAsyncThunk('search/doSimpleSearch', async ({ filter }: { filter: SimpleSearchFilter }) => {
  let pageResult: PagedResult<JobItem> = {
    Data: [],
    Page: 1,
    PerPage: DEFAULT_PAGE_SIZE,
    Total: 0,
  } as PagedResult<JobItem>;

  if (filter.searchString === '') {
    return pageResult;
  }

  try {
    const response = await axios.get<PagedResult<JobItem>>(`/search?search=${encodeURIComponent(filter.searchString)}&page=${filter.page}&pageSize=${filter.pageSize}`);
    pageResult = response.data;
    if (pageResult.Data === null) {
      pageResult.Data = [];
    }
  } catch (error) {
    console.error(error);
  }
  return pageResult;
});

export const doAdvancedSearch = createAsyncThunk('search/doAdvancedSearch', async ({ filter }: { filter: AdvancedSearchFilter }) => {
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

export const doGetSummary = createAsyncThunk('search/doGetSummary', async ({ filter }: { filter: AdvancedSearchFilter }) => {
  let summary: { [key: string]: [] } = {};
  try {
    const response = await axios.post<{ [key: string]: [] }>('/getSummary', { ...filter });
    summary = response.data;
  } catch (error) {
    console.error(error);
  }
  return summary;
});

export interface SearchState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  loadedItems: number;
  searchExecuted: boolean;
  searchFilter: SimpleSearchFilter;
  searchResult: PagedResult<JobItem>;
  jobList: JobItem[];
  summary: { [key: string]: [] };
  advancedSearchFilter: AdvancedSearchFilter;
}

const initialState: SearchState = {
  status: 'idle',
  loadedItems: -1,
  searchExecuted: false,
  searchFilter: {
    searchString: '',
    page: 1,
    pageSize: DEFAULT_PAGE_SIZE,
  } as SimpleSearchFilter,
  searchResult: {
    Data: [],
    Page: 1,
    PerPage: DEFAULT_PAGE_SIZE,
    Total: 0,
  } as PagedResult<JobItem>,
  jobList: [] as JobItem[],
  summary: {},
  advancedSearchFilter: {
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
  } as AdvancedSearchFilter,
};

const simpleSearchSlice = createSlice({
  name: 'simpleSearch',
  initialState,
  reducers: {
    onResetState: (state: SearchState, action: PayloadAction<string>) => {
      state.status = 'idle';
      state.loadedItems = -1;
      state.searchExecuted = false;
      state.searchFilter = {
        searchString: action.payload,
        page: 1,
        pageSize: DEFAULT_PAGE_SIZE,
      } as SimpleSearchFilter;
      state.searchResult = {
        Data: [],
        Page: 1,
        PerPage: DEFAULT_PAGE_SIZE,
        Total: 0,
      } as PagedResult<JobItem>;
      state.jobList = [] as JobItem[];
      state.summary = {};
      state.advancedSearchFilter = {
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
      } as AdvancedSearchFilter;
    },
    onUpdateAdvancedSearchFilter: (state: SearchState, action: PayloadAction<AdvancedSearchFilter>) => {
      state.advancedSearchFilter = action.payload;
    },
    onRefreshJobList: (state: SearchState, action: PayloadAction<JobItem[]>) => {
      state.jobList = action.payload;
    },
    onChangeFilterCollection(state: SearchState, action: PayloadAction<{ title: string; checked: boolean; section: string; value: string }>) {
      state.advancedSearchFilter.title = action.payload.title;
      if (action.payload.section === PROVIDERS) {
      } else if (action.payload.section === LOCATIONS) {
      } else if (action.payload.section === SALARIES) {
      } else if (action.payload.section === COMPANY_NAME) {
        if (action.payload.checked) {
          state.advancedSearchFilter.companies = [...state.advancedSearchFilter.companies, action.payload.value];
        } else {
          state.advancedSearchFilter.companies = state.advancedSearchFilter.companies.filter((item: string) => item !== action.payload.value);
        }
      }
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<SearchState>) => {
    builder.addCase(doSimpleSearch.fulfilled, (state, action: PayloadAction<PagedResult<JobItem>>) => {
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
    builder.addCase(doSimpleSearch.rejected, (state) => {
      state.searchResult = {} as PagedResult<JobItem>;
      state.status = 'failed';
    });
    builder.addCase(doSimpleSearch.pending, (state) => {
      state.searchResult = {} as PagedResult<JobItem>;
      state.status = 'loading';
    });
    builder.addCase(doAdvancedSearch.fulfilled, (state, action: PayloadAction<PagedResult<JobItem>>) => {
      state.searchResult = action.payload;
      state.searchExecuted = true;
      state.jobList = action.payload.Data;
      state.loadedItems = state.jobList.length;
      state.searchFilter.page = action.payload.Page;
      state.status = 'succeeded';
    });
    builder.addCase(doAdvancedSearch.rejected, (state) => {
      state.searchResult = {} as PagedResult<JobItem>;
      state.status = 'failed';
    });
    builder.addCase(doAdvancedSearch.pending, (state) => {
      state.searchResult = {} as PagedResult<JobItem>;
      state.status = 'loading';
    });
    builder.addCase(doGetSummary.fulfilled, (state, action: PayloadAction<{ [key: string]: [] }>) => {
      state.summary = action.payload;
    });
    builder.addCase(doGetSummary.rejected, (state) => {
      state.summary = {};
    });
    builder.addCase(doGetSummary.pending, (state) => {
      state.summary = {};
    });
  },
});

export default simpleSearchSlice;
