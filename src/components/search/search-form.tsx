import React from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/services/store';
import searchSlice, { doGetJobOptions, doSearch } from '@/services/search/search.service';
import SearchLoadMoreResults from './search-loadmore-results';
import SearchBar from './search-bar';

const SearchForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { searchResult, status, searchFilter, searchExecuted, jobList, job_filter_options } = useSelector((state: any) => state.searchReducer);
  const { onResetState } = searchSlice.actions;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(doSearch({ filter: { ...searchFilter } }));
    dispatch(doGetJobOptions({ filter: { ...searchFilter } }));
  };

  return (
    <form className="w-4/5 mx-auto" onSubmit={onSubmit}>
      <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          value={searchFilter.title}
          onChange={(e) => dispatch(onResetState(e.target.value))}
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Buscar vagas ..."
          required
        />
        <button
          type="submit"
          className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Buscar
        </button>
      </div>
      <div className="m-4">
        {status === 'loading' && <div className="text-center mt-2 text-sm text-gray-500 dark:text-gray-400">Buscando ...</div>}
        {searchExecuted && status === 'failed' && <div className="text-center mt-2 text-sm text-red-500 dark:text-red-400">Erro ao buscar vagas</div>}
        {searchExecuted && status === 'succeeded' && searchResult.Total === 0 && <div className="text-center mt-2 text-sm text-gray-500 dark:text-gray-400">Nenhuma vaga encontrada</div>}
        {searchExecuted && status === 'succeeded' && searchResult.Total > 0 && <div className="text-center mt-2 text-sm dark:text-gray-400">{searchResult.Total} vagas encontradas</div>}
      </div>
      <div className="w-full">{searchResult.Total > 0 && <SearchBar options={job_filter_options} />}</div>
      <div className="flex flex-row">
        <div className="w-full">
          {jobList && jobList.length > 0 && (
            <>
              <SearchLoadMoreResults />
            </>
          )}
        </div>
      </div>
    </form>
  );
};

export default SearchForm;
