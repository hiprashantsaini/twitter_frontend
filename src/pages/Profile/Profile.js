import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import '../page.css';
import MainProfile from './MainPage/MainProfile';
import './profile.css';

const  Profile=()=> {
  const [user]=useAuthState(auth);
  return (
    <div className='profilePage' >
      <MainProfile user={user}/>
    </div>
  )
}
export default Profile;