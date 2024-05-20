import { CustomUserTrip, IUser, Passenger, UserTrip, UserTripPassenger, typeOfBus } from '@/types/types'
import { TextField, Button, Tabs, Box, Tab, Typography, List, ListSubheader, ListItemButton, ListItemIcon, ListItemText, Collapse, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, FormLabel, RadioGroup, FormControlLabel, Radio, Paper, IconButton, Autocomplete, InputBase } from '@mui/material'
import { DataGrid, GridColDef, GridEventListener, useGridApiRef, gridClasses, MuiEvent, GridRowParams, GridCallbackDetails } from '@mui/x-data-grid';
import React, { FormEvent, useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import styles from '@/styles/Admin.module.scss'
import Modal from '../../ModalWindows/Modal';
import EditUserPassengerInfo from './EditUserPassengerInfo';
import ShowUserTripInfo from './ShowUserTripInfo';


interface DeletedTrips {
    orderId: string, tripId: string, amountOfTickets: number
}


const PassengerListColumns: GridColDef[] = [
    {
        field: 'surname',
        headerName: 'Фамилия',
        width: 200,
        type: 'string',
        sortingOrder: ['desc', 'asc', null]
    },
    {
        field: 'name',
        headerName: 'Имя',
        type: 'string',
        width: 200,
        sortingOrder: ['desc', 'asc', null]
    },
    {
        field: 'documentNumber',
        headerName: 'Номер паспорта',
        type: 'string',
        width: 200,
        sortingOrder: ['desc', 'asc', null]
    }
];
const TripListColumns: GridColDef[] = [
    {
        field: 'date',
        headerName: 'Дата',
        width: 150,
        type: 'date',
        sortingOrder: ['desc', 'asc', null]
    },
    {
        field: 'from',
        headerName: 'Откуда',
        type: 'string',
        width: 150,
        sortingOrder: ['desc', 'asc', null]
    },
    {
        field: 'to',
        headerName: 'Куда',
        type: 'string',
        width: 150,
        sortingOrder: ['desc', 'asc', null]
    },
    {
        field: 'passengersAmount',
        headerName: 'Кол-во пассажиров',
        type: 'number',
        width: 180,
        sortingOrder: ['desc', 'asc', null]
    }
];


const EditUserInfo = ({
    setIsShowEditUserInfo,
    setIsAddNewUser,
    isAddNewUser,
    setSelectedUser,
    selectedUser,
    upDateUserInfoHandler,
    addNewUserHandler,
    deleteUserHandler,
    setDeletedTrips
}: {
    setIsShowEditUserInfo: React.Dispatch<React.SetStateAction<boolean>>,
    setIsAddNewUser: React.Dispatch<React.SetStateAction<boolean>>,
    isAddNewUser: boolean,
    setSelectedUser: React.Dispatch<React.SetStateAction<IUser>>,
    selectedUser: IUser,
    upDateUserInfoHandler: (id: string, tripsId: Array<string>) => void,
    addNewUserHandler: () => void,
    deleteUserHandler: (uid: string) => void,
    setDeletedTrips: React.Dispatch<React.SetStateAction<DeletedTrips[]>>
}) => {

    const [username, setUsername] = useState('')
    const [surname, setSurname] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [passengers, setPassengers] = useState<Passenger[] | []>([])
    const [trips, setTrips] = useState<UserTrip[] | []>([])
    const [password, setPassword] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')


    const [selectedUserPassenger, setSelectedUserPassenger] = useState<Passenger>({
        id: '',
        birthDate: '',
        documentNumber: '',
        gender: '',
        name: '',
        patronymic: '',
        surname: '',
    })
    const [selectedUserTrip, setSelectedUserTrip] = useState<CustomUserTrip>({
        orderId: '',
        tripId: '',
        seats: [],
        date: '',
        from: '',
        to: '',
        driver: '',
        finishTime: '',
        price: 0,
        type: 'L',
        availableSeats: 0,
        travelTime: '',
        reservedSeats: 0,
        startTime: '',
        destination: '',
        departure: '',
        destinationAddress: '',
        departureAddress: '',
    })


    const [PassengerSearchValue, setPassengerSearchValue] = useState('')
    const [TripsSearchValue, setTripsSearchValue] = useState('')
    const [isShowEditUserPassengerInfo, setIsShowEditUserPassengerInfo] = useState(false)
    const [isShowUserTripInfo, setIsShowUserTripInfo] = useState(false)
    const [isAddNewUserPassengerInfo, setIsAddNewUserPassengerInfo] = useState(false)
    const [deleteedUserPassengerId, setDeleteedUserPassengerId] = useState<string | null>(null)


    const PassengersApiRef = useGridApiRef();
    const TripssApiRef = useGridApiRef();

    const filteredPassengers = passengers.filter(passenger =>
        `${passenger.id} ${passenger.surname} ${passenger.name} ${passenger.birthDate}`.toLowerCase().includes(PassengerSearchValue.toLowerCase())
    );

    const PassengerListRows = filteredPassengers.map(passenger => {
        return {
            id: passenger.id,
            birthDate: passenger.birthDate,
            documentNumber: passenger.documentNumber,
            gender: passenger.gender,
            name: passenger.name,
            patronymic: passenger.patronymic,
            surname: passenger.surname,
        }
    })

    const filteredUserTrips = trips.filter(trip =>
        `${trip.tripData.date} ${trip.tripData.from} ${trip.tripData.to}`.toLowerCase().includes(TripsSearchValue.toLowerCase())
    );

    let TripListRows = filteredUserTrips.map(trip => {
        return {
            id: trip.orderId,
            orderId: trip.orderId,
            tripId: trip.tripId,
            seats: trip.seats,
            date: new Date(trip.tripData.date),
            from: trip.tripData.from,
            to: trip.tripData.to,
            driver: trip.tripData.driver,
            finishTime: trip.tripData.finishTime,
            price: trip.tripData.price,
            type: trip.tripData.type,
            availableSeats: trip.tripData.availableSeats,
            travelTime: trip.tripData.travelTime,
            reservedSeats: trip.tripData.reservedSeats,
            startTime: trip.tripData.startTime,
            destination: trip.tripData.destination,
            departure: trip.tripData.departure,
            destinationAddress: trip.tripData.destinationAddress,
            departureAddress: trip.tripData.departureAddress,
            passengersAmount: trip.seats.length
        }
    })

    useEffect(() => {
        setUsername(selectedUser.username)
        setSurname(selectedUser.surname)
        setName(selectedUser.name)
        setEmail(selectedUser.email)
        setPassengers(selectedUser.passengers)
        setTrips(selectedUser.trips)
        setPassword(selectedUser.password)
        setPhoneNumber(selectedUser.phoneNumber)
    }, [])

    useEffect(() => {
        setSelectedUser(prev => {
            return {
                _id: prev._id,
                username: username,
                password: password,
                email: email,
                surname: surname,
                name: name,
                phoneNumber: phoneNumber,
                passengers: passengers,
                trips: trips,
            }
        })
    }, [username, surname, name, email, passengers, trips, password, phoneNumber])

    useEffect(() => {
        if (isShowEditUserPassengerInfo === false && selectedUserPassenger && deleteedUserPassengerId === null) {
            setPassengers(prev => {
                let newPassengersList = prev.map(passanger => {
                    if (passanger.id === selectedUserPassenger.id) {
                        return {
                            id: selectedUserPassenger.id,
                            birthDate: selectedUserPassenger.birthDate,
                            documentNumber: selectedUserPassenger.documentNumber,
                            gender: selectedUserPassenger.gender,
                            name: selectedUserPassenger.name,
                            patronymic: selectedUserPassenger.patronymic,
                            surname: selectedUserPassenger.surname,
                        }
                    }
                    return passanger
                })
                return newPassengersList
            })
            setTrips(prev => {
                let newTrips = prev.map(trip => {
                    let newSeats = trip.seats.map(seat => {
                        console.log(seat.id)
                        console.log(selectedUserPassenger.id)
                        if (seat.id === selectedUserPassenger.id) {
                            console.log('yes, bitch', selectedUserPassenger);
                            
                            return {
                                id: seat.id,
                                name: selectedUserPassenger.name,
                                surname: selectedUserPassenger.surname,
                                patronymic: selectedUserPassenger.patronymic,
                                documentNumber: selectedUserPassenger.documentNumber,
                                birthDate: selectedUserPassenger.birthDate,
                                gender: selectedUserPassenger.gender,
                                seatNumber: seat.seatNumber
                            }
                        }
                        return seat
                    })
                    return {
                        orderId: trip.orderId,
                        tripId: trip.tripId,
                        tripData: trip.tripData,
                        seats: newSeats
                    }
                })
                return newTrips
            })
        }
        if (selectedUserPassenger && isShowEditUserPassengerInfo === false && isAddNewUserPassengerInfo === true) {
            setPassengers(prev => {
                return [...prev, {
                    id: selectedUserPassenger.id,
                    birthDate: selectedUserPassenger.birthDate,
                    documentNumber: selectedUserPassenger.documentNumber,
                    gender: selectedUserPassenger.gender,
                    name: selectedUserPassenger.name,
                    patronymic: selectedUserPassenger.patronymic,
                    surname: selectedUserPassenger.surname,
                }]
            })
        }
        if (isShowEditUserPassengerInfo === false && deleteedUserPassengerId !== null) {
            setPassengers(prev => {
                let newPassengersList = prev.filter(passenger => {
                    if (passenger.id !== deleteedUserPassengerId) {
                        return passenger
                    }
                })
                return newPassengersList
            })
        }
    }, [selectedUserPassenger, isShowEditUserPassengerInfo, isAddNewUserPassengerInfo, deleteedUserPassengerId])



    function cancelBtn() {
        setIsShowEditUserInfo(false)
    }

    function EditUserInfo(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsAddNewUser(false)
        isAddNewUser ? addNewUserHandler() :
            upDateUserInfoHandler(selectedUser._id, [...trips.map(trip => trip.tripId)])
        setIsShowEditUserInfo(false)
    }

    function openEditPassengerWindow(params: GridRowParams) {
        setIsShowEditUserPassengerInfo(true)
        setIsAddNewUserPassengerInfo(false)
        setDeleteedUserPassengerId(null)
        setSelectedUserPassenger(params.row)
    }

    function openAddNewPassengerWindow() {
        setIsShowEditUserPassengerInfo(true)
        setSelectedUserPassenger({
            id: '',
            birthDate: '',
            documentNumber: '',
            gender: '',
            name: '',
            patronymic: '',
            surname: '',
        })
        setIsAddNewUserPassengerInfo(true)
    }

    function deleteUser() {
        deleteUserHandler(selectedUser._id)
        setIsAddNewUser(false)
        setIsShowEditUserInfo(false)

    }

    function openShowTripsWindow(params: GridRowParams) {
        setIsShowUserTripInfo(true)
        setSelectedUserTrip(params.row)
    }

    return (
        <div>
            {isShowEditUserPassengerInfo &&
                <Modal width={50}>
                    <EditUserPassengerInfo
                        selectedUserPassenger={selectedUserPassenger}
                        sertIsShowEditUserPassengerInfo={setIsShowEditUserPassengerInfo}
                        isAddNewUserPassengerInfo={isAddNewUserPassengerInfo}
                        setIsAddNewUserPassengerInfo={setIsAddNewUserPassengerInfo}
                        setSelectedUserPassenger={setSelectedUserPassenger}
                        setDeleteedUserPassengerId={setDeleteedUserPassengerId}
                        setTrips={setTrips}
                    ></EditUserPassengerInfo>
                </Modal>
            }
            {isShowUserTripInfo &&
                <Modal width={50}>
                    <ShowUserTripInfo
                        setIsShowUserTripInfo={setIsShowUserTripInfo}
                        selectedUserTrip={selectedUserTrip}
                        setTrips={setTrips}
                        setDeletedTrips={setDeletedTrips}
                    ></ShowUserTripInfo>
                </Modal>
            }
            {!isAddNewUser &&
                <div className=' mb-[2%]'>
                    <Button variant="outlined" size="small" color="info">
                        Id: {selectedUser._id}
                    </Button>
                    <Button variant="outlined" size="small" color="error" className='ml-[2%]' onClick={deleteUser}>
                        Удалить пользователя
                    </Button>
                </div>
            }
            <form onSubmit={EditUserInfo}>
                <div className='grid grid-rows-1 grid-cols-5 gap-4'>
                    <TextField
                        // required
                        id="username"
                        type='text'
                        label="username"
                        variant="outlined"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onFocus={(e) => e.target.select()}
                    />
                    {isAddNewUser &&
                        <TextField
                            // required
                            id="password"
                            type='password'
                            label="Пароль"
                            variant="outlined"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onFocus={(e) => e.target.select()}
                        />
                    }
                    <TextField

                        // required
                        id="surname"
                        type='text'
                        label="Фамилия"
                        variant="outlined"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        onFocus={(e) => e.target.select()}
                    />
                    <TextField
                        // required
                        id="name"
                        type='text'
                        label="Имя"
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onFocus={(e) => e.target.select()}
                    />
                    <TextField

                        // required
                        id="email"
                        type='text'
                        label="email"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={(e) => e.target.select()}
                    />
                    <TextField

                        // required
                        id="phoneNumber"
                        type='text'
                        label="Номер телефона"
                        variant="outlined"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        onFocus={(e) => e.target.select()}
                    />
                </div>
                <Box sx={{ display: 'flex', marginTop: '2%', justifyContent: 'space-between' }}>
                    <Box sx={{ width: '48%' }}>
                        <h1 className='font-bold mb-2'>Пассажиры</h1>
                        <Box sx={{ display: 'flex', height: '50px', width: '100%' }}>
                            <Paper
                                component="form"
                                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '60%' }}
                            >
                                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                                    <SearchIcon />
                                </IconButton>
                                <Autocomplete
                                    value={PassengerSearchValue}
                                    onChange={(event: any, newValue: string | null) => {
                                        setPassengerSearchValue(newValue || '')
                                    }}
                                    freeSolo
                                    options={[]}
                                    renderInput={(params) => (
                                        <InputBase
                                            {...params}
                                            sx={{ ml: 1, flex: 1 }}
                                            placeholder="Поиск"
                                            inputProps={{ ...params.inputProps, 'aria-label': 'search google maps' }}
                                            onChange={(event) => setPassengerSearchValue(event.target.value)}
                                        />
                                    )}
                                />

                            </Paper>
                            <Button variant='contained' className={`${styles.Btn} ml-[2%] w-[40%] flex items-center`} onClick={openAddNewPassengerWindow}>Добавить пассажира<img src="/icons8-плюс-32.png" className={'ml-3 pb-[2px]'} alt="" width={20} /></Button>
                        </Box>
                        <Box sx={{ height: 300, marginTop: '2%' }}>
                            <DataGrid
                                sx={{
                                    [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]: {
                                        outline: 'none',
                                    },
                                    [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]:
                                    {
                                        outline: 'none',
                                    },
                                }}
                                disableRowSelectionOnClick
                                rowSelection={false}
                                disableMultipleRowSelection
                                hideFooterSelectedRowCount
                                disableColumnResize
                                disableColumnMenu
                                apiRef={PassengersApiRef}
                                rows={PassengerListRows}
                                columns={PassengerListColumns}
                                onRowClick={(params) => openEditPassengerWindow(params)}
                                getRowId={(row) => row.id}
                            />
                        </Box>
                    </Box>
                    <Box sx={{ width: '48%' }}>
                        <h1 className='font-bold mb-2'>Поездки</h1>
                        <Box sx={{ display: 'flex', height: '50px', width: '100%' }}>
                            <Paper
                                component="form"
                                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '60%' }}
                            >
                                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                                    <SearchIcon />
                                </IconButton>
                                <Autocomplete
                                    value={TripsSearchValue}
                                    onChange={(event: any, newValue: string | null) => {
                                        setTripsSearchValue(newValue || '')
                                    }}
                                    freeSolo
                                    options={[]}
                                    renderInput={(params) => (
                                        <InputBase
                                            {...params}
                                            sx={{ ml: 1, flex: 1 }}
                                            placeholder="Поиск"
                                            inputProps={{ ...params.inputProps, 'aria-label': 'search google maps' }}
                                            onChange={(event) => setTripsSearchValue(event.target.value)}
                                        />
                                    )}
                                />

                            </Paper>
                        </Box>
                        <Box sx={{ height: 300, marginTop: '2%' }}>
                            <DataGrid
                                sx={{
                                    [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]: {
                                        outline: 'none',
                                    },
                                    [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]:
                                    {
                                        outline: 'none',
                                    },
                                }}
                                disableRowSelectionOnClick
                                rowSelection={false}
                                disableMultipleRowSelection
                                hideFooterSelectedRowCount
                                disableColumnResize
                                disableColumnMenu
                                apiRef={TripssApiRef}
                                rows={TripListRows}
                                columns={TripListColumns}
                                onRowClick={(params) => openShowTripsWindow(params)}
                                getRowId={(row) => row.orderId}
                            />
                        </Box>
                    </Box>
                </Box>

                <div className='flex justify-end'>
                    <button className='mt-3' onClick={cancelBtn}>Отмена</button>
                    <Button type="submit" variant="contained" className='bg-[#2A5FCF] hover:bg-[#134bc4] mt-4 ml-4' >{isAddNewUser ? 'Добавить' : 'Сохранить'}</Button>
                </div>
            </form>
        </div>
    )
}

export default EditUserInfo