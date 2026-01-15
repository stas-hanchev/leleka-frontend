'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getBabyDevelopment, getMomBody } from '@/lib/services/weeksService';
import BabyDevelopment from './BabyDevelopment/BabyDevelopment';
import MomBody from './MomBody/MomBody';
import css from './JourneyDetails.module.css';

type Props = {
  weekNumber: number;
};

type Tab = 'baby' | 'mom';

export default function JourneyDetails({ weekNumber }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('baby');

  const babyQuery = useQuery({
    queryKey: ['baby', weekNumber],
    queryFn: () => getBabyDevelopment(weekNumber),
    enabled: activeTab === 'baby',
  });

  const momQuery = useQuery({
    queryKey: ['mom', weekNumber],
    queryFn: () => getMomBody(weekNumber),
    enabled: activeTab === 'mom',
  });

  return (
    <section className={css.wrapper}>
      <div className={css.tabs}>
        <button
          className={activeTab === 'baby' ? css.active : ''}
          onClick={() => setActiveTab('baby')}
        >
          Розвиток малюка
        </button>
        <button
          className={activeTab === 'mom' ? css.active : ''}
          onClick={() => setActiveTab('mom')}
        >
          Тіло мами
        </button>
      </div>

      <div className={css.content}>
        {activeTab === 'baby' && (
          <>
            {babyQuery.isLoading && <p>Завантаження...</p>}
            {babyQuery.isError && <p>Помилка при завантаженні даних</p>}
            {babyQuery.data && <BabyDevelopment data={babyQuery.data} />}
          </>
        )}

        {activeTab === 'mom' && (
          <>
            {momQuery.isLoading && <p>Завантаження...</p>}
            {momQuery.isError && <p>Помилка при завантаженні даних</p>}
            {momQuery.data && <MomBody data={momQuery.data} />}
          </>
        )}
      </div>
    </section>
  );
}
