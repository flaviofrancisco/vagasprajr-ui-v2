"use client";

import Card from "../cards/card";
import { JobItem } from "@/services/search/simple-search.service";

export interface SearchResultsListProps {
    jobs: JobItem[];
}

export default function SearchResultsList({jobs}: SearchResultsListProps) {    
    return (
        <>
            { jobs && jobs.map((job: any) =>  {
                return <Card key={job.id} job={job} /> })
            }
        </>
    )
}