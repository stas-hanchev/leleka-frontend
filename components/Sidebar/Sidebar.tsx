'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import css from './Sidebar.module.css';
import { useAuthStore } from '@/lib/store/authStore';
import UserBar from '../UserBar/UserBar';
import { getJourneyHref } from '@/lib/getJourneyHref/getJourneyHref';

export default function Sidebar() {
  const { isAuthenticated, user } = useAuthStore();
  const pathname = usePathname();

  const getLinkClassName = (href: string) => {
    const isActive =
      pathname === href ||
      (href.startsWith('/journey') && pathname.startsWith('/journey'));
    return `${css.menu_link} ${isActive ? css.active_link : ''}`;
  };

  return (
    <aside className={css.sidebar}>
      <div className={css.sidebar_container}>
        <div className={css.top_modal_container}>
          <div className={css.logo_container}>
            <Link href="/" aria-label="Home" className={css.logo_link}>
              <svg width="29.6" height="29.6">
                <use href="/icon-sprite.svg#icon-logo"></use>
              </svg>
              <svg width="61" height="13">
                <use href="/icon-sprite.svg#icon-leleka"></use>
              </svg>
            </Link>
          </div>

          <ul className={css.navigation_list}>
            <li className={css.navigation_list_item}>
              <Link href="/" className={getLinkClassName('/')}>
                <svg width="24" height="24" className={css.list_item_svg}>
                  <use href="/icon-sprite.svg#icon-today"></use>
                </svg>
                Мій день
              </Link>
            </li>

            <li className={css.navigation_list_item}>
              {isAuthenticated ? (
                <Link
                  href={getJourneyHref(user?.birthDate)}
                  className={getLinkClassName(getJourneyHref(user?.birthDate))}
                >
                  <svg width="24" height="24" className={css.list_item_svg}>
                    <use href="/icon-sprite.svg#icon-conversion-path"></use>
                  </svg>
                  Подорож
                </Link>
              ) : (
                <Link
                  href="/auth/register"
                  className={getLinkClassName('/auth/register')}
                >
                  <svg width="24" height="24" className={css.list_item_svg}>
                    <use href="/icon-sprite.svg#icon-conversion-path"></use>
                  </svg>
                  Подорож
                </Link>
              )}
            </li>

            <li className={css.navigation_list_item}>
              <Link
                href={isAuthenticated ? '/diary' : '/auth/register'}
                className={getLinkClassName(
                  isAuthenticated ? '/diary' : '/auth/register'
                )}
              >
                <svg width="24" height="24" className={css.list_item_svg}>
                  <use href="/icon-sprite.svg#icon-book"></use>
                </svg>
                Щоденник
              </Link>
            </li>

            <li className={css.navigation_list_item}>
              <Link
                href={isAuthenticated ? '/profile' : '/auth/register'}
                className={getLinkClassName(
                  isAuthenticated ? '/profile' : '/auth/register'
                )}
              >
                <svg width="24" height="24" className={css.list_item_svg}>
                  <use href="/icon-sprite.svg#icon-account-circle"></use>
                </svg>
                Профіль
              </Link>
            </li>
          </ul>
        </div>

        <div className={css.bottom_modal_container}>
          {isAuthenticated ? (
            <UserBar user={user!} />
          ) : (
            <div className={css.btns_container}>
              <Link className={css.register_btn} href="/auth/register">
                Зареєструватись
              </Link>
              <Link className={css.login_btn} href="/auth/login">
                Увійти
              </Link>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
