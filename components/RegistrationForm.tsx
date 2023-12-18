import React, {MouseEvent} from 'react'
import styles from '@/styles/Auth.module.scss'
import Link from 'next/link'

interface SignUpProps {
  Registration: () => void;
  params: {
    Header: string,
    LinkText: string,
    text: string
  },
  username: string,
  setUsername: React.Dispatch<React.SetStateAction<string>>,
  password:string,
  setPassword:React.Dispatch<React.SetStateAction<string>>,
  setIsHaveAnAccount:React.Dispatch<React.SetStateAction<boolean>>,
  error:string
}

const RegistrationForm: React.FC<SignUpProps>= ({Registration, params, username, setUsername, password, setPassword, setIsHaveAnAccount, error}) => {
  const toggleIsHaveAnAccount = () => {
    setIsHaveAnAccount(prevState => !prevState);
    setUsername('')
    setPassword('')
  };
  const handleRegistration = (e: MouseEvent<HTMLFormElement>) =>{
    e.preventDefault()
    Registration()
  }
  return (
    <form onSubmit={handleRegistration} className={styles.signUpForm}>
    <h1>{params.Header}</h1>
    <p>{params.text}</p>
    {error && <p className={styles.error}>{error}</p>}
    <hr />
    <label htmlFor="email"><b>Email</b></label>
    <input type="text" id="email" className={styles.emailInput} placeholder="Введите email" required value={username} onChange={(e)=>setUsername(e.target.value)}/>

    <label htmlFor="password"><b>Пароль</b></label>
    <input type="password" id="password" className={styles.passwordInput} placeholder="Введите пароль" required value={password} onChange={(e)=>setPassword(e.target.value)}/>

    <button type="submit" className={styles.SignUpBtn}>{params.Header}</button>
    <div>
      <p>Уже есть аккаунт? <Link href='' onClick={toggleIsHaveAnAccount}>{params.LinkText}</Link></p>
    </div>
  </form>
  )
}

export default RegistrationForm