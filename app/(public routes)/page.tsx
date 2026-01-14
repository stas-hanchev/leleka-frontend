import BabyTodayCard from '@/components/DashboardPage/BabyTodayCard/BabyTodayCard';
import styles from './dashboardPage.module.css';
import GreetingBlock from '@/components/DashboardPage/GreetingBlock/GreetingBlock';
import StatusBlock from '@/components/DashboardPage/StatusBlock/StatusBlock';
import TaskReminderCard from '@/components/DashboardPage/TaskReminderCard/TaskReminderCard';
import MomTipCard from '@/components/DashboardPage/MomTipCard/MomTipCard';
import FeelingCard from '@/components/DashboardPage/FeelingCard/FeelingCard';

export default function DashboardPage() {
  return (
    <div className={styles.page}>
      <GreetingBlock />
      <div className={styles.main}>
        <div>
          <div className={styles.greetingstatus}>
            <StatusBlock />
          </div>
          <div className={styles.babytodaymomtip}>
            <BabyTodayCard />
            <MomTipCard />
          </div>
        </div>
        <div className={styles.right_block}>
          <TaskReminderCard />
          <FeelingCard />
        </div>
      </div>
    </div>
  );
}
