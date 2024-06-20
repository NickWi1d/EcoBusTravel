import { Passenger } from '@/types/types'
import { Button } from '@mui/material'
import React, { FC, MouseEvent, useEffect, useState } from 'react'
import PassengerForm from '../PersonalAccount/PassengerForm'

interface PassengerFormProps {
	// birthDate: string,
	// documentNumber: string,
	// gender: string,
	// name: string,
	// patronymic: string,
	// surname: string,
	// setSurname: React.Dispatch<React.SetStateAction<string>>,
	// setName: React.Dispatch<React.SetStateAction<string>>,
	// setPatronymic: React.Dispatch<React.SetStateAction<string>>,
	// setDocumentNumber: React.Dispatch<React.SetStateAction<string>>,
	// setBirthDate: React.Dispatch<React.SetStateAction<string>>,
	// setGender: React.Dispatch<React.SetStateAction<string>>,
	setIsEditPassengerInfo: React.Dispatch<React.SetStateAction<boolean>>
	// passengerIndex: number,
	handleRequest: () => void
	selectedUserPassenger: Passenger
	setSelectedUserPassenger: React.Dispatch<React.SetStateAction<Passenger>>
	deletePassenger: (passengerID: string) => void
}

const AddPassenger: FC<PassengerFormProps> = ({
	// birthDate,
	// documentNumber,
	// gender,
	// name,
	// patronymic,
	// surname,
	// setSurname,
	// setName,
	// setPatronymic,
	// setDocumentNumber,
	// setBirthDate, setGender,
	setIsEditPassengerInfo,
	// passengerIndex,
	handleRequest,
	selectedUserPassenger,
	setSelectedUserPassenger,
	deletePassenger,
}) => {
	const [surname, setSurname] = useState('')
	const [name, setName] = useState('')
	const [patronymic, setPatronymic] = useState('')
	const [documentNumber, setDocumentNumber] = useState('')
	const [birthDate, setBirthDate] = useState('')
	const [gender, setGender] = useState('')
	const [passengerId, setPassengerId] = useState('')

	function AddNewPassenger(e: MouseEvent<HTMLFormElement>) {
		e.preventDefault()
		handleRequest()
	}

	useEffect(() => {
		setSurname(selectedUserPassenger.surname)
		setName(selectedUserPassenger.name)
		setPatronymic(selectedUserPassenger.patronymic)
		setDocumentNumber(selectedUserPassenger.documentNumber)
		setBirthDate(selectedUserPassenger.birthDate)
		setGender(selectedUserPassenger.gender)
		setPassengerId(selectedUserPassenger.id)
	}, [])

	useEffect(() => {
		setSelectedUserPassenger({
			id: passengerId,
			name,
			surname,
			patronymic,
			birthDate,
			gender,
			documentNumber,
		})
	}, [
		passengerId,
		surname,
		name,
		patronymic,
		documentNumber,
		birthDate,
		gender,
	])

	return (
		<form
			onSubmit={AddNewPassenger}
			className='flex-col items-center justify-center'
		>
			<Button
				variant='outlined'
				size='small'
				color='error'
				className='ml-[2%] mb-[2%]'
				onClick={() => deletePassenger(passengerId)}
			>
				Удалить пасажира
			</Button>
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
				<button className='mt-3' onClick={() => setIsEditPassengerInfo(false)}>
					Отмена
				</button>
				<Button
					type='submit'
					variant='contained'
					className='bg-[#2A5FCF] hover:bg-[#134bc4] mt-4 ml-4'
				>
					Готово
				</Button>
			</div>
		</form>
	)
}

export default AddPassenger
