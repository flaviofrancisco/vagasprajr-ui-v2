import SelectCheckbox from '../common/select-checkbox';

export default function SearchBar() {
  const providers = [
    {
      label: 'Indeed',
      value: 'indeed',
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 mb-4 flex flex-col lg:flex-row items-center text-center w-full">
      <div className="w-full lg:flex-1">
        <SelectCheckbox title="Empresas" options={providers} />
      </div>
      <div className="w-full lg:flex-1">
        <SelectCheckbox title="Localização" options={providers} />
      </div>
      <div className="w-full lg:flex-1">
        <SelectCheckbox title="Salários" options={providers} />
      </div>
      <div className="w-full lg:flex-1">
        <SelectCheckbox title="Sites" options={providers} />
      </div>
    </div>
  );
}
