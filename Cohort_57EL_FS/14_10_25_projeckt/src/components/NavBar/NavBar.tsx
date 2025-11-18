import type { JSX } from 'react';
import { NavLink } from 'react-router-dom';
import style from './NavBar.module.css';

export default function NavBar(): JSX.Element {
  return (
    <nav className={style.navigation}>
      <ul className={style.list}>
        <li className={style.listElement}>
          <NavLink
            to="alcohol"
            className={({ isActive }) =>
              isActive ? `${style.link} ${style.active}` : style.link
            }
          >
            Alkoholische Getränke
          </NavLink>
        </li>
        <li className={style.listElement}>
          <NavLink
            to="carshop"
            className={({ isActive }) =>
              isActive ? `${style.link} ${style.active}` : style.link
            }
          >
            Car Shop
          </NavLink>
        </li>
        <li className={style.listElement}>
          <NavLink
            to="counter"
            className={({ isActive }) =>
              isActive ? `${style.link} ${style.active}` : style.link
            }
          >
            Counter
          </NavLink>
        </li>
        <li className={style.listElement}>
          <NavLink
            to="home"
            className={({ isActive }) =>
              isActive ? `${style.link} ${style.active}` : style.link
            }
          >
            Home
          </NavLink>
        </li>
        <li className={style.listElement}>
          <NavLink
            to="userspage"
            className={({ isActive }) =>
              isActive ? `${style.link} ${style.active}` : style.link
            }
          >
            Users Page
          </NavLink>
        </li>
        <li className={style.listElement}>
          <NavLink
            to="Sandwich"
            className={({ isActive }) =>
              isActive ? `${style.link} ${style.active}` : style.link
            }
          >
            Sandwich
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

