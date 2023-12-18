import React, { FC, useState } from 'react'
import Link from 'next/link'
import { symlink } from 'fs'
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { logIn } from '@/redux/authSlice'
import RegistrationForm from '@/components/RegistrationForm';

const SignUp: FC = () => {
  const dispatch = useDispatch();
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  function LogIn() {
    dispatch(logIn({
      // token: 'LOGGED',
      isLoggedIn: true,
      user: null
    }))
    router.push('/PersonalAccount')
  }

  return (
    <RegistrationForm
      onLogIn={LogIn}
      params={{ Header: 'Зарегистрироваться', LinkText: 'Войти', text: 'Пожалуйста заполните эту форму, что бы создать учетётную запись', }}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
    />
  )
}

export default SignUp