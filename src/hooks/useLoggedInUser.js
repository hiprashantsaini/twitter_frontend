import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';

 const useLoggedInUser=()=> {
  const [user]=useAuthState(auth);
  const email=user?.email;
  // console.log("useLoggedInUser_Email:",email)
  const [loggedInUser,setLoggedInUser]=useState({});
  useEffect(()=>{
    fetch(`https://twitter-backend-5c72.onrender.com/loggedInUser?email=${email}`)
    .then(res=>res.json())
    .then((data)=>{
      // console.log("useLoggedInUser: ",data);
        setLoggedInUser(data.reverse());
    })
  },[email,loggedInUser]);
  return [loggedInUser,setLoggedInUser];
}

export default useLoggedInUser;

