import Modal from '@/components/ModalWindows/Modal'
import styles from '@/styles/PersonalAccount.module.scss'
import { Passenger } from '@/types/types'
import { Box, Button } from '@mui/material'
import {
	DataGrid,
	GridColDef,
	GridRowParams,
	gridClasses,
	useGridApiRef,
} from '@mui/x-data-grid'
import { ruRU } from '@mui/x-data-grid/locales'
import React, { useState } from 'react'
import AddPassenger from '../ModalWindows/AddPassenger'

const PassengersListColumns: GridColDef[] = [
	{
		field: 'surname',
		headerName: 'Фамилия',
		width: 150,
		type: 'string',
		sortingOrder: ['desc', 'asc', null],
	},
	{
		field: 'name',
		headerName: 'Имя',
		type: 'string',
		width: 150,
		sortingOrder: ['desc', 'asc', null],
	},
	{
		field: 'documentNumber',
		headerName: 'Паспорт',
		type: 'string',
		width: 150,
		sortingOrder: ['desc', 'asc', null],
	},
]

const Passengers = ({
	userPassengers,
	uid,
	isEditPassengerInfo,
	setIsEditPassengerInfo,
	setUserPassengers,
	selectedUserPassenger,
	setSelectedUserPassenger,
	deletePassenger,
	upDateUserPassenger,
	AddUserPassenger,
}: {
	userPassengers: Passenger[]
	uid: string
	isEditPassengerInfo: boolean
	setIsEditPassengerInfo: React.Dispatch<React.SetStateAction<boolean>>
	setUserPassengers: React.Dispatch<React.SetStateAction<Passenger[] | []>>
	selectedUserPassenger: Passenger
	setSelectedUserPassenger: React.Dispatch<React.SetStateAction<Passenger>>
	deletePassenger: (passengerID: string) => void
	upDateUserPassenger: () => void
	AddUserPassenger: () => void
}) => {
	// const [updateUserData, { isSuccess: isUpdateSuccess, data: UpdateUserData, isError: isUpDateError, error: UpDateError }] = useUpDateUserInfoMutation()

	const [isItNewPassanger, setIsItNewPassanger] = useState(false)

	const apiRef = useGridApiRef()

	const PassengerListRows = userPassengers.map(userPassenger => {
		return {
			id: userPassenger.id,
			surname: userPassenger.surname,
			name: userPassenger.name,
			patronymic: userPassenger.patronymic,
			documentNumber: userPassenger.documentNumber,
			birthDate: userPassenger.birthDate,
			gender: userPassenger.gender,
			passengerId: userPassenger.id,
		}
	})

	const addNewPassenger = () => {
		setIsItNewPassanger(true)
		setIsEditPassengerInfo(true)
		setSelectedUserPassenger({
			id: '',
			birthDate: '',
			documentNumber: '',
			gender: 'мужской',
			name: '',
			patronymic: '',
			surname: '',
		})
	}
	const openAddPassengerWindow = (params: GridRowParams) => {
		setSelectedUserPassenger(params.row)
		setIsItNewPassanger(false)
		setIsEditPassengerInfo(true)
	}
	function handleRequest() {
		isItNewPassanger ? AddUserPassenger() : upDateUserPassenger()
	}
	return (
		<div>
			{isEditPassengerInfo && (
				<Modal width={50}>
					<AddPassenger
						setIsEditPassengerInfo={setIsEditPassengerInfo}
						handleRequest={handleRequest}
						selectedUserPassenger={selectedUserPassenger}
						setSelectedUserPassenger={setSelectedUserPassenger}
						deletePassenger={deletePassenger}
					></AddPassenger>
				</Modal>
			)}
			<Button
				variant='contained'
				className={`${styles.Btn} w-[500px] mb-[2%] flex items-center`}
				onClick={addNewPassenger}
			>
				Добавить пасажира
				<img
					src='/icons8-плюс-32.png'
					className={'ml-3 pb-[2px]'}
					alt=''
					width={20}
				/>
			</Button>
			<Box sx={{ height: 500 }}>
				<DataGrid
					sx={{
						[`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]:
							{
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
					apiRef={apiRef}
					rows={PassengerListRows}
					columns={PassengersListColumns}
					onRowClick={params => openAddPassengerWindow(params)}
					localeText={{
						...ruRU.components.MuiDataGrid.defaultProps.localeText,
						noRowsLabel: 'Нет строк',
						footerRowSelected: count =>
							`${count.toLocaleString()} строк выбрано`,
						footerTotalVisibleRows: (visibleCount, totalCount) =>
							`${visibleCount.toLocaleString()} из ${totalCount.toLocaleString()}`,
					}}
				/>
			</Box>
		</div>
	)
}

export default Passengers
