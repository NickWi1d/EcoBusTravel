import React from 'react'
import styles from '@/styles/CreateOrder.module.scss'
import ChoosePlaces from '../FirstStep/ChoosePlaces';
import { Bus, BusTrip } from '@/types/types';
import TripInfo from '../TripInfo';
import { Passenger } from '@/types/types'

const FirstStep: React.FC<{ 
    tripData: BusTrip | undefined, 
    amountOfTickets: number, 
    selectedSeats: string[], 
    setAmountOfTickets: React.Dispatch<React.SetStateAction<number>>, 
    setSelectedSeats: React.Dispatch<React.SetStateAction<string[]>>, 
    isAllSeatsSelected: boolean, 
    setCurrentPassengers: React.Dispatch<React.SetStateAction<Passenger[]>>,
    busInfo:Bus | undefined,
    isGetBusInfoLoading: boolean
}> = ({ 
    tripData, 
    amountOfTickets, 
    setAmountOfTickets, 
    selectedSeats, 
    setSelectedSeats, 
    isAllSeatsSelected, 
    setCurrentPassengers,
    busInfo,
    isGetBusInfoLoading
}) => {
    return (
        <div className={styles.choosingPlacesBox}>
            <div className={styles.choosingPlaces}>
                <ChoosePlaces
                    busType={busInfo?.type}
                    Seats={tripData?.seats || []}
                    amountOfTickets={amountOfTickets}
                    setAmountOfTickets={setAmountOfTickets}
                    selectedSeats={selectedSeats}
                    setSelectedSeats={setSelectedSeats}
                    isAllSeatsSelected={isAllSeatsSelected}
                    setCurrentPassengers={setCurrentPassengers}
                    isGetBusInfoLoading={isGetBusInfoLoading}
                ></ChoosePlaces>
            </div>
            <TripInfo tripData={tripData}></TripInfo>
        </div>
    )
}

export default FirstStep