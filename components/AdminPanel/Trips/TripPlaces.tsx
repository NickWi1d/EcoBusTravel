import React from 'react'
import styles from '@/styles/Admin.module.scss'
import { SeatsArray, typeOfBus } from '@/types/types'
import { CircularProgress } from '@mui/material'

const TripPlaces = ({
    busType, 
    seats, 
    setIsShowSeatWindow, 
    setClickedPlace,
    isGetBusInfoLoading
}:{
    busType:typeOfBus | undefined, 
    seats:SeatsArray, 
    setIsShowSeatWindow:React.Dispatch<React.SetStateAction<boolean>>, 
    setClickedPlace:React.Dispatch<React.SetStateAction<number>>, 
    setSeats:React.Dispatch<React.SetStateAction<SeatsArray>>,
    isGetBusInfoLoading:boolean
}) => {
    function clickPalceHandler(index:number, available:boolean){
        if(!available){
            setIsShowSeatWindow(true)
            setClickedPlace(index)
        }
    }
    return (
        <div className='w-[80%]'>
            
            <div className={busType == 'M' ? styles.busM : styles.busL}>
                {seats.map((seat, index) =>
                    index === (busType == 'M' ? 8 : 13) ? (
                        <React.Fragment key={index}>
                            <div id={`${index + 1}`} className={`${busType == 'M' ? styles.SeatM : styles.SeatL} ${styles.driver}`}></div>
                            <div className={`${busType == 'M' ? styles.SeatM : styles.SeatL} ${seat.available ? styles.normal : styles.selected }`} onClick={()=>clickPalceHandler(index, seat.available)}>{index + 1}</div>
                        </React.Fragment>
                    ) : (
                        <div id={`${index + 1}`} className={`${busType == 'M' ? styles.SeatM : styles.SeatL} ${seat.available ? styles.normal : styles.selected }`} key={index} onClick={()=>clickPalceHandler(index, seat.available)}>{index + 1}</div>
                    )
                )}
            </div>
            
        </div>
    )
}

export default TripPlaces