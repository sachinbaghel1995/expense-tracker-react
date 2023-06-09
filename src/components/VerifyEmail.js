import React from 'react'
import classes from "./VerifyEmail.module.css"

const VerifyEmail = () => {
    const verifyEmailHandler = async () => {
        try {
          const res = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDKVUvhqx7PsQwYCeAO2xbayozDMR_BRCU',
            {
              method: 'POST',
              body: JSON.stringify({
                requestType: 'VERIFY_EMAIL',
                idToken: JSON.parse(localStorage.getItem('idToken')).idToken,
              }),
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
    
          const data = await res.json();
    
          if (res.ok) {
            console.log(data.email);
          } else {
            throw data.error;
          }
        } catch (err) {
          console.log(err.message);
        }
      };
    
      return (
        <React.Fragment>
          {/* <div className={classes.mainProfile}>
            <span className={classes.welcome}>
              Welcome to Expense Tracker...!!!
            </span>
            <span className={classes.profile}>
              <span>Your profile is incomplete.</span>
              <Link to='/profile'>
                <b> Complete now</b>
              </Link>
            </span>
          </div> */}
          <div className={classes.button}>
            <button onClick={verifyEmailHandler} className={classes.logout}>
              Verify Email
            </button>
          </div>
        </React.Fragment>
      );
    };

export default VerifyEmail