'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import styles from '/Breadcrumbs.module.css';

const routeLabels: Record<string, string> = {
  'journey': 'Подорож',
  'diary': 'Щоденник',
  'profile': 'Профіль',
  'my-day': 'Мій день',
};

const Breadcrumbs = () => {
  const pathname = usePathname();
  
  // Розбиваємо шлях на частини, видаляючи порожні елементи
  const pathNodes = pathname.split('/').filter((node) => node !== '');

return (
    <nav aria-label="Breadcrumb" className={styles.nav}>
      <ol className={styles.list}>
        {/* Початкова ланка */}
        <li className={styles.item}>
          <Link href="/" className={styles.link_leleka}>
            Лелека
          </Link>
        </li>

        {pathNodes.map((node, index) => {
          const isLast = index === pathNodes.length - 1;
          const href = `/${pathNodes.slice(0, index + 1).join('/')}`;

          return (
            <li key={href} className={styles.item}>
              <span className={styles.separator}>&gt;</span>
              {isLast ? (
                <span className={styles.current}>{routeLabels[node] || node}</span>
              ) : (
                <Link href={href} className={styles.link_leleka}>
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