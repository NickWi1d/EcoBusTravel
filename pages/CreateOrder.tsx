import React, { useEffect, useState, FC } from 'react'
import { useRouter } from 'next/router';
import styles from '@/styles/CreateOrder.module.scss'
import { Stepper, Step, Box, StepButton, Button, Typography } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import { Bus, BusTrip, CustomAlertType, Customer } from '@/types/types';
import FirstStep from '@/components/CreateOrder/FirstStep/FirstStep';
import SecondStep from '@/components/CreateOrder/SecondStep/SecondStep';
import CompletionStep from '@/components/CreateOrder/CompletionStep/СompletionStep'
import { useLazyGetBusesQuery, useLazyGetTripsDataQuery, useLazyLoginQuery, useUpDateTripInfoMutation, useUpDateUserInfoMutation } from '@/store/reducers/api/app';
import { Passenger } from '@/types/types'
import { getCurrentDate } from '@/components/Navigation/NavBar';
import { v4 as uuidv4 } from 'uuid';



const CreateOrder: FC = () => {

    const [getUserData, { isLoading: isGetUserDataLoading, isError: isGetUserDataError, data: UserData, isSuccess: isGetUserDataSuccess, error: UserDataError }] = useLazyLoginQuery()
    const [getBusInfo, { isLoading: isGetBusInfoLoading, isError: isGetBusInfoError, data: BusInfo, isSuccess: isGetBusInfoSuccess, error: BusInfoError }] = useLazyGetBusesQuery()
    const [upDateTripInfo, { isSuccess: isUpDateTripInfoSuccess, data: upDateMessage, isError: isUpDateTripInfoError, error: UpDateTripInfoError }] = useUpDateTripInfoMutation()
    const [upDateUserInfo, { isSuccess: isUpDateUserInfoSuccess, data: upDateUserInfoMessage, isError: isUpDateUserInfoError, error: UpDateUserInfoError }] = useUpDateUserInfoMutation()

    const router = useRouter();
    const [tripData, setTripData] = useState<BusTrip | undefined>(undefined)
    const [busInfo, setBusInfo] = useState<Bus | undefined>(undefined)

    const [user, setUser] = useState<{ uid: string, username: string, name: string, surname: string, email: string, phoneNumber:string }>({
        uid: '',
        username: '',
        name: '',
        surname: '',
        email: '',
        phoneNumber:''
    })
    const [customer, setCustomer] = useState<Customer>({
        surname: '',
        name: '',
        phoneNumber: '',
        email: '',
    })

    const [loading, setLoading] = useState(true);
    // const [isPassengersDataFilled, setIsPassengersDataFilled] = useState(true)
    // const [isCustomerDataFilled, setIsCustomerDataFilled] = useState(false)
    const [isFullDataFilled, setIsFullDataFilled] = useState(false)

    const [amountOfTickets, setAmountOfTickets] = useState(1)
    const [selectedSeats, setSelectedSeats] = useState<string[]>([])
    const [currentPassengers, setCurrentPassengers] = useState<Passenger[]>([
        {
            id: '',
            birthDate: '',
            documentNumber: '',
            gender: '',
            name: '',
            patronymic: '',
            surname: ''
        }
    ])


    const [isAllSeatsSelected, setIsAllSeatsSelected] = useState(true)

    const [userPassengers, setUserPassengers] = useState<Passenger[]>([])

    const [type, setType] = useState<CustomAlertType>('warning')
    const [text, setText] = useState('')
    const [showAlert, setShowAlert] = useState(false)

    const steps = ['Выбор автобуса', 'Выбор мест', 'Данные пассажиров', 'Завершение']

    const confirmTrip = () => {
        setLoading(true)
        const id = tripData?._id
        const availableSeats = tripData?.availableSeats
        const reservedSeats = tripData?.reservedSeats
        const seats = tripData?.seats
        const uid = localStorage.getItem('uid')
        const orderId = uuidv4();
        upDateTripInfo({ id, type: 'SEAT_RESERVATION', availableSeats, reservedSeats, seats, amountOfTickets, selectedSeats, currentPassengers, customer, user, orderId })
        upDateUserInfo({ uid, tripData, selectedSeats, currentPassengers, type: 'ADD_USER_TRIP', orderId })
    }
    useEffect(() => {
        if (isUpDateTripInfoSuccess && isUpDateUserInfoSuccess) {
            router.push(`/SearchResults?date=${getCurrentDate()}&bottomPrice=0&topPrice=100`)
            setLoading(false)
        }
    }, [isUpDateTripInfoSuccess, isUpDateUserInfoSuccess])
    useEffect(() => {
        console.log('ошибка сдесь ', UpDateUserInfoError)
        setLoading(false)
    }, [isUpDateUserInfoError, UpDateUserInfoError])
    const getParams = () => {
        const queryParams = router.query as Record<string, string>
        console.log('ghbdtn', queryParams)
        if (queryParams) {
            const updatedSeats = queryParams.seats
                ? JSON.parse(queryParams.seats)
                : undefined;
            const availableSeats = parseInt(queryParams.availableSeats)
            const reservedSeats = parseInt(queryParams.reservedSeats)
            const price = parseInt(queryParams.price)
            const updatedTripData = {
                ...queryParams,
                availableSeats: availableSeats,
                reservedSeats: reservedSeats,
                price: price,
                seats: updatedSeats,
            };
            getBusInfo({id:queryParams.busNumber})
            setTripData(updatedTripData as BusTrip);
            console.log('куку', updatedTripData)
        }
    }


    useEffect(() => {
        const currentUser = localStorage.getItem('user')
        const uid = localStorage.getItem('uid')
        if (uid && currentUser) {
            setUser(prev => { return { ...prev, uid, username: currentUser } })
        }
        getUserData({ username: currentUser, type: 'GET_DATA' })

    }, [])
    // useEffect(() => {
    //     getBusInfo({id:tripData?.busNumber})
    //     console.log("BusNumber: ", tripData?.busNumber);
    // }, [tripData])

    useEffect(() => {
        if (isGetUserDataSuccess && UserData) {
            setUserPassengers(UserData.user.passengers)
            setUser(prev => { return { ...prev, name: UserData.user.name, surname: UserData.user.surname, email: UserData.user.email, phoneNumber:UserData.user.phoneNumber } })
        }
    }, [isGetUserDataSuccess, UserData])

    useEffect(() => {
        if(isGetBusInfoSuccess && BusInfo){
            setBusInfo(BusInfo.bus)
        }
    }, [isGetBusInfoSuccess, BusInfo])
    

    useEffect(() => {
        getParams()
    }, [router.query])


    function checkTheDataFilling() {
        setIsFullDataFilled(true)
        for (let index = 0; index < currentPassengers.length; index++) {
            let currentPassenger = currentPassengers[index]
            if (currentPassenger.id.length === 0 || currentPassenger.name.length === 0 || currentPassenger.surname.length === 0 || currentPassenger.gender.length === 0 || currentPassenger.documentNumber.length === 0 || currentPassenger.birthDate.length === 0) {
                setIsFullDataFilled(false)
                break
            }
        }
        if (customer.name.length === 0 || customer.surname.length === 0 || customer.phoneNumber.length === 0 || customer.email.length === 0) {
            setIsFullDataFilled(false)
        }
    }
    useEffect(() => {
        checkTheDataFilling()
    }, [currentPassengers, customer, loading])
    

    const [activeStep, setActiveStep] = useState(1);
    const [completed, setCompleted] = useState<{
        [k: number]: boolean;
    }>({ 0: true });
    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed,
                // find the first step that has been completed
                steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = (step: number) => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        setCompleted(prev => {
            if (Object.keys(prev).length === 0) {
                return prev;
            }
            const keys = Object.keys(prev);
            const lastKey = parseInt(keys[keys.length - 1])
            const updatedState = { ...prev };
            delete updatedState[lastKey];

            return updatedState;
        })
    }

    const handleStep = (step: number) => () => {
        setActiveStep(step);
    };

    const handleComplete = () => {
        if (completedSteps() === totalSteps() - 1) {
            confirmTrip()
        } else if (completedSteps() === 1) {
            setLoading(true)
            setTimeout(() => {
                if (amountOfTickets === selectedSeats.length) {
                    setShowAlert(false)
                    setIsAllSeatsSelected(true)
                    const newCompleted = completed
                    newCompleted[activeStep] = true
                    setCompleted(newCompleted)
                    handleNext()

                } else {
                    setIsAllSeatsSelected(false)
                }
                setLoading(false)
            }, 1000);
        } else if (completedSteps() === 2) {
            setLoading(true)
            setTimeout(() => {
                checkTheDataFilling()
                if (isFullDataFilled) {
                    setShowAlert(false)
                    const newCompleted = completed
                    newCompleted[activeStep] = true
                    setCompleted(newCompleted)
                    handleNext()
                } else {
                    if (!isFullDataFilled) {
                        setType('warning')
                        setText('Заполните все поля!')
                        setShowAlert(true)
                    }
                    //  else if (!isCustomerDataFilled) {
                    //     setType('warning')
                    //     setText('Заполните данные заказчика!')
                    //     setShowAlert(true)
                    // }
                }
                setLoading(false)
            }, 1000);

        }
    };

    const handleReset = () => {
        setActiveStep(1);
        setCompleted({ 0: true });

    };

    const handleBackToTrips = () => {
        router.back()
    }

    const handleStepClick = (index: number) => {
        if (index === 0) {
            handleBackToTrips()
        } else if (index === 1) {
            setActiveStep(index)
            setCompleted({ 0: true })
        } else if (index === 2) {

            setActiveStep(index)
            setCompleted({ 0: true, 1: true })
        } else if (index === 3) {
            setActiveStep(index)
            setCompleted({ 0: true, 1: true, 2: true })
        }
    }

    return (
        <div>
            <Box className={styles.OrderProcessContent}>
                <Stepper nonLinear activeStep={activeStep}>
                    {steps.map((label, index) => (
                        <Step key={label} completed={completed[index]}>
                            <StepButton disabled={index > activeStep && true} color="inherit" onClick={() => handleStepClick(index)}>
                                {label}
                            </StepButton>
                        </Step>
                    ))}
                </Stepper>
                <div>
                    {allStepsCompleted() ? (
                        <React.Fragment>
                            <Typography sx={{ mt: 2, mb: 1 }}>
                                All steps completed - you&apos;re finished
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Box sx={{ flex: '1 1 auto' }} />
                                <Button onClick={handleReset}>Reset</Button>
                            </Box>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {activeStep == 1 && <FirstStep
                                tripData={tripData}
                                amountOfTickets={amountOfTickets}
                                setAmountOfTickets={setAmountOfTickets}
                                selectedSeats={selectedSeats}
                                setSelectedSeats={setSelectedSeats}
                                isAllSeatsSelected={isAllSeatsSelected}
                                setCurrentPassengers={setCurrentPassengers}
                                busInfo={busInfo}
                                isGetBusInfoLoading={isGetBusInfoLoading}
                            ></FirstStep>}
                            {activeStep == 2 && <SecondStep
                                tripData={tripData}
                                selectedSeats={selectedSeats}
                                userPassengers={userPassengers}
                                setCurrentPassengers={setCurrentPassengers}
                                setCustomer={setCustomer}
                                type={type}
                                text={text}
                                setShowAlert={setShowAlert}
                                showAlert={showAlert}
                                user={user}
                                currentPassengers={currentPassengers}
                                customer={customer}
                            ></SecondStep>}
                            {activeStep == 3 && <CompletionStep
                                currentPassengers={currentPassengers}
                                selectedSeats={selectedSeats}
                                tripData={tripData}
                            ></CompletionStep>}
                            <Box sx={{ pt: 2 }}>
                                <Box sx={{ flex: '1 1 auto' }} />
                                {completedSteps() !== totalSteps() - 1
                                    &&
                                    // <Button onClick={handleComplete} sx={{ mr: 1 }} variant='contained' className={styles.Btn}>
                                    //     {activeStep === 1 ? 'Продолжить оформление' : 'Перейти к оплате'}
                                    // </Button>
                                    <LoadingButton
                                        onClick={handleComplete}
                                        endIcon={<SendIcon />}
                                        loading={loading}
                                        loadingPosition="end"
                                        variant="contained"
                                        className={`${styles.Btn} mb-[2%]`}
                                        sx={{ mr: 1 }}
                                    >
                                        {activeStep === 1 ? 'Продолжить оформление' : 'Перейти к оплате'}
                                    </LoadingButton>}
                                {completedSteps() === totalSteps() - 1
                                    &&
                                    <LoadingButton
                                        onClick={handleComplete}
                                        endIcon={<SendIcon />}
                                        loading={loading}
                                        loadingPosition="end"
                                        variant="contained"
                                        className={`${styles.Btn} mb-[2%]`}
                                    >
                                        <span>{completedSteps() === totalSteps() - 1
                                            && 'Подтвердить'}</span>
                                    </LoadingButton>
                                    // <Button onClick={handleComplete} variant='contained' className={styles.Btn}>
                                    //     {completedSteps() === totalSteps() - 1
                                    //         && 'Подтвердить'}
                                    // </Button>
                                }

                            </Box>

                        </React.Fragment>
                    )}
                </div>
            </Box>

        </div>
    )
}

export default CreateOrder