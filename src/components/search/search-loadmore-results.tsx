"use client";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useAppDispatch } from "@/services/store";
import simpleSearchSlice, { doSimpleSearch, JobItem } from "@/services/search/simple-search.service";
import SearchResultsList from "./serach-result-list";
import { Spinner } from "../common/spinner";

export default function SearchLoadMoreResults() {

    const dispatch = useAppDispatch();             
    const { ref, inView } = useInView();

    const { searchResult, searchFilter, jobList, isLoadMoreData } = useSelector((state: any) => state.simpleSearch);
    const { onAppendJobList, onLoadMore } = simpleSearchSlice.actions;
    
    const delay = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms));    
    
    const loadMoreJobs = async () => {    
        await delay(2000);
        if (!isLoadMoreData) return;                                    
        await dispatch(doSimpleSearch({ filter: {...searchFilter} }));
        dispatch(onAppendJobList(searchResult.Data));        
        
    };

    useEffect(() => {          
         if (inView)
         {
            dispatch(onLoadMore(true));            
         }                  
    }, [inView]);    

    useEffect(() => {
        loadMoreJobs();
    }, [isLoadMoreData]);

    return (
        <>        
        <SearchResultsList jobs={jobList} />
        <div
            className="flex justify-center items-center p-4 col-span-1 sm:col-span-2 md:col-span-3"
            ref={ref}
        >                   
        <Spinner />   
        </div>
        </>
    );
}