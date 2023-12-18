import React, { FC, useState } from 'react'
import Link from 'next/link'
import styles from '@/styles/Auth.module.scss'
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { logIn } from '@/redux/authSlice'
import RegistrationForm from '@/components/RegistrationForm';

const LogIn: FC = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isHaveAnAccount, setIsHaveAnAccount] = useState(true)
  async function handleRegistration() {
    try {
      const response = await fetch(`/api/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, type: 'registration' }),
      });
      if (response.ok) {
        dispatch(logIn({
          isLoggedIn: true,
          user: username
        }))
        router.push('/PersonalAccount')
        console.log('Registration successful')
      } else {
        const data = await response.json();
        setError(data.message)
        console.log('Registration failed')
      }
    } catch (error) {
      console.error('An error occurred during process', error);
    }
  }
  async function handleLogin() {
    try {
      const response = await fetch(`/api/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, type: 'login' }),
      });
      if (response.ok) {
        router.push('/PersonalAccount')
        console.log('Login successful')
      }else{
        const data = await response.json();
        setError(data.message)
        console.log('Something went wrong')
      }
    } catch (error) {
      console.error('An error occurred during process', error);
    }
  }

  return (
    <>
      {isHaveAnAccount == true ? <RegistrationForm
        Registration={handleLogin}
        params={{ Header: 'Войти', LinkText: 'Зарегистрироваться', text: 'Пожалуйста заполните эту форму, что бы войти в учетётную запись' }}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        setIsHaveAnAccount={setIsHaveAnAccount}
        error={error}
      /> :
        <RegistrationForm
          Registration={handleRegistration}
          params={{ Header: 'Зарегистрироваться', LinkText: 'Войти', text: 'Пожалуйста заполните эту форму, что бы создать учетётную запись', }}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          setIsHaveAnAccount={setIsHaveAnAccount}
          error={error}
        />}
    </>
  )
}

export default LogIn