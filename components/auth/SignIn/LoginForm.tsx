'use client';

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './LoginForm.module.css';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/lib/store/authStore';

interface FormValues {
  email: string;
  password: string;
}

const validationSchema = Yup.object({
  email: Yup.string().email('Некоректний email').required("Обов'язкове поле"),
  password: Yup.string()
    .min(8, 'Мінімум 8 символів')
    .required("Обов'язкове поле"),
});

export default function LoginForm() {
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    setSubmitting(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Вхід успішний! Вітаємо 👋');
        // console.log(`Data: `, data);
        const name = data.name;
        const email = data.email;
        const avatarURL = data.avatarURL;
        setUser({ name, email, avatarURL });
        router.push('/');
      } else {
        toast.error(data.error || 'Невірний email або пароль');
      }
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : 'Помилка входу');
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
                <svg width="31" height="30" className="icon-leleka">
                  <use href="/icon-sprite.svg#icon-logo"></use>
                </svg>
                <svg width="61" height="13" className="text-leleka">
                  <use href="/icon-sprite.svg#icon-leleka"></use>
                </svg>
              </div>
            </div>
          </div>

          <div className={styles.formCont}>
            <h1 className={styles.title}>Вхід</h1>

            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, errors, touched }) => (
                <Form className={styles.form}>
                  <label className={styles.label}>
                    Пошта*
                    <Field
                      name="email"
                      type="email"
                      placeholder="hello@leleka.com"
                      className={`${styles.input} ${
                        errors.email && touched.email ? styles.inputError : ''
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
                      placeholder="********"
                      className={`${styles.input} ${
                        errors.password && touched.password
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
                    {isSubmitting ? 'Завантаження...' : 'Увійти'}
                  </button>
                  <p className={styles.loginPrompt}>
                    Немає аккаунту?{' '}
                    <Link href="/auth/register" className={styles.loginLink}>
                      Зареєструватися
                    </Link>
                  </p>
                </Form>
              )}
            </Formik>
          </div>
        </div>
        <div className={styles.background}></div>
      </div>
    </section>
  );
}
