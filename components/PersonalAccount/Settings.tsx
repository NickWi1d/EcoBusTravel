import styles from '@/styles/PersonalAccount.module.scss'
import { CustomAlertType } from '@/types/types'
import { Button } from '@mui/material'
import React, { FC } from 'react'
import AlertComponent from '../ModalWindows/Alert'
import { text } from 'stream/consumers'

interface PersonalAccountSettings {
	ChangePasswordHandler: () => void
	setShowModalConfirmDelition: React.Dispatch<React.SetStateAction<boolean>>
	showAlert: boolean
	setShowAlert: React.Dispatch<React.SetStateAction<boolean>>
	type: CustomAlertType
	text: string
}

const Settings: FC<PersonalAccountSettings> = ({
	ChangePasswordHandler,
	setShowModalConfirmDelition,
	showAlert,
	setShowAlert,
	type,
	text,
}) => {
	return (
		<>
			{showAlert && (
				<AlertComponent
					showAlert={showAlert}
					setShowAlert={setShowAlert}
					type={type}
					text={text}
				/>
			)}
			<div className={styles.deleteBntBox}>
				<p>
					Удаление аккаунта без возможности восстановления. Все данные будут
					безвозвратно удалены.
				</p>
				<button
					className={styles.deleteBnt}
					onClick={() => setShowModalConfirmDelition(true)}
				>
					<strong>
						<p className={styles.delLink}>Удалить аккаунт</p>
					</strong>
				</button>
			</div>
			<div className={styles.chengePasswordBox}>
				<p>
					У вас есть возможность поменять пароль. Для этого необходимо знать
					старый пароль.
				</p>
				<Button
					variant='contained'
					onClick={ChangePasswordHandler}
					className='bg-[#2A5FCF] hover:bg-[#134bc4] mt-4'
				>
					Изменить пароль
				</Button>
			</div>
		</>
	)
}

export default Settings
