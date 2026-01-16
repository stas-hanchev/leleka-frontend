'use client';

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

import { createTask } from '@/lib/api/taskApi';
import { ITaskFormValues } from '@/types/taskmodal';
import styles from './AddTaskModal.module.css';

interface AddTaskFormProps {
  onSuccess: () => void;
  initialValues?: ITaskFormValues;
}

export const AddTaskForm: React.FC<AddTaskFormProps> = ({
  onSuccess,
  initialValues,
}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values: { title: string; date: string }) =>
      createTask({
        name: values.title,
        date: values.date,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      onSuccess();
    },
    onError: (error: unknown) => {
      let serverMessage = 'Не вдалося зберегти завдання.';
      if (axios.isAxiosError(error)) {
        serverMessage = error.response?.data?.message || serverMessage;
      }
      console.error('Помилка при створенні:', error);
      alert(serverMessage);
    },
  });

  const formik = useFormik<ITaskFormValues>({
    initialValues: initialValues || {
      title: '',
      date: new Date(),
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(2, 'Мінімум 2 символи')
        .required("Обов'язкове поле"),
      date: Yup.date().required("Обов'язкове поле"),
    }),
    onSubmit: (values) => {
      const formattedDate = values.date
        ? values.date.toLocaleDateString('en-CA')
        : '';

      mutation.mutate({
        title: values.title,
        date: formattedDate,
      });
    },
  });

  const handleDateChange = (date: Date | null) => {
    formik.setFieldValue('date', date);
  };

  return (
    <form onSubmit={formik.handleSubmit} className={styles.form}>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Назва завдання</label>
        <input
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
        <label className={styles.label}>Дата</label>
        <DatePicker
          selected={formik.values.date}
          onChange={handleDateChange}
          onBlur={() => formik.setFieldTouched('date', true)}
          dateFormat="yyyy-MM-dd"
          className={styles.input}
          placeholderText="Оберіть дату"
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
};
