"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import css from "./BabyTodayCard.module.css";
import type { BabyToday } from "@/types/baby";
import { getBabyData } from "@/lib/api/babyService";
import { useAuthStore } from "@/lib/store/authStore";

export default function BabyTodayCard() {
  const { isAuthenticated } = useAuthStore();
  const { data, isError } = useQuery({
    queryKey: ["babyData"],
    queryFn: async () => await getBabyData(isAuthenticated),
    placeholderData: keepPreviousData,
    refetchOnReconnect: "always",
    refetchOnMount: "always",
  });

  if (isError || !data?.babyData) {
    return (
      <div className={css.babytoday_card}>
        <p className={css.babytoday_error}>Не вдалося завантажити дані 😔</p>
      </div>
    );
  }
  const baby: BabyToday = data.babyData;

  return (
    <div className={css.babytoday_card}>
      <h3 className={css.babytoday_title}>Малюк сьогодні</h3>

      <div className={css.babytoday_content}>
        {baby.image && (
          <div className={css.imageWrapper}>
            <Image
              src={baby.image}
              alt="Ілюстрація малюка"
              width={140}
              height={140}
              className={css.babytoday_image}
            />
          </div>
        )}

        <div className={css.babytoday_textWrapper}>
          <p className={css.babytoday_info}>
            Розмір:{" "}
            <span className={css.babytoday_infotext}>{baby.babySize} см</span>
          </p>
          <p className={css.babytoday_info}>
            Вага:{" "}
            <span className={css.babytoday_infotext}>{baby.babyWeight} г</span>
          </p>
          <p className={css.babytoday_info}>
            Активність:{" "}
            <span className={css.babytoday_infotext}>{baby.babyActivity}</span>
          </p>
        </div>
      </div>
      <p className={css.babytoday_infotext}>{baby.babyDevelopment}</p>
    </div>
  );
}
