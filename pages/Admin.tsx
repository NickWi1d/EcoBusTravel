import React, { useEffect, useState } from 'react'
import { Tab, Tabs, Box, TextField, Button, Alert, AlertTitle } from "@mui/material";
import styles from '@/styles/Admin.module.scss'
import UsersManagement from '@/components/AdminPanel/Users/UsersManagement';
import { useAddNewTripMutation, useCancelTripMutation, useDeleteMutation, useLazyGetAllUsersQuery, useLazyGetTripsDataQuery, useLazyLoginQuery, useSignUpMutation, useUpDateTripInfoMutation, useUpDateUserInfoMutation } from '@/store/reducers/api/app'
import { BusTrip, ExtendPassenger, IUser, Passenger, SeatData } from '@/types/types';
import TripsManagement from '@/components/AdminPanel/Trips/TripsManagement';
import EditTripInfo from '@/components/AdminPanel/Trips/EditTripInfo';
import EditUserInfo from '@/components/AdminPanel/Users/EditUserInfo';
import BusesManagement from '@/components/AdminPanel/Buses/BusesManagement';
import { idID } from '@mui/material/locale';


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface DeletedTrips {
  orderId:string, tripId:string, amountOfTickets:number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      className={'w-[90%]'}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, width: '100%' }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const Admin = () => {
  const [value, setValue] = useState(0)
  const [usersList, setUsersList] = useState<IUser[]>([])
  const [tripsList, setTripsList] = useState<BusTrip[] | []>([])
  const [passengersList, setPassengersList] = useState<ExtendPassenger[] | []>([])
  const [areThereAnyPassengers, setAreThereAnyPassengers] = useState(false)
  const [isAddNewTrip, setIsAddNewTrip] = useState(false)
  const [isAddNewUser, setIsAddNewUser] = useState(false)
  const [isShowEditUserInfo, setIsShowEditUserInfo] = useState(false)
  const [isShowEditTripInfo, setIsShowEditTripInfo] = useState(false)
  const [deletedTrips, setDeletedTrips] = useState<DeletedTrips[]>([])
  const [selectedTrip, setSelectedTrip] = useState<BusTrip>({
    _id: '',
    date: '',
    driver: '',
    finishTime: '',
    from: '',
    price: 0,
    to: '',
    type: 'L',
    availableSeats: 50,
    travelTime: '',
    reservedSeats: 0,
    seats: Array.from({ length: 50 }, () => ({
      orderId:'',
      user: {
        _id: '',
        username: '',
        email: '',
        surname: '',
        name: ''
      },
      available: true,
      owner: {
        id: '',
        surname: '',
        name: '',
        patronymic: '',
        documentNumber: '',
        birthDate: '2016-04-24',
        gender: 'женский'
      }
    })),
    startTime: '',
    destination: '',
    departure: ''
  })
  const [selectedUser, setSelectedUser] = useState<IUser>({
    _id: '',
    username: '',
    password: '',
    email: '',
    surname: '',
    name: '',
    passengers: [],
    trips: []
  })

  const [getUsersData, { isLoading: isUsersDataLoading, isError: isGettingUsersDataError, data: UsersData, isSuccess: isGettingUsersDataSuccess, error: getingUsersDataError }] = useLazyGetAllUsersQuery()
  const [getTripsData, { isLoading: isTripsDataLoading, isError: isTripsDataError, data: TripsData, isSuccess: TripsDataSuccess, error: TripsDataError }] = useLazyGetTripsDataQuery()
  const [upDateTripInfo, { isSuccess: isUpDateTripInfoSuccess, data: upDateData, isError: isUpDateTripInfoError, error: UpDateTripInfoError }] = useUpDateTripInfoMutation()
  const [cancelTrip, { isLoading, data: cancelTripData, isSuccess: isCancelTripSuccess }] = useCancelTripMutation()
  const [addNewTrip, { isLoading: isAddNewTripLoading, isError: isSAddNewTripError, data: addNewTripResult, isSuccess: addNewTripSuccess, error: AddNewTripError }] = useAddNewTripMutation()
  const [updateUserData, { isSuccess: isUpdateUserDataSuccess, data: UpdateUserData, isError: isUpDateError, error: UpDateError }] = useUpDateUserInfoMutation()
  const [addNewUser, { isLoading: isAddNewUserLoading, isError: isAddNewUserError, data: AddNewUserData, isSuccess: isAddNewUserSuccess, error: AddNewUserError }] = useSignUpMutation()
  const [deleteUser, { data: deleteUserData, isSuccess: isDeletionUserSuccess }] = useDeleteMutation()

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  }
  useEffect(() => {
    getUsersData({ type: 'GET_ALL_DATA' })
    getTripsData({})
  }, [])
  useEffect(() => {
    if (isGettingUsersDataSuccess && UsersData && TripsDataSuccess && TripsData) {
      console.log('here', UsersData)
      setUsersList([...UsersData.users.map(user => {
        return {
          _id: user._id,
          username: user.username,
          password: user.password,
          email: user.email,
          surname: user.surname,
          name: user.name,
          passengers: user.passengers,
          trips: [...user.trips.map(userTrip => {
            return {
              orderId: userTrip.orderId,
              tripId: userTrip.tripId,
              seats: userTrip.seats,
              tripData: TripsData.busTrips.filter(tripData => {
                if (tripData._id === userTrip.tripId) {
                  return {
                    date: tripData.date,
                    driver: tripData.driver,
                    finishTime: tripData.finishTime,
                    from: tripData.from,
                    price: tripData.price,
                    to: tripData.to,
                    type: tripData.type,
                    availableSeats: tripData.availableSeats,
                    travelTime: tripData.travelTime,
                    reservedSeats: tripData.reservedSeats,
                    startTime: tripData.startTime,
                    destination: tripData.destination,
                    departure: tripData.departure
                  }
                }
              })[0]
            }
          })]
        }
      })])
      setPassengersList(UsersData.users.flatMap(user =>
        user.passengers ? [{
          user: {
            _id: user._id,
            username: user.username,
            email: user.email,
            surname: user.surname,
            name: user.name
          },
          passengers: user.passengers
        }] : []
      ))
    }
  }, [isGettingUsersDataSuccess, UsersData, TripsDataSuccess, TripsData])
  useEffect(() => {
    if (TripsDataSuccess && TripsData) {
      console.log('TripsData', TripsData)
      setTripsList(TripsData.busTrips)
    }
  }, [TripsDataSuccess, TripsData])
  useEffect(() => {

    if (isCancelTripSuccess) {
      setTripsList(prev => prev.filter(trip => trip._id !== selectedTrip._id))
      setIsShowEditTripInfo(false)
    }
  }, [isCancelTripSuccess])
  useEffect(() => {

    if (addNewTripSuccess && addNewTripResult) {

      setTripsList(prev => [...prev, { ...selectedTrip, _id: addNewTripResult.addNewTrip.insertedId }])
    }
  }, [addNewTripSuccess, addNewTripResult])
  useEffect(() => {
    if (isUpDateTripInfoSuccess && upDateData) {
      setTripsList(prev => {
        let newTripList = prev.map(trip => {
          if (trip._id === selectedTrip._id) {
            return {
              _id: selectedTrip._id,
              date: selectedTrip.date,
              driver: selectedTrip.driver,
              finishTime: selectedTrip.finishTime,
              from: selectedTrip.from,
              price: selectedTrip.price,
              to: selectedTrip.to,
              type: selectedTrip.type,
              availableSeats: selectedTrip.availableSeats,
              travelTime: selectedTrip.travelTime,
              reservedSeats: selectedTrip.reservedSeats,
              seats: selectedTrip.seats,
              startTime: selectedTrip.startTime,
              destination: selectedTrip.destination,
              departure: selectedTrip.departure
            }
          }
          return trip
        })
        return newTripList
      }
      )


    }
  }, [isUpDateTripInfoSuccess, upDateData])
  useEffect(() => {
    if (isUpdateUserDataSuccess) {
      setUsersList(prev => {
        let newList = prev.map(user => {
          if (user._id === selectedUser._id) {
            return {
              _id: selectedUser._id,
              username: selectedUser.username,
              password: selectedUser.password,
              email: selectedUser.email,
              surname: selectedUser.surname,
              name: selectedUser.name,
              passengers: selectedUser.passengers,
              trips: selectedUser.trips
            }
          }
          return user
        })
        return newList
      })
    }
  }, [isUpdateUserDataSuccess, UpdateUserData])
  useEffect(() => {
    if (isAddNewUserSuccess && AddNewUserData) {
      setUsersList(prev => [...prev, { ...selectedUser, _id: AddNewUserData.addUser.insertedId }])
    }
  }, [isAddNewUserSuccess, AddNewUserData])
  useEffect(() => {
    if (isDeletionUserSuccess && deleteUserData) {
      setUsersList(prev => {
        let newUsersList = prev.filter(user => {
          if (user._id !== selectedUser._id) {
            return user
          }
        })
        return newUsersList
      })
    }
  }, [isDeletionUserSuccess, deleteUserData])

  function upDateTripInfoHandler() {
    let updatedSeats = selectedTrip.seats.map((seat, index) => {
        return {
          ...seat,
          owner: {...seat.owner,
            seatNumber: index+1
          }
        }
    }).filter(seat => seat.available === false)
    console.log('updatedSeats',updatedSeats);
    
    let ordersId = updatedSeats
      .filter(seat => seat.user !== null && typeof seat.user === 'object')
      .map(seat => seat.orderId)
      .filter((value, index, self) => value !== null && self.indexOf(value) === index)
      console.log('ordersId',ordersId);

    let updetedUsers = ordersId.map(orderId => {
      return {
        orderId:orderId,
        userId: updatedSeats.filter(seat => seat.user !== null && typeof seat.user === 'object' && seat.orderId === orderId).map(seat => seat.user?._id)[0],
        tripId:selectedTrip._id,
        seats: [...updatedSeats.filter(seat => seat.orderId === orderId ).map(seat => seat.owner)]
      }
    })
    console.log('updetedUsers',updetedUsers);
    upDateTripInfo({ id:selectedTrip._id, type: 'FULL_UPDATE_TRIP_INFO', trip: selectedTrip })
    updetedUsers.map((updatedUser, index) => {
      let userTrips = usersList.filter(user => user._id === updatedUser.userId)[0].trips  
      console.log('userTrips', userTrips);
      updateUserData({ uid: updatedUser.userId, type: 'UPDATE_USER_TRIPS', user:updatedUser, userTrips })
    })
  }
  function addNewTripHandler() {
    addNewTrip({ tripData: selectedTrip })
  }
  function deleteTrip(uid: string) {
    cancelTrip(uid)
  }


  function upDateUserInfoHandler(id: string, tripsId: Array<string>) {
    setIsAddNewUser(false)
    updateUserData({ uid: id, type: 'FULL_UPDATE_USER_INFO', user: selectedUser })
    tripsId.map(id => {
      let seats = selectedUser.trips.filter(trip => trip.tripId === id)[0].seats.map(seat => seat.id)
      let seatsTripData = tripsList.filter(trip => trip._id === id)[0].seats
      upDateTripInfo({ id, type: 'UPDATE_SEAT_TRIP_INFO', user: selectedUser, seats, seatsTripData })
    })
    deletedTrips.map(deletedTrip => {
      let TripSeats = tripsList.filter(trip => trip._id === deletedTrip.tripId).map(trip => trip.seats)[0]
      let availableSeats = tripsList.filter(trip => trip._id === deletedTrip.tripId).map(trip => trip.availableSeats)[0]
      let reservedSeats = tripsList.filter(trip => trip._id === deletedTrip.tripId).map(trip => trip.reservedSeats)[0]
      let amountOfTickets = deletedTrip.amountOfTickets
      upDateTripInfo({ id:deletedTrip.tripId, type: 'DELETE_ORDER', seats: TripSeats, orderId:deletedTrip.orderId, availableSeats, reservedSeats, amountOfTickets })
    })
  }
  function addNewUserHandler() {
    setIsAddNewUser(true)
    addNewUser({ username: selectedUser.username, password: selectedUser.password, email: selectedUser.email, surname: selectedUser.email, name: selectedUser.name, passengers: selectedUser.passengers, trips: selectedUser.trips })
  }
  function deleteUserHandler(uid: string) {
    deleteUser(uid)
  }

  return (
    <div>
      <Box className={styles.tabBox}
        sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', padding: 0 }}
      >
        <Tabs
          orientation="vertical"
          variant="standard"
          value={value}
          onChange={handleChange}
          aria-label="Tabs"
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          <Tab label="Пользователи" {...a11yProps(0)} />
          <Tab label="Рейсы" {...a11yProps(1)} />
          <Tab label="Автобусы" {...a11yProps(2)} />
        </Tabs>
        <TabPanel value={value} index={0} >
          {isShowEditUserInfo ?
            <EditUserInfo
              setIsShowEditUserInfo={setIsShowEditUserInfo}
              setIsAddNewUser={setIsAddNewUser}
              isAddNewUser={isAddNewUser}
              setSelectedUser={setSelectedUser}
              selectedUser={selectedUser}
              upDateUserInfoHandler={upDateUserInfoHandler}
              addNewUserHandler={addNewUserHandler}
              deleteUserHandler={deleteUserHandler}
              setDeletedTrips={setDeletedTrips}
            ></EditUserInfo> :
            <UsersManagement
              usersList={usersList}
              setIsShowEditUserInfo={setIsShowEditUserInfo}
              setIsAddNewUser={setIsAddNewUser}
              setSelectedUser={setSelectedUser}
            />}

        </TabPanel>
        <TabPanel value={value} index={1}>
          {isShowEditTripInfo ?
            <EditTripInfo
              setIsShowEditTripInfo={setIsShowEditTripInfo}
              selectedTrip={selectedTrip}
              passengersList={passengersList}
              setSelectedTrip={setSelectedTrip}
              upDateTripInfoHandler={upDateTripInfoHandler}
              areThereAnyPassengers={areThereAnyPassengers}
              deleteTrip={deleteTrip}
              isAddNewTrip={isAddNewTrip}
              setIsAddNewTrip={setIsAddNewTrip}
              setAreThereAnyPassengers={setAreThereAnyPassengers}
              addNewTripHandler={addNewTripHandler}

            ></EditTripInfo> :
            <TripsManagement
              tripsList={tripsList}
              setIsShowEditTripInfo={setIsShowEditTripInfo}
              setSelectedTrip={setSelectedTrip}
              setIsAddNewTrip={setIsAddNewTrip}
            ></TripsManagement>
          }
        </TabPanel>
        <TabPanel value={value} index={2}>
          <BusesManagement></BusesManagement>
        </TabPanel>
      </Box>
    </div>
  )
}

export default Admin