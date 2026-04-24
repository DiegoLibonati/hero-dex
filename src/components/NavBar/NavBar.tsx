import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";

import type { JSX } from "react";

import { logoutFirebase } from "@/firebase/providers";

import { useAuthContext } from "@/hooks/useAuthContext";

import "@/components/NavBar/NavBar.css";

const NavBar = (): JSX.Element => {
  const [sidebar, setSidebar] = useState(false);

  const { state: authState, dispatch: authDispatch } = useAuthContext();

  const isActive = ({ isActive }: { isActive: boolean }): string =>
    `header-wrapper__link ${isActive ? "header-wrapper__link--active" : ""}`;

  const handleClickManageSidebar = (): void => {
    setSidebar(!sidebar);
  };

  const onLogout = async (): Promise<void> => {
    await logoutFirebase();
    authDispatch({ type: "AUTH_LOGOUT", payload: { errorMessage: "" } });
  };

  return (
    <header className="header-wrapper">
      <div className="header-wrapper__content">
        <Link to="/home" aria-label="Go to home page" className="header-wrapper__title">
          Hero Dex
        </Link>
        <button
          type="button"
          onClick={handleClickManageSidebar}
          aria-label="Toggle navigation menu"
          className="header-wrapper__btn-manage"
        >
          <FaBars id="bars" className="header-wrapper__btn-manage-icon"></FaBars>
        </button>
      </div>

      <nav
        className={
          sidebar ? "header-wrapper__nav header-wrapper__nav--open" : "header-wrapper__nav"
        }
      >
        <ul className="header-wrapper__nav-list">
          <li className="header-wrapper__nav-list-item">
            <NavLink className={isActive} to="/home" aria-label="Go to home page">
              Home
            </NavLink>

            <NavLink
              className={isActive}
              to="/home?q=Marvel%20Comics"
              aria-label="Go to Marvel Comics page"
            >
              Marvel
            </NavLink>

            <NavLink
              className={isActive}
              to="/home?q=DC%20Comics"
              aria-label="Go to DC Comics page"
            >
              DC
            </NavLink>

            <NavLink className={isActive} to="/search" aria-label="Go to search page">
              Search
            </NavLink>
          </li>

          <li className="header-wrapper__nav-list-item">
            <h2 className="header-wrapper__username">{authState.displayName}</h2>
            <button
              type="button"
              onClick={() => {
                void onLogout();
              }}
              aria-label="Log out"
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

export default NavBar;
