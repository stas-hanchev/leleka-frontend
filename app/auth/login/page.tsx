'use client'

import LoginForm from '@/components/auth/SignIn/LoginForm'
import styles from './SignInPage.module.css'


export default function Login() {
  return (
    <main className={styles.main}>
      <div className={styles.formContainer}>
        <LoginForm />
      </div>
    </main>
  );
}
