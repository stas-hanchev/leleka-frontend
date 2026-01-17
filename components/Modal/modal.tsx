'use client';

import { useEffect, type ReactNode } from 'react';

import { createPortal } from 'react-dom';

import css from './modal.module.css';

const modalRoot =
  document.getElementById('modal-root') ??
  (() => {
    const el = document.createElement('div');

    el.id = 'modal-root';

    document.body.appendChild(el);

    return el;
  })();

interface Props {
  isOpen: boolean;

  onClose: () => void;

  children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: Props) {
  useEffect(() => {
    if (!isOpen) return;

    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';

    window.addEventListener('keydown', onEsc);

    return () => {
      document.body.style.overflow = '';

      window.removeEventListener('keydown', onEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,

    modalRoot
  );
}
