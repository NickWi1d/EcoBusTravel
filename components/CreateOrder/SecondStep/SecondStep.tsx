import React, { useEffect, useState } from 'react'
import styles from '@/styles/CreateOrder.module.scss'
import { BusTrip, CustomAlertType, Customer, Passenger } from '@/types/types';
import PassengerDataCard from '../SecondStep/PassengerDataCard';
import TripInfo from '../TripInfo';
import CustomerCard from '../SecondStep/CustomerCard';
import AlertComponent from '../../ModalWindows/Alert';

const SecondStep: React.FC<{ 
    tripData: BusTrip | undefined, 
    selectedSeats: string[], 
    userPassengers: Passenger[], 
    setCurrentPassengers:React.Dispatch<React.SetStateAction<Passenger[]>>
    setCustomer:React.Dispatch<React.SetStateAction<Customer>>,
    type:CustomAlertType,
    text:string,
    showAlert:boolean,
    setShowAlert: React.Dispatch<React.SetStateAction<boolean>>,
    user:{ uid: string, username: string, name: string, surname: string, email: string, phoneNumber:string },
    currentPassengers:Passenger[],
    customer:Customer
}> = ({ 
    tripData, 
    selectedSeats, 
    userPassengers, 
    setCurrentPassengers,
    setCustomer,
    type,
    text,
    showAlert,
    setShowAlert,
    user,
    currentPassengers,
    customer
}) => {
    const [fillCustomerData, setFillCustomerData] = useState(false)
    return (
        <div className={styles.secondStep}>
            {showAlert && <AlertComponent
                marginLeft={'35'}
                showAlert={showAlert}
                setShowAlert={setShowAlert}
                type={type}
                text={text}
            ></AlertComponent>}
            <div className={styles.passengersData}>
                <h1 className="font-bold text-2xl mb-4">Введите данные пассажиров</h1>
                {selectedSeats.map((passenger, index) => <PassengerDataCard key={index} TicketNumber={index + 1} userPassengers={userPassengers} setCurrentPassengers={setCurrentPassengers} currentPassenger={currentPassengers[index]}></PassengerDataCard>)}
                <div className='flex'><h1 className="font-bold text-2xl mb-4">Покупатель</h1><p className={`${styles.choosePassangerLink} mt-2 ml-[2%]`} onClick={() => setFillCustomerData(true)}>Заполнить из профиля</p></div>
                <CustomerCard setCustomer={setCustomer} user={user} fillCustomerData={fillCustomerData} setFillCustomerData={setFillCustomerData} customer={customer}></CustomerCard>
            </div>
            <TripInfo tripData={tripData}></TripInfo>
        </div>
    )
}

export default SecondStep