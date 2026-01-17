"use client";

import { useId } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import css from "./AddDiaryEntryForm.module.css";
import type { Note } from "@/types/diary";
import { createNote, updateNote } from "@/lib/api/diarymodal";

const TAGS = ["Натхнення", "Вдячність", "Тривога", "Дивні бажання", "Нудота"];

interface NoteFormValues {
  title: string;
  content: string;
  tags: string[];
}

interface Props {
  note?: Note;
  onClose: () => void;
}

const Schema = Yup.object({
  title: Yup.string()
    .min(3, "Мінімум 3 символи")
    .max(50, "Максимум 50 символів")
    .required("Назва обовʼязкова"),
  content: Yup.string().max(500),
  tags: Yup.array().of(Yup.string()).min(1, "Оберіть хоча б одну категорію"),
});

export default function AddDiaryEntryForm({ note, onClose }: Props) {
  const queryClient = useQueryClient();
  const fieldId = useId();

  const mutation = useMutation({
    mutationFn: async (values: NoteFormValues) => {
      if (note) {
        return updateNote(note.id, values);
      }
      return createNote(values);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onClose();
    },
  });

  const initialValues: NoteFormValues = {
    title: note?.title ?? "",
    content: note?.content ?? "",
    tags: note?.tags ?? [],
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Schema}
      onSubmit={(values) => mutation.mutate(values)}
    >
      <Form className={css.form}>
        {/* Title */}
        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-title`}>Заголовок</label>
          <Field id={`${fieldId}-title`} name="title" className={css.input} />
          <ErrorMessage name="title" component="p" className={css.error} />
        </div>

        {/* Tags */}
        <div className={css.formGroup}>
          <label>Категорії</label>

          <div className={css.tagsList}>
            {TAGS.map((tag) => (
              <label key={tag} className={css.tagItem}>
                <Field type="checkbox" name="tags" value={tag} />
                {tag}
              </label>
            ))}
          </div>

          <ErrorMessage name="tags" component="p" className={css.error} />
        </div>

        {/* Content */}
        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-content`}>Запис</label>
          <Field
            as="textarea"
            id={`${fieldId}-content`}
            name="content"
            rows={6}
            className={css.textarea}
          />
        </div>

        {/* Actions */}
        <button
          type="submit"
          disabled={mutation.isPending}
          className={css.submitBtn}
        >
          Зберегти
        </button>
      </Form>
    </Formik>
  );
}
