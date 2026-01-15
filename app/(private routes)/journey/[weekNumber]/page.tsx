"use client";

import { useParams } from "next/navigation";
import JourneyDetails from "@/components/journey/JourneyDetails/JourneyDetails";
import WeekSelector from "@/components/journey/WeekSelector/WeekSelector";
import css from "./Week.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import { getPregnancyWeekFromDueDate } from "@/lib/getJourneyHref/getJourneyHref";

const WeekPage = () => {
  const params = useParams();
  const user = useAuthStore((s) => s.user);

  const viewWeek = Number(params.weekNumber) || 1;

  const userActualWeek = user?.birthDate
    ? getPregnancyWeekFromDueDate(user.birthDate)
    : 1;

  return (
    <div className={css["page"]}>
      <div className={css.headerSection}>
        {/* <nav className={css.breadcrumbs}>Лелека &gt; Подорож</nav>  */}
        <h2 className={css.title}>Доброго ранку {user && ", " + user.name}!</h2>
      </div>

      <WeekSelector currentWeek={viewWeek} maxWeek={userActualWeek} />

      <JourneyDetails weekNumber={viewWeek} />
    </div>
  );
};

export default WeekPage;
