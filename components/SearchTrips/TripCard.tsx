import React, { useState, FC } from 'react'
import styles from '@/styles/SearchResults.module.scss'
import { Box, Button, Paper, Typography } from '@mui/material'
import { useRouter } from 'next/router';
import { BusTrip, CustomAlertType, SeatData } from '@/types/types';

interface TripInfo {
  result: BusTrip,
  setAlertType: React.Dispatch<React.SetStateAction<CustomAlertType>>,
  setAlertText: React.Dispatch<React.SetStateAction<string>>,
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>,
}

function formatTime(inputStr: string): string {
  const [hours, minutes] = inputStr.split(':').map(Number);

  const hourStr = 'ч'
  const minuteStr = 'м'
  return `${hours} ${hourStr} ${minutes} ${minuteStr}`;
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
        <div className={`${styles.showedInfo} `}>
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '15%' }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
              {result.startTime}
            </Typography>
            {/* <Typography variant="h6" gutterBottom>
              {result.from}
            </Typography> */}
            <Typography variant="subtitle2" gutterBottom>
              {result.departure}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '15%' }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
              {result.finishTime}
            </Typography>
            {/* <Typography variant="h6" gutterBottom>
              {result.to}
            </Typography> */}
            <Typography variant="subtitle2" gutterBottom>
              {result.destination}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '15%' }}>
            <Typography variant="h5" gutterBottom>
              {formatTime(result.travelTime)}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '15%' }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
              {result.price} BYN
            </Typography>
            <Typography variant="subtitle2" gutterBottom >
              за 1 пассажира
            </Typography>
            <Typography variant="subtitle2" gutterBottom sx={{color:'green'}}>
              Осталось {result.availableSeats} мест
            </Typography>
          </Box>
          <div></div>
          <div className={`${styles.orderBlock} ${styles.gridItemRight}`}>
            <Button variant="contained" className={styles.orderBtn} onClick={() => advanceReservation(result)}>Купить билет</Button>
          </div>
        </div>
      </Paper>
    </div>
  )
}
export default TripCard