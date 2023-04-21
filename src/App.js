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


function App() {
  const authCtx=useContext(AuthContext)
  return (
    <div>
     
     <Routes>
     <Route exact path='/' element={<AuthLoginForm/>}>
        </Route> 
      <Route exact path="profile" element={<UserProfile/> } >
    </Route>
    <Route exact path="verifyemail" element={<VerifyEmail/> } >
    </Route>
     </Routes>
    </div>
  );
}

export default App;
