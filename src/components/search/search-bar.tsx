import { JobFilterOptions } from '@/services/search/search.service';
import SelectCheckbox from '../common/select-checkbox';
import { v4 as uuidv4 } from 'uuid';
import { memo } from 'react';

export interface SearchBarProps {
  options: JobFilterOptions;
}

const SearchBar: React.FC<SearchBarProps> = memo((props) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 mb-4 flex flex-col lg:flex-row items-center text-center w-full">
      <div className="w-full lg:flex-1">
        <SelectCheckbox key={uuidv4()} field="companies" title="Empresas" options={props.options.companies} />
      </div>
      <div className="w-full lg:flex-1">
        <SelectCheckbox key={uuidv4()} field="locations" title="Localização" options={props.options.locations} />
      </div>
      <div className="w-full lg:flex-1">
        <SelectCheckbox key={uuidv4()} field="salaries" title="Salários" options={props.options.salaries} />
      </div>
      <div className="w-full lg:flex-1">
        <SelectCheckbox key={uuidv4()} field="providers" title="Sites" options={props.options.providers} />
      </div>
    </div>
  );
});

SearchBar.displayName = 'SearchBar';
export default SearchBar;
