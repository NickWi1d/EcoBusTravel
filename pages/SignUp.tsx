// import React, { FC, useState } from 'react'
// import Link from 'next/link'
// import { symlink } from 'fs'
// import { useRouter } from 'next/navigation';
// import { useDispatch, useSelector } from 'react-redux';
// import { logIn } from '@/redux/authSlice'
// import RegistrationForm from '@/components/RegistrationForm';
// import { RootState } from '@/redux/store'

// const SignUp: FC = () => {
//   let accountToken = useSelector((state: RootState) => state.auth.isLoggedIn)
//   const dispatch = useDispatch();
//   const router = useRouter()
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [isHaveAnAccount, setIsHaveAnAccount] = useState(accountToken)
//   const [error, setError] = useState('')
//   function LogIn() {
//     dispatch(logIn({
//       // token: 'LOGGED',
//       isLoggedIn: true,
//       user: null
//     }))
//     router.push('/PersonalAccount')
//   }

//   return (
//     <RegistrationForm
//       // Registration = { LogIn }
//       // setIsHaveAnAccount = { setIsHaveAnAccount }
//       // isHaveAnAccount = { isHaveAnAccount }
//       // error = { error }
//       // setE rror = { setError }
//       onLogIn={LogIn}
//       params={{ Header: 'Зарегистрироваться', LinkText: 'Войти', text: 'Пожалуйста заполните эту форму, что бы создать учетётную запись', }}
//       email={email}
//       setEmail={setEmail}
//       password={password}
//       setPassword={setPassword}
//     />
//   )
// }

// export default SignUp