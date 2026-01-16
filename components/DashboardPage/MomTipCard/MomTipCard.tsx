"use client";

import { useQuery } from "@tanstack/react-query";

import css from "./MomTipCard.module.css";
import { getBabyData } from "@/lib/api/babyService";
import { useAuthStore } from "@/lib/store/authStore";

export default function MomTipCard() {
  const { isAuthenticated } = useAuthStore();
  const { data, isError } = useQuery({
    queryKey: ["babyData"],
    queryFn: () => getBabyData(isAuthenticated),
  });

  if (isError || !data?.babyData?.momDailyTips) {
    return (
      <div className={css.momtip_card}>
        <p className={css.momtip_error}>Не вдалося завантажити пораду 😔</p>
      </div>
    );
  }

  const momHint = data.babyData.momDailyTips;

  return (
    <div className={css.momtip_card}>
      <h3 className={css.momtip_title}>Порада для мами</h3>
      <p className={css.momtip_text}>{momHint}</p>
    </div>
  );
}
