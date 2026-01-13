import { User } from "@/types/user";
import css from "./UserBar.module.css";
import Image from "next/image";

interface UserBarProps {
  user: User;
}

export default function UserBar({ user }: UserBarProps) {
  return (
    <div className={css.userBar}>
      <div className={css.userInfo}>
        <Image 
            src={user.avatarURL}
            alt={user.name}
            className={css.avatar}
            width={50}
            height={50}
        />
        <div className={css.userDetails}>
          <p className={css.userName}>{user.name}</p>
          <p className={css.userEmail}>{user.email}</p>
        </div>
      </div>
      <button className={css.logoutButton} aria-label="Logout">
        <svg width="18" height="19" className="logout-icon">
            <use href="/icon-sprite.svg#icon-logout"></use>
        </svg>
      </button>
    </div>
  );
}