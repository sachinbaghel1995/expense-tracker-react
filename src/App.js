import logo from './logo.svg';
import './App.css';
import AuthLoginForm from './components/AuthLoginForm';
import { Navigate, Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import UserProfile from './components/pages/UserProfile';
import AuthContext from './store/auth-context';
import { useContext } from 'react';
import { redirect } from 'react-router-dom';
import VerifyEmail from './components/VerifyEmail';
import MainNavigation from './components/MainNavigation';
import ForgotPassword from './components/ForgotPassword';
import Expenses from './components/Expenses';

function App() {
  const authCtx=useContext(AuthContext)
  const isLoggedIn=authCtx.isLoggedIn
  return (
    <div>
     <MainNavigation/>
     <Routes>
     <Route exact path='/login' element={<AuthLoginForm/>}>
        </Route> 
      <Route exact path="profile" element={<UserProfile/> } >
    </Route>
    <Route exact path="verifyemail" element={<VerifyEmail/> } >
    </Route>
    <Route path='/resetpassword' element={<ForgotPassword />} />
    {isLoggedIn && <Route path='/expenses' element={<Expenses />} />}
     </Routes>
    </div>
  );
}

export default App;
