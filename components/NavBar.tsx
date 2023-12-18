"use client";
import React from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store'



const NavBar = () => {
  const router = useRouter()
  let accountToken = useSelector((state: RootState) => state.auth.isLoggedIn)
  const actionBtn = accountToken == true ? 'Personal Account' :  'Log In'
  function openPersonalAccount() {
    switch (accountToken) {
      case false:
        router.push('/LogInAndSignUp')
        break;
      case true:
        router.push('/PersonalAccount')
        break;
      default:
        break;
    }
  }
  return (
    <>
      <h1 className='logo'>EcoBusTravel</h1>
      <Link href='/SearchResults'>SearchResults</Link>
      <button className='loginBtn' onClick={openPersonalAccount}>{actionBtn}</button>
    </>
  )
}

export default NavBar