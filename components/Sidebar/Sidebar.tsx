import Link from "next/link";
import css from "./Sidebar.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import UserBar from "../UserBar/UserBar";

export default function Sidebar() {
  const { isAuthenticated, user } = useAuthStore();

  return (
    <aside className={css.sidebar}>
      <div className={css.sidebar_container}>
        <div className={css.top_modal_container}>
          <div className={css.logo_container}>
            <Link href="/" aria-label="Home" className={css.logo_link}>
              <svg width="29.6" height="29.6" className="header-logo">
                <use href="/icon-sprite.svg#icon-logo"></use>
              </svg>
              <svg width="61" height="13" className="header-logo">
                <use href="/icon-sprite.svg#icon-leleka"></use>
              </svg>
            </Link>
          </div>

          <ul className={css.navigation_list}>
            <li className={css.navigation_list_item}>
              <Link href="/" aria-label="My day" className={css.menu_link}>
                <svg width="24" height="24" className={css.list_item_svg}>
                  <use href="/icon-sprite.svg#icon-today"></use>
                </svg>
                Мій день
              </Link>
            </li>
            <li className={css.navigation_list_item}>
              {/* Todo Bellow need complex solution */}
              {isAuthenticated ? (
                <Link
                  href="/journey/1"
                  aria-label="Jorney"
                  className={css.menu_link}
                >
                  <svg width="24" height="24" className={css.list_item_svg}>
                    <use href="/icon-sprite.svg#icon-conversion-path"></use>
                  </svg>
                  Подорож
                </Link>
              ) : (
                <Link
                  href="/auth/register"
                  aria-label="Register"
                  className={css.menu_link}
                >
                  <svg width="24" height="24" className={css.list_item_svg}>
                    <use href="/icon-sprite.svg#icon-conversion-path"></use>
                  </svg>
                  Подорож
                </Link>
              )}
            </li>
            <li className={css.navigation_list_item}>
              {isAuthenticated ? (
                <Link
                  href="/diary"
                  aria-label="Diary"
                  className={css.menu_link}
                >
                  <svg width="24" height="24" className={css.list_item_svg}>
                    <use href="/icon-sprite.svg#icon-book"></use>
                  </svg>
                  Щоденник
                </Link>
              ) : (
                <Link
                  href="/auth/register"
                  aria-label="Register"
                  className={css.menu_link}
                >
                  <svg width="24" height="24" className={css.list_item_svg}>
                    <use href="/icon-sprite.svg#icon-book"></use>
                  </svg>
                  Щоденник
                </Link>
              )}
            </li>
            <li className={css.navigation_list_item}>
              {isAuthenticated ? (
                <Link
                  href="/profile"
                  aria-label="Home"
                  className={css.menu_link}
                >
                  <svg width="24" height="24" className={css.list_item_svg}>
                    <use href="/icon-sprite.svg#icon-account-circle"></use>
                  </svg>
                  Профіль
                </Link>
              ) : (
                <Link
                  href="/auth/register"
                  aria-label="Register"
                  className={css.menu_link}
                >
                  <svg width="24" height="24" className={css.list_item_svg}>
                    <use href="/icon-sprite.svg#icon-account-circle"></use>
                  </svg>
                  Профіль
                </Link>
              )}
            </li>
          </ul>
        </div>
        <div className={css.bottom_modal_container}>
          {isAuthenticated ? (
            <UserBar user={user!} />
          ) : (
            <div className={css.btns_container}>
              <Link
                className={css.register_btn}
                href="/auth/register"
                aria-label="Register"
              >
                Зареєструватись
              </Link>
              <Link
                className={css.login_btn}
                href="/auth/login"
                aria-label="Login"
              >
                Увійти
              </Link>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
