import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";

import { useAuthContext } from "../../../auth/context/AuthProvider";

import "./NavBar.css";

export const NavBar = (): JSX.Element => {
  const [sidebar, setSidebar] = useState<boolean>(false);

  const { authState, startLogOutWithButton } = useAuthContext();

  const isActive = ({ isActive }: { isActive: boolean }): string =>
    `header-wrapper__link ${
      isActive ? "header-wrapper__link--active" : ""
    }`;

  const handleClickManageSidebar = (): void => {
    setSidebar(!sidebar);
  };

  const onLogout = (): void => {
    startLogOutWithButton();
  };

  return (
    <header className="header-wrapper">
      <div className="header-wrapper__content">
        <Link
          to="/"
          aria-label="go to home by title"
          className="header-wrapper__title"
        >
          HeroesApp
        </Link>
        <button
          type="button"
          onClick={handleClickManageSidebar}
          aria-label="manage sidebar"
          className="header-wrapper__btn-manage"
        >
          <FaBars
            id="bars"
            className="header-wrapper__btn-manage-icon"
          ></FaBars>
        </button>
      </div>

      <nav
        className={
          sidebar
            ? "header-wrapper__nav header-wrapper__nav--open"
            : "header-wrapper__nav"
        }
      >
        <ul className="header-wrapper__nav-list">
          <li className="header-wrapper__nav-list-item">
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

          <li className="header-wrapper__nav-list-item">
            <h2 className="header-wrapper__username">
              {authState?.displayName}
            </h2>
            <button
              type="button"
              onClick={onLogout}
              aria-label="logout"
              className="header-wrapper__btn-logout"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};
