import TalentCard from '@/components/cards/talent/talent-card';

interface SearchResultsProps {
  results: any;
  type?: 'jobs' | 'talents' | undefined;
}
const SearchResults: React.FC<SearchResultsProps> = ({ results, type }) => {
  return (
    <div className="w-full m-10">
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {results.Data ? (
          <>
            {results.Data.map((result: any, index: number) => (
              <TalentCard key={index} talent={result} />
            ))}
          </>
        ) : (
          <>
            <li className="p-4 text-center">Nenhum talento encontrado</li>
          </>
        )}
      </ul>
    </div>
  );
};

export default SearchResults;
