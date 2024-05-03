import { useEffect, useState, MouseEvent } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { logOut, logIn, dropUser } from '@/store/reducers/authSlice'
import { Tab, Tabs, Box, TextField, Button, Alert, AlertTitle } from "@mui/material";
import styles from '@/styles/PersonalAccount.module.scss'
import AlertComponent from '@/components/Alert'
import { useDeleteMutation, useUpDateUserInfoMutation, useLazyLoginQuery, useLazyGetTripsDataQuery } from "@/store/reducers/api/app";
import Modal from "@/components/ModalWindows/Modal";
import ChangePassword from "@/components/ModalWindows/ChangePassword";
import ConfirmDeletion from '@/components/ModalWindows/ConfirmDeletion'
import Header from "@/components/Navigation/Header";
import Settings from "@/components/PersonalAccount/Settings";
import Info from "@/components/PersonalAccount/Info";
import { BusTrip, CustomAlertType, Passenger, UserTrip } from "@/types/types";
import { Head } from "next/document";
import { clearSeatsInfo } from "@/components/CreateOrder/ChoosePlaces";
import Passengers from "@/components/PersonalAccount/Passengers";



interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}


function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      className={styles.tabs}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
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

const PersonalAccount = () => {
  const UpdateInfoType = 'UPDATE_INFO'
  const UpdatePasswordType = 'UPDATE_PASSWORD'
  let [uid, setUid] = useState('')
  const [value, setValue] = useState(0)
  const [username, setUsername] = useState('')
  const [surname, setSurname] = useState('')
  const [name, setName] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newPasswordRepeat, setNewPasswordRepeat] = useState('')
  const [email, setEmail] = useState('')

  const [showModal, setShowModal] = useState(false)
  const [showModalConfirmDelition, setShowModalConfirmDelition] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [alertText, setAlertText] = useState('Successfully updated!')
  const [alertType, setAlertType] = useState<CustomAlertType>('success')

  const [getUserData, { isLoading: isLogInLoading, isError: isLogInError, data: UserData, isSuccess: isLogInSuccess, error: logInError }] = useLazyLoginQuery()
  const [deleteUser, { isLoading, data: deleteUserData, isSuccess: isDeletionSuccess }] = useDeleteMutation()
  const [updateUserData, { isSuccess: isUpdateSuccess, data: UpdateUserData, isError: isUpDateError, error: UpDateError }] = useUpDateUserInfoMutation()
  const [getTripsData, { isLoading: isTripsDataLoading, isError: isTripsDataError, data: TripsData, isSuccess: TripsDataSuccess, error: TripsDataError }] = useLazyGetTripsDataQuery()

  const [userPassengers, setUserPassengers] = useState<Passenger[] | []>([])
  const [isEditPassengerInfo, setIsEditPassengerInfo] = useState(false)
  const [userTrips, setUserTrips] = useState<UserTrip[] | []>([])

  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    console.log('ок', userPassengers);
  }, [userPassengers])


  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  async function deleteAccountHandler() {
    if (uid) {
      deleteUser(uid)
      dispatch(dropUser({}))
      setShowModal(false)
    } else {
      console.log(`There isn't uid`)
    }
  }

  async function updateUserInfoHandler(e: MouseEvent<HTMLFormElement>) {
    e.preventDefault()
    updateUserData({ uid, type: UpdateInfoType, username, surname, email, name })
  }

  async function UpdateUserPasswordHandler() {
    if (newPassword.trim() === newPasswordRepeat.trim()) {
      updateUserData({ uid, type: UpdatePasswordType, newPassword, password: currentPassword })
      setShowModal(false)
      console.log(currentPassword)
      setAlertText('Password was successfully updated')
      setAlertType('success')
      setShowAlert(true)
      setTimeout(() => {
        setShowAlert(false)
      }, 3000);
    } else {
      console.log('Пароли не совпадают')
      setAlertText('Пароли не совпадают')
      setAlertType('error')
    }
  }


  async function ChangePasswordHandler() {
    setShowModal(true)
  }

  useEffect(() => {
    if (isLogInSuccess && UserData) {
      setUsername(UserData.user.username)
      setEmail(UserData.user.email)
      setSurname(UserData.user.surname)
      setName(UserData.user.name)
      setUserPassengers(UserData.user.passengers)
      // setUserTrips(UserData.user.trips)
    }
  }, [isLogInSuccess, UserData])

  useEffect(() => {
    if (isLogInSuccess && UserData && TripsDataSuccess && TripsData) {
      setUserTrips([...UserData.user.trips.map(trip => {
        return {
          orderId:trip.orderId,
          tripId: trip.tripId,
          seats: trip.seats,
          tripData: TripsData.busTrips.filter(busTrip => {
            if (busTrip._id === trip.tripId) {
              return {
                date: busTrip.date,
                driver: busTrip.driver,
                finishTime: busTrip.finishTime,
                from: busTrip.from,
                price: busTrip.price,
                to: busTrip.to,
                type: busTrip.type,
                availableSeats: busTrip.availableSeats,
                travelTime: busTrip.travelTime,
                reservedSeats: busTrip.reservedSeats,
                startTime: busTrip.startTime,
                destination: busTrip.destination,
                departure: busTrip.departure
              }
            }
          })[0]
        }
      })
      ])
    }
  }, [TripsDataSuccess, TripsData, isLogInSuccess, UserData])


  useEffect(() => {
    if (isDeletionSuccess && deleteUserData) {
      localStorage.setItem('token', 'null')
      localStorage.setItem('user', 'null')
      localStorage.setItem('uid', 'null')
      uid = ''
      dispatch(logOut({}))
      router.push('/')
    }
  }, [isDeletionSuccess, deleteUserData])

  useEffect(() => {
    if (isUpdateSuccess && UpdateUserData) {
      setAlertType('success')
      setAlertText('Successfully updated!')
      setShowAlert(true)
      setTimeout(() => {
        setShowAlert(false)
      }, 3000);
      console.log('Успешно сохранено!')
    }
  }, [UpdateUserData, isUpdateSuccess])

  useEffect(() => {
    if (isUpDateError && UpDateError) {

      if ('status' in UpDateError) {
        const data = UpDateError.data as any
        // setError(data.message || 'Unknown error')
        setAlertType('error')
        setShowAlert(true)
        setTimeout(() => {
          setShowAlert(false)
        }, 3000);
      }

    }
  }, [isUpDateError, UpDateError])
  // useEffect(() => {
  //   if (TripsDataSuccess && TripsData) {
  //     setUserTrips(TripsData.busTrips)
  //   }
  // }, [TripsDataSuccess, TripsData])

  useEffect(() => {
    clearSeatsInfo()
    const token = localStorage.getItem('token')
    console.log(token)
    const currentUser = localStorage.getItem('user')
    const userId = localStorage.getItem('uid')
    setUid(userId || '')
    if (token && currentUser) {
      getUserData({ username: currentUser, type: 'GET_DATA' })
      getTripsData({})
      // getTripsData({})
    }

    setAlertType('success')
    setAlertText('Login is successful')
  }, [isEditPassengerInfo])


  return (
    <>
      {showModal &&
        <Modal width={30}>
          <ChangePassword
            currentPassword={currentPassword}
            newPassword={newPassword}
            newPasswordRepeat={newPasswordRepeat}
            setCurrentPassword={setCurrentPassword}
            setNewPassword={setNewPassword}
            setNewPasswordRepeat={setNewPasswordRepeat}
            setShowModal={setShowModal}
            UpdateUserPasswordHandler={UpdateUserPasswordHandler}
            alertText={alertText}
            alertType={alertType}
          />

        </Modal>}
      {showModalConfirmDelition &&
        <Modal width={30}>
          <ConfirmDeletion
            deleteAccount={deleteAccountHandler}
            setShowModalConfirmDelition={setShowModalConfirmDelition}
          />
        </Modal>
      }
      <Box className={styles.tabBox}
        sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', padding: 0 }}
      >

        <div className={styles.tabsBox}>
          <Tabs
            orientation="vertical"
            variant="standard"
            value={value}
            onChange={handleChange}
            aria-label="Tabs"
            sx={{ borderRight: 1, borderColor: 'divider' }}
          >
            <Tab label="Личная информация" {...a11yProps(0)} />
            <Tab label="Мои поездки" {...a11yProps(1)} />
            <Tab label="Мои пасажиры" {...a11yProps(2)} />
            <Tab label="Настройки" {...a11yProps(3)} />
            {/* <Tab label="Выйти" onClick={logOuthandler} /> */}
          </Tabs>
          {/* <Button variant="contained" onClick={logOuthandler} className={styles.logOutBtn}>Выйти</Button> */}

        </div>

        <TabPanel value={value} index={0}>
          <Info
            setUsername={setUsername}
            setName={setName}
            setSurname={setSurname}
            setEmail={setEmail}

            email={email}
            surname={surname}
            name={name}
            username={username}

            showAlert={showAlert}
            setShowAlert={setShowAlert}
            alertType={alertType}
            alertText={alertText}

            updateUserInfoHandler={updateUserInfoHandler}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          {userTrips.length === 0 && 'У вас нет сохраненных поездок'}
          {userTrips.map(trip => <div className="border border-gray-300 rounded-md p-4 mb-4">
            <p className="text-lg font-semibold">Id: {trip.tripId}</p>
            <p className="text-gray-700">Откуда: {trip.tripData.from}</p>
            <p className="text-gray-700">Куда: {trip.tripData.to}</p>
          </div>)}
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Passengers userPassengers={userPassengers} uid={uid} isEditPassengerInfo={isEditPassengerInfo} setIsEditPassengerInfo={setIsEditPassengerInfo} setUserPassengers={setUserPassengers}></Passengers>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Settings
            ChangePasswordHandler={ChangePasswordHandler}
            setShowModalConfirmDelition={setShowModalConfirmDelition}
          />
        </TabPanel>
        <TabPanel value={value} index={4}></TabPanel>
      </Box>

    </>
  )
}

export default PersonalAccount