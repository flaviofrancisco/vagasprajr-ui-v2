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

    const { searchResult, jobItemList, searchFilter } = useSelector((state: any) => state.simpleSearch);

       const { onChangePage, onLoadMoreJobs } = simpleSearchSlice.actions;

    const delay = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms));    
    
    const loadMoreJobs = async () => {        
        await delay(2000);
        dispatch(onChangePage(searchFilter.page + 1));
        dispatch(doSimpleSearch({ filter: {...searchFilter} })).then(() => dispatch(onLoadMoreJobs(searchResult.Data)));        
    };

    useEffect(() => {        
        if (!inView) return;
        loadMoreJobs(); 
    }, [inView]);    

    return (
        <>        
        <SearchResultsList jobs={jobItemList} />
        <div
            className="flex justify-center items-center p-4 col-span-1 sm:col-span-2 md:col-span-3"
            ref={ref}
        >                   
        <Spinner />   
        </div>
        </>
    );
}