import { Passenger, documentType } from '@/types/types'
import React, { MouseEvent, useState } from 'react'
import styles from '@/styles/PersonalAccount.module.scss'
import { IconButton, SelectChangeEvent } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const PassengerCard = ({ index, passenger, openAddPassengerWindow, deletePassenger }: { index: number, passenger: Passenger, openAddPassengerWindow: (event: MouseEvent<HTMLButtonElement>, passenger: Passenger, index: number) => void,  deletePassenger:()=>void}) => {
   
    return (

        <div className={styles.passengerInfo}>
            <div className={styles.fio}>{passenger.surname} {passenger.name} {passenger.patronymic}
                <div className='mr-3'>
                    {/* <img src="/free-icon-edit-user-14886094.png" alt="" width={20} /> */}
                    <IconButton color='inherit' onClick={(event) => openAddPassengerWindow(event, passenger, index)} >
                        <EditIcon></EditIcon>
                    </IconButton>
                    <IconButton color='inherit' onClick={() => deletePassenger()}>
                        <DeleteIcon></DeleteIcon>
                    </IconButton>
                </div>

            </div>

        </div>
    )

}

export default PassengerCard