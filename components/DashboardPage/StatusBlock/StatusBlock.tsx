"use client";
import { useAuthStore } from "@/lib/store/authStore";
import { useQuery } from "@tanstack/react-query";
import { getBabyData } from "@/lib/api/babyService";
import css from "./StatusBlock.module.css";

export default function StatusBlock() {
  const { isAuthenticated } = useAuthStore();
  const { data, isError } = useQuery({
    queryKey: ["babyData"],
    queryFn: () => getBabyData(isAuthenticated),
  });

  if (isError || !data?.data) {
    return (
      <div className={css.block}>
        <div className={css.wrapper}>
          <p className={css.error_wrapper}>Не вдалося завантажити статус</p>
        </div>
        <div className={css.wrapper}>
          <p className={css.error_wrapper}>Не вдалося завантажити статус</p>
        </div>
      </div>
    );
  }

  const { curWeekToPregnant, daysBeforePregnant } = data.data;

  return (
    <div className={css.block}>
      <div className={css.wrapper}>
        <span className={css.label_status}>Тиждень</span>
        <span className={css.value_status}>{curWeekToPregnant}</span>
      </div>
      <div className={css.wrapper}>
        <span className={css.label_status}>Днів до зустрічі</span>
        <span className={css.value_status}>~{daysBeforePregnant}</span>
      </div>
    </div>
  );
}
