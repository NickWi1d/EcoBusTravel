import { ExtendPassenger, Passenger, SeatData, SeatsArray } from '@/types/types'
import React from 'react'
import styles from '@/styles/Admin.module.scss'

const ChoosePassenger = ({ setIsShowSeatWindow, clickedPalce, selectedSeat, setSeats, passengersList }: { setIsShowSeatWindow: React.Dispatch<React.SetStateAction<boolean>>, clickedPalce: number, selectedSeat: SeatData, setSeats: React.Dispatch<React.SetStateAction<SeatsArray>>, passengersList: ExtendPassenger[] }) => {
    function pickPassenger(passenger: Passenger, user: ExtendPassenger) {
        setSeats(prev => {
            let newSeats = prev.map((seat, index) => {
                if (index === clickedPalce) {
                    return {
                        orderId: selectedSeat.orderId,
                        available: false,
                        user: user.user,
                        owner: passenger
                    }
                }
                return seat
            })
            return newSeats
        })
        setIsShowSeatWindow(false)
    }
    return (
        <div>
            {/* {!selectedSeat.available && */}
            <div className='mb-[5%]'>
                <h1 className='font-bold text-lg'>Текущий пассажир</h1>
                <div className={styles.passengerInfo}>
                    <h1 className='mb-1 cursor-pointer'>{selectedSeat.owner?.surname} {selectedSeat.owner?.name} {selectedSeat.owner?.patronymic}</h1>
                    {/* <p className='cursor-pointer'>{selectedSeat.owner?.documentNumber}</p> */}
                </div>
            </div>
            {/* } */}
            <h1 className='font-bold text-lg'>Выберите пассажира</h1>
            {passengersList.map((user, index) => {
                if (user.user._id === selectedSeat.user?._id) {
                    return <div className='mt-[5%]' key={index}>
                        <b>Username:</b> {user.user.username}
                        {user.passengers.map((passenger, index) => {

                            if (passenger.id !== selectedSeat.owner?.id) {
                                return <div key={index} className={styles.passengerInfo} onClick={() => pickPassenger(passenger, user)}>
                                    <h1 className='mb-1 cursor-pointer'>{passenger.surname} {passenger.name} {passenger.patronymic}</h1>
                                    {/* <p className='cursor-pointer'>{passenger.documentNumber}</p> */}
                                </div>
                            }
                        })}
                    </div>
                }
            })}
            <div className='flex justify-end'>
                <button className='mt-4' onClick={() => setIsShowSeatWindow(false)}>Отмена</button>
            </div>
        </div>
    )
}

export default ChoosePassenger