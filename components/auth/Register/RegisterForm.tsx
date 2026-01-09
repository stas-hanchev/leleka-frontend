'use client';

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './RegisterForm.module.css';
import toast from 'react-hot-toast';

interface FormValues {
  name: string;
  email: string;
  password: string;
}

const validationSchema = Yup.object({
  name: Yup.string().required("Обов'язкове поле"),
  email: Yup.string().email('Некоректний email').required("Обов'язкове поле"),
  password: Yup.string()
    .min(6, 'Мінімум 6 символів')
    .required("Обов'язкове поле"),
});

export default function RegisterForm() {
  const router = useRouter();

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    setSubmitting(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (res.status === 201) {
        toast.success('Реєстрація успішна 🎉');
        router.push('/profile/edit');
      } else if (res.status === 409) {
        toast.error('Цей email вже зареєстрований');
      } else {
        toast.error(data.error || 'Помилка реєстрації');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
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
            <h1 className={styles.title}>Реєстрація</h1>

            <Formik
              initialValues={{ name: '', email: '', password: '' }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
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
        <div className={styles.background}></div>
      </div>
    </section>
  );
}
