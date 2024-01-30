import React, { useState } from 'react'
import styles from '@/styles/SearchResults.module.scss'
import { Button, Link } from '@mui/material'
import { PUT } from '@/lib/actionsDB'
import { useRouter } from 'next/router';

type CustomAlertType = "error" | "warning" | "info" | "success";

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

interface TripInfo {
  result: {
    // startTime: string,
    // from: string,
    // // departure: string,
    // finishTime: string,
    // to: string,
    // // destination: string,
    // availableSeats: number,
    // travelTime: string,
    // _id: string,
    // price: number,

    // date:string,
    // driver:string,
    // tripID:string,
    // type:string,
    // reservedSeats:number,
    // seats:object

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
  },

  setAlertType: React.Dispatch<React.SetStateAction<CustomAlertType>>,
  setAlertText: React.Dispatch<React.SetStateAction<string>>,
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>,
}

// const TripCard: React.FC<TripInfo> = ({ startTime, from, departure, finishTime, to, destination, availableSeats, travelTime, _id, price, setAlertType, setAlertText, setShowAlert }) => {
const TripCard: React.FC<TripInfo> = ({ result, setAlertType, setAlertText, setShowAlert }) => {
  const router = useRouter()
  const [isHiddenInfoVisible, setIsHiddenInfoVisible] = useState(false);

  const handleShowDetails = () => {
    setIsHiddenInfoVisible(!isHiddenInfoVisible);
  };

  async function advanceReservation(result:object) {
    const queryString = new URLSearchParams(Object.fromEntries(
      Object.entries(result).map(([key, value]) => {
        return key === 'seats' ? [key, JSON.stringify(value)] : [key, value];
      })
    ))
    router.push(`/CreateOrder?${queryString}`)
    // const newAmountOfAvailableSeats = availableSeats - 1
    // const statusResult = await PUT(_id, newAmountOfAvailableSeats)
    // if (statusResult?.message === 'SUCCESSFULLY_UPDATED') {
    //   setAlertType('success')
    //   setAlertText('Successfully added!')
    //   setShowAlert(true)
    //   setTimeout(() => {
    //     setShowAlert(false)
    //   }, 3000);
    // }
  }

  return (
    <div className={styles.tripCard}>
      <div className={styles.showedInfo}>
        <div className={`${styles.fromBlock} ${styles.gridItemLeft}`}>
          <div className={styles.time}>{result.startTime}</div>
          <div className={styles.city}>{result.from}</div>
          {/* <div className={styles.place}>{result.departure}</div> */}
        </div>
        <div className={`${styles.toBlock} ${styles.gridItemLeft}`}>
          <div className={styles.time}>{result.finishTime}</div>
          <div className={styles.city}>{result.to}</div>
          {/* <div className={styles.place}>{result.destination}</div> */}
        </div>
        <div className={`${styles.priceBlock} ${styles.gridItemRight}`}>
          <div className={styles.price}></div>
          <p>{result.price} Br</p>
          <p>свободно {result.availableSeats} мест</p>
        </div>
        <div className={`${styles.orderBlock} ${styles.gridItemRight}`}>
          <Button variant="contained" className={styles.orderBtn} onClick={() => advanceReservation(result)}>Заказать</Button>
        </div>
        <div className={`${styles.showMore} ${styles.doubleCell}`}>
          <Link underline={'hover'} style={{ cursor: 'pointer' }} onClick={handleShowDetails}>Показать детали</Link>
        </div>
        <div className={`${styles.travelTime} ${styles.doubleCellRight}`}>
          <p>В пути: {result.travelTime.split(':')[0]} ч {result.travelTime.split(':')[1] || 0} мин</p>
        </div>
      </div>
      <div className={`${styles.hiddenInfo} ${isHiddenInfoVisible ? styles.showed : styles.hidden}`}>

      </div>

    </div>
  )
}

export default TripCard