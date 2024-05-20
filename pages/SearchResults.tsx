'use client';
import Filter from '@/components/SearchTrips/Filter';
import TripCard from '@/components/SearchTrips/TripCard';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import style from '@/styles/SearchResults.module.scss';
import { Box, Button, CircularProgress, Grid, Link, Paper, Typography } from '@mui/material';
import { BusTrip, CustomAlertType, QueryParams, SeatData, Params } from '@/types/types';
import { useSearchParams } from 'next/navigation';
import { clearSeatsInfo } from '@/components/CreateOrder/ChoosePlaces';
import { useLazyGetCitesQuery, useLazyGetTripsDataQuery } from '@/store/reducers/api/app';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

interface filterData {
  from: string | undefined,
  to: string | undefined,
  date: string | undefined
}

type SortOrder = 'ASCENDING' | 'DESCENDING' | 'NONE'

const SearchResults = () => {
  const [getTripsData, { isLoading: isTripsDataLoading, isError: isTripsDataError, data: TripsData, isSuccess: TripsDataSuccess, error: TripsDataError }] = useLazyGetTripsDataQuery()
  const [getCites, { isLoading: isGetCitesLoading, isError: iGetCitesError, data: GetCitesData, isSuccess: GetCitesSuccess, error: GetCitesError }] = useLazyGetCitesQuery()



  const router = useRouter();
  const dispatch = useDispatch();
  const [queryResults, setQueryResults] = useState<BusTrip[]>([])
  const [queryResultsUnsorted, setQueryResultsUnsorted] = useState<BusTrip[]>([])
  const [queryParamsState, setQueryParamsState] = useState({} as Params)
  const [filterData, setFilterData] = useState<filterData>({
    from: '',
    to: '',
    date: ''
  })
  const [cities, setCities] = useState<string[]>([])


  const [showAlert, setShowAlert] = useState(false)
  const [alertText, setAlertText] = useState('Successfully updated!')
  const [alertType, setAlertType] = useState<CustomAlertType>('success')

  const [sortStartTimeBnt, setSortStartTimeBnt] = useState<SortOrder>('NONE')
  const [sortFinishTimeBnt, setSortFinishTimeBnt] = useState<SortOrder>('NONE')
  const [sortPriceBnt, setSortPriceBnt] = useState<SortOrder>('NONE')


  const getSearchResults = async () => {
    const queryParams = router.query as Params
    setFilterData({
      from: queryParams.from,
      to: queryParams.to,
      date: queryParams.date
    })
    setQueryParamsState(queryParams)
    if (Object.keys(queryParams).length !== 0 && queryParams.from && queryParams.to) {
      getTripsData(queryParams)
    }
  }

  function getTripsDataHandler(queryParams: Params) {
    getTripsData(queryParams)
  }

  useEffect(() => {
    if (TripsData && TripsDataSuccess) {
      setQueryResults(TripsData.busTrips)
      setQueryResultsUnsorted(TripsData.busTrips)
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
    getSearchResults()
    getCites({})
  }, [router.query])


  useEffect(() => {
    if (GetCitesSuccess && GetCitesData) {
      console.log(GetCitesData.cities[0].cities);
      setCities(GetCitesData.cities[0].cities)
    }
  }, [GetCitesSuccess, GetCitesData])

  function switchOrder(mode: SortOrder) {
    switch (mode) {
      case 'ASCENDING':
        return 'DESCENDING'
        break;
      case 'DESCENDING':
        return 'NONE'
        break;
      case 'NONE':
        return 'ASCENDING'
        break;
      default:
        return 'NONE'
    }
  }
  function parseTime(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }
  function sortTrips(trips: BusTrip[], sortBy: 'start' | 'finish' | 'price', order: SortOrder): BusTrip[] {
    const sortedTrips = [...trips];
    sortedTrips.sort((a, b) => {
      let compareA: number | undefined;
      let compareB: number | undefined;
      if (sortBy === 'start') {
        compareA = parseTime(a.startTime);
        compareB = parseTime(b.startTime);
      } else if (sortBy === 'finish') {
        compareA = parseTime(a.finishTime);
        compareB = parseTime(b.finishTime);
      } else if (sortBy === 'price') {
        compareA = a.price;
        compareB = b.price;
      }

      if (compareA !== undefined && compareB !== undefined) {
        if (order === 'ASCENDING') {
          return compareA - compareB;
        } else if (order === 'DESCENDING') {
          return compareB - compareA;
        }
      }
      return 0;
    });
    return sortedTrips;
  }
  useEffect(() => {
    let sortedTrips = queryResultsUnsorted;
    if (sortStartTimeBnt !== 'NONE') {
      sortedTrips = sortTrips(sortedTrips, 'start', sortStartTimeBnt);
    }
    setQueryResults(sortedTrips);
  }, [sortStartTimeBnt])

  useEffect(() => {
    let sortedTrips = queryResultsUnsorted;

    if (sortFinishTimeBnt !== 'NONE') {
      sortedTrips = sortTrips(sortedTrips, 'finish', sortFinishTimeBnt);
    }

    setQueryResults(sortedTrips);
  }, [sortFinishTimeBnt]);


  useEffect(() => {
    let sortedTrips = queryResultsUnsorted;
    if (sortPriceBnt !== 'NONE') {
      sortedTrips = sortTrips(sortedTrips, 'price', sortPriceBnt);
    }
    setQueryResults(sortedTrips);
  }, [sortPriceBnt])

  function formatDate(dateString:string) {
    const months = [
      "января", "февраля", "марта", "апреля", "мая", "июня",
      "июля", "августа", "сентября", "октября", "ноября", "декабря"
    ];

    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  }

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
            // setFilterData={setFilterData}
            getTripsDataHandler={getTripsDataHandler}
            cities={cities}
          />
        </div>
        <div className={style.resultsBlock}>

          {
            (queryResults.length !== 0 && !isTripsDataLoading) && <h1 className='font-bold text-2xl mb-4'>По вашему запросу {queryResults.length === 1 ? 'найден' : 'найдено'} {queryResults.length} {
              queryResults.length === 1 ? 'рейс' : (queryResults.length === 2 || queryResults.length === 3 || queryResults.length === 4) ? 'рейса' : 'рейсов'
              }</h1>
          }
          <Box sx={{ width: '100%' }}>
            {
              
              (queryResults.length !== 0 && !isTripsDataLoading) && <Typography variant="h6" sx={{ marginBottom: '16px', fontWeight: 'bold', marginTop: '1%' }}>{filterData.from}<ArrowRightAltIcon fontSize='large'></ArrowRightAltIcon>{filterData.to + ', ' + formatDate(filterData.date || '')}</Typography>
            }
            {queryResults.length !== 0 &&
              <Box sx={{ display: 'flex', width: '100%', marginLeft: '2%' }}>
                <Box sx={{ flex: '1 1 20%' }} onClick={() => setSortStartTimeBnt(prev => {
                  const mode = switchOrder(prev)
                  return mode
                })}>
                  <Link href="#" >Время отправления</Link>
                  {
                    sortStartTimeBnt === 'ASCENDING' && <KeyboardArrowUpIcon color='primary'></KeyboardArrowUpIcon>
                  }
                  {
                    sortStartTimeBnt === 'DESCENDING' && <KeyboardArrowDownIcon color='primary'></KeyboardArrowDownIcon>
                  }
                </Box>

                <Box sx={{ flex: '1 1 20%' }} onClick={() => setSortFinishTimeBnt(prev => {
                  const mode = switchOrder(prev)
                  return mode
                })}>
                  <Link href="#" >Врмея прибытия</Link>
                  {
                    sortFinishTimeBnt === 'ASCENDING' && <KeyboardArrowUpIcon color='primary'></KeyboardArrowUpIcon>
                  }
                  {
                    sortFinishTimeBnt === 'DESCENDING' && <KeyboardArrowDownIcon color='primary'></KeyboardArrowDownIcon>
                  }
                </Box>
                <Box sx={{ flex: '1 1 20%' }} />
                <Box sx={{ flex: '1 1 20%' }} onClick={() => setSortPriceBnt(prev => {
                  const mode = switchOrder(prev)
                  return mode
                })}>
                  <Link href="#">Цена</Link>
                  {
                    sortPriceBnt === 'ASCENDING' && <KeyboardArrowUpIcon color='primary'></KeyboardArrowUpIcon>
                  }
                  {
                    sortPriceBnt === 'DESCENDING' && <KeyboardArrowDownIcon color='primary'></KeyboardArrowDownIcon>
                  }
                </Box>
                <Box sx={{ flex: '1 1 25%' }} />
              </Box>}
            {queryResults.length !== 0 && queryResults.map((result: BusTrip, index: number) => (
              <TripCard key={index}
                result={result}
                setAlertType={setAlertType}
                setAlertText={setAlertText}
                setShowAlert={setShowAlert}
              />
            ))}
          </Box>

          {(!isTripsDataLoading && queryResults.length === 0) && <p className={style.message}>Результатов не найдено</p>}
          {isTripsDataLoading && <CircularProgress className={style.loader} />}
        </div>
      </div>
    </div >
  )
}

export default SearchResults