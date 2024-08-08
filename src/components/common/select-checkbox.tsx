import { v4 as uuidv4 } from 'uuid';
import React, { useState, useEffect, useRef } from 'react';
import searchSlice, { doSearch } from '@/services/search/search.service';
import { useAppDispatch } from '@/services/store';
import { useSelector } from 'react-redux';

export interface SelectCheckboxProps {
  title: string;
  field: string;
  options: string[];
}

export default function SelectCheckbox({ title, options, field }: SelectCheckboxProps) {
  const dispatch = useAppDispatch();
  const { searchFilter } = useSelector((state: any) => state.searchReducer);
  const { onChangeFilterOptions, onUpdateFilter } = searchSlice.actions;

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [filteredOptions, setFilteredOptions] = useState<string[]>(options);

  const handleCheckboxChange = (option: string, field: string) => {
    setSelectedOptions((prevSelectedOptions) => {
      const newSelectedOptions = prevSelectedOptions.includes(option) ? prevSelectedOptions.filter((o) => o !== option) : [...prevSelectedOptions, option];
      dispatch(
        onChangeFilterOptions({
          ...searchFilter,
          job_filter_options: {
            ...searchFilter.job_filter_options,
            [field]: newSelectedOptions,
          },
        })
      );
      return newSelectedOptions;
    });
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prevIsDropdownOpen) => !prevIsDropdownOpen);
    setSelectedOptions(searchFilter.job_filter_options[field]);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  const onApplyFilter = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(onUpdateFilter({ ...searchFilter, page: 1 }));
    dispatch(doSearch({ filter: { ...searchFilter, page: 1 } }));
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClick = (event: MouseEvent) => handleClickOutside(event);
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFilteredOptions(options.filter((option) => option.toLowerCase().includes(value.toLowerCase())));
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full relative inline-block text-left">
        <div>
          <button
            type="button"
            className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
            id="options-menu"
            aria-haspopup="true"
            aria-expanded={isDropdownOpen}
            onClick={toggleDropdown}
          >
            {title}
          </button>
        </div>
        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            className="z-10 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full">
              <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded lg:mt-0" onClick={onApplyFilter}>
                Filtrar
              </button>
            </div>
            <div className="w-full">
              <input
                type="text"
                name={field}
                placeholder="pesquisar"
                onChange={onInputChange}
                className="w-4/5 m-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              />
            </div>
            {/* <div>
              <input
                type="text"
                id="first_name"
                className="bg-gray-50 w-4/5 m-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div> */}
            <div className="py-1" role="none">
              {filteredOptions.map((option) => (
                <label key={uuidv4()} className="flex items-center px-4 py-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={selectedOptions.includes(option)}
                    onChange={() => {
                      handleCheckboxChange(option, field);
                    }}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
