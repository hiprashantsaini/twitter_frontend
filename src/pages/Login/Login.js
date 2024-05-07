// import TwitterIcon from '@mui/icons-material/Twitter';
// import { useState } from 'react';
// import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
// import twitterImage from "../../assets/images/twitter.jpg";
// import auth from '../../firebase.init';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [
//     signInWithEmailAndPassword,
//     user,
//     loading,
//     error,
//   ] = useSignInWithEmailAndPassword(auth);

//   if (error) {
//     return (
//       <div>
//         <p>Error: {error.message}</p>
//       </div>
//     );
//   }
//   if (loading) {
//     return <p>Loading...</p>;
//   }
//   if (user) {
//     console.log("Returned user data:",user._tokenResponse.email)
//     return (
//       <div>
//         <p>Signed In User: {user._tokenResponse.email}</p>
//       </div>
//     );
//   }
//   const handleSubmit=()=>{
//     console.log(email,password);
//     signInWithEmailAndPassword(email,password);
//   }
//   console.log(user)
//     return (
//     <div className='login-container'>
//         <div className='image-container'>
//          <img src={twitterImage}/>
//         </div>
//         <div className='form-conatiner'>
//         <TwitterIcon/>
//         <h2>Happening now </h2>
//         <form onSubmit={handleSubmit}>
//             <input type="email"
//               className='email'
//               placeholder='Email address'
//               onChange={(e)=>setEmail(e.target.value)}
//             />
//             <input type="password" 
//               className='password'
//               placeholder='Password'
//               onChange={(e)=>setPassword(e.target.value)}
//             />
//             <div className='btn-login'>
//                 <button type='submit' className='btn'>Login</button>
//             </div>
//         </form>
//         </div>
        
//     </div>
//   )
// };

// export default Login;

import TwitterIcon from '@mui/icons-material/Twitter';
import { useState } from 'react';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import GoogleButton from "react-google-button";
import twitterImage from "../../assets/images/twitter.jpg";
import './login.css';

import { Link, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate=useNavigate();

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] =  useSignInWithEmailAndPassword(auth);

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
        navigate('/');
        console.log(user?.
            _tokenResponse.email,googleUser?.
            _tokenResponse.email);
            // <Navigate to='/'/>
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email, password);
        console.log("clicked")
        signInWithEmailAndPassword(email, password)
        .then((value)=>console.log("user in login.js:",value));
    }

    const handleGoogleSignIn=()=>{
        signInWithGoogle();
    }
    return (
        <div className='login-container'>
            <div className='image-container'>
                <img src={twitterImage} className='image' />
            </div>
            <div className='form-container'>
                <TwitterIcon className='twitterIcon'/>&ensp;
                <h1>Happening now </h1>&ensp;
                <h2>Join Today! </h2>&ensp;
                <form onSubmit={handleSubmit}>
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
                        <button type='submit' className='btn'>Login</button>
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
                    Don't have account?
                    <Link to='/signup' style={{
                        textDecoration:"none",
                        color:'skyblue',
                        fontWeight:'600',
                        marginLeft:'5px'
                        }}>Sign up</Link>
                </div>
            </div>

        </div>
    )
};
export default Login;


