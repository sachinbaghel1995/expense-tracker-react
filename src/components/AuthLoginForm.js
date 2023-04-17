import { useRef,useState } from "react"
import classes from './AuthLoginForm.module.css'
const AuthLoginForm=()=>{
    const [isLogin,setIsLogin]=useState(true)
    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
      }
    const emailInputRef=useRef()
    const passwordInputRef=useRef()
    const confirmPasswordInputRef=useRef()
    const submitHandler=(event)=>{
        event.preventDefault()
        const enteredEmail=emailInputRef.current.value
        const enteredPassword=passwordInputRef.current.value
        const enteredConfirmPassword=confirmPasswordInputRef.current.value

        fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDKVUvhqx7PsQwYCeAO2xbayozDMR_BRCU',
            {
              method:'POST',
              body:JSON.stringify({
                email:enteredEmail,
                password:enteredPassword,
                confirmPassword:enteredConfirmPassword,
                returnSecureToken:true
              }),
              headers:{
                'Content-Type':'application/json'
              }
            }
            ).then(res=>
              {
              
              if(res.ok){
        //   return res.json()
        console.log('signUp')
              }
              else{
                return res.json().then((data)=>{
                 let errorMessage="Authentication Failed"
                //  if(data && data.error && data.error.message){
                //   errorMessage=data.error.message
                //  }
                throw new Error(errorMessage)
                 
                })
              }
            })
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