import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import { RiHome6Line, RiUser3Line } from 'react-icons/ri';
import { IoBookmarkOutline } from 'react-icons/io5';

const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.navLinks}>
          <li>
            <NavLink
              to="/saved"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              <IoBookmarkOutline className={styles.icon} />
              <span>Saved</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              <RiHome6Line className={styles.icon} />
              <span>Home</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              <RiUser3Line className={styles.icon} />
              <span>Profile</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
