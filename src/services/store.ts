
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import simpleSearchSlice from "./search/simple-search.service";

const store = configureStore({
    reducer: {
        simpleSearch: simpleSearchSlice.reducer
    },
    devTools: !(process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test'),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store;