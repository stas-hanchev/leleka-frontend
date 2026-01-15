import { BabyDevelopmentData } from '@/types/weeks';
import css from './BabyDevelopment.module.css';

type Props = {
  data: BabyDevelopmentData;
};

export default function BabyDevelopment({ data }: Props) {
  return (
    <div className={css.card}>
      <div className={css.mainContent}>
        {data.image && (
          <div className={css.imageWrapper}>
            <img
              src={data.image}
              alt="Baby illustration"
              className={css.image}
            />
          </div>
        )}

        <div className={css.textContent}>
          <p className={css.text}>{data.babyDevelopment}</p>

          <div className={css.fact}>
            <div className={css.factHeader}>
              <svg className={css.starIcon} width="24" height="24">
                <use href="/icon-sprite.svg#icon-star" />
              </svg>
              <strong>Цікавий факт тижня</strong>
            </div>
            <p>{data.interestingFact}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
