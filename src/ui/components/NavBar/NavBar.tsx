import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";

import { useAuthContext } from "../../../auth/context/AuthProvider";

import "./navbar.css";

export const NavBar = (): JSX.Element => {
  const [sidebar, setSidebar] = useState<boolean>(false);

  const { authState, startLogOutWithButton } = useAuthContext();

  const isActive = ({ isActive }: { isActive: boolean }): string =>
    `nav__item nav__link ${isActive ? "active" : ""}`;

  const handleClickManageSidebar = (): void => {
    setSidebar(!sidebar);
  };

  const onLogout = (): void => {
    startLogOutWithButton();
  };

  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/" aria-label="go to home by title">
          HeroesApp
        </Link>
        <button
          type="button"
          onClick={handleClickManageSidebar}
          aria-label="manage sidebar"
          className="button"
        >
          <FaBars id="bars"></FaBars>
        </button>
      </div>

      <nav
        className={
          sidebar ? "header__nav sidebar--open" : "header__nav"
        }
      >
        <ul className="header__list">
          <li>
            <NavLink
              className={isActive}
              to="/index"
              aria-label="go to home page"
            >
              Home
            </NavLink>

            <NavLink
              className={isActive}
              to="/index?q=Marvel%20Comics"
              aria-label="go to marvel page"
            >
              Marvel
            </NavLink>

            <NavLink
              className={isActive}
              to="/index?q=DC%20Comics"
              aria-label="go to dc page"
            >
              DC
            </NavLink>

            <NavLink
              className={isActive}
              to="/search"
              aria-label="go to search page"
            >
              Search
            </NavLink>
          </li>

          <li>
            <h2>{authState?.displayName}</h2>
            <button type="button" onClick={onLogout} aria-label="logout">
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};
