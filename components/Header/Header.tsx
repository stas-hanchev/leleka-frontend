import css from './Header.module.css'
import Link from 'next/link'
// import { AuthNavigation } from '../AuthNavigation/AuthNavigation'

const Header = () => (<header className={css.header}>
    <div className={css.header_container}>
      <div className={css.logo_container}>
      <Link href="/" aria-label="Home" className={css.logo_link}>
        <svg width="24" height="24" className="header-logo">
          <use href="/icon-sprite.svg#icon-logo"></use>
        </svg>
        <svg width="49" height="11" className="header-logo">
          <use href="/icon-sprite.svg#icon-leleka"></use>
        </svg>
      </Link>
      </div>
      <div className={css.menu_container}>
      <button className={css.menu_button} data-menu-open>
        <svg width="22" height="16" className="header-logo">
          <use href="/icon-sprite.svg#icon-menu"></use>
        </svg>
      </button>
  
      </div>


    
    </div>
    
</header>)

export default Header