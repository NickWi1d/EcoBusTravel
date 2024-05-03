import React, { useEffect, useState } from 'react'
import styles from '@/styles/CreateOrder.module.scss'
import { TextField, InputLabel, FormControl } from '@mui/material'
import { Customer } from '@/types/types'

const CustomerCard = ({setCustomer}:{setCustomer:React.Dispatch<React.SetStateAction<Customer>>}) => {
    const [surname, setSurname] = useState('')
    const [name, setName] = useState('')
    const [phoneNUmber, setPhoneNUmber] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {
        setCustomer({
            surname:surname,
            name: name,
            phoneNumber:phoneNUmber,
            email:email
        })
    }, [surname, name, phoneNUmber, email])
    
    return (
        <div className={styles.customerCard}>
            <div className={styles.customerFIO}>
                <TextField
                    // required
                    id="surname"
                    type='text'
                    label="Фамилия"
                    variant="outlined"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    onFocus={(e) => e.target.select()}
                />
                <TextField
                    // required
                    id="name"
                    type='text'
                    label="Имя"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onFocus={(e) => e.target.select()}
                />
            </div>
            <div className={styles.customerPersonalInfo}>
                <TextField
                    // required
                    id="birthDate"
                    type='phone'
                    label="Телефон"
                    variant="outlined"
                    value={phoneNUmber}
                    onChange={(e) => setPhoneNUmber(e.target.value)}
                    onFocus={(e) => e.target.select()}
                    helperText="Сообщим об изменениях рейса"
                />
                <TextField
                    // required
                    id="birthDate"
                    type='email'
                    label="Эл. почта"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={(e) => e.target.select()}
                    helperText="Отправим билет и чек"
                />
            </div>
        </div>
    )
}

export default CustomerCard