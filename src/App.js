import logo from './logo.svg';
import './App.css';
import AuthLoginForm from './components/AuthLoginForm';
import { Navigate, Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Welcome from './components/pages/Welcome';
import AuthContext from './store/auth-context';
import { useContext } from 'react';
import { redirect } from 'react-router-dom';


function App() {
  const authCtx=useContext(AuthContext)
  return (
    <div>
     
     <Routes>
     <Route exact path='/' element={<AuthLoginForm/>}>
        </Route> 
      
     <Route exact path="welcome" element={<Welcome/> } >
    </Route>
     </Routes>
    </div>
  );
}

export default App;
