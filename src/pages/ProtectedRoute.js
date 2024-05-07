import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';
import auth from '../firebase.init';
import PageLoading from './PageLoading';

const ProtectedRoute=({children})=>{
    const [user, loading, error] = useAuthState(auth);
    console.log("user:",user);
    if(loading){
        // console.log("loading...");
        return <PageLoading/>
    }
    if(!user){
        return <Navigate to='/login'/>
    }else{
        return children
    }
}

export default ProtectedRoute;

