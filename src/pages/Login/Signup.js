import TwitterIcon from '@mui/icons-material/Twitter';
import { useState } from 'react';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import GoogleButton from "react-google-button";
import twitterImage from "../../assets/images/twitter.jpg";
import './login.css';

import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
const Signup = () => {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate=useNavigate();
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);

    if (error) {
        return (
            <div>
                <p>Error: {error.message}</p>
            </div>
        );
    }
    if (loading) {
        return <p>Loading...</p>;
    }
    if (user || googleUser) {
        navigate('/login');
        console.log(user?.
            _tokenResponse.email,googleUser?.
            _tokenResponse.email);
    }



    



    const handleSubmit = (e) => {
        e.preventDefault();
  
        createUserWithEmailAndPassword(email, password)
        .then((value)=>console.log("user :",value));

        const user={
            username:username,
            name:name,
            email:email,
        }

     axios.post('https://twitter-backend-5c72.onrender.com/register',user)//in axios no need to stringify
    }

    const handleGoogleSignIn=()=>{
        signInWithGoogle();
    }
    return (
        <div className='login-container'>
            <div className='image-container'>
                <img src={twitterImage} className='image' />
            </div>
            <div className='form-conatiner'>
                <TwitterIcon className='twitterIcon'/>&ensp;
                <h1>Happening now </h1>&ensp;
                <h2>Join Today! </h2>&ensp;
                <form onSubmit={handleSubmit}>
                    <input type='text'
                        className='display-name input'
                        placeholder='@username'
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <br/>
                    <br/>
                    <input
                        type='text'
                        className='display-name input'
                        placeholder='Enter Full Name'
                        onChange={(e) => setName(e.target.value)}
                    />
                    <br/>
                    <br/>
                    <input type="email"
                        className='email input'
                        placeholder='Email address'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <br/>
                    <br/>
                    <input type="password"
                        className='password input'
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className='btn-login'>
                        <button type='submit' className='btn'>Signup</button>
                    </div>
                </form>
                <hr/>
                <div className='google-button'>
                    <GoogleButton 
                    className='g-btn'
                    type='light'
                    onClick={handleGoogleSignIn}
                    />
                </div>
                <div>
                    Already have an account
                    <Link to='/login' style={{
                        textDecoration:"none",
                        color:'skyblue',
                        fontWeight:'600',
                        marginLeft:'5px'
                        }}>Login</Link>
                </div>
            </div>

        </div>
    )
};
export default Signup;


