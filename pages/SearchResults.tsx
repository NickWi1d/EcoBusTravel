'use client';
import Filter from '@/components/SearchTrips/Filter';
import TripCard from '@/components/SearchTrips/TripCard';


import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import style from '@/styles/SearchResults.module.scss';
import { CircularProgress, Paper } from '@mui/material';

import { BusTrip, CustomAlertType, QueryParams, SeatData, Params } from '@/types/types';
import { useSearchParams } from 'next/navigation';
import { clearSeatsInfo } from '@/components/CreateOrder/ChoosePlaces';
import { useLazyGetTripsDataQuery } from '@/store/reducers/api/app';

const SearchResults = () => {
  /////важно
  const [getTripsData, { isLoading: isTripsDataLoading, isError: isTripsDataError, data: TripsData, isSuccess: TripsDataSuccess, error: TripsDataError }] = useLazyGetTripsDataQuery()
  // const information = useSelector((state: RootState) => state.searchResults);
  // const info = useSelector((state: RootState) => state.searchParams);
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoadingResults, setIsLoadingResults] = useState(false)
  const [queryResults, setQueryResults] = useState<BusTrip[]>([])
  const [queryParamsState, setQueryParamsState] = useState({} as QueryParams)

  const [showAlert, setShowAlert] = useState(false)
  const [alertText, setAlertText] = useState('Successfully updated!')
  const [alertType, setAlertType] = useState<CustomAlertType>('success')


  const getSearchResults = async () => {

    const queryParams = router.query as Record<string, string>
    setQueryParamsState(queryParams)
    if (Object.keys(queryParams).length !== 0) {
      getTripsData(queryParams)

    }

  }
  useEffect(() => {
    if (TripsData && TripsDataSuccess) {
      setIsLoadingResults(false)
      setQueryResults(TripsData.busTrips)
      console.log(TripsData.busTrips)
    }
  }, [TripsData, TripsDataSuccess])

  useEffect(() => {
    if (isTripsDataError && TripsDataError) {
      if ('status' in TripsDataError) {
        const error = TripsDataError.data as any
        console.log('Something went wrong: ', error)
      }
    }
  }, [isTripsDataError, TripsDataError])

  useEffect(() => {
    clearSeatsInfo()
  }, [])

  useEffect(() => {
    setIsLoadingResults(true)
    getSearchResults()
    console.log(queryResults)
  }, [router.query])
  return (
    <div>
      {/* <Header></Header> */}
      <div className={style.searchResultsContent}>
        <div className={style.filterWrapper}>
          <Filter
            params={queryParamsState}
            setQueryParamsState={setQueryParamsState}
            getSearchResults={getSearchResults}
            setQueryResults={setQueryResults}
          />
        </div>
        <div className={style.resultsBlock}>
          {(queryResults.length !== 0 && !isLoadingResults) && <h1 className='font-bold text-2xl mb-4'>По вашему запросу {queryResults.length === 1 ? 'найден' : 'найдено'} {queryResults.length} {
            queryResults.length === 1 ? 'рейс' : (queryResults.length === 2 || queryResults.length === 3 || queryResults.length === 4) ? 'рейса' : 'рейсов'
          }</h1>}
          {isLoadingResults && <CircularProgress className={style.loader} />}
          {queryResults.length !== 0 && queryResults.map((result: BusTrip, index: number) => (
            
              <TripCard key={index}
                result={result}
                setAlertType={setAlertType}
                setAlertText={setAlertText}
                setShowAlert={setShowAlert}
              />
          ))}
          {(!isLoadingResults && queryResults.length === 0) && <p className={style.message}>Результатов не найдено</p>}
        </div>
      </div>
    </div>
  )
}

export default SearchResults