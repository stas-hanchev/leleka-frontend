// components/task-modal/AddTaskModal.tsx
'use client';

import React, { useEffect, useCallback } from 'react';
import styles from './AddTaskModal.module.css';
import { AddTaskForm } from '../AddTaskModal/AddTaskModalForm';
import { useTaskModalStore } from '@/lib/store/taskModalStore'; // Імпортуємо стор

export const AddTaskModal = () => {
  // Беремо стан та функцію закриття зі стору
  const { isOpen, closeModal } = useTaskModalStore();
  
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') closeModal();
  }, [closeModal]);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleKeyDown]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) closeModal();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <button type="button" className={styles.closeButton} onClick={closeModal}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <h2 className={styles.title}>Нове завдання</h2>
        {/* Коли форма успішна, викликаємо closeModal */}
        <AddTaskForm onSuccess={closeModal} />
      </div>
    </div>
  );
};