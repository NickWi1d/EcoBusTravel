import { BusTrip, ExtendPassenger, SeatData, SeatsArray, typeOfBus } from '@/types/types'
import { Button, FormControl, InputLabel, MenuItem, NativeSelect, Select, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import styles from '@/styles/Admin.module.scss'
import ChoosePlaces from '../../CreateOrder/ChoosePlaces'
import TripPlaces from './TripPlaces'
import ChangePlaceInfo from '../../../unnecessary/ChangePlaceInfo'
import Modal from '../../ModalWindows/Modal'
import ChoosePassenger from './ChoosePassenger'
import { v4 as uuidv4 } from 'uuid';



function formatDate(inputDate: string) {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate().toString();

    // Добавляем нуль перед месяцем и днем, если они состоят из одной цифры
    if (month.length === 1) {
        month = '0' + month;
    }
    if (day.length === 1) {
        day = '0' + day;
    }

    return `${year}-${month}-${day}`;
}

const EditTripInfo = (
    {
        selectedTrip,
        passengersList,
        areThereAnyPassengers,
        isAddNewTrip,
        setSelectedTrip,
        deleteTrip,
        upDateTripInfoHandler,
        setIsAddNewTrip,
        addNewTripHandler,
        setAreThereAnyPassengers,
        setIsShowEditTripInfo,
    }: {

        selectedTrip: BusTrip,
        passengersList: ExtendPassenger[],
        areThereAnyPassengers: boolean,
        isAddNewTrip: boolean,
        setIsAddNewTrip: React.Dispatch<React.SetStateAction<boolean>>,
        addNewTripHandler: () => void,
        setAreThereAnyPassengers: React.Dispatch<React.SetStateAction<boolean>>,
        setIsShowEditTripInfo: React.Dispatch<React.SetStateAction<boolean>>,
        setSelectedTrip: React.Dispatch<React.SetStateAction<BusTrip>>,
        upDateTripInfoHandler: () => void,
        deleteTrip: (uid: string) => void,
    }) => {
    const tripId = uuidv4();
    const [date, setDate] = useState('')
    const [driver, setDriver] = useState('')
    const [finishTime, setFinishTime] = useState('')
    const [from, setFrom] = useState('')
    const [price, setPrice] = useState(0)
    const [to, setTo] = useState('')
    const [type, setType] = useState<typeOfBus>('L')
    const [availableSeats, setAvailableSeats] = useState(50)
    const [travelTime, seTravelTime] = useState('')
    const [reservedSeats, setReservedSeats] = useState(0)
    const [startTime, setStartTime] = useState('')
    const [destination, setDestination] = useState('')
    const [departure, setDeparture] = useState('')
    const [seats, setSeats] = useState<SeatsArray>(Array.from({ length: 50 }, () => ({
        orderId:'',
        user: null,
        available: true,
        owner: null
    })))
    const [isShowSeatWindow, setIsShowSeatWindow] = useState(false)
    const [clickedPalce, setClickedPlace] = useState(0)

    useEffect(() => {
        setDate(formatDate(selectedTrip.date))
        setDriver(selectedTrip.driver)
        setFinishTime(selectedTrip.finishTime)
        setFrom(selectedTrip.from)
        setPrice(selectedTrip.price)
        setTo(selectedTrip.to)
        setType(selectedTrip.type)
        setAvailableSeats(selectedTrip.availableSeats)
        seTravelTime(selectedTrip.travelTime)
        setReservedSeats(selectedTrip.reservedSeats)
        setStartTime(selectedTrip.startTime)
        setDestination(selectedTrip.destination)
        setDeparture(selectedTrip.departure)
        setSeats(selectedTrip.seats)
        setAreThereAnyPassengers(selectedTrip.seats.filter(seat => !seat.available).length !== 0)
    }, [])

    useEffect(() => {
        setSelectedTrip(prev => {
            return {
                _id: prev._id,
                date: date,
                driver: driver,
                finishTime: finishTime,
                from: from,
                price: price,
                to: to,
                type: type,
                availableSeats: availableSeats,
                travelTime: travelTime,
                reservedSeats: reservedSeats,
                seats: seats,
                startTime: startTime,
                destination: destination,
                departure: departure
            }
        }
        )
    }, [date, driver, finishTime, from, price, to, type, availableSeats, travelTime, reservedSeats, startTime, destination, departure, seats])

    useEffect(() => {
        const сapacity = type === 'L' ? 50 : 25
        let avaliableSeatsCount = 0
        seats.map(seat => seat.available && avaliableSeatsCount++)
        setAvailableSeats(avaliableSeatsCount)
        setReservedSeats(сapacity - avaliableSeatsCount)

    }, [seats, type])

    function EditTripInfo() {
        setIsAddNewTrip(false)
        isAddNewTrip ? addNewTripHandler() : upDateTripInfoHandler()
        setIsShowEditTripInfo(false)
    }
    function cancelBtn() {
        setIsAddNewTrip(false)
        setIsShowEditTripInfo(false)
    }

    return (
        <div>
            {/* <Button onClick={() => console.log(seats)}>Вывести</Button> */}
            {isShowSeatWindow &&
                <Modal width={30}>
                    <ChoosePassenger
                        setIsShowSeatWindow={setIsShowSeatWindow}
                        clickedPalce={clickedPalce}
                        selectedSeat={selectedTrip.seats[clickedPalce]}
                        setSeats={setSeats}
                        passengersList={passengersList}
                    >
                    </ChoosePassenger>
                </Modal>
            }

            {!isAddNewTrip &&
                <div className=' mb-[2%]'>
                    <Button variant="outlined" size="small" color="info">
                        Id: {selectedTrip._id}
                    </Button>
                    <Button variant="outlined" size="small" color="error" className='ml-[2%]' onClick={() => deleteTrip(selectedTrip._id)}>
                        Отменить рейс
                    </Button>
                </div>
            }
            <form onSubmit={EditTripInfo}>
                {areThereAnyPassengers ?
                    <>
                        <div className='grid grid-rows-1 grid-cols-5 gap-4 mb-[2%]'>
                            <TextField
                                // required
                                id="driver"
                                type='text'
                                label="Водитель"
                                variant="outlined"
                                value={driver}
                                onChange={(e) => setDriver(e.target.value)}
                                onFocus={(e) => e.target.select()}
                            />
                        </div>

                        <TripPlaces
                            busType={type}
                            seats={seats}
                            setIsShowSeatWindow={setIsShowSeatWindow}
                            setClickedPlace={setClickedPlace}
                            setSeats={setSeats}
                        ></TripPlaces>
                    </>
                    :
                    <>
                        <div className='grid grid-rows-2 grid-cols-5 gap-4 mb-[2%]'>
                            <TextField
                                // required
                                id="from"
                                type='text'
                                label="Откуда"
                                variant="outlined"
                                value={from}
                                onChange={(e) => setFrom(e.target.value)}
                                onFocus={(e) => e.target.select()}
                            />
                            <TextField
                                // required
                                id="to"
                                type='text'
                                label="Куда"
                                variant="outlined"
                                value={to}
                                onChange={(e) => setTo(e.target.value)}
                                onFocus={(e) => e.target.select()}
                            />
                            <TextField
                                // required
                                id="date"
                                type='date'
                                label="Дата"
                                variant="outlined"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                onFocus={(e) => e.target.select()}
                            />
                            <TextField
                                // required
                                id="destination"
                                type='text'
                                label="Пункт отправки"
                                variant="outlined"
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                                onFocus={(e) => e.target.select()}
                            />
                            <TextField
                                // required
                                id="departure"
                                type='text'
                                label="Пункт назначения"
                                variant="outlined"
                                value={departure}
                                onChange={(e) => setDeparture(e.target.value)}
                                // onFocus={(e) => e.target.select()}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                // required
                                id="startTime"
                                type='time'
                                label="Время отправления"
                                variant="outlined"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                onFocus={(e) => e.target.select()}
                            />
                            <TextField
                                // required
                                id="finishTime"
                                type='text'
                                label="Время прибытия"
                                variant="outlined"
                                value={finishTime}
                                onChange={(e) => setFinishTime(e.target.value)}
                                onFocus={(e) => e.target.select()}
                            />
                            <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-standard-label">Age</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={type}
                                    onChange={(e) => setType(e.target.value as typeOfBus)}
                                    label="Age"
                                >
                                    <MenuItem value={'M'}>Средний</MenuItem>
                                    <MenuItem value={'L'}>Большой</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                // required
                                id="price"
                                type='number'
                                label="Цена"
                                variant="outlined"
                                value={price}
                                onChange={(e) => setPrice(parseInt(e.target.value))}
                                onFocus={(e) => e.target.select()}
                            />
                            <TextField
                                // required
                                id="driver"
                                type='text'
                                label="Водитель"
                                variant="outlined"
                                value={driver}
                                onChange={(e) => setDriver(e.target.value)}
                                onFocus={(e) => e.target.select()}
                            />
                        </div>
                        <TripPlaces
                            busType={type}
                            seats={seats}
                            setIsShowSeatWindow={setIsShowSeatWindow}
                            setClickedPlace={setClickedPlace}
                            setSeats={setSeats}
                        ></TripPlaces>
                    </>}

                <div className='flex justify-end'>
                    <button className='mt-3' onClick={cancelBtn}>Отмена</button>
                    <Button type="submit" variant="contained" className='bg-[#2A5FCF] hover:bg-[#134bc4] mt-4 ml-4' >{isAddNewTrip ? 'Добавить' : 'Сохранить'}</Button>
                </div>
            </form>
        </div>
    )
}

export default EditTripInfo