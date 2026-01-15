import { MomBodyData } from '@/types/weeks';
import css from './MomBody.module.css';
import TaskReminderCard from '@/components/DashboardPage/TaskReminderCard/TaskReminderCard';

type Props = {
  data: MomBodyData;
};

const getIconId = (category: string) => {
  switch (category) {
    case 'Харчування':
      return '/icon-sprite.svg#icon-fork-spoon';
    case 'Активність':
      return '/icon-sprite.svg#icon-fitness';
    case 'Відпочинок та комфорт':
      return '/icon-sprite.svg#icon-chair';
    default:
      return '';
  }
};

export default function MomBody({ data }: Props) {
  return (
    <div className={css.wrapper}>
      <div className={css.leftColumn}>
        <div className={css.block}>
          <h3 className={css.blockTitle}>Як ви можете почуватись</h3>
          <div className={css.tags}>
            {data.feelings.states.map((state) => (
              <span key={state} className={css.tag}>
                {state}
              </span>
            ))}
          </div>
          <p className={css.description}>{data.feelings.sensationDescr}</p>
        </div>

        <div className={css.block}>
          <h3 className={css.blockTitle}>Поради для вашого комфорту</h3>
          <ul className={css.tipsList}>
            {data.comfortTips.map((tip) => (
              <li key={tip._id} className={css.tipItem}>
                <div className={css.iconContainer}>
                  <svg className={css.icon}>
                    <use href={getIconId(tip.category)} />
                  </svg>
                </div>
                <div className={css.tipContent}>
                  <strong className={css.tipCategory}>{tip.category}</strong>
                  <p className={css.tipText}>{tip.tip}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <TaskReminderCard />
    </div>
  );
}
