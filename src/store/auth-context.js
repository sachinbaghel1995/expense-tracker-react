import React, { useState } from 'react'


 const AuthContext=React.createContext({
    idToken:'',
    isLoggedIn:false,
    login:(idToken)=>{},
    logout:()=>{}
    

})

 export const AuthContextProvider=(props)=>{
    const initialToken=localStorage.getItem('idToken')
    const [idToken,setToken]=useState(null)

    const userIsLoggedIn=!!idToken

    const loginHandler=(idToken)=>{
        setToken(idToken)
        localStorage.setItem('idToken',idToken)
    }
    const logoutHandler=()=>{
        setToken(initialToken)
        setTimeout(()=>{
            localStorage.removeItem('idToken')
            
        },5000)
        
    }
    
    const contextValue={
        idToken:idToken,
        isLoggedIn:userIsLoggedIn,
        login:loginHandler,
        logout:logoutHandler,
     }

    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}
export default AuthContext