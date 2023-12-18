import { configureStore } from '@reduxjs/toolkit';
import searchParamsReducer from './searchParamsSlice'
import searchResultsReducer from './searchResultsSlice'
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    searchParams: searchParamsReducer,
    searchResults: searchResultsReducer,
    auth:authReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

