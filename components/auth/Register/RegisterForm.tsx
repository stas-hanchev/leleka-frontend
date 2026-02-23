'use client';

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import axios from 'axios';

import styles from './RegisterForm.module.css';
import api from '@/lib/api/axios';
import { useAuthStore } from '@/lib/store/authStore';
import { User } from '@/types/user';

interface FormValues {
  name: string;
  email: string;
  password: string;
}

const validationSchema = Yup.object({
  name: Yup.string().required("Обов'язкове поле"),
  email: Yup.string().email('Некоректний email').required("Обов'язкове поле"),
  password: Yup.string()
    .min(8, 'Мінімум 8 символів')
    .required("Обов'язкове поле"),
});

export default function RegisterForm() {
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    setSubmitting(true);

    try {
      const { data } = await api.post<User>('/auth/register', values);

      setUser(data);

      // toast.success('Реєстрація успішна 🎉');
      router.push('/profile/edit');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          toast.error('Цей email вже зареєстрований');
        } else {
          toast.error(error.response?.data?.error || 'Помилка реєстрації');
        }
      } else {
        toast.error('Помилка реєстрації');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.containerRegister}>
        <div className={styles.containerTwo}>
          <div className={styles.logoContainer}>
            <div className={styles.logoWrapper}>
              <div className={styles.logo}>
                <Link href="/" className={styles.logo}>
                  <svg width="31" height="30">
                    <use href="/icon-sprite.svg#icon-logo" />
                  </svg>
                  <svg width="61" height="13">
                    <use href="/icon-sprite.svg#icon-leleka" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          <div className={styles.formCont}>
            <h1 className={styles.title}>Реєстрація</h1>

            <Formik
              initialValues={{ name: '', email: '', password: '' }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, errors, touched, submitCount }) => (
                <Form className={styles.form} noValidate>
                  <label className={styles.label}>
                    Імʼя*
                    <Field
                      name="name"
                      placeholder="Ваше імʼя"
                      disabled={isSubmitting}
                      className={`${styles.input} ${
                        errors.name && touched.name && submitCount > 0
                          ? styles.inputError
                          : ''
                      }`}
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
                      type="email"
                      autoComplete="email"
                      disabled={isSubmitting}
                      placeholder="hello@leleka.com"
                      className={`${styles.input} ${
                        errors.email && touched.email && submitCount > 0
                          ? styles.inputError
                          : ''
                      }`}
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
                      autoComplete="new-password"
                      disabled={isSubmitting}
                      placeholder="********"
                      className={`${styles.input} ${
                        errors.password && touched.password && submitCount > 0
                          ? styles.inputError
                          : ''
                      }`}
                    />
                    <ErrorMessage
                      name="password"
                      component="span"
                      className={styles.error}
                    />
                  </label>

                  <button
                    type="submit"
                    className={styles.button}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Завантаження...' : 'Зареєструватися'}
                  </button>

                  <p className={styles.loginPrompt}>
                    Вже маєте аккаунт?{' '}
                    <Link href="/auth/login" className={styles.loginLink}>
                      Увійти
                    </Link>
                  </p>
                </Form>
              )}
            </Formik>
          </div>
        </div>

        <div className={styles.background} />
      </div>
    </section>
  );
}
