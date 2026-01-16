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

  if (isError || !data) {
    return (
      <div className={css.status_block}>
        <div className={css.status_wrapper}>
          <p className={css.status_error}>Не вдалося завантажити статус</p>
        </div>
        <div className={css.status_wrapper}>
          <p className={css.status_error}>Не вдалося завантажити статус</p>
        </div>
      </div>
    );
  }

  const { weekNumber, daysRemaining } = data;

  return (
    <div className={css.status_block}>
      <div className={css.status_wrapper}>
        <span className={css.status_label}>Тиждень</span>
        <span className={css.status_value}>{weekNumber}</span>
      </div>
      <div className={css.status_wrapper}>
        <span className={css.status_label}>Днів до зустрічі</span>
        <span className={css.status_value}>~{daysRemaining}</span>
      </div>
    </div>
  );
}
