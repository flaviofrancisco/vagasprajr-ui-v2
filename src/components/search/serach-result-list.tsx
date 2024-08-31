'use client';

import { v4 as uuidv4 } from 'uuid';
import Card from '../cards/card';
import { JobItem } from '@/services/search/search.service';

export interface SearchResultsListProps {
  jobs: JobItem[];
  onFavorite?: (job: JobItem) => void;
  favoriteListIds?: string[];
}

export default function SearchResultsList({ jobs, onFavorite, favoriteListIds }: SearchResultsListProps) {
  return (
    <>
      {jobs &&
        jobs.map((job: any) => {
          return <Card key={uuidv4()} job={job} onFavorite={onFavorite} favoriteListIds={favoriteListIds} />;
        })}
    </>
  );
}
