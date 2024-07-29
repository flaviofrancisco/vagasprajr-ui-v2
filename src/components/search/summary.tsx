export interface JobSummariesProps {
  summaryList: any;
}

export function JobSummaries({ summaryList }: JobSummariesProps) {
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
