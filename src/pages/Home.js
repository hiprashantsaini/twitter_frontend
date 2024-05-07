import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Outlet } from "react-router-dom";
import auth from '../firebase.init';
import Sidebar from './Sidebar/Sidebar';
import Widgets from './Widgets/Widgets';
import './home.css';

const Home=()=>{
    const user=useAuthState(auth);


    const handleLogout=()=>{
         signOut(auth);
    }
        return(
        <div className='home'>
            <Sidebar handleLogout={handleLogout} user={user}/>
            <Outlet />
            <Widgets/>
        </div>
    )
}

export default Home;