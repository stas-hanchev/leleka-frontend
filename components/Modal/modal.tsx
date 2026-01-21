'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import css from './modal.module.css';

function getOrCreateModalRoot(): HTMLElement | null {
  if (typeof document === 'undefined') return null;

  const existing = document.getElementById('modal-root');
  if (existing) return existing;

  const el = document.createElement('div');
  el.id = 'modal-root';
  document.body.appendChild(el);
  return el;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => Promise<void>;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, onConfirm, children }: Props) {
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setModalRoot(getOrCreateModalRoot());
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    window.addEventListener('keydown', onEsc);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !modalRoot) return null;

  const handleConfirm = async () => {
    if (isSubmitting) return;
    if (!onConfirm) return;

    setIsSubmitting(true);
    try {
      await onConfirm();
    } finally {
      setIsSubmitting(false);
    }
  };

  return createPortal(
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        {children}

        {onConfirm && (
          <div className={css.actions}>
            <button
              type="button"
              className={css.cancelButton}
              onClick={onClose}
              disabled={isSubmitting}
            >
              Відмінити
            </button>

            <button
              type="button"
              className={css.confirmButton}
              onClick={handleConfirm}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Завантаження...' : 'Підтвердити'}
            </button>
          </div>
        )}
      </div>
    </div>,
    modalRoot
  );
}
