import { BabyDevelopmentData } from '@/types/weeks';
import css from './BabyDevelopment.module.css';

type Props = {
  data: BabyDevelopmentData;
};

export default function BabyDevelopment({ data }: Props) {
  return (
    <div className={css.card}>
      <img src={data.image} alt="Baby illustration" className={css.image} />

      <p className={css.text}>{data.babyDevelopment}</p>

      <div className={css.fact}>
        <strong>Цікавий факт тижня</strong>
        <p>{data.interestingFact}</p>
      </div>
    </div>
  );
}
