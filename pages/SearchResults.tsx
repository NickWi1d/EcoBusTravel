'use client';
import React, { useEffect, useState } from 'react'
import Filter from '@/components/Filter'
import { RootState } from '@/redux/store'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getDateFromDB } from '@/lib/actionsDB'
import { useSearchParams, useRouter, useParams  } from 'next/navigation'


interface QueryParams {
  [key: string]: string;
}

const SearchResults = () => {
  // const information = useSelector((state: RootState) => state.searchResults);
  // const info = useSelector((state: RootState) => state.searchParams);
  const dispatch = useDispatch();
  const [queryResults, setQueryResults] = useState([])
  const [ queryParamsState, setQueryParamsState ] = useState({} as QueryParams)
  const searchParams = useSearchParams()
 
  
  const getSearchResults = async () => {
    try {
      const params2 = {
        from:searchParams.get('from')
      }
      console.log(params2)
      const params = window.location.search.substring(1).split('&')
      const queryParams: QueryParams = params.reduce((acc, param) => {
        const [key, value] = param.split('=');
        return { ...acc, [key]: decodeURIComponent(value) };
      }, {});
      // упростить через хук
      const result = await getDateFromDB(dispatch, queryParams)
      setQueryParamsState(queryParams)
      setQueryResults(result || [])
    } catch (error) {
      console.error('Error loading search results:', error);
    }
  }
  useEffect(() => {
    getSearchResults()
  }, [searchParams])


  return (
    <div className='flex'>
      <Filter
        params={queryParamsState}
        setQueryParamsState={setQueryParamsState}
        getSearchResults={getSearchResults}
      />
      Откуда: {queryParamsState.from}
      Куда: {queryParamsState.to}
      Дата: {queryParamsState.date}
      Кол-во человек: {queryParamsState.amount}
      <strong>Results:</strong>

      {queryResults && queryResults.map((result: any, index: number) => (
        <div key={index}>
          <strong>{result._id}</strong>
          <p>Откуда: {result.from}</p>
          <p>Куда: {result.to}</p>
          <p>Дата: {result.date}</p>
        </div>
      ))}
    </div>
  )
}

export default SearchResults