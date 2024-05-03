"use client";
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store'
import { Button } from '@mui/material';
import { logOut, logIn, dropUser } from '@/store/reducers/authSlice'



export function getCurrentDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
const NavBar = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  // const accountToken = useSelector((state: RootState) => state.auth.isLoggedIn)
  const [actionBtn, setActionBtn] = useState('Зарегистрироваться')
  const pathname = usePathname()
  const [accountToken, setAccountToken] = useState('null')



  useEffect(() => {
    setAccountToken(localStorage.getItem('token') || 'null')
    console.log(accountToken)
    console.log(pathname)
    if (accountToken === 'true' && pathname !== '/PersonalAccount') {
      setActionBtn('Профиль')
    } else if (accountToken === 'true' && pathname === '/PersonalAccount') {
      setActionBtn('Выйти')
    } else if (accountToken === 'false') {
      setActionBtn('Войти')
    } else if (accountToken === 'null') {
      setActionBtn('Зарегистрироваться')
    }
  }, [accountToken, pathname])

  function openPersonalAccount() {
    if (accountToken === 'true' && pathname !== '/PersonalAccount') {
      router.push('/PersonalAccount')
    } else if (accountToken === 'true' && pathname === '/PersonalAccount') {
      router.push('/')
      localStorage.setItem('token', 'false')
      setAccountToken('null')
      // localStorage.removeItem('user')
      dispatch(logOut({}))
    } else if (accountToken === 'false') {
      router.push('/Authorization?isHaveAnAccount=true')
    } else if (accountToken === 'null') {
      router.push('/Authorization?isHaveAnAccount=false')
    }
  }

  return (
    <>
      <Link href={'/'}><img src='Logo2.png' className='logo' width={150}></img ></Link>
      <Link href={`/SearchResults?date=${getCurrentDate()}&bottomPrice=0&topPrice=100`} className='hover:underline '>Поиск</Link>
      <Button variant="contained" type='button' onClick={openPersonalAccount} className='loginBtn'>{actionBtn}</Button>
      {/* <button className='loginBtn' onClick={openPersonalAccount}>{actionBtn}</button> */}
    </>
  )
}

export default NavBar
