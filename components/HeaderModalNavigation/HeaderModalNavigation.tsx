import { createPortal } from "react-dom";
import css from "./HeaderModalNavigation.module.css";
import { useEffect } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import UserBar from "../UserBar/UserBar";
import { ModalLink } from "../ModalLink/ModalLink";

interface HeaderModalNavigationProps {
  onClose: () => void;
}

export default function HeaderModalNavigation({
  onClose,
}: HeaderModalNavigationProps) {
  const { isAuthenticated, user } = useAuthStore();

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <div
      className={css.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal}>
        <div className={css.top_modal_container}>
          <button
            className={css.closeButton}
            onClick={onClose}
            aria-label="Close modal"
          >
            <svg width="18" height="18" className={css.close_svg}>
              <use href="/icon-sprite.svg#icon-close"></use>
            </svg>
          </button>

          <div className={css.logo_container}>
            <ModalLink
              href="/"
              aria-label="Home"
              className={css.logo_link}
              onNavigate={onClose}
            >
              <svg width="29.6" height="29.6" className="header-logo">
                <use href="/icon-sprite.svg#icon-logo"></use>
              </svg>
              <svg width="61" height="13" className="header-logo">
                <use href="/icon-sprite.svg#icon-leleka"></use>
              </svg>
            </ModalLink>
          </div>

          <ul className={css.navigation_list}>
            <li className={css.navigation_list_item}>
              <ModalLink
                href="/"
                aria-label="My day"
                className={css.menu_link}
                onNavigate={onClose}
              >
                <svg width="24" height="24" className={css.list_item_svg}>
                  <use href="/icon-sprite.svg#icon-today"></use>
                </svg>
                Мій день
              </ModalLink>
            </li>
            <li className={css.navigation_list_item}>
              {/* Todo Bellow need complex solution */}
              {isAuthenticated ? (
                <ModalLink
                  href="/journey/1"
                  aria-label="Jorney"
                  className={css.menu_link}
                  onNavigate={onClose}
                >
                  <svg width="24" height="24" className={css.list_item_svg}>
                    <use href="/icon-sprite.svg#icon-conversion-path"></use>
                  </svg>
                  Подорож
                </ModalLink>
              ) : (
                <ModalLink
                  href="/auth/register"
                  aria-label="Register"
                  className={css.menu_link}
                  onNavigate={onClose}
                >
                  <svg width="24" height="24" className={css.list_item_svg}>
                    <use href="/icon-sprite.svg#icon-conversion-path"></use>
                  </svg>
                  Подорож
                </ModalLink>
              )}
            </li>
            <li className={css.navigation_list_item}>
              {isAuthenticated ? (
                <ModalLink
                  href="/diary"
                  aria-label="Diary"
                  className={css.menu_link}
                  onNavigate={onClose}
                >
                  <svg width="24" height="24" className={css.list_item_svg}>
                    <use href="/icon-sprite.svg#icon-book"></use>
                  </svg>
                  Щоденник
                </ModalLink>
              ) : (
                <ModalLink
                  href="/auth/register"
                  aria-label="Register"
                  className={css.menu_link}
                  onNavigate={onClose}
                >
                  <svg width="24" height="24" className={css.list_item_svg}>
                    <use href="/icon-sprite.svg#icon-book"></use>
                  </svg>
                  Щоденник
                </ModalLink>
              )}
            </li>
            <li className={css.navigation_list_item}>
              {isAuthenticated ? (
                <ModalLink
                  href="/profile"
                  aria-label="Home"
                  className={css.menu_link}
                  onNavigate={onClose}
                >
                  <svg width="24" height="24" className={css.list_item_svg}>
                    <use href="/icon-sprite.svg#icon-account-circle"></use>
                  </svg>
                  Профіль
                </ModalLink>
              ) : (
                <ModalLink
                  href="/auth/register"
                  aria-label="Register"
                  className={css.menu_link}
                  onNavigate={onClose}
                >
                  <svg width="24" height="24" className={css.list_item_svg}>
                    <use href="/icon-sprite.svg#icon-account-circle"></use>
                  </svg>
                  Профіль
                </ModalLink>
              )}
            </li>
          </ul>
        </div>
        <div className={css.bottom_modal_container}>
          {isAuthenticated ? (
            <UserBar user={user!}/>
          ) : (
            <div className={css.btns_container}>
              <ModalLink
                className={css.register_btn}
                href="/auth/register"
                aria-label="Register"
                onNavigate={onClose}
              >
                Зареєструватись
              </ModalLink>
              <ModalLink
                className={css.login_btn}
                href="/auth/login"
                aria-label="Login"
                onNavigate={onClose}
              >
                Увійти
              </ModalLink>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
