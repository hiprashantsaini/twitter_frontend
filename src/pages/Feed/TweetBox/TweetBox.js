import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { Avatar, Button } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import useLoggedInUser from '../../../hooks/useLoggedInUser';
import './TweetBox.css';

 const TweetBox=()=> {
    const [post,setPost]=useState("");
    const [imageURL,setImageURL]=useState("");
    const [isLoading,setIsLoading]=useState('')
    const [loggedInUser]=useLoggedInUser();
    const [username,setUserName]=useState('')
    const [name,setName]=useState('');
    const [user]=useAuthState(auth);
    const email=user?.email;
    // console.log("tweetBox js loggedInUser:",loggedInUser);

    const useProfilePic=loggedInUser[0]?.profileImage?loggedInUser[0].profileImage:'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'

    const handleUploadImage=(e)=>{
        setIsLoading(true);
        const image=e.target.files[0];
        const formdata=new FormData();
        formdata.set('image',image);

        axios.post("https://api.imgbb.com/1/upload?key=a315baa8373a30196bd8c1e0a5dd6522",formdata)
        .then(res=>{
          setImageURL(res.data.data.display_url)
          setIsLoading(false);
          // console.log(res.data.data.display_url);
        })
        .catch((error)=>{
          console.log(error);
          setIsLoading(false);
        })
    }

    const handleTweet=(e)=>{
      e.preventDefault();
      // console.log("tweetbox:",user.providerData[0].providerId)
      if(user.providerData[0].providerId==='password'){
        fetch(`https://twitter-backend-5c72.onrender.com/loggedInUser?email=${email}`)
        .then(res=>res.json())
        .then((data)=>{
          // console.log("TweetBox.js: ",data,data[0]?.email?.split('@')[0]);
          setName(data[0]?.name);
          setUserName(data[0]?.email?.split('@')[0]);
        })
      }else{
        // console.log("else TweetBox.js: ",user?.displayName,user.email);
        setName(user?.displayName);
        setUserName(user.email?.split('@')[0]);
      }
      if(name){
        const userPost={
          profilePhoto:useProfilePic,
          post:post,
          photo:imageURL,
          username:username,
          name:name,
          email:email
        }
      //  console.log("userpost in tweetBox :",userPost)
      setPost('');
      setImageURL('');
        fetch('https://twitter-backend-5c72.onrender.com/post',{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(userPost),
          cache:'default'
        }).then((response)=>response.json())
        .then((data)=>{
          console.log("data:",data);
        })
      } 
    }
  return (
    <div className='tweetBox'>
     <form onSubmit={handleTweet}>
        <div className="tweetBox__input">
            <Avatar src={loggedInUser[0]?.profileImage?loggedInUser[0].profileImage:'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'}/>
            <input type='text'
             placeholder="What's Hapening?!"
             onChange={(e)=>setPost(e.target.value)}
             value={post}
             required
            />
        </div>
        <div>
        <div className='imageIcon__tweetButton'>
            <label htmlFor='image' className='imageIcon'>
            {
              isLoading?<p>Uploading Image</p>:<p>{imageURL?'image uploaded':<AddPhotoAlternateIcon/>}</p>
            }
                
            </label>
          <input type='file' id='image' className='imageInput' onChange={handleUploadImage}/>
          <Button className='tweetBox__tweetButton' type='submit'>
            Tweet
          </Button>
        </div>
        </div>
     </form>
    </div>
  )
}
export default TweetBox;