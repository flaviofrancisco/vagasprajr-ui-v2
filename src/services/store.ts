import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import searchSlice from './search/search.service';
import authenticationSlice from './auth/authentication.service';
import authRegistrationSlice, { signUpTokenConfirmationSlice } from './auth/registration.service';
import googleAuthSlice from './oauth/google/google.service';
import passwordResetSlice from './auth/password.service';
import usersSlice from './users/users.service';
import authorizationSlice from './auth/authorization.service';
import usersAdminSlice from './users/users.admin.service';
import amazonAssociateSlice from './amazon/amazon-associate.service';
import jobsSlice from './jobs/jobs.service';

const store = configureStore({
  reducer: {
    searchReducer: searchSlice.reducer,
    authenticationReducer: authenticationSlice.reducer,
    authRegistrationReducer: authRegistrationSlice.reducer,
    oauthGoogleReducer: googleAuthSlice.reducer,
    signUpTokenConfirmationReducer: signUpTokenConfirmationSlice.reducer,
    passwordResetReducer: passwordResetSlice.reducer,
    usersReducer: usersSlice.reducer,
    authorizationReducer: authorizationSlice.reducer,
    usersAdminSliceReducer: usersAdminSlice.reducer,
    amazonAssociateSliceReducer: amazonAssociateSlice.reducer,
    jobsSliceReducer: jobsSlice.reducer,
  },
  devTools: !(process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test'),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
