import React from "react";

import classes from "./MainNavigation.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../store/auth-context";
import { useContext } from "react";

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const navigate = useNavigate();

  const logoutHandler = () => {
    authCtx.logout();
    navigate("/login");
  };

  return (
    <div className={classes.mainNav}>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/home"
              className={({ isActive }) => (isActive ? classes.active : "")}
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) => (isActive ? classes.active : "")}
            >
              User Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/expenses"
              className={({ isActive }) => (isActive ? classes.active : "")}
            >
              Expenses
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? classes.active : "")}
            >
              Login
            </NavLink>
          </li>
        </ul>
      </nav>
      {isLoggedIn && <div className={classes.button}>
        <button onClick={logoutHandler}>Logout</button>
      </div>}
    </div>
  );
};

export default MainNavigation;
