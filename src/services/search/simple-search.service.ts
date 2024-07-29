import axios from '@/services/axios';
import { DEFAULT_PAGE_SIZE } from '@/constants';
import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

const PROVIDERS = 'sites';
const LOCATIONS = 'locais';
const SALARIES = 'beneficios';
export interface SimpleSearchFilter {
  searchString: string;
  page: number;
  pageSize: number;
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

export const doSimpleSearch = createAsyncThunk(
  'simpleSearch/doSimpleSearch',
  async ({ filter }: { filter: SimpleSearchFilter }) => {
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
      const response = await axios.get<PagedResult<JobItem>>(
        `/simplesearch?search=${encodeURIComponent(filter.searchString)}&page=${
          filter.page
        }&pageSize=${filter.pageSize}`
      );
      pageResult = response.data;
      if (pageResult.Data === null) {
        pageResult.Data = [];
      }
    } catch (error) {
      console.error(error);
    }
    return pageResult;
  }
);

export interface SimpleSearchState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  loadedItems: number;
  searchExecuted: boolean;
  searchFilter: SimpleSearchFilter;
  searchResult: PagedResult<JobItem>;
  jobList: JobItem[];
  summary: { [key: string]: [{ [key: string]: number }] };
}

const initialState: SimpleSearchState = {
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
  summary: {} as { [key: string]: [{ [key: string]: number }] },
};

const simpleSearchSlice = createSlice({
  name: 'simpleSearch',
  initialState,
  reducers: {
    onResetState: (state: SimpleSearchState, action: PayloadAction<string>) => {
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
      state.summary = {} as { [key: string]: [{ [key: string]: number }] };
    },
    onLoadJobListSummary: (state: SimpleSearchState) => {
      if (state.summary === null || state.summary === undefined) {
        state.summary = {} as { [key: string]: [{ [key: string]: number }] };
      }

      state.jobList.forEach((job: JobItem) => {
        if (job.provider) {
          if (
            typeof state.summary[PROVIDERS] === 'undefined' ||
            state.summary[PROVIDERS] === null
          ) {
            state.summary[PROVIDERS] = [{ [job.provider]: 1 }];
          } else {
            let providerIndex = state.summary[PROVIDERS].findIndex(
              (p) => p[job.provider]
            );
            if (providerIndex === -1) {
              state.summary[PROVIDERS].push({ [job.provider]: 1 });
            } else {
              state.summary[PROVIDERS][providerIndex][job.provider] += 1;
            }
          }
        }
        // Update location summary
        if (job.location) {
          if (!state.summary[LOCATIONS]) {
            state.summary[LOCATIONS] = [{ [job.location]: 1 }];
          } else {
            let locationIndex = state.summary[LOCATIONS].findIndex(
              (l) => l[job.location]
            );
            if (locationIndex === -1) {
              state.summary[LOCATIONS].push({ [job.location]: 1 });
            } else {
              state.summary[LOCATIONS][locationIndex][job.location] += 1;
            }
          }
        }

        // Update salary summary
        if (job.salary) {
          if (!state.summary[SALARIES]) {
            state.summary[SALARIES] = [{ [job.salary]: 1 }];
          } else {
            let salaryIndex = state.summary[SALARIES].findIndex(
              (s) => s[job.salary ?? '']
            );
            if (salaryIndex === -1) {
              state.summary[SALARIES].push({ [job.salary]: 1 });
            } else {
              state.summary[SALARIES][salaryIndex][job.salary] += 1;
            }
          }
        }
      });
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<SimpleSearchState>) => {
    builder.addCase(
      doSimpleSearch.fulfilled,
      (state, action: PayloadAction<PagedResult<JobItem>>) => {
        if (
          state.loadedItems !== 1 &&
          state.loadedItems === action.payload.Total
        ) {
          return;
        }
        state.searchResult = action.payload;
        state.searchExecuted = true;
        if (
          typeof state.jobList === 'undefined' ||
          state.jobList === null ||
          state.jobList.length === 0
        ) {
          state.jobList = action.payload.Data;
        } else {
          state.jobList = [...state.jobList, ...state.searchResult.Data];
        }
        state.loadedItems = state.jobList.length;
        state.searchFilter.page = action.payload.Page;
        state.status = 'succeeded';
      }
    );
    builder.addCase(doSimpleSearch.rejected, (state) => {
      state.searchResult = {} as PagedResult<JobItem>;
    });
    builder.addCase(doSimpleSearch.pending, (state) => {
      state.searchResult = {} as PagedResult<JobItem>;
      state.status = 'loading';
    });
  },
});

export default simpleSearchSlice;
