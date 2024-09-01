import TalentCard from '@/components/cards/talent/talent-card';
import Loading from '@/components/common/loading';

interface SearchResultsProps {
  results: any;
  type?: 'jobs' | 'talents' | undefined;
  onLoadMore?: (page: number) => void;
  status?: 'idle' | 'loading' | 'succeeded' | 'failed' | undefined;
}
const SearchResults: React.FC<SearchResultsProps> = ({ status, results, type, onLoadMore }) => {
  return (
    <div className="w-full m-2">
      {results && results.Total > 0 ? (
        <>
          <div className="flex justify-center m-5 items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">Encontramos {results.Total} resultados</p>
          </div>
        </>
      ) : status === 'succeeded' ? (
        <div className="flex justify-center items-center p-4 col-span-1 sm:col-span-2 md:col-span-3">
          <p className="text-center text-gray-500 dark:text-gray-400">Nenhum talento encontrado</p>
        </div>
      ) : status === 'loading' ? (
        <Loading />
      ) : (
        <></>
      )}
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {results.Data ? (
          <>
            {results.Data.map((result: any, index: number) => (
              <TalentCard key={index} talent={result} />
            ))}
          </>
        ) : (
          <></>
        )}
      </ul>
      <div className="flex justify-center items-center p-4 col-span-1 sm:col-span-2 md:col-span-3">
        {results.Total > results?.Data?.length ? (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (typeof onLoadMore === 'function') {
                onLoadMore(results.Page);
              }
            }}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Carregar mais
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
