import React, { FC, MouseEvent, useEffect, useRef } from 'react'
import PassengerForm from '../PersonalAccount/PassengerForm'
import { SelectChangeEvent, Button } from '@mui/material'
import { Passenger, documentType } from '@/types/types'

interface PassengerFormProps {
    birthDate: string,
    documentNumber: string,
    gender: string,
    name: string,
    patronymic: string,
    surname: string,
    setSurname: React.Dispatch<React.SetStateAction<string>>,
    setName: React.Dispatch<React.SetStateAction<string>>,
    setPatronymic: React.Dispatch<React.SetStateAction<string>>,
    setDocumentNumber: React.Dispatch<React.SetStateAction<string>>,
    setBirthDate: React.Dispatch<React.SetStateAction<string>>,
    setGender: React.Dispatch<React.SetStateAction<string>>,
    setIsEditPassengerInfo: React.Dispatch<React.SetStateAction<boolean>>,
    passengerIndex: number,
    handleRequest: () => void,
}

const AddPassenger: FC<PassengerFormProps> = ({
    birthDate,
    documentNumber,
    gender,
    name,
    patronymic,
    surname,
    setSurname,
    setName,
    setPatronymic,
    setDocumentNumber,
    setBirthDate, setGender,
    setIsEditPassengerInfo,
    passengerIndex,
    handleRequest,
}) => {

    function AddNewPassenger(e: MouseEvent<HTMLFormElement>) {
        e.preventDefault()
        handleRequest()
    }


    return (
        <form onSubmit={AddNewPassenger} className='flex-col items-center justify-center'>
            <PassengerForm
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
            ></PassengerForm>
            <div className='flex justify-end'>
                <button className='mt-3' onClick={() => setIsEditPassengerInfo(false)}>Отмена</button>
                <Button type='submit' variant="contained" className='bg-[#2A5FCF] hover:bg-[#134bc4] mt-4 ml-4'>Готово</Button>
            </div>
        </form>
    )
}

export default AddPassenger