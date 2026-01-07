'use client';

import RegisterForm from '@/components/auth/Register/RegisterForm';
import styles from './SignUpPage.module.css';

export default function SignUpPage() {
  return (
    <main className={styles.main}>
      <RegisterForm />
    </main>
  );
}
