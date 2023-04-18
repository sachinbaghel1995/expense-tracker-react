import { useContext, useRef,useState, } from "react"
import classes from './AuthLoginForm.module.css'
import AuthContext from "../store/auth-context"
import React from "react"
import { useNavigate } from "react-router-dom"

const AuthLoginForm=()=>{
    const [isLogin,setIsLogin]=useState(true)
    const authCtx=useContext(AuthContext)
    const navigate=useNavigate()
    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
      }
    const emailInputRef=useRef()
    const passwordInputRef=useRef()
    const confirmPasswordInputRef=useRef()
    const submitHandler=async (event)=>{
        event.preventDefault()
        const enteredEmail=emailInputRef.current.value
        const enteredPassword=passwordInputRef.current.value
        const enteredConfirmPassword=confirmPasswordInputRef.current.value
        let url;
        if(isLogin){
            url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDKVUvhqx7PsQwYCeAO2xbayozDMR_BRCU'
          }
          else{
            url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDKVUvhqx7PsQwYCeAO2xbayozDMR_BRCU'
          }
          try{
        const res= await fetch(url,
            {
              method:'POST',
              body:JSON.stringify({
                email:enteredEmail,
                password:enteredPassword,
                confirmPassword:enteredConfirmPassword,
                returnSecureToken:true
              }),
              headers: {
                'Content-Type': 'application/json',
              },
            });
      
            const data = await res.json();
      
            if (res.ok) {
              navigate('/welcome');
              const convertedData = JSON.stringify(data);
              localStorage.setItem('idToken', convertedData);
            authCtx.login(data)
             } else {
              throw new Error(data.error.message);
            }
          } catch (err) {
            alert(err.message);
          }
        }

   

return(
    <section className={classes.auth}>
        <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
<form onSubmit={submitHandler}>
    <div className={classes.control}>
    <label htmlFor="email">Email</label>
    <input type="email" ref={emailInputRef}/>
    </div>
    <div className={classes.control}>
    <label htmlFor="password">Password</label>
    <input type="password" ref={passwordInputRef}/>
    </div>
    <div className={classes.control}>
    <label htmlFor="confirmpassword">Confirm Password</label>
    <input type="password" ref={confirmPasswordInputRef}/>
    </div>
    <div className={classes.actions}>
    <button type="submit">{isLogin ? 'Login':'Create Account'}</button>
    <button  type='button' onClick={switchAuthModeHandler} className={classes.toggle}>
    {isLogin ? 'Create new account' : 'Login with existing account'}
    </button>
    </div>
</form>
    </section>
)
}
export default AuthLoginForm