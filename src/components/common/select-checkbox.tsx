import React, { useState, useEffect, useRef } from 'react';

export interface SelectCheckboxOption {
  value: string;
  label: string;
}

export interface SelectCheckboxProps {
  title: string;
  options: SelectCheckboxOption[];
}

export default function SelectCheckbox({ title, options }: SelectCheckboxProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleCheckboxChange = (option: string) => {
    setSelectedOptions((prevSelectedOptions) => (prevSelectedOptions.includes(option) ? prevSelectedOptions.filter((o) => o !== option) : [...prevSelectedOptions, option]));
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prevIsDropdownOpen) => !prevIsDropdownOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full relative inline-block text-left" ref={dropdownRef}>
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
            className="z-10 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <div>
              <input
                type="text"
                id="first_name"
                className="bg-gray-50 w-4/5 m-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="py-1" role="none">
              {options.map((option) => (
                <label key={option.label} className="flex items-center px-4 py-2 text-sm text-gray-700">
                  <input type="checkbox" checked={selectedOptions.includes(option.value)} onChange={() => handleCheckboxChange(option.value)} className="mr-2" />
                  {option.label}
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
