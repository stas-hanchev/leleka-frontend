"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import styles from "./Breadcrumbs.module.css";

const routeLabels: Record<string, string> = {
  journey: "Подорож",
  diary: "Щоденник",
  profile: "Профіль",
  "my-day": "Мій день",
};

const Arrow = () => (
  <svg
    className={styles.arrow}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false">
    <path
      d="M9.38672 6.67188C9.48754 6.67188 9.56452 6.70229 9.64258 6.78027L14.5869 11.7246C14.6408 11.7785 14.666 11.8205 14.6777 11.8486V11.8496C14.6925 11.8852 14.7012 11.9249 14.7012 11.9736C14.7012 12.0223 14.6925 12.0621 14.6777 12.0977V12.0986C14.666 12.1268 14.6408 12.1687 14.5869 12.2227L9.61816 17.1914C9.54039 17.2692 9.47325 17.291 9.39258 17.2881C9.29855 17.2846 9.21769 17.2527 9.13184 17.167C9.05371 17.0889 9.02246 17.012 9.02246 16.9111C9.02246 16.8102 9.05371 16.7334 9.13184 16.6553L13.8135 11.9736L9.10645 7.2666C9.02878 7.1889 9.00684 7.12259 9.00977 7.04199C9.01321 6.94773 9.04578 6.86633 9.13184 6.78027C9.20976 6.70246 9.28613 6.67195 9.38672 6.67188Z"
      fill="currentColor"
      stroke="currentColor"
    />
  </svg>
);

const HIDE_ON_PATHS = new Set([
  "/profile/edit", // по ТЗ в Figma тут не должно быть крошек
]);

const Breadcrumbs = () => {
  const pathname = usePathname();

  if (!pathname) return null;

  // 1) скрываем на конкретных страницах (по ТЗ)
  if (HIDE_ON_PATHS.has(pathname)) return null;

  // 2) скрываем на auth на всякий случай
  if (pathname.startsWith("/auth")) return null;

  // разбиваем путь
  const pathNodes = pathname.split("/").filter(Boolean);

  // 3) Главная страница после логина: "/" должна показывать "Лелека > Мій день"
  // То есть, если pathname === "/", то мы вручную добавляем "my-day" как текущий узел.
  const nodesForRender = pathname === "/" ? ["my-day"] : pathNodes;

  return (
    <nav aria-label="Breadcrumb" className={styles.nav}>
      <ol className={styles.list}>
        {/* Лелека всегда первым */}
        <li className={styles.item}>
          <Link href="/" className={styles.link}>
            Лелека
          </Link>
        </li>

        {nodesForRender.map((node, index) => {
          const isLast = index === nodesForRender.length - 1;

          // Для "/" мы хотим "Мій день" ссылкой не делать (это последний элемент)
          // Для остальных путей формируем href как обычно
          const href =
            pathname === "/"
              ? "/"
              : `/${nodesForRender.slice(0, index + 1).join("/")}`;

          return (
            <li key={`${href}-${node}-${index}`} className={styles.item}>
              <Arrow />

              {isLast ? (
                <span className={styles.current}>
                  {routeLabels[node] || node}
                </span>
              ) : (
                <Link href={href} className={styles.link}>
                  {routeLabels[node] || node}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
