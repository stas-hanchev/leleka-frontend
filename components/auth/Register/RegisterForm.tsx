'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './RegisterForm.module.css';

const validationSchema = Yup.object({
  name: Yup.string().required("Обов'язкове поле"),
  email: Yup.string().email('Некоректний email').required("Обов'язкове поле"),
  password: Yup.string()
    .min(6, 'Мінімум 6 символів')
    .required("Обов'язкове поле"),
});

export default function RegisterForm() {
  const router = useRouter();

  return (
    <section className={styles.wrapper}>
      <div className={styles.logoContainer}>
        <div className={styles.logoWrapper}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}></span>
            <span className={styles.logoText}>Лелека</span>
          </div>
        </div>
      </div>

      <h1 className={styles.title}>Реєстрація</h1>

      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={() => {
          router.push('/profile/edit');
        }}
      >
        <Form className={styles.form}>
          <label className={styles.label}>
            Ім’я*
            <Field
              name="name"
              placeholder="Ваше імʼя"
              className={styles.input}
            />
            <ErrorMessage
              name="name"
              component="span"
              className={styles.error}
            />
          </label>

          <label className={styles.label}>
            Пошта*
            <Field
              name="email"
              placeholder="hello@leleka.com"
              className={styles.input}
            />
            <ErrorMessage
              name="email"
              component="span"
              className={styles.error}
            />
          </label>

          <label className={styles.label}>
            Пароль*
            <Field
              name="password"
              type="password"
              placeholder="********"
              className={styles.input}
            />
            <ErrorMessage
              name="password"
              component="span"
              className={styles.error}
            />
          </label>

          <button type="submit" className={styles.button}>
            Зареєструватися
          </button>
        </Form>
      </Formik>

      <p className={styles.loginPrompt}>
        Вже маєте аккаунт?{' '}
        <Link href="/auth/login" className={styles.loginLink}>
          Увійти
        </Link>
      </p>
    </section>
  );
}
