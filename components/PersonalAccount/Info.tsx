
import { TextField, Button } from '@mui/material'
import React, { FC, MouseEvent } from 'react'
import AlertComponent from '../ModalWindows/Alert'
import styles from '@/styles/PersonalAccount.module.scss'
import { CustomAlertType } from '@/types/types'


interface Info {
    setUsername: React.Dispatch<React.SetStateAction<string>>,
    setName: React.Dispatch<React.SetStateAction<string>>,
    setSurname: React.Dispatch<React.SetStateAction<string>>,
    setEmail: React.Dispatch<React.SetStateAction<string>>,

    email: string,
    surname: string,
    name: string,
    username: string,

    showAlert: boolean,
    setShowAlert: React.Dispatch<React.SetStateAction<boolean>>,
    alertType: CustomAlertType,
    alertText: string,

    updateUserInfoHandler: (e: MouseEvent<HTMLFormElement>) => void,
    setPhoneNumber: React.Dispatch<React.SetStateAction<string>>, 
    phoneNumber: string
}

const Info: FC<Info> = ({ setUsername, setName, setSurname, setEmail, email, surname, name, username, showAlert, setShowAlert, alertType, alertText, updateUserInfoHandler, setPhoneNumber, phoneNumber }) => {
    return (
        <form className={styles.infoForm} onSubmit={updateUserInfoHandler}>
            {showAlert && (
                <AlertComponent
                    showAlert={showAlert}
                    setShowAlert={setShowAlert}
                    type={alertType}
                    text={alertText}
                />
            )}
            <p ><strong>Login: </strong>{username}</p>
            {/* <TextField
                className={styles.emailInput}
                margin='normal'
                required
                id="username"
                type='text'
                label="Логин"
                disabled
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            /> */}
            <TextField
                className={styles.emailInput}
                margin='normal'
                id="name"
                type='text'
                label="Имя"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <TextField
                className={styles.emailInput}
                margin='normal'
                id="surname"
                type='text'
                label="Фамилия"
                variant="outlined"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
            />
            <TextField
                className={styles.emailInput}
                margin='normal'
                required
                id="email"
                type='email'
                label="e-mail"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
                className={styles.emailInput}
                margin='normal'
                id="phoneNumber"
                type='text'
                label="Номер телефона"
                variant="outlined"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <Button variant="contained" type='submit' className={styles.SaveBtn}>Сохранить</Button>
        </form>
    )
}

export default Info