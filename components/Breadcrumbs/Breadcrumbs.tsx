'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import styles from './Breadcrumbs.module.css';
import { useSelectedNoteStore } from '@/lib/store/selectedNoteStore';

const routeLabels: Record<string, string> = {
  journey: 'Подорож',
  diary: 'Щоденник',
  profile: 'Профіль',
  'my-day': 'Мій день',
};

const Arrow = () => (
  <svg className={styles.arrow} width="7" height="12">
    <use href="/icon-sprite.svg#icon-arrow-right"></use>
  </svg>
);

const HIDE_ON_PATHS = new Set(['/profile/edit']);

const Breadcrumbs = () => {
  const pathname = usePathname();

  const { selectedNote } = useSelectedNoteStore();

  if (!pathname) return null;

  if (HIDE_ON_PATHS.has(pathname)) return null;
  if (pathname.startsWith('/auth')) return null;

  const pathNodes = pathname.split('/').filter(Boolean);
  const nodesForRender = pathname === '/' ? ['my-day'] : pathNodes;

  return (
    <nav aria-label="Breadcrumb" className={styles.nav}>
      <ol className={styles.list}>
        <li className={styles.item}>
          <Link href="/" className={styles.link}>
            Лелека
          </Link>
        </li>

        {nodesForRender.map((node, index) => {
          const isLast = index === nodesForRender.length - 1;

          const href =
            pathname === '/'
              ? '/'
              : `/${nodesForRender.slice(0, index + 1).join('/')}`;

          const label =
            isLast && selectedNote
              ? selectedNote.title
              : routeLabels[node] || node;

          return (
            <li key={`${href}-${node}-${index}`} className={styles.item}>
              <Arrow />

              {isLast ? (
                <span className={styles.current}>{label}</span>
              ) : (
                <Link href={href} className={styles.link}>
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
