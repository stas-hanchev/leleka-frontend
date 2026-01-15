"use client";

import { useAuthStore } from "@/lib/store/authStore";
import css from "./GreetingBlock.module.css";

export default function GreetingBlock() {
  const user = useAuthStore((s) => s.user);

  if (!user)
    return (
      <div className={css.greeting_block}>
        <h2 className={css.greeting_title}>Вітаю!</h2>
      </div>
    );

  return (
    <div className={css.greeting_block}>
      <h2 className={css.greeting_title}>Вітаю{user && ", " + user.name}!</h2>
    </div>
  );
}
