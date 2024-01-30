import React from 'react'
import { Alert, AlertTitle } from "@mui/material";
import styles from '@/styles/AlertComponent.module.scss'



type CustomAlertType = "error" | "warning" | "info" | "success";
interface AlertProps {
    showAlert:boolean,
    setShowAlert: React.Dispatch<React.SetStateAction<boolean>>,
    type: CustomAlertType,
    text?: string,
    error?: string
}




const AlertComponent: React.FC<AlertProps> = ({ showAlert, setShowAlert, type, text, error }) => {
    const Title = type.charAt(0).toUpperCase() + type.slice(1)


    return (
        <Alert onClose={() => setShowAlert(false)} severity={type} className={`${styles.alert} ${showAlert ? styles.slideIn : styles.slideOut}`}>
            {/* <AlertTitle>{Title}</AlertTitle> */}
            {type === 'error' ? error : text}
        </Alert>
    )
}

export default AlertComponent