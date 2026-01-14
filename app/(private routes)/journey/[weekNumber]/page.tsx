'use client';

import { useParams } from 'next/navigation';
import JourneyDetails from '@/components/journey/JourneyDetails/JourneyDetails';
import WeekSelector from '@/components/journey/WeekSelector/WeekSelector';
import css from './Week.module.css';

const WeekPage = () => {
  const params = useParams();
  const weekNumber = Number(params.weekNumber) || 1;

  return (
    <div className={css['page']}>
      <div className={css.headerSection}>
        <nav className={css.breadcrumbs}>Лелека &gt; Подорож</nav>
        <h1 className={css.mainTitle}>Доброго ранку, Ганна!</h1>
      </div>

      <WeekSelector currentWeek={weekNumber} maxWeek={weekNumber} />

      <JourneyDetails weekNumber={weekNumber} />
    </div>
  );
};

export default WeekPage;
