import { User } from "@/types/user";
import css from "./UserBar.module.css";
import Image from "next/image";
import { useState } from "react";
import { ConfirmationModal } from "@/components/ConfirmationModal/ConfirmationModal";
import { logout } from "@/lib/api/authClientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";

interface UserBarProps {
  user: User;
}

export default function UserBar({ user }: UserBarProps) {
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const openConfirmationModal = () => {
    setIsConfirmationModalOpen(true);
  };

  const closeConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
  };

  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated
  );
  const router = useRouter();

  const handleLogout = async () => {
    closeConfirmationModal();
    await logout();
    clearIsAuthenticated();
    router.push("/auth/login");
  };

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
      <button
        className={css.logoutButton}
        aria-label="Logout"
        onClick={() => {
          openConfirmationModal();
        }}
      >
        <svg width="18" height="19" className="logout-icon">
          <use href="/icon-sprite.svg#icon-logout"></use>
        </svg>
      </button>
      {isConfirmationModalOpen && (
        <ConfirmationModal
          isOpen={isConfirmationModalOpen}
          title="Ви точно хочете вийти?"
          cancelButtonText="Ні"
          confirmButtonText="Так"
          onConfirm={handleLogout}
          onCancel={() => setIsConfirmationModalOpen(false)}
        />
      )}
    </div>
  );
}
