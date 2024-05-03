import React from 'react'
import styles from '@/styles/CreateOrder.module.scss'
import { BusTrip, Customer, Passenger } from '@/types/types';
import PassengerDataCard from './PassengerDataCard';
import TripInfo from './TripInfo';
import CustomerCard from './CustomerCard';

const SecondStep: React.FC<{ 
    tripData: BusTrip | undefined, 
    selectedSeats: string[], 
    userPassengers: Passenger[], 
    setCurrentPassengers:React.Dispatch<React.SetStateAction<Passenger[]>>
    setCustomer:React.Dispatch<React.SetStateAction<Customer>>
}> = ({ 
    tripData, 
    selectedSeats, 
    userPassengers, 
    setCurrentPassengers,
    setCustomer 
}) => {
    return (
        <div className={styles.secondStep}>
            <div className={styles.passengersData}>
                <h1 className="font-bold text-2xl mb-4">Введите данные пассажиров</h1>
                {selectedSeats.map((passenger, index) => <PassengerDataCard key={index} TicketNumber={index + 1} userPassengers={userPassengers} setCurrentPassengers={setCurrentPassengers} ></PassengerDataCard>)}
                <h1 className="font-bold text-2xl mb-4">Покупатель</h1>
                <CustomerCard setCustomer={setCustomer}></CustomerCard>
            </div>
            <TripInfo tripData={tripData}></TripInfo>
        </div>
    )
}

export default SecondStep