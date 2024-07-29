'use client';

import { useAppDispatch } from '@/services/store';
import { COMPANY_NAME, doAdvancedSearch, LOCATIONS, PROVIDERS, SALARIES } from '@/services/search/search.service';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export interface JobSummariesProps {
  summaryList: any;
}

export function JobSummaries({ summaryList }: JobSummariesProps) {
  const dispatch = useAppDispatch();
  const { advancedSearchFilter, searchFilter } = useSelector((state: any) => state.simpleSearch);

  const onCheck = (checked: boolean, section: string, value: string) => {
    let filter = Object.isExtensible(advancedSearchFilter) ? { ...advancedSearchFilter } : { ...advancedSearchFilter };

    switch (section) {
      case COMPANY_NAME:
        filter.companies = Array.isArray(filter.companies) ? [...filter.companies] : [];
        if (checked) {
          filter.companies.push(value);
        } else {
          filter.companies = filter.companies.filter((c: string) => c !== value);
        }
        break;
      case LOCATIONS:
        filter.locations = Array.isArray(filter.locations) ? [...filter.locations] : [];
        if (checked) {
          filter.locations.push(value);
        } else {
          filter.locations = filter.locations.filter((l: string) => l !== value);
        }
        break;
      case SALARIES:
        filter.salaries = Array.isArray(filter.salaries) ? [...filter.salaries] : [];
        if (checked) {
          filter.salaries.push(value);
        } else {
          filter.salaries = filter.salaries.filter((s: string) => s !== value);
        }
        break;
      case PROVIDERS:
        filter.providers = Array.isArray(filter.providers) ? [...filter.providers] : [];
        if (checked) {
          filter.providers.push(value);
        } else {
          filter.providers = filter.providers.filter((p: string) => p !== value);
        }
        break;
    }

    filter.companies = Array.isArray(filter.companies) ? [...filter.companies] : [];
    filter.locations = Array.isArray(filter.locations) ? [...filter.locations] : [];
    filter.salaries = Array.isArray(filter.salaries) ? [...filter.salaries] : [];
    filter.providers = Array.isArray(filter.providers) ? [...filter.providers] : [];
    filter.title = searchFilter.searchString;

    if (section === COMPANY_NAME) {
      if (checked) {
        filter.companies.push(value);
      } else {
        filter.companies = filter.companies.filter((c: string) => c !== value);
      }
    } else if (section === LOCATIONS) {
      if (checked) {
        filter.locations.push(value);
      } else {
        filter.locations = filter.locations.filter((l: string) => l !== value);
      }
    }

    dispatch(doAdvancedSearch({ filter: { ...filter } }));
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 mb-4 mr-4">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Resumo das vagas</h2>
      <h3>Esse resumo de vagas vai mudar de acordo com as vagas carregadas</h3>
      {Object.keys(summaryList).length === 0 && <div className="text-gray-500 dark:text-gray-400">Nenhum resumo disponível</div>}
      {Object.keys(summaryList)
        .sort()
        .map((key, index) => {
          return (
            <div key={index} className="mt-4">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase">{key}</h3>
              <ul className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {[...summaryList[key]] // Create a copy of the array before sorting
                  .sort((a: { [key: string]: number }, b: { [key: string]: number }) => {
                    const aKey = Object.keys(a)[0];
                    const bKey = Object.keys(b)[0];
                    return aKey.localeCompare(bKey);
                  })
                  .map((item: { [key: string]: number }, index: number) => {
                    return (
                      <li key={index}>
                        {Object.keys(item)
                          .sort()
                          .map((itemKey: string) => (
                            <span key={itemKey}>
                              <input type="checkbox" className="mr-2" onChange={(e) => onCheck(e.target.checked, key, itemKey)} />
                              {itemKey}: {item[itemKey]}
                            </span>
                          ))}
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
