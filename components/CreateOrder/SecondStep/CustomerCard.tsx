import React, { useEffect, useState } from 'react'
import styles from '@/styles/CreateOrder.module.scss'
import { TextField, InputLabel, FormControl } from '@mui/material'
import { Customer } from '@/types/types'

const CustomerCard = ({
    setCustomer, 
    user,
    setFillCustomerData,
    fillCustomerData,
    customer
}:{
    setCustomer:React.Dispatch<React.SetStateAction<Customer>>, 
    user:{ uid: string, username: string, name: string, surname: string, email: string, phoneNumber:string },
    setFillCustomerData:React.Dispatch<React.SetStateAction<boolean>>,
    fillCustomerData:boolean,
    customer:Customer
}) => {

    const [surname, setSurname] = useState('')
    const [name, setName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {
        // if(surname.length !== 0 && name.length !== 0 && phoneNUmber.length !== 0 && email.length !== 0){
            setCustomer({
                surname:surname,
                name: name,
                phoneNumber:phoneNumber,
                email:email
            })
        // }
    }, [surname, name, phoneNumber, email])

    useEffect(() => {
        if(fillCustomerData){
            setSurname(user.surname)
            setName(user.name)
            setEmail(user.email)
            setPhoneNumber(user.phoneNumber)
            setFillCustomerData(false)
        }
    }, [fillCustomerData])
    
    useEffect(()=>{
        setSurname(customer.surname)
        setName(customer.name)
        setPhoneNumber(customer.phoneNumber)
        setEmail(customer.email)
    }, [])
    
    return (
        <div className={styles.customerCard}>
            <div className={styles.customerFIO}>
                <TextField
                    required
                    id="surname"
                    type='text'
                    label="Фамилия"
                    variant="outlined"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    onFocus={(e) => e.target.select()}
                />
                <TextField
                    required
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
                    required
                    id="birthDate"
                    type='phone'
                    label="Телефон"
                    variant="outlined"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    onFocus={(e) => e.target.select()}
                    helperText="Сообщим об изменениях рейса"
                    inputProps={{ pattern: "^\\+375\\(\\d{2}\\)\\d{3}-\\d{2}-\\d{2}$" }}
                    placeholder='+375(XX)YYY-YY-YY'
                />
                <TextField
                    required
                    id="birthDate"
                    type='email'
                    label="Эл. почта"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={(e) => e.target.select()}
                    helperText="Отправим билет и чек"
                    inputProps={{ pattern: "^[a-zA-Z0-9._%+-]+@gmail\\.com$" }}
                />
            </div>
        </div>
    )
}

export default CustomerCard