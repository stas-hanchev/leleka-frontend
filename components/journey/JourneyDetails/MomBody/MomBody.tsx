import { MomBodyData } from '@/types/weeks';
import css from './MomBody.module.css';

type Props = {
  data: MomBodyData;
};

export default function MomBody({ data }: Props) {
  return (
    <div className={css.wrapper}>
      {/* Feelings */}
      <div className={css.block}>
        <h3>Як ви можете почуватись</h3>

        <div className={css.tags}>
          {data.feelings.states.map((state) => (
            <span key={state}>{state}</span>
          ))}
        </div>

        <p>{data.feelings.sensationDescr}</p>
      </div>

      {/* Comfort tips */}
      <div className={css.block}>
        <h3>Поради для вашого комфорту</h3>

        <ul>
          {data.comfortTips.map((tip, index) => (
            <li key={index}>
              <strong>{tip.category}</strong>
              <p>{tip.tip}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
