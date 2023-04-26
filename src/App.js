import logo from "./logo.svg";
import "./App.css";
import AuthLoginForm from "./components/Login";
import { Navigate, Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import UserProfile from "./components/pages/UserProfile";
import AuthContext from "./store/loginSlice";
import { useContext } from "react";
import { redirect } from "react-router-dom";
import VerifyEmail from "./components/VerifyEmail";
import MainNavigation from "./components/MainNavigation";
import ForgotPassword from "./components/ForgotPassword";
import Expenses from "./components/Expenses";
import { useSelector } from "react-redux";
import Login from "./components/Login";

function App() {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn)
  
  return (
    <div>
      <MainNavigation />
      <Routes>
        <Route exact path="/login" element={<Login />}></Route>
        <Route
        path='/profile'
        element={
          isLoggedIn ? <UserProfile /> : <Navigate to='/login' replace />
        }
      />
        <Route exact path="verifyemail" element={<VerifyEmail />}></Route>
        <Route path="/resetpassword" element={<ForgotPassword />} />
        <Route
        path='/expenses'
        element={
          isLoggedIn ? <Expenses /> : <Navigate to='/login' replace />
        }
      />
      </Routes>
    </div>
  );
}

export default App;
