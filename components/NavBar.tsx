"use client";
import React, { useState } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const NavBar = () => {
    const router = useRouter()
    const [accountToken, setAccountToken] = useState('NOT_LOGGED')
    function openPersonalAccount() {
      switch (accountToken) {
        case 'LOGGED':
          router.push('/LogIn')
          break;
        case 'NOT_LOGGED':
          router.push('/SignUp')
          break;
        case 'LOGGED_AND_SAVED':
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
            <button className='loginBtn' onClick={openPersonalAccount}>Log In</button>
        </>
    )
}

export default NavBar