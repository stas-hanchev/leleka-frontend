'use client';

import React from 'react';
import styles from './AddTaskModal.module.css';
import { AddTaskForm } from './AddTaskModalForm';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddTaskModal: React.FC<AddTaskModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <svg width="14" height="14" className={styles.svg}>
            <use href="/icon-sprite.svg#icon-close" />
          </svg>
        </button>

        <h2 className={styles.title}>Додати завдання</h2>

        <AddTaskForm onSuccess={onClose} />
      </div>
    </div>
  );
};
