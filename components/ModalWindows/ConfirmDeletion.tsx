import React, { FC, MouseEvent } from 'react'
import { TextField, Button } from '@mui/material'

interface ConfirmDeletion {
  deleteAccount: () => void,
  setShowModalConfirmDelition: React.Dispatch<React.SetStateAction<boolean>>,
}

const ConfirmDeletion: FC<ConfirmDeletion> = ({ deleteAccount, setShowModalConfirmDelition }) => {

  function CancelBtnHandler(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    setShowModalConfirmDelition(false)
  }

  function deleteAccountHandler(e: MouseEvent<HTMLFormElement>) {
    e.preventDefault()
    deleteAccount()
    // setShowModal(false)
  }

  return (
    <form onSubmit={deleteAccountHandler}>
      <h1 className='mb-2'><b>Удаление аккаунта</b></h1>
      <p className='mb-2'>Данные будут безвозвратно удалены.<br></br> Вы действительно хотите продолжить удаление? </p>
      <div className='flex justify-end mt-4'>
        <button className='mr-4' onClick={(e) => CancelBtnHandler(e)}>Отмена</button>
        {/* <button type='submit'>Готово</button> */}
        <Button type='submit' variant='contained' className='bg-[#2A5FCF] hover:bg-[#134bc4]'>Готово</Button>
      </div>
    </form>
  )
}

export default ConfirmDeletion