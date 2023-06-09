import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import classes from './UserProfileForm.module.css';
// import profileContext from '../store/profile-context';

const UserProfileForm = () => {
    const [profile, setProfile] = useState({ name: '', photoUrl: '' });
  const nameRef = useRef();
    const photoRef = useRef();
    const navigate = useNavigate();

  const profileSubmitHandler = async (event) => {
      event.preventDefault();
      try {
        const res = await fetch(
          'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDKVUvhqx7PsQwYCeAO2xbayozDMR_BRCU',
          {
            method: 'POST',
            body: JSON.stringify({
              idToken: JSON.parse(localStorage.getItem('idToken')).idToken,
              displayName: nameRef.current.value,
              photoUrl: photoRef.current.value,
              returnSecureToken: true,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
  
          const data = await res.json();
          console.log(data);
  
        if (res.ok) {
          console.log(data);
            navigate('/profile');
            setProfile({
                name: data.displayName,
                photoUrl: data.photoUrl,
              });
        } else {
          throw data.error;
        }
      } catch (err) {
        console.log(err.message);
      }
    };


  
 useEffect(() => {
  const updateProfile = async () => {
    try {
      const res = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDKVUvhqx7PsQwYCeAO2xbayozDMR_BRCU',
        {
          method: 'POST',
          body: JSON.stringify({
            idToken: JSON.parse(localStorage.getItem('idToken')).idToken,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await res.json();
      if (res.ok && data.users[0].displayName && data.users[0].photoUrl) {
        setProfile({
          name: data.users[0].displayName,
          photoUrl: data.users[0].photoUrl,
        });
      } else {
        throw data.error;
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  updateProfile();
}, []);

  useEffect(() => {
    nameRef.current.value = profile.name;
    photoRef.current.value = profile.photoUrl;
  });

  return (
    <form className={classes.form} onSubmit={profileSubmitHandler}>
      <div className={classes.formHead}>
        <span>Contact Details</span>
        <button>Cancel</button>
      </div>
      <div className={classes.formBody}>
        <label>Full Name:</label>
        <input type='text' ref={nameRef} />
        <label>Profile Photo URL:</label>
        <input type='text' ref={photoRef} />
        <div className={classes.button}>
          <button type='submit'>Update</button>
        </div>
      </div>
    </form>
  );
};

export default UserProfileForm