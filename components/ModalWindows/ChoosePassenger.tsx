import React from 'react'
import { Passenger } from '@/types/types'
import styles from '@/styles/CreateOrder.module.scss'
import { Typography } from '@mui/material'

const ChoosePassenger = ({ setShowModal, userPassengers, setPassengerInfo }: { setShowModal: React.Dispatch<React.SetStateAction<boolean>>, userPassengers: Passenger[],setPassengerInfo: (surname:string, name:string, patronymic:string, documentNumber:string, birthDate:string, gender:string) => void}) => {
    

    const pickPassenger = (passenger:Passenger) => {
        setShowModal(false)
        setPassengerInfo(passenger.surname, passenger.name, passenger.patronymic, passenger.documentNumber, passenger.birthDate.split('.').reverse().join('-'), passenger.gender)
    }


    return (
        <div>
            <h1 className='font-bold'>Выберите пассажира</h1>
            {userPassengers.length === 0 && <Typography variant='h6'>Нет сохраненных пассажиров</Typography>}
            {userPassengers.map((passenger, index) => <div key={index} className={styles.passengerInfo} onClick={()=>pickPassenger(passenger)}>
                <h1 className='mb-1 cursor-pointer'>{passenger.surname} {passenger.name} {passenger.patronymic}</h1>
                <p className='cursor-pointer'>{passenger.documentNumber}</p>
            </div>)}
            <div className='flex justify-end'>
                <button className='mt-4' onClick={() => setShowModal(false)}>Отмена</button>
            </div>
        </div>
    )
}

export default ChoosePassenger