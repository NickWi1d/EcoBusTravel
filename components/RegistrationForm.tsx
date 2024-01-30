import React, { MouseEvent, useState } from 'react'
import styles from '@/styles/Auth.module.scss'
import { Link, TextField, Button } from '@mui/material'
import AlertComponent  from '@/components/Alert'

type CustomAlertType = "error" | "warning" | "info" | "success";

interface SignUpProps {
  Registration: (username: string, password: string, email:string) => void,
  isHaveAnAccount: boolean,
  setIsHaveAnAccount: React.Dispatch<React.SetStateAction<boolean>>,
  error: string,
  setError: React.Dispatch<React.SetStateAction<string>>,
  showAlert: boolean,
  setShowAlert:React.Dispatch<React.SetStateAction<boolean>>,
  alertType:CustomAlertType,
  setAlertType:React.Dispatch<React.SetStateAction<CustomAlertType>>,
}

const RegistrationForm: React.FC<SignUpProps> = ({ Registration, isHaveAnAccount, setIsHaveAnAccount, error, setError, showAlert, setShowAlert, alertType, setAlertType }) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [duplicatePassword, setDuplicatePassword] = useState('')


  const toggleIsHaveAnAccount = () => {
    setIsHaveAnAccount(prevState => !prevState);
    setUsername('')
    setPassword('')
    setDuplicatePassword('')
    setEmail('')
    setError('')
  };
  const handleRegistration = (e: MouseEvent<HTMLFormElement>) => {
    setError('')
    e.preventDefault()
    switch (isHaveAnAccount) {
      case true:
        Registration(username, password, 'Просто рандомный email, он тут не нужен')
        break;
      case false:
        if (password === duplicatePassword) {
          Registration(username, password, email)
        } else {
          setError('Пароли не совпадают')
          setAlertType('error')
          setShowAlert(true)
        }
        break;

      default:
        break;
    }
  }
  return (
      <form onSubmit={handleRegistration} className={isHaveAnAccount === true ? styles.LoginForm : styles.signUpForm}>
      {showAlert && (
        <AlertComponent
          showAlert={showAlert}
          setShowAlert={setShowAlert}
          type={alertType}
          error={error}
        />
      )}
      <strong><h1>{isHaveAnAccount === true ? 'Вход' : 'Регистрация'}</h1></strong>
      <p>{isHaveAnAccount === true ? 'Пожалуйста заполните эту форму, что бы войти в учетётную запись' : 'Пожалуйста заполните эту форму, что бы создать учетётную запись'}</p>
      {/* {error && <p className={styles.error}>{error}</p>} */}
      <hr />
      <TextField
        className={styles.emailInput}
        margin='normal'
        required
        id="username"
        type='text'
        label="Имя"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      {isHaveAnAccount === false &&
        <TextField
          className={styles.emailInput}
          margin='normal'
          required
          id="email"
          type='email'
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      }
      {/* <label htmlFor="email"><b>Email</b></label> 
    <input type="text" id="email" className={styles.emailInput} placeholder="Введите email" required value={username} onChange={(e)=>setUsername(e.target.value)}/> */}

      {/* <label htmlFor="password"><b>Пароль</b></label>
      <input type="password" id="password" className={styles.passwordInput} placeholder="Введите пароль" required value={password} onChange={(e) => setPassword(e.target.value)} /> */}
      <TextField
        className={styles.emailInput}
        margin='normal'
        required
        id="password"
        type='password'
        label="Пароль"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {isHaveAnAccount === false &&
        <TextField
          className={styles.emailInput}
          margin='normal'
          required
          id="DuplicatePassword"
          type='password'
          label="Повторите пароль"
          variant="outlined"
          value={duplicatePassword}
          onChange={(e) => setDuplicatePassword(e.target.value)}
        />
      }

      {/* <button type="submit" className={styles.SignUpBtn}>{isHaveAnAccount == true ? 'Войти' : 'Зарегистрироваться'}</button> */}
      <Button variant="contained" type='submit' className={styles.SignUpBtn}>{isHaveAnAccount === true ? 'Войти' : 'Зарегистрироваться'}</Button>
      <div>
        <p>Уже есть аккаунт? <Link className={styles.cursorLink} underline="always" onClick={toggleIsHaveAnAccount}>{isHaveAnAccount === true ? 'Зарегистрироваться' : 'Войти'}</Link></p>
      </div>
    </form>
  )
}

export default RegistrationForm