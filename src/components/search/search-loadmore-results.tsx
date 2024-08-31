'use client';

import { useSelector } from 'react-redux';
import { useEffect, useCallback, use } from 'react';
import { useInView } from 'react-intersection-observer';
import { useAppDispatch } from '@/services/store';
import searchSlice, { doSearch } from '@/services/search/search.service';
import SearchResultsList from './serach-result-list';
import { Spinner } from '../common/spinner';
import { doGetUserProfile, doUpdateUserBookmarks } from '@/services/users/users.service';
import useAxiosPrivate from '@/hooks/private-axios';
import { toast, Toaster } from 'sonner';

export default function SearchLoadMoreResults() {
  const dispatch = useAppDispatch();
  const axiosPrivate = useAxiosPrivate();
  const { ref, inView } = useInView();

  const { profile } = useSelector((state: any) => state.usersReducer);
  const { authSession } = useSelector((state: any) => state.authenticationReducer);
  const { searchResult, searchFilter, jobList, loadedItems } = useSelector((state: any) => state.searchReducer);

  const { onRefreshJobList } = searchSlice.actions;

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const loadMoreJobs = useCallback(async () => {
    await delay(2000);
    if (typeof searchResult?.Total === 'undefined') {
      return;
    }
    if (jobList.length === searchResult.Total) {
      return;
    }
    await dispatch(doSearch({ filter: { ...searchFilter, page: searchFilter.page + 1 } }));
  }, [dispatch, jobList.length, searchFilter, searchResult.Total]);

  const onFavorite = (job: any) => {
    let bookmarked_jobs: string[] = [];
    if (profile?.bookmarked_jobs) {
      bookmarked_jobs = [...profile.bookmarked_jobs];
    }
    const index = bookmarked_jobs.indexOf(job.id);
    if (index > -1) {
      bookmarked_jobs.splice(index, 1);
    } else {
      bookmarked_jobs.push(job.id);
    }
    dispatch(doUpdateUserBookmarks({ axiosPrivate, bookmarks: bookmarked_jobs })).then((result) => {
      if (result.type == doUpdateUserBookmarks.fulfilled.type) {
        toast.success('Vaga favoritada com sucesso');
      } else {
        toast.error('Erro ao favoritar vaga');
      }
    });
  };

  useEffect(() => {
    if (inView) {
      loadMoreJobs();
    }
  }, [inView, loadMoreJobs]);

  useEffect(() => {
    const execute = async () => {
      await dispatch(onRefreshJobList(jobList));
      if (authSession?.user_info && authSession?.user_info?.id && authSession?.user_info?.id !== '') {
        await dispatch(doGetUserProfile({ axiosPrivate }));
      }
    };
    execute();
  }, [jobList, dispatch, onRefreshJobList, authSession.user_info.id, axiosPrivate, authSession.user_info]);

  return (
    <>
      <Toaster richColors />
      <SearchResultsList jobs={jobList} onFavorite={onFavorite} favoriteListIds={profile?.bookmarked_jobs} />
      <div className="flex justify-center items-center p-4 col-span-1 sm:col-span-2 md:col-span-3" ref={ref}>
        {loadedItems < searchResult.Total && <Spinner />}
      </div>
    </>
  );
}
