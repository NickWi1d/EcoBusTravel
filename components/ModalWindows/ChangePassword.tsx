import { CustomAlertType } from '@/types/types'
import { Button } from '@mui/material'
import React, { FC, MouseEvent } from 'react'

interface ChangePasswordProps {
	currentPassword: string
	newPassword: string
	newPasswordRepeat: string
	setCurrentPassword: React.Dispatch<React.SetStateAction<string>>
	setNewPassword: React.Dispatch<React.SetStateAction<string>>
	setNewPasswordRepeat: React.Dispatch<React.SetStateAction<string>>
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>
	UpdateUserPasswordHandler: () => void
	alertText: string
	alertType: CustomAlertType
}
const ChangePassword: FC<ChangePasswordProps> = ({
	currentPassword,
	newPassword,
	newPasswordRepeat,
	setCurrentPassword,
	setNewPassword,
	setNewPasswordRepeat,
	setShowModal,
	UpdateUserPasswordHandler,
	alertText,
	alertType,
}) => {
	function CancelBtnHandler(e: MouseEvent<HTMLButtonElement>) {
		e.preventDefault()
		setShowModal(false)
	}
	function ChengePasswordHandler(e: MouseEvent<HTMLFormElement>) {
		e.preventDefault()
		UpdateUserPasswordHandler()
		// setShowModal(false)
	}
	return (
		<form
			onSubmit={ChengePasswordHandler}
			className='flex-col items-center justify-center'
		>
			<h1 className='text-center'>
				<b>Измените пароль</b>
			</h1>
			<p className='text-center mb-4  '>Введите текущий и новый пароли</p>
			<label
				htmlFor='currentPassword'
				className={
					alertText === 'Неверный пароль' ? 'text-red-600' : ' text-black '
				}
			>
				Текущий пароль
				{alertText === 'Неверный пароль' && ' - неверный пароль'}
			</label>
			<input
				type='password'
				id='currentPassword'
				className='w-[100%] mt-1 h-12 border border-solid border-black rounded-lg p-2 mb-4'
				value={currentPassword}
				onChange={e => setCurrentPassword(e.target.value)}
			/>
			<label htmlFor='currentPassword'>Новый пароль</label>
			<input
				type='password'
				className='w-[100%] mt-1 h-12 border border-solid border-black rounded-lg p-2 mb-4'
				value={newPassword}
				onChange={e => setNewPassword(e.target.value)}
			/>
			<label
				htmlFor='currentPassword'
				className={
					alertText === 'Пароли не совпадают' ? 'text-red-600' : ' text-black '
				}
			>
				Подтверждение нового пароля
				{alertText === 'Пароли не совпадают' && ' - пароли не совпадают'}
			</label>
			<input
				type='password'
				className='w-[100%] mt-1 h-12 border border-solid border-black rounded-lg p-2'
				value={newPasswordRepeat}
				onChange={e => setNewPasswordRepeat(e.target.value)}
			/>
			<div className='flex justify-end'>
				<button className='mt-4' onClick={e => CancelBtnHandler(e)}>
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

export default ChangePassword
