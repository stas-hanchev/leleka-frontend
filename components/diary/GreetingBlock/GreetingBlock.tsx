"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./GreetingBlock.module.css";
import { useAuthStore } from "@/lib/store/authStore";

export default function GreetingBlock() {
  const user = useAuthStore((s) => s.user);
  const [greeting, setGreeting] = useState("");

  //текст і логіка

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Доброго ранку");
    else if (hour < 18) setGreeting("Доброго дня");
    else setGreeting("Доброго вечора");
  }, []);

  const name = useMemo(() => user?.name?.trim() || "", [user?.name]);

  return (
    <section className={styles.wrap}>
      <h2 className={styles.title}>
        {greeting}
        {name ? `, ${name}!` : "!"}
      </h2>
      <p className={styles.subtitle}>Як ти себе почуваєш сьогодні?</p>
    </section>
  );
}
