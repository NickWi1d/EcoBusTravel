'use client';
import React, { useEffect, useState } from 'react'
import Filter from '@/components/Filter'
import TripCard from '@/components/TripCard';
import { RootState } from '@/redux/store'
import { useDispatch, useSelector } from 'react-redux';
import { GET } from '@/lib/actionsDB'
import { useSearchParams, useParams } from 'next/navigation'
import { useRouter } from 'next/router';
import style from '@/styles/SearchResults.module.scss'
import { CircularProgress } from '@mui/material'

interface QueryParams {
  [key: string]: string | string[] | undefined
}
interface seatsObj {
  1:{
    available:boolean,
    owner:string | null
  },
  2:{
    available:boolean,
    owner:string | null
  }
  3:{
    available:boolean,
    owner:string | null
  },
  4:{
    available:boolean,
    owner:string | null
  },
  5:{
    available:boolean,
    owner:string | null
  },
  6:{
    available:boolean,
    owner:string | null
  }
  7:{
    available:boolean,
    owner:string | null
  },
  8:{
    available:boolean,
    owner:string | null
  },
  9:{
    available:boolean,
    owner:string | null
  },
  10:{
    available:boolean,
    owner:string | null
  }
  11:{
    available:boolean,
    owner:string | null
  },
  12:{
    available:boolean,
    owner:string | null
  },
  13:{
    available:boolean,
    owner:string | null
  },
  14:{
    available:boolean,
    owner:string | null
  }
  15:{
    available:boolean,
    owner:string | null
  },
  16?:{
    available:boolean,
    owner:string | null
  },
  17?:{
    available:boolean,
    owner:string | null
  },
  18?:{
    available:boolean,
    owner:string | null
  },
  20?:{
    available:boolean,
    owner:string | null
  },
  21?:{
    available:boolean,
    owner:string | null
  },
  22?:{
    available:boolean,
    owner:string | null
  },
  23?:{
    available:boolean,
    owner:string | null
  }
  24?:{
    available:boolean,
    owner:string | null
  },
  25?:{
    available:boolean,
    owner:string | null
  },
  26?:{
    available:boolean,
    owner:string | null
  },
  27?:{
    available:boolean,
    owner:string | null
  }
  28?:{
    available:boolean,
    owner:string | null
  },
  29?:{
    available:boolean,
    owner:string | null
  },
  30?:{
    available:boolean,
    owner:string | null
  },
  31?:{
    available:boolean,
    owner:string | null
  }
  32?:{
    available:boolean,
    owner:string | null
  },
  33?:{
    available:boolean,
    owner:string | null
  },  
  34?:{
    available:boolean,
    owner:string | null
  },
  35?:{
    available:boolean,
    owner:string | null
  },
  36?:{
    available:boolean,
    owner:string | null
  }
  37?:{
    available:boolean,
    owner:string | null
  },
  38?:{
    available:boolean,
    owner:string | null
  },
  39?:{
    available:boolean,
    owner:string | null
  },
  40?:{
    available:boolean,
    owner:string | null
  }
  41?:{
    available:boolean,
    owner:string | null
  },
  42?:{
    available:boolean,
    owner:string | null
  },  
  43?:{
    available:boolean,
    owner:string | null
  },
  44?:{
    available:boolean,
    owner:string | null
  },
  45?:{
    available:boolean,
    owner:string | null
  }
  46?:{
    available:boolean,
    owner:string | null
  },
  47?:{
    available:boolean,
    owner:string | null
  },
  48?:{
    available:boolean,
    owner:string | null
  },
  49?:{
    available:boolean,
    owner:string | null
  }
  50?:{
    available:boolean,
    owner:string | null
  }
}

type CustomAlertType = "error" | "warning" | "info" | "success";

interface receivedObj {
  _id: string,
  date: string,
  finishTime: string,
  from: string,
  price: number,
  to: string,
  tripID: string,
  type: string,
  availableSeats: number,
  travelTime: string,
  reservedSeats: number,
  seats: seatsObj
  startTime: string
}

const SearchResults = () => {
  // const information = useSelector((state: RootState) => state.searchResults);
  // const info = useSelector((state: RootState) => state.searchParams);
  const router = useRouter();

  const dispatch = useDispatch();
  const [isHaveResults, setIsHaveResults] = useState(false)
  const [queryResults, setQueryResults] = useState([])
  const [queryParamsState, setQueryParamsState] = useState({} as QueryParams)

  const [showAlert, setShowAlert] = useState(false)
  const [alertText, setAlertText] = useState('Successfully updated!')
  const [alertType, setAlertType] = useState<CustomAlertType>('success')


  const getSearchResults = async () => {
    const queryParams = router.query as Record<string, string>
    setQueryParamsState(queryParams)
    if (Object.keys(queryParams).length !== 0) {
      const result = await GET(dispatch, queryParams)
      setQueryResults(result)
      setIsHaveResults(true)
      console.log(result)
    }
  }
  useEffect(() => {
    getSearchResults()
    console.log(queryResults)
  }, [router.query])
  return (
    <div >
      <div className={style.filterWrapper}>
        <Filter
          params={queryParamsState}
          setQueryParamsState={setQueryParamsState}
          getSearchResults={getSearchResults}
        />
      </div>
      <div className={style.resultsBlock}>
        {!isHaveResults && <CircularProgress className={style.loader} />}
        {queryResults.length !== 0 && queryResults.map((result: receivedObj, index: number) => (
          <TripCard key={index}
            result={result}
            // startTime={result.startTime}
            // from={result.from}
            // departure='из'// departure={result.departure}
            // finishTime={result.finishTime}
            // to={result.to}
            // destination='в'// destination={result.destination}
            // availableSeats={result.availableSeats}
            // travelTime={result.travelTime}
            // _id={result._id}
            // price={result.price}
            setAlertType={setAlertType}
            setAlertText={setAlertText}
            setShowAlert={setShowAlert}
          />
        ))}
        {(queryResults.length === 0 && isHaveResults) && <p className={style.message}>Результатов не найдено</p>}
      </div>


    </div>
  )
}

export default SearchResults