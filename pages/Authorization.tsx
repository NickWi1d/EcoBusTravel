import React, { FC, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { logIn } from '@/store/reducers/authSlice'
import RegistrationForm from '@/components/Authorization/RegistrationForm';
import { AnyARecord } from 'dns';
import { useLazyLoginQuery, useSignUpMutation } from '@/store/reducers/api/app'
import { log } from 'console';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import Header from '@/components/Navigation/Header';
import { CustomAlertType } from '@/types/types';
import { clearSeatsInfo } from '@/components/CreateOrder/ChoosePlaces';




const LogIn: FC = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const searchParams = useSearchParams().get('isHaveAnAccount')


  const [fetchRepos, { isLoading: isLogInLoading, isError: isLogInError, data: logInData, isSuccess: logInSuccess, error: logInError }] = useLazyLoginQuery()
  const [signUp, { isLoading: isSignUpLoading, isError: isSignUpError, data: signUpResult, isSuccess: signUpIsSuccess, error: signUpError }] = useSignUpMutation()

  const [error, setError] = useState('')
  const [isHaveAnAccount, setIsHaveAnAccount] = useState(searchParams === 'true')
  const [showAlert, setShowAlert] = useState(false)
  const [alertText, setAlertText] = useState('Successfully updated!')
  const [alertType, setAlertType] = useState<CustomAlertType>('success')
  useEffect(() => {
    if (signUpIsSuccess && signUpResult) {
      dispatch(logIn({
        user: signUpResult.username
      }))
      // localStorage.setItem('token', signUpResult.addUser.insertedId)
      localStorage.setItem('token', 'true')
      localStorage.setItem('uid', signUpResult.addUser.insertedId)
      localStorage.setItem('user', signUpResult.username)
      router.push('/PersonalAccount')
      console.log('Registration successful')

    }
  }, [signUpResult, signUpIsSuccess])

  useEffect(() => {
    if (isSignUpError && signUpError) {

      if ('status' in signUpError) {
        const data = signUpError.data as any
        setError(data.message || 'Unknown error')
        setAlertType('error')
        setShowAlert(true)
        setTimeout(() => {
          setShowAlert(false)
        }, 3000);
      }

    }
  }, [isSignUpError, signUpError])

  useEffect(() => {
    if (logInSuccess && logInData) {
      dispatch(logIn({
        user: logInData.user.username
      }))
      localStorage.setItem('token', 'true')////////
      localStorage.setItem('uid', logInData.user._id)
      localStorage.setItem('user', logInData.user.username)
      router.push('/PersonalAccount')
      console.log('Login successful')
    }
  }, [logInSuccess, logInData])

  useEffect(() => {
    if (isLogInError && logInError) {
      if ('status' in logInError) {
        const data = logInError.data as any
        setError(data.message || '')
        setAlertType('error')
        setShowAlert(true)
        setTimeout(() => {
          setShowAlert(false)
        }, 3000);
      }

    }
  }, [logInError, isLogInError])

  useEffect(() => {
    clearSeatsInfo()
  }, [])


  async function handleRegistration(username: string, password: string, email: string) {
    signUp({ username, password, email, surname:'', name:'', passengers:[], trips:[] })
    // const statusResult = await POST(username, password, email)
    // if (statusResult?.message === 'SUCCESSFULLY') {
    //   router.push('/PersonalAccount')
    //   dispatch(logIn({
    //     user: username
    //   }))
    //   localStorage.setItem('token', statusResult.uid)
    //   localStorage.setItem('user', username)
    //   console.log('Registration successful')
    // }
    // else {
    //   setError(statusResult?.message || 'Херня')
    //   setAlertType('error')
    //   setShowAlert(true)
    //   setTimeout(() => {
    //     setShowAlert(false)
    //   }, 3000);
    // }
  }


  async function handleLogin(username: string, password: string, email: string) {
    fetchRepos({ username: username, type: 'LOGIN', password: password })
    // const statusResult = await GET(username, 'LOGIN', password)
    // if (statusResult?.message === 'SUCCESSFULLY') {
    //   router.push('/PersonalAccount')
    //   dispatch(logIn({
    //     isLoggedIn: true,
    //     user: username
    //   }))
    //   localStorage.setItem('token', statusResult.uid)
    //   localStorage.setItem('user', username)
    //   console.log('Login successful')
    // } else {
    //   setError(statusResult?.message || '')
    //   setAlertType('error')
    //   setShowAlert(true)
    //   setTimeout(() => {
    //     setShowAlert(false)
    //   }, 3000);
    // }
  }

  function AdminRoute(){
    router.push('/Admin')
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

        AdminRoute={AdminRoute}
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

          AdminRoute={AdminRoute}
        />}
    </>
  )
}

export default LogIn