import React from 'react'
import Link from 'next/link'
import styles from '@/styles/Auth.module.scss'
import { symlink } from 'fs'

const SignUp = () => {
  return (
    <form className={styles.signUpForm}>
    <h1>Зарегистрироваться</h1>
    <p>Пожалуйста заполните эту форму, что бы создать учетётную запись</p>
    {/* {error && <>{error}</>} */}
    {/* <hr /> */}
    <label htmlFor="email"><b>Email</b></label>
    <input type="email" name="email" className={styles.emailInput} placeholder="Введите email" required />

    <label htmlFor="password"><b>Пароль</b></label>
    <input type="password" name="password" className={styles.passwordInput} placeholder="Введите пароль" required/>

    <button type="submit" className={styles.SignUpBtn}>Зарегистрироваться</button>
    <div>
      <p>Уже есть аккаунт? <Link href='/LogIn'>Войти</Link></p>
    </div>
  </form>
  )
}

export default SignUp