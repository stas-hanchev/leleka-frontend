'use client';

import {
  ErrorMessage,
  Field,
  FieldProps,
  Form,
  Formik,
  FormikHelpers,
} from 'formik';
import { useId } from 'react';
import * as Yup from 'yup';

import css from './AddDiaryEntryForm.module.css';
import { createNote, updateNote } from '@/lib/api/diarymodal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DiaryNote } from '@/types/diary';
import { Emotion, EMOTIONS } from '@/constants/emotions';
import CustomSelect from './SelectComponent/Select';
import { useNoteModalStore } from '@/lib/store/modalNoteStore';

const diaryValidationSchema = Yup.object().shape({
  title: Yup.string()
    .required('Введіть заголовок')
    .max(100, 'Максимум 100 символів'),
  categories: Yup.array().min(1, 'Оберіть хоча б одну категорію'),
  text: Yup.string()
    .required('Поле запису не може бути порожнім')
    .max(1000, 'Максимум 1000 символів'),
});

interface Props {
  editingNote?: DiaryNote | null;
}

export default function AddDiaryEntryForm({ editingNote = null }: Props) {
  const fieldId = useId();
  const { closeNoteModal } = useNoteModalStore();
  const queryClient = useQueryClient();

  const handleSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['diaryEntries'] });
    closeNoteModal();
  };

  const createMutation = useMutation({
    mutationFn: (payload: {
      title: string;
      text: string;
      categories: string[];
    }) => createNote(payload),
    onSuccess: handleSuccess,
  });

  const updateMutation = useMutation({
    mutationFn: (payload: {
      id: string;
      body: { title: string; text: string; categories: string[] };
    }) => updateNote(payload.id, payload.body),
    onSuccess: handleSuccess,
  });

  const initialValues = {
    title: editingNote?.title || '',
    text: editingNote?.text || '',
    categories: editingNote
      ? EMOTIONS.filter((emotion) =>
          editingNote.categories.includes(emotion.id)
        )
      : [],
  };

  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting, resetForm }: FormikHelpers<typeof initialValues>
  ) => {
    const payload = {
      title: values.title,
      text: values.text,
      categories: values.categories.map((c: Emotion) => c.id),
    };

    if (editingNote) {
      updateMutation.mutate(
        { id: editingNote._id, body: payload },
        {
          onSettled: () => setSubmitting(false),
          onSuccess: () => resetForm(),
        }
      );
    } else {
      createMutation.mutate(payload, {
        onSettled: () => setSubmitting(false),
        onSuccess: () => resetForm(),
      });
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={diaryValidationSchema}
      enableReinitialize
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label className={css.labelText} htmlFor={`${fieldId}-title`}>
              Заголовок
            </label>
            <Field name="title">
              {({ field, meta }: FieldProps) => (
                <input
                  {...field}
                  type="text"
                  id={`${fieldId}-title`}
                  placeholder="Введіть заголовок запису"
                  className={`${css.textInputTitle} ${
                    meta.touched && meta.error ? css.inputError : ''
                  }`}
                />
              )}
            </Field>
            <ErrorMessage className={css.error} name="title" component="span" />
          </div>

          <div className={css.formGroup}>
            <label className={css.labelText}>Категорії</label>
            <Field name="categories">
              {({ field, form, meta }: FieldProps) => (
                <CustomSelect<Emotion, true>
                  isMulti
                  options={EMOTIONS}
                  value={field.value}
                  onChange={(value) => form.setFieldValue(field.name, value)}
                  getOptionLabel={(o) => o.label}
                  getOptionValue={(o) => o.id}
                  placeholder="Оберіть категорії"
                  hasError={meta.touched && !!meta.error}
                />
              )}
            </Field>
            <ErrorMessage
              name="categories"
              component="span"
              className={css.error}
            />
          </div>

          <div className={css.formGroup}>
            <label className={css.labelText}>Запис</label>
            <Field name="text">
              {({ field, meta }: FieldProps) => (
                <textarea
                  {...field}
                  id={`${fieldId}-description`}
                  placeholder="Запишіть, як ви себе відчуваєте"
                  className={`${css.textInputTextArea} ${
                    meta.touched && meta.error ? css.inputError : ''
                  }`}
                />
              )}
            </Field>
            <ErrorMessage className={css.error} name="text" component="span" />
          </div>

          <button
            className={css.button}
            type="submit"
            disabled={
              isSubmitting ||
              createMutation.isPending ||
              updateMutation.isPending
            }
          >
            {isSubmitting ? 'Збереження...' : 'Зберегти'}
          </button>
        </Form>
      )}
    </Formik>
  );
}
