'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import styles from './Breadcrumbs.module.css';

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

const HIDE_ON_PATHS = new Set([
  '/profile/edit', // по ТЗ в Figma тут не должно быть крошек
]);

const Breadcrumbs = () => {
  const pathname = usePathname();

  if (!pathname) return null;

  // 1) скрываем на конкретных страницах (по ТЗ)
  if (HIDE_ON_PATHS.has(pathname)) return null;

  // 2) скрываем на auth на всякий случай
  if (pathname.startsWith('/auth')) return null;

  // разбиваем путь
  const pathNodes = pathname.split('/').filter(Boolean);

  // 3) Главная страница после логина: "/" должна показывать "Лелека > Мій день"
  // То есть, если pathname === "/", то мы вручную добавляем "my-day" как текущий узел.
  const nodesForRender = pathname === '/' ? ['my-day'] : pathNodes;

  return (
    <nav aria-label="Breadcrumb" className={styles.nav}>
      <ol className={styles.list}>
        {/* Лелека всегда первым */}
        <li className={styles.item}>
          <Link href="/" className={styles.link}>
            Лелека
          </Link>
        </li>

        {nodesForRender.map((node, index) => {
          const isLast = index === nodesForRender.length - 1;

          // Для "/" мы хотим "Мій день" ссылкой не делать (это последний элемент)
          // Для остальных путей формируем href как обычно
          const href =
            pathname === '/'
              ? '/'
              : `/${nodesForRender.slice(0, index + 1).join('/')}`;

          return (
            <li key={`${href}-${node}-${index}`} className={styles.item}>
              <Arrow />

              {isLast ? (
                <span className={styles.current}>
                  {routeLabels[node] || node}
                </span>
              ) : (
                <Link href={href} className={styles.link}>
                  {routeLabels[node] || node}
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
