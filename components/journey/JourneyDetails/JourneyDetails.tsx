'use client';

import { useState } from 'react';
import { BabyDevelopment } from './BabyDevelopment/BabyDevelopment';
import { MomBody } from './MomBody/MomBody';
import styles from './JourneyDetails.module.css';

interface JourneyDetailsProps {
  weekNumber: number;
}

export default function JourneyDetails({ weekNumber }: JourneyDetailsProps) {
  const [activeTab, setActiveTab] = useState<'baby' | 'mom'>('baby');

  return (
    <section className={styles.wrapper}>
      <div className={styles.tabsContainer}>
        <button
          type="button"
          className={activeTab === 'baby' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('baby')}
        >
          Розвиток малюка
        </button>
        <button
          type="button"
          className={activeTab === 'mom' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('mom')}
        >
          Тіло мами
        </button>
      </div>

      <div className={styles.scrollArea}>
        {activeTab === 'baby' ? (
          <BabyDevelopment weekNumber={weekNumber} />
        ) : (
          <MomBody weekNumber={weekNumber} />
        )}
      </div>
    </section>
  );
}
