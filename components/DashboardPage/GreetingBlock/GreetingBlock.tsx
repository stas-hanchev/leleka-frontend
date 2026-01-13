"use client";

import { useAuthStore } from "@/lib/store/authStore";
import css from "./GreetingBlock.module.css";

export default function GreetingBlock() {
  const user = useAuthStore((s) => s.user);

  if (!user)
    return (
      <div className={css.block_title}>
        <h2 className={css.title_greeting}>Доброго ранку!</h2>
      </div>
    );

  return (
    <div className={css.block_title}>
      <h2 className={css.title_greeting}>Доброго ранку {user && ", " + user.name}!</h2>
    </div>
  );
}
