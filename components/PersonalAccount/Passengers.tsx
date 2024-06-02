import { Passenger } from '@/types/types'
import styles from '@/styles/PersonalAccount.module.scss'
import React, { MouseEvent, useEffect, useState } from 'react'
import Modal from "@/components/ModalWindows/Modal";
import PassengerForm from './PassengerForm';
import { SelectChangeEvent, Button } from '@mui/material';
import AddPassenger from '../ModalWindows/AddPassenger';
import { useUpDateUserInfoMutation } from '@/store/reducers/api/app';
import PassengerCard from './PassengerCard';
import { useRouter } from 'next/router';

const Passengers = ({ userPassengers, uid, isEditPassengerInfo, setIsEditPassengerInfo, setUserPassengers }: { userPassengers: Passenger[], uid: string, isEditPassengerInfo: boolean, setIsEditPassengerInfo: React.Dispatch<React.SetStateAction<boolean>>, setUserPassengers: React.Dispatch<React.SetStateAction<Passenger[] | []>> }) => {

  const [updateUserData, { isSuccess: isUpdateSuccess, data: UpdateUserData, isError: isUpDateError, error: UpDateError }] = useUpDateUserInfoMutation()

  const [isItNewPassanger, setIsItNewPassanger] = useState(false)

  const [surname, setSurname] = useState('')
  const [name, setName] = useState('')
  const [patronymic, setPatronymic] = useState('')
  const [documentNumber, setDocumentNumber] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [gender, setGender] = useState('')
  const [passengerIndex, setPassengerIndex] = useState(0)

  const addNewPassenger = () => {
    setIsItNewPassanger(true)
    setIsEditPassengerInfo(true)
    setSurname('')
    setName('')
    setPatronymic('')
    setDocumentNumber('')
    setBirthDate('')
    setGender('')
    setPassengerIndex(0)
  }

  const openAddPassengerWindow = (event: MouseEvent<HTMLButtonElement>, passenger: Passenger, index: number) => {
    setIsItNewPassanger(false)
    setIsEditPassengerInfo(true)
    setSurname(passenger.surname)
    setName(passenger.name)
    setPatronymic(passenger.patronymic)
    setDocumentNumber(passenger.documentNumber)
    setBirthDate(passenger.birthDate)
    setGender(passenger.gender)
    setPassengerIndex(index)
  }
  function deletePassenger() {
    let obj = userPassengers.filter((passenger, index) => {
      if (index !== passengerIndex) {
        return passenger
      }
    })
    setPassengerIndex(passengerIndex)
    updateUserData({ uid, type: 'DELETE_USER_PASSENGER', passengers: obj })
  }
  function upDateUserPassenger() {
    updateUserData({ id:userPassengers[passengerIndex].id, passengerIndex, type: 'UPDATE_USER_PASSENGERS', uid, surname, name, patronymic, gender, document, documentNumber, birthDate })
  }
  function AddUserPassenger() {
    updateUserData({ type: 'ADD_USER_PASSENGERS', uid, surname, name, patronymic, gender, document, documentNumber, birthDate })
  }
  function handleRequest() {
    isItNewPassanger ? AddUserPassenger() : upDateUserPassenger()
  }

  useEffect(() => {
    if (isUpdateSuccess && (UpdateUserData.message === 'User passengers was successfully updated' || 'User passengers was successfully updated')) {
      setSurname('')
      setName('')
      setPatronymic('')
      setDocumentNumber('')
      setBirthDate('')
      setGender('')
      setPassengerIndex(0)
      setIsEditPassengerInfo(false)
    }
    if (isUpdateSuccess && UpdateUserData?.message === 'Passenger was successfully updated') {
      setUserPassengers(prev => {
        return [...prev.filter((passenger, index) => index !== passengerIndex)]
      }
      )
    }
  }, [isUpdateSuccess, UpdateUserData])
  return (
    <div>
      {isEditPassengerInfo && <Modal width={50}>
        <AddPassenger
          surname={surname}
          name={name}
          patronymic={patronymic}
          documentNumber={documentNumber}
          birthDate={birthDate}
          gender={gender}
          setSurname={setSurname}
          setName={setName}
          setPatronymic={setPatronymic}
          setDocumentNumber={setDocumentNumber}
          setBirthDate={setBirthDate}
          setGender={setGender}
          setIsEditPassengerInfo={setIsEditPassengerInfo}
          handleRequest={handleRequest}
          passengerIndex={passengerIndex}
        ></AddPassenger>
      </Modal>}
      <Button variant='contained' className={`${styles.Btn} w-[500px] mb-[2%] flex items-center`} onClick={addNewPassenger}>Добавить пасажира<img src="/icons8-плюс-32.png" className={'ml-3 pb-[2px]'} alt="" width={20} /></Button>
      {userPassengers.map((passenger, index) =>
        <PassengerCard
          key={index}
          index={index}
          passenger={passenger}
          openAddPassengerWindow={openAddPassengerWindow}
          deletePassenger={deletePassenger}
        ></PassengerCard>
      )}</div>
  )
}

export default Passengers