import { combineReducers, configureStore } from '@reduxjs/toolkit';
import searchParamsReducer from './reducers/searchParamsSlice'
import searchResultsReducer from './reducers/searchResultsSlice'
import authReducer from './reducers/authSlice';
import { App } from './reducers/api/app';

const rootReducer = combineReducers({
  searchParams: searchParamsReducer,
  searchResults: searchResultsReducer,
  auth: authReducer,
  [App.reducerPath]: App.reducer
})


const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(App.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

