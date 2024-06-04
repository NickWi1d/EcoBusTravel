import React, { useEffect, useState, MouseEvent } from 'react'
import styles from '@/styles/CreateOrder.module.scss'
import { BusTrip, CustomAlertType, Customer, Passenger } from '@/types/types';
import PassengerDataCard from '../SecondStep/PassengerDataCard';
import TripInfo from '../TripInfo';
import CustomerCard from '../SecondStep/CustomerCard';
import AlertComponent from '../../ModalWindows/Alert';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';

const SecondStep: React.FC<{
    tripData: BusTrip | undefined,
    selectedSeats: string[],
    userPassengers: Passenger[],
    setCurrentPassengers: React.Dispatch<React.SetStateAction<Passenger[]>>
    setCustomer: React.Dispatch<React.SetStateAction<Customer>>,
    type: CustomAlertType,
    text: string,
    showAlert: boolean,
    setShowAlert: React.Dispatch<React.SetStateAction<boolean>>,
    user: { uid: string, username: string, name: string, surname: string, email: string, phoneNumber: string },
    currentPassengers: Passenger[],
    customer: Customer,
    loading:boolean,
    activeStep:number,
    secondStepHandler:()=>void
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
    customer,
    loading,
    activeStep,
    secondStepHandler
}) => {
        const [fillCustomerData, setFillCustomerData] = useState(false)
        function checkFormValidation(e: MouseEvent<HTMLFormElement>) {
            e.preventDefault()
            secondStepHandler()
        }
        return (
            <form onSubmit={checkFormValidation} className={styles.secondStep}>
                <div className='flex'>
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
                
                <LoadingButton
                    endIcon={<SendIcon />}
                    loading={loading}
                    loadingPosition="end"
                    variant="contained"
                    className={`${styles.Btn} mb-[2%]`}
                    sx={{ mr: 1, width:'200px' }}
                    type='submit'
                >
                   Перейти к оплате
                </LoadingButton>
            </form>
        )
    }

export default SecondStep