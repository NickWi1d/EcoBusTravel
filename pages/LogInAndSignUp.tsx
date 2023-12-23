import React, { FC, useState } from 'react'
import Link from 'next/link'
import styles from '@/styles/Auth.module.scss'
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { logIn } from '@/redux/authSlice'
import { POST, GET } from '@/lib/user';
import RegistrationForm from '@/components/RegistrationForm';

const LogIn: FC = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [error, setError] = useState('')
  const [isHaveAnAccount, setIsHaveAnAccount] = useState(true)
  async function handleRegistration(username: string, password: string) {
    const statusResult = await POST(username, password)
    if (statusResult?.message === 'SUCCESSFULLY') {
      dispatch(logIn({
        user: username
      }))
      localStorage.setItem('token', statusResult.uid)
      localStorage.setItem('user', username)
      router.push('/PersonalAccount')
      console.log('Registration successful')
    }
  }
  async function handleLogin(username: string, password: string) {
    const statusResult = await GET(username, 'LOGIN', password)
    if (statusResult?.message === 'SUCCESSFULLY') {
      dispatch(logIn({
        isLoggedIn: true,
        user: username
      }))
      localStorage.setItem('token', statusResult.uid)
      localStorage.setItem('user', username)
      router.push('/PersonalAccount')
      console.log('Login successful')
    }
  }

  return (
    <>
      {isHaveAnAccount == true ? <RegistrationForm
        Registration={handleLogin}
        isHaveAnAccount={isHaveAnAccount}
        setIsHaveAnAccount={setIsHaveAnAccount}
        error={error}
      /> :
        <RegistrationForm
          Registration={handleRegistration}
          isHaveAnAccount={isHaveAnAccount}
          setIsHaveAnAccount={setIsHaveAnAccount}
          error={error}
        />}
    </>
  )
}

export default LogIn