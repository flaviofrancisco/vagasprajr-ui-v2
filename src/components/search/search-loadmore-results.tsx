'use client';

import { useSelector } from 'react-redux';
import { useEffect, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import { useAppDispatch } from '@/services/store';
import simpleSearchSlice, { doAdvancedSearch, doSimpleSearch } from '@/services/search/search.service';
import SearchResultsList from './serach-result-list';
import { Spinner } from '../common/spinner';

export default function SearchLoadMoreResults() {
  const dispatch = useAppDispatch();
  const { ref, inView } = useInView();

  const { searchResult, searchFilter, jobList, loadedItems } = useSelector((state: any) => state.simpleSearch);
  const { onLoadJobListSummary, onRefreshJobList } = simpleSearchSlice.actions;

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const loadMoreJobs = useCallback(async () => {
    await delay(1000);
    if (jobList.length === searchResult.Total) {
      return;
    }
    await dispatch(doSimpleSearch({ filter: { ...searchFilter, page: searchFilter.page + 1 } }));

    dispatch(onLoadJobListSummary());
  }, [dispatch, jobList.length, searchFilter, searchResult.Total, onLoadJobListSummary]);

  useEffect(() => {
    if (inView) {
      loadMoreJobs();
    }
  }, [inView, loadMoreJobs]);

  useEffect(() => {
    dispatch(onRefreshJobList(jobList));
  }, [jobList, dispatch, onRefreshJobList]);

  return (
    <>
      <SearchResultsList jobs={jobList} />
      <div className="flex justify-center items-center p-4 col-span-1 sm:col-span-2 md:col-span-3" ref={ref}>
        {loadedItems < searchResult.Total && <Spinner />}
      </div>
    </>
  );
}
