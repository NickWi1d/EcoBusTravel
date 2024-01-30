import React, { FC, useState } from 'react'
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { logIn } from '@/redux/authSlice'
import { POST, GET } from '@/lib/user';
import RegistrationForm from '@/components/RegistrationForm';
import { AnyARecord } from 'dns';



type CustomAlertType = "error" | "warning" | "info" | "success";

const LogIn: FC = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const [error, setError] = useState('')
  const [isHaveAnAccount, setIsHaveAnAccount] = useState(true)
  const [showAlert, setShowAlert] = useState(false)
  const [alertText, setAlertText] = useState('Successfully updated!')
  const [alertType, setAlertType] = useState<CustomAlertType>('success')



  async function handleRegistration(username: string, password: string, email: string) {
    const statusResult = await POST(username, password, email)
    if (statusResult?.message === 'SUCCESSFULLY') {
      router.push('/PersonalAccount')
      dispatch(logIn({
        user: username
      }))
      localStorage.setItem('token', statusResult.uid)
      localStorage.setItem('user', username)
      console.log('Registration successful')
    }
    else {
      setError(statusResult?.message || 'Херня')
      setAlertType('error')
      setShowAlert(true)
      setTimeout(() => {
        setShowAlert(false)
      }, 3000);
    }
  }


  async function handleLogin(username: string, password: string, email: string) {
    const statusResult = await GET(username, 'LOGIN', password)
    if (statusResult?.message === 'SUCCESSFULLY') {
      router.push('/PersonalAccount')
      dispatch(logIn({
        isLoggedIn: true,
        user: username
      }))
      localStorage.setItem('token', statusResult.uid)
      localStorage.setItem('user', username)
      console.log('Login successful')
    } else {
      setError(statusResult?.message || '')
      setAlertType('error')
      setShowAlert(true)
      setTimeout(() => {
        setShowAlert(false)
      }, 3000);
    }
  }

  return (
    <>
      
      {isHaveAnAccount == true ? <RegistrationForm
        Registration={handleLogin}
        isHaveAnAccount={isHaveAnAccount}
        setIsHaveAnAccount={setIsHaveAnAccount}
        error={error}
        setError={setError}


        showAlert={showAlert}
        setShowAlert={setShowAlert}
        alertType={alertType}
        setAlertType={setAlertType}
      /> :
        <RegistrationForm
          Registration={handleRegistration}
          isHaveAnAccount={isHaveAnAccount}
          setIsHaveAnAccount={setIsHaveAnAccount}
          error={error}
          setError={setError}


          showAlert={showAlert}
          setShowAlert={setShowAlert}
          alertType={alertType}
          setAlertType={setAlertType}
        />}
    </>
  )
}

export default LogIn