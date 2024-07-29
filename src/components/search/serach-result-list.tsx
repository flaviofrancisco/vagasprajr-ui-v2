'use client';

import { v4 as uuidv4 } from 'uuid';
import Card from '../cards/card';
import { JobItem } from '@/services/search/search.service';

export interface SearchResultsListProps {
  jobs: JobItem[];
}

export default function SearchResultsList({ jobs }: SearchResultsListProps) {
  return (
    <>
      {jobs &&
        jobs.map((job: any) => {
          return <Card key={uuidv4()} job={job} />;
        })}
    </>
  );
}
