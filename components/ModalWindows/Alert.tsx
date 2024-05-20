import React, { FC, useEffect } from 'react'
import { Alert, AlertTitle } from "@mui/material";
import styles from '@/styles/AlertComponent.module.scss'
import { CustomAlertType } from '@/types/types';




interface AlertProps {
    showAlert:boolean,
    setShowAlert: React.Dispatch<React.SetStateAction<boolean>>,
    type: CustomAlertType,
    text?: string,
    marginLeft?:string
}




const AlertComponent: FC<AlertProps> = ({ showAlert, setShowAlert, type, text, marginLeft }) => {
    const Title = type.charAt(0).toUpperCase() + type.slice(1)

    useEffect(() => {
        setTimeout(() => {
            setShowAlert(false)
        }, 3000);
    }, [])
    

    return (
        <Alert onClose={() => setShowAlert(false)} severity={type} className={`${styles.alert} ml-[${marginLeft}%] ${showAlert ? styles.slideIn : styles.slideOut}`}>
            {/* <AlertTitle>{Title}</AlertTitle> */}
            {text}
        </Alert>
    )
}

export default AlertComponent