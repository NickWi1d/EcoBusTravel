import React, { useState, FC } from 'react'
import styles from '@/styles/SearchResults.module.scss'
import { Button, Link, Paper } from '@mui/material'
import { useRouter } from 'next/router';
import { BusTrip, CustomAlertType, SeatData } from '@/types/types';

interface TripInfo {
  result: BusTrip,
  setAlertType: React.Dispatch<React.SetStateAction<CustomAlertType>>,
  setAlertText: React.Dispatch<React.SetStateAction<string>>,
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>,
}

const TripCard: FC<TripInfo> = ({ result, setAlertType, setAlertText, setShowAlert }) => {
  const router = useRouter()
  const [isHiddenInfoVisible, setIsHiddenInfoVisible] = useState(false);

  const handleShowDetails = () => {
    setIsHiddenInfoVisible(!isHiddenInfoVisible);
  };

  async function advanceReservation(result: object) {
    console.log('result', result)
    const queryString = new URLSearchParams(Object.fromEntries(
      Object.entries(result).map(([key, value]) => {
        return key === 'seats' ? [key, JSON.stringify(value)] : [key, value];
      })
    ))
    router.push(`/CreateOrder?${queryString}`)
  }

  return (
    <div className={styles.tripCard}>
      <Paper elevation={3} className='rounded-lg'>
      <div className={`${styles.showedInfo} ${isHiddenInfoVisible ? styles.bottomCornersShowed : styles.bottomCornersHidden}`}>
        <div className={`${styles.fromBlock} ${styles.gridItemLeft}`}>
          <div className={styles.time}>{result.startTime}</div>
          <div className={styles.city}>{result.from}</div>
          <div className={styles.place}>{result.departure}</div>
        </div>
        <div className={`${styles.toBlock} ${styles.gridItemLeft}`}>
          <div className={styles.time}>{result.finishTime}</div>
          <div className={styles.city}>{result.to}</div>
          <div className={styles.place}>{result.destination}</div>
        </div>
        <div className={`${styles.priceBlock} ${styles.gridItemRight}`}>
          <div className={styles.price}></div>
          <p>{result.price} Br</p>
          <p>свободно {result.availableSeats} мест</p>
        </div>
        <div className={`${styles.orderBlock} ${styles.gridItemRight}`}>
          <Button variant="contained" className={styles.orderBtn} onClick={() => advanceReservation(result)}>Купить билет</Button>
        </div>
        <div className={`${styles.showMore} ${styles.doubleCell}`}>
          <Link underline={'hover'} style={{ cursor: 'pointer' }} onClick={handleShowDetails}>Показать детали</Link>
        </div>
        <div className={`${styles.travelTime} ${styles.doubleCellRight}`}>
          <p>В пути: {result.travelTime.split(':')[0]} ч {result.travelTime.split(':')[1] || 0} мин</p>
        </div>
      </div>
      <div className={`${styles.hiddenInfo} ${isHiddenInfoVisible ? styles.showed : styles.hidden}`}>
        <div className='flex'>
          <p className='mr-4'><strong>Водитель: </strong>{result.driver}</p>
          <p><strong>Автобус: </strong>{result.type}</p></div>
      </div>
      </Paper>
    </div>
  )
}

export default TripCard