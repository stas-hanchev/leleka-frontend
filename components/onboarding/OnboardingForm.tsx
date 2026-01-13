'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import DatePicker, { registerLocale } from 'react-datepicker';
import { uk } from 'date-fns/locale/uk';
import { toast, Toaster } from 'react-hot-toast';
import 'react-datepicker/dist/react-datepicker.css';

import { OnboardingSchema, OnboardingFormValues } from '../../types/onboarding';
import styles from './OnboardingForm.module.css';

registerLocale('uk', uk);

export const OnboardingForm: React.FC = () => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [isGenderOpen, setIsGenderOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const [shakeGender, setShakeGender] = useState(false);
  const [shakeDate, setShakeDate] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsGenderOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const triggerShake = (field: 'gender' | 'deliveryDate') => {
    if (field === 'gender') {
      setShakeGender(true);
      setTimeout(() => setShakeGender(false), 400);
    }

    if (field === 'deliveryDate') {
      setShakeDate(true);
      setTimeout(() => setShakeDate(false), 400);
    }
  };

  const formik = useFormik<OnboardingFormValues>({
    initialValues: {
      avatar: null,
      gender: '',
      deliveryDate: null,
    },
    validationSchema: OnboardingSchema,
    onSubmit: async (values) => {
      try {
        console.log('Відправка даних:', values);
        toast.success('Дані успішно збережено!');
        router.push('/');
      } catch {
        toast.error('Сталася помилка при збереженні');
      }
    },
  });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (preview) URL.revokeObjectURL(preview);
      formik.setFieldValue('avatar', file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <section className={styles.wrapper}>
      <Toaster position="top-right" />
      <div className={styles.containerRegister}>
        <div className={styles.containerTwo}>
          <div className={styles.logoContainer}>
            <div className={styles.logoWrapper}>
              <div className={styles.logo}>
                <svg width="31" height="30">
                  <use href="/icon-sprite.svg#icon-logo" />
                </svg>
                <svg width="61" height="13">
                  <use href="/icon-sprite.svg#icon-leleka" />
                </svg>
              </div>
            </div>
          </div>

          <div className={styles.globalForm}>
            <h1 className={styles.title}>Давайте познайомимось ближче</h1>

            <form
              onSubmit={(e) => {
                e.preventDefault();

                formik.handleSubmit();

                if (!formik.values.gender) {
                  triggerShake('gender');
                  formik.setFieldTouched('gender', true);
                }

                if (!formik.values.deliveryDate) {
                  triggerShake('deliveryDate');
                  formik.setFieldTouched('deliveryDate', true);
                }
              }}
              className={styles.form}
            >
              <div className={styles.avatarSection}>
                <div
                  className={styles.avatarCircle}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {preview ? (
                    <Image src={preview} alt="Аватар" fill className={styles.image} />
                  ) : (
                    <div className={styles.placeholder}>
                      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#A0A0A0" strokeWidth="1.5">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                    </div>
                  )}
                </div>

                <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={handleAvatarChange} />

                <button type="button" onClick={() => fileInputRef.current?.click()} className={styles.uploadBtn}>
                  Завантажити фото
                </button>
              </div>

              <div className={styles.inputContainer}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Стать дитини</label>

                  <div className={styles.customSelectWrapper} ref={selectRef}>
                    <div
                      className={`${styles.selectField}
                        ${isGenderOpen ? styles.active : ''}
                        ${formik.touched.gender && formik.errors.gender ? styles.inputInvalid : ''}
                        ${shakeGender ? styles.shake : ''}`}
                      onClick={() => setIsGenderOpen(!isGenderOpen)}
                    >
                      <span
                        className={
                          formik.values.gender
                            ? styles.selectedText
                            : styles.placeholderText
                        }
                      >
                        {formik.values.gender === 'boy'
                          ? 'Хлопчик'
                          : formik.values.gender === 'girl'
                          ? 'Дівчинка'
                          : formik.values.gender === 'unknown'
                          ? 'Ще не знаю'
                          : 'Оберіть стать'}
                      </span>

                      <svg
                        className={`${styles.selectArrow} ${isGenderOpen ? styles.rotated : ''}`}
                        width="24"
                        height="14"
                      >
                        <use href="/icon-sprite.svg#icon-arrow-down" />
                      </svg>
                    </div>

                    {isGenderOpen && (
                      <div className={styles.optionsList}>
                        <div className={styles.option} onClick={() => { formik.setFieldValue('gender', 'boy'); setIsGenderOpen(false); }}>
                          Хлопчик
                        </div>
                        <div className={styles.option} onClick={() => { formik.setFieldValue('gender', 'girl'); setIsGenderOpen(false); }}>
                          Дівчинка
                        </div>
                        <div className={styles.option} onClick={() => { formik.setFieldValue('gender', 'unknown'); setIsGenderOpen(false); }}>
                          Ще не знаю
                        </div>
                      </div>
                    )}
                  </div>

                  {formik.touched.gender && formik.errors.gender && (
                    <span className={styles.error}>{formik.errors.gender}</span>
                  )}
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>Планова дата пологів</label>

                  <div className={styles.datePickerWrapper}>
                    <DatePicker
                      selected={formik.values.deliveryDate}
                      onChange={(date: Date | null) =>
                        formik.setFieldValue('deliveryDate', date)
                      }
                      dateFormat="dd.MM.yyyy"
                      locale="uk"
                      wrapperClassName={styles.datePickerCustom}
                      className={`${styles.input}
                        ${formik.touched.deliveryDate && formik.errors.deliveryDate ? styles.inputInvalid : ''}
                        ${shakeDate ? styles.shake : ''}`}
                      placeholderText="16.07.2025"
                      autoComplete="off"
                    />
                  </div>

                  {formik.touched.deliveryDate && formik.errors.deliveryDate && (
                    <span className={styles.error}>
                      {String(formik.errors.deliveryDate)}
                    </span>
                  )}
                </div>
              </div>

              <button type="submit" className={styles.button} disabled={formik.isSubmitting}>
                {formik.isSubmitting ? 'Збереження...' : 'Зберегти'}
              </button>
            </form>
          </div>
        </div>

        <div className={styles.background}></div>
      </div>
    </section>
  );
};
