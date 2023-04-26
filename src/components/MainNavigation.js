import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { loginActions } from "../store/loginSlice";

import classes from "./MainNavigation.module.css";
import { NavLink, useNavigate } from "react-router-dom";


const MainNavigation = () => {


  const navigate = useNavigate();
  const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.login.isLoggedIn);

    const logoutHandler = () => {
        dispatch(loginActions.logout());
        navigate('/login');
    }

  

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
       
        <div className={classes.button}>
          {isLoggedIn && <button onClick={logoutHandler}>Logout</button>}
        </div>
      
    </div>
  );
};

export default MainNavigation;
