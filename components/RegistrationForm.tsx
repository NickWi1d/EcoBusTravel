import React, {MouseEvent, useState} from 'react'
import styles from '@/styles/Auth.module.scss'
import { Link } from '@mui/material'

interface SignUpProps {
  Registration: (username:string, password:string) => void,
  isHaveAnAccount:boolean,
  setIsHaveAnAccount:React.Dispatch<React.SetStateAction<boolean>>,
  error:string
}

const RegistrationForm: React.FC<SignUpProps>= ({Registration, isHaveAnAccount,  setIsHaveAnAccount, error}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  const toggleIsHaveAnAccount = () => {
    setIsHaveAnAccount(prevState => !prevState);
    setUsername('')
    setPassword('')
  };
  const handleRegistration = (e: MouseEvent<HTMLFormElement>) =>{
    e.preventDefault()
    Registration(username, password)
  }
  return (
    <form onSubmit={handleRegistration} className={styles.signUpForm}>
    <h1>{isHaveAnAccount == true ? 'Войти' : 'Зарегистрироваться'}</h1>
    <p>{isHaveAnAccount == true ? 'Пожалуйста заполните эту форму, что бы войти в учетётную запись' : 'Пожалуйста заполните эту форму, что бы создать учетётную запись'}</p>
    {error && <p className={styles.error}>{error}</p>}
    <hr />
    <label htmlFor="email"><b>Email</b></label> 
    <input type="text" id="email" className={styles.emailInput} placeholder="Введите email" required value={username} onChange={(e)=>setUsername(e.target.value)}/>

    <label htmlFor="password"><b>Пароль</b></label>
    <input type="password" id="password" className={styles.passwordInput} placeholder="Введите пароль" required value={password} onChange={(e)=>setPassword(e.target.value)}/>

    <button type="submit" className={styles.SignUpBtn}>{isHaveAnAccount == true ? 'Войти' : 'Зарегистрироваться'}</button>
    <div>
      <p>Уже есть аккаунт? <Link className={styles.cursorLink} underline="always" onClick={toggleIsHaveAnAccount}>{isHaveAnAccount == true ? 'Зарегистрироваться' : 'Войти'}</Link></p>
    </div>
  </form>
  )
}

export default RegistrationForm