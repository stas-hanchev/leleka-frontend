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

  if (isError || !data?.data?.babyToday) {
    return (
      <div className={css.card_baby}>
        <p className={css.error_wrapper}>Не вдалося завантажити дані</p>
      </div>
    );
  }

  const baby: BabyToday = data.data.babyToday;

  return (
    <div className={css.card_baby}>
      <h3 className={css.title_baby}>Малюк сьогодні</h3>

      <div className={css.content_baby}>
        {baby.image && (
          <div className={css.imageWrapper_baby}>
            <Image
              src={baby.image}
              alt="Ілюстрація малюка"
              width={140}
              height={140}
              className={css.image}
            />
          </div>
        )}

        <div className={css.textWrapper_baby}>
          <p className={css.info_baby}>
            Розмір: <span className={css.infotext_baby}>{baby.babySize} см</span>
          </p>
          <p className={css.info_baby}>
            Вага: <span className={css.infotext_baby}>{baby.babyWeight} г</span>
          </p>
          <p className={css.info_baby}>
            Активність:{" "}
            <span className={css.infotext_baby}>{baby.babyActivity}</span>
          </p>
        </div>
      </div>
      <p className={css.infotext_baby}>{baby.babyDevelopment}</p>
    </div>
  );
}
