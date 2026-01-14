'use client';

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTask } from '@/lib/api/taskApi';
import { ITaskFormValues } from '@/types/taskmodal';
import styles from './AddTaskModal.module.css';

interface AddTaskFormProps {
  onSuccess: () => void;
  initialValues?: ITaskFormValues;
}

export const AddTaskForm: React.FC<AddTaskFormProps> = ({ onSuccess, initialValues }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values: ITaskFormValues) =>
      createTask({
        name: values.title,
        date: values.date,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      onSuccess();
    },
    onError: (error: Error) => { // Виправили 'any' на 'Error'
      console.error('Помилка при створенні:', error);
      alert('Не вдалося зберегти завдання.');
    },
  });

  const formik = useFormik({
    initialValues: initialValues || {
      title: '',
      date: new Date().toISOString().split('T')[0],
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(2, 'Мінімум 2 символи')
        .required("Обов'язкове поле"),
      date: Yup.date().required("Обов'язкове поле"),
    }),
    onSubmit: (values) => {
      mutation.mutate(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={styles.form}>
      <div className={styles.inputGroup}>
        <label htmlFor="title" className={styles.label}>Назва завдання</label>
        <input
          id="title"
          name="title"
          type="text"
          className={styles.input}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
        />
        {formik.touched.title && formik.errors.title && (
          <span className={styles.error}>{formik.errors.title}</span>
        )}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="date" className={styles.label}>Дата</label>
        <input
          id="date"
          name="date"
          type="date"
          className={styles.input}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.date}
        />
        {formik.touched.date && formik.errors.date && (
          <span className={styles.error}>{formik.errors.date}</span>
        )}
      </div>

      <button 
        type="submit" 
        className={styles.saveButton} 
        disabled={mutation.isPending}
      >
        {mutation.isPending ? 'Збереження...' : 'Зберегти'}
      </button>
    </form>
  );
}; // Оця дужка була відсутня в кінці файлу