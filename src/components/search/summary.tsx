'use client';

import { useAppDispatch } from '@/services/store';
import searchSlice, { COMPANY_NAME, doSearch } from '@/services/search/search.service';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export interface JobSummariesProps {
  summaryList: any;
}

export function JobSummaries({ summaryList }: JobSummariesProps) {
  const dispatch = useAppDispatch();
  const { advancedSearchFilter, searchFilter } = useSelector((state: any) => state.simpleSearch);
  const { onChangeFilterCollection } = searchSlice.actions;

  const [onCheckedChanged, setOnCheckedChanged] = useState(false);

  useEffect(() => {
    if (!onCheckedChanged) {
      return;
    }
    dispatch(doSearch({ filter: { ...advancedSearchFilter } }));
    setOnCheckedChanged(false);
  }, [onCheckedChanged]);

  const onCheck = (checked: boolean, section: string, value: string) => {
    dispatch(onChangeFilterCollection({ title: searchFilter.searchString, checked, section, value }));
    setOnCheckedChanged(true);
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 mb-4 mr-4">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Refinar busca</h2>
      <h3>Filtros complementares</h3>
      {Object.keys(summaryList).length === 0 && <div className="text-gray-500 dark:text-gray-400">Nenhum resumo disponível</div>}
      {Object.keys(summaryList)
        .sort()
        .map((key, index) => {
          return (
            <div key={index} className="mt-4">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase">{key}</h3>
              <ul className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {summaryList[key].map((item, index) => {
                  return (
                    <li key={index} className="flex items-center">
                      <input
                        type="checkbox"
                        id={item}
                        name={item}
                        className="form-checkbox h-4 w-4 text-blue-600"
                        onChange={(e) => {
                          onCheck(e.target.checked, key, item);
                        }}
                      />
                      <label htmlFor={item} className="ml-2 text-gray-700 dark:text-white">
                        {item}
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
    </div>
  );
}
