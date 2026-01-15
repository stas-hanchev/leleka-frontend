'use client';

import { useParams } from 'next/navigation';
import JourneyDetails from '@/components/journey/JourneyDetails/JourneyDetails';
import WeekSelector from '@/components/journey/WeekSelector/WeekSelector';
import css from './Week.module.css';
import { useAuthStore } from '@/lib/store/authStore';

const WeekPage = () => {
  const params = useParams();
  const weekNumber = Number(params.weekNumber) || 1;
  const user = useAuthStore((s) => s.user);

  return (
    <div className={css['page']}>
      <div className={css.headerSection}>
        <nav className={css.breadcrumbs}>Лелека &gt; Подорож</nav>
        <h2 className={css.title}>Доброго ранку {user && ', ' + user.name}!</h2>
      </div>

      <WeekSelector currentWeek={weekNumber} maxWeek={weekNumber} />

      <JourneyDetails weekNumber={weekNumber} />
    </div>
  );
};

export default WeekPage;
