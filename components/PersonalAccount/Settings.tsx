import { Button } from '@mui/material'
import React, { FC } from 'react'
import styles from '@/styles/PersonalAccount.module.scss'


interface PersonalAccountSettings {
    ChangePasswordHandler: ()=>void,
    setShowModalConfirmDelition:React.Dispatch<React.SetStateAction<boolean>>,

}

const Settings: FC<PersonalAccountSettings> = ( { ChangePasswordHandler, setShowModalConfirmDelition  } ) => {
    return (
        <>
            <div className={styles.deleteBntBox}>
                <p>Удаление аккаунта без возможности восстановления. Все данные будут безвозвратно удалены.</p>
                <button className={styles.deleteBnt} onClick={() => setShowModalConfirmDelition(true)}><strong><p className={styles.delLink}>Удалить аккаунт</p></strong></button>
            </div>
            <div className={styles.chengePasswordBox}>
                <p>У вас есть возможность поменять пароль. Для этого необходимо знать старый пароль.</p>
                <Button variant="contained" onClick={ChangePasswordHandler} className='bg-[#2A5FCF] hover:bg-[#134bc4] mt-4'>Изменить пароль</Button>
            </div>
        </>
    )
}

export default Settings