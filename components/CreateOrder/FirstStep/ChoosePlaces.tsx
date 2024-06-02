import React, { useState, MouseEvent, useEffect } from 'react'
import styles from '@/styles/CreateOrder.module.scss'
import { typeOfBus, SeatsArray, Passenger } from '@/types/types'
import { CircularProgress } from '@mui/material'


export function clearSeatsInfo() {
    localStorage.removeItem('counter')
    localStorage.removeItem('selectedSeats')
}

const ChoosePlaces: React.FC<{
    busType: typeOfBus | undefined,
    Seats: SeatsArray | [],
    amountOfTickets: number,
    selectedSeats: string[],
    setAmountOfTickets: React.Dispatch<React.SetStateAction<number>>,
    setSelectedSeats: React.Dispatch<React.SetStateAction<string[]>>,
    isAllSeatsSelected: boolean,
    setCurrentPassengers: React.Dispatch<React.SetStateAction<Passenger[]>>,
    isGetBusInfoLoading: boolean
}> = ({
    busType,
    Seats,
    amountOfTickets,
    setAmountOfTickets,
    selectedSeats,
    setSelectedSeats,
    isAllSeatsSelected,
    setCurrentPassengers,
    isGetBusInfoLoading }) => {


        const [isLoading, setIsLoading] = useState(false)



        const pickSeat = (event: MouseEvent<HTMLDivElement>) => {
            const clickedDiv = event.target as HTMLDivElement;
            if (event.target === event.currentTarget) {
                return;
            }
            const currentClass = clickedDiv.className.split(' ')[1].split('_')[1]
            if (currentClass === 'selected') {
                clickedDiv.classList.replace(styles.selected, styles.normal)
                setSelectedSeats(prev => {
                    const newSelectedSeats = [...prev.filter(el => el !== clickedDiv.id)]
                    localStorage.setItem('selectedSeats', JSON.stringify(newSelectedSeats))
                    return newSelectedSeats
                })
            } else if (currentClass === 'normal') {
                if (selectedSeats.length < amountOfTickets) {
                    clickedDiv.classList.replace(styles.normal, styles.selected)
                    setSelectedSeats(prev => {
                        const newSelectedSeats = [...prev, clickedDiv.id]
                        localStorage.setItem('selectedSeats', JSON.stringify(newSelectedSeats))
                        return newSelectedSeats
                    })

                }
                else {
                    clickedDiv.classList.replace(styles.normal, styles.selected)
                    let firstSeat = document.getElementById(`${selectedSeats[0]}`)
                    firstSeat?.classList.replace(styles.selected, styles.normal)
                    // serSelectedSeats(prev => [...prev.filter(id => prev.findIndex(element => element === id) !== 0),  clickedDiv.id])
                    setSelectedSeats(prev => {
                        const newSelectedSeats = [...prev.slice(1), clickedDiv.id]
                        localStorage.setItem('selectedSeats', JSON.stringify(newSelectedSeats))
                        return newSelectedSeats
                    })

                }
            }
        }

        const increment = () => {
            if (!isLoading) {
                const amountOfFreeSeats = Seats.filter(seat => seat.available === true).length
                setIsLoading(true)
                setTimeout(() => {
                    setAmountOfTickets(prevCount => {
                        if (prevCount < amountOfFreeSeats) {
                            const newCount = prevCount + 1
                            localStorage.setItem('counter', newCount.toString());
                            return newCount
                        } else {
                            return prevCount
                        }
                    })
                    setCurrentPassengers(prev => [...prev, {
                        id: '',
                        birthDate: '',
                        documentNumber: '',
                        gender: '',
                        name: '',
                        patronymic: '',
                        surname: ''
                    }])
                    setIsLoading(false)
                }, 1500)
            }
        };
        const decrement = () => {
            if (!isLoading) {
                setIsLoading(true)
                setTimeout(() => {
                    setAmountOfTickets(prevCount => {
                        if (prevCount > 1) {
                            const newCount = prevCount - 1
                            localStorage.setItem('counter', newCount.toString());
                            return newCount
                        } else {
                            return prevCount
                        }

                    })
                    setCurrentPassengers(prev => prev.slice(0, -1))
                    setIsLoading(false)
                }, 1500);
            }
        };
        useEffect(() => {
            if (selectedSeats.length > amountOfTickets) {
                let firstSeat = document.getElementById(`${selectedSeats[0]}`)
                firstSeat?.classList.replace(styles.selected, styles.normal)
                setSelectedSeats(prev => {
                    const newSelectedSeats = prev.slice(1)
                    localStorage.setItem('selectedSeats', JSON.stringify(newSelectedSeats))
                    return newSelectedSeats
                })

            }
        }, [amountOfTickets])

        useEffect(() => {
            const storedCount = localStorage.getItem('counter');
            const storedSelectedSeatsString = localStorage.getItem('selectedSeats')
            const storedSelectedSeats = storedSelectedSeatsString ? JSON.parse(storedSelectedSeatsString) : []
            if (storedCount) {
                setAmountOfTickets(parseInt(storedCount));
            }
            setSelectedSeats(storedSelectedSeats)
        }, [])



        return (
            <div>
                <h1 className="font-bold text-2xl mb-4">Выберите место на схеме автобуса</h1>
                <div className={styles.counterBox}>
                    <div className='flex items-center'>
                        Количество билетов
                        <div className={styles.counter}>
                            <div className={styles.decrement} onClick={decrement}>-</div>
                            <div className={styles.account}>{amountOfTickets}</div>
                            <div className={styles.increment} onClick={increment}>+</div>
                        </div>
                        {isLoading && <img className={'ml-2 w-6'} src="/icons8-спиннер.gif" alt="" />}
                    </div>
                    {!isAllSeatsSelected && <p className=' text-red-600 mr-3'>Выберите места для всех пассажиров!</p>}
                </div>
                {
                    isGetBusInfoLoading === true ? <div className='h-[270px] flex justify-center items-center'><CircularProgress /></div> : <div className={busType == 'M' ? styles.busM : styles.busL} onClick={pickSeat}>
                        {Seats.map((seat, index) =>
                            index === (busType == 'M' ? 8 : 13) ? (
                                <React.Fragment key={index}>
                                    <div id={`${index + 1}`} className={`${busType == 'M' ? styles.SeatM : styles.SeatL} ${styles.driver}`}></div>
                                    <div className={`${busType == 'M' ? styles.SeatM : styles.SeatL} ${selectedSeats.includes(`${index + 1}`) ? styles.selected : styles.normal}`}>{index + 1}</div>
                                </React.Fragment>
                            ) : (
                                seat.available ? <div id={`${index + 1}`} className={`${busType == 'M' ? styles.SeatM : styles.SeatL} ${selectedSeats.includes(`${index + 1}`) ? styles.selected : styles.normal}`} key={index}>{index + 1}</div> : <div id={`${index + 1}`} className={`${busType == 'M' ? styles.SeatM : styles.SeatL} ${styles.occupied}`} key={index}>{index + 1}</div>
                            )
                        )} 
                    </div> 
                }

                <div className={styles.transcript}>
                    <div className='flex items-center'><div className={`${styles.SeatL} ${styles.selected}`}>N</div><span className=' ml-2'> — выбранное вами</span></div>
                    <div className='flex items-center'><div className={`${styles.SeatL} ${styles.normal}`}>N</div><span className=' ml-2'> — свободное</span></div>
                    <div className='flex items-center'><div className={`${styles.SeatL} ${styles.occupied}`}>N</div><span className=' ml-2'> — занятое</span></div>
                </div>
            </div>
        )
    }

export default ChoosePlaces