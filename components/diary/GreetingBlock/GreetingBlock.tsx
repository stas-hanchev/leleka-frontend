'use client';

import styles from './GreetingBlock.module.css';
import { useAuthStore } from '@/lib/store/authStore';

function getGreetingByHour(hour: number) {
  if (hour < 12) return 'Доброго ранку';
  if (hour < 18) return 'Доброго дня';
  return 'Доброго вечора';
}

export default function GreetingBlock() {
  const user = useAuthStore((s) => s.user);

  const greeting = getGreetingByHour(new Date().getHours());
  const name = user?.name?.trim();

  return (
    <section className={styles.wrap}>
      <h2 className={styles.title}>
        {greeting}
        {name ? `, ${name}!` : '!'}
      </h2>
    </section>
  );
}
