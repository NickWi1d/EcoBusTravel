import React from 'react'
import Link from 'next/link'
import styles from '@/styles/Auth.module.scss'

const LogIn = () => {
    return (
        <form className={styles.LoginForm}>
            <h1>Войти</h1>
            <p>Пожалуйста заполните эту форму, что бы войти в учетётную запись</p>
            {/* {error && <>{error}</>} */}
            <label htmlFor="email"><b>Email</b></label>
            <input type="email" name="email" className={styles.emailInput} placeholder="Введите email"  required />

            <label htmlFor="password"><b>Пароль</b></label>
            <input type="password" name="password" className={styles.passwordInput} placeholder="Введите пароль" required />

            <button type="submit" className={styles.LoginBtn}>Войти</button>
            <div>
                <p>Нет аккаунта? <Link href='/SignUp'>Зарегистрироваться</Link></p>
            </div>
        </form>
    )
}

export default LogIn