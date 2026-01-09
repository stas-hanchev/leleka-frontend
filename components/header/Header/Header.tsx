import css from './Header.module.css'
import Link from 'next/link'
// import { AuthNavigation } from '../AuthNavigation/AuthNavigation'

const Header = () => (<header className={css.header}>
    
    <Link href="/" aria-label="Home">
       
        <svg width="106" height="30" className="header-logo">
          <use href="/public/icon-sprite.svg#icon-logo"></use>
        </svg>
         Лелека
    </Link>
                <Link href="/">
                <svg width="106" height="30" className="header-logo">
          <use href="/public/icon-sprite.svg#icon-menu"></use>
        </svg></Link>
</header>)

export default Header