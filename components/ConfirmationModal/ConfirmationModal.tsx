'use client';

import { FC, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './ConfirmationModal.module.css';
import { ConfirmationModalProps } from '@/types/confirmationModal';

export const ConfirmationModal: FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  confirmButtonText,
  cancelButtonText,
  onConfirm,
  onCancel,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCancel();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
      setIsSubmitting(false);
    };
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      await onConfirm();
    } finally {
      setIsSubmitting(false);
    }
  };

  return createPortal(
    <div className={styles.backdrop} onClick={onCancel}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button
          type="button"
          className={styles.closeButton}
          onClick={onCancel}
          aria-label="Close modal"
          disabled={isSubmitting}
        >
          <svg width="13.5" height="13.5" aria-hidden="true">
            <use href="/icon-sprite.svg#icon-close" />
          </svg>
        </button>

        <h2 className={styles.title}>{title}</h2>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={onCancel}
            disabled={isSubmitting}
          >
            {cancelButtonText}
          </button>

          <button
            type="button"
            className={styles.confirmButton}
            onClick={handleConfirm}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Завантаження...' : confirmButtonText}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
