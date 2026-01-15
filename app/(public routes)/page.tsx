import BabyTodayCard from "@/components/DashboardPage/BabyTodayCard/BabyTodayCard";
import css from "./dashboardPage.module.css";
import GreetingBlock from "@/components/DashboardPage/GreetingBlock/GreetingBlock";
import StatusBlock from "@/components/DashboardPage/StatusBlock/StatusBlock";
import TaskReminderCard from "@/components/DashboardPage/TaskReminderCard/TaskReminderCard";
import MomTipCard from "@/components/DashboardPage/MomTipCard/MomTipCard";
import FeelingCard from "@/components/DashboardPage/FeelingCard/FeelingCard";

export default function DashboardPage() {
  return (
    <div className={css.dashboard_page}>
      <GreetingBlock />
      <div className={css.main_container_dashboard}>
        <div className={css.left_block}>
          <div className={css.greetingstatus}>
            <StatusBlock />
          </div>
          <div className={css.babytodaymomtip}>
            <BabyTodayCard />
            <MomTipCard />
          </div>
        </div>
        <div className={css.right_block}>
          <TaskReminderCard />
          <FeelingCard />
        </div>
      </div>
    </div>
  );
}
