import AddLinkIcon from '@mui/icons-material/AddLink';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
import LockResetIcon from '@mui/icons-material/LockReset';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useLoggedInUser from '../../../hooks/useLoggedInUser';
import Post from '../.././Feed/Post/Post';
import EditProfile from '../EditProfile/EditProfile';
import './mainProfile.css';

function MainProfile({ user }) {
  const [loggedInUser] = useLoggedInUser();
  const [isLoading, setIsLoading] = useState('')
  const [imageURL, setImageURL] = useState("");
  const email = user?.email;

  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const res = axios.get(`https://twitter-backend-5c72.onrender.com/userPost?email=${user?.email}`);
    res.then(result => {
      setPosts(result.data.reverse())
    })

  }, [posts, user?.email])

  const username = user?.email?.split('@')[0];

  const handleUploadCoverImage = (e) => {
    setIsLoading(true);
    const image = e.target.files[0];
    const formdata = new FormData();
    formdata.set('image', image);

    axios.post("https://api.imgbb.com/1/upload?key=a315baa8373a30196bd8c1e0a5dd6522", formdata)
      .then(res => {
        const url = res.data.data.display_url
        console.log("axios patch in MainProfile :", url);
        const userCoverImage = {
          email: email,
          converImage: url
        }
        setIsLoading(false);
        if (url) {
          axios.patch(`https://twitter-backend-5c72.onrender.com/userUpdates/:${email}`, userCoverImage);
        }
      })
  }

  const handleUploadProfileImage = (e) => {
    setIsLoading(true);
    const image = e.target.files[0];
    const formdata = new FormData();
    formdata.set('image', image);

    axios.post("https://api.imgbb.com/1/upload?key=a315baa8373a30196bd8c1e0a5dd6522", formdata)
      .then(res => {
        const url = res.data.data.display_url;

        const userProfileImage = {
          email: email,
          profileImage: url
        }

        setIsLoading(false);
        if (url) {
          axios.patch(`https://twitter-backend-5c72.onrender.com/userUpdates/:${email}`, userProfileImage);
        }
      })
  }
  return (
    <div>
      <div className='profile-header'>
        <ArrowBackIcon className='arrow-icon' onClick={() => navigate('/')} />
        <h4 className='heading-4'>@{username}</h4>
      </div>

      <div className='mainProfile'>
        <div className='profile-bio'>
          {
            <div>
              <div className='coverImageContainer'>
                <img src={loggedInUser[0]?.converImage ? loggedInUser[0]?.converImage : 'https://www.proactivechannel.com/Files/BrandImages/Default.jpg'} alt="" className='coverImage' />

                <div className='hoverCoverImage'>
                  <label htmlFor='image' className='imageIcon'>
                    {
                      isLoading ?
                        <LockResetIcon className='photoIcon photoIconDisabled ' />
                        :
                        <CenterFocusWeakIcon className='photoIcon' />
                    }
                  </label>
                  <div className='imageIcon_tweetButton'>
                    <input type='file' id='image' className='imageInput' onChange={handleUploadCoverImage} />
                  </div>
                </div>
              </div>
              <div className='avatar-img'>
                <div className='avatarContainer'>
                  <img src={loggedInUser[0]?.profileImage ? loggedInUser[0]?.profileImage : 'https://www.proactivechannel.com/Files/BrandImages/Default.jpg'} alt="" className='avatar' />

                  <div className='hoverAvatarImage'>
                    <div className='imageIcon_tweetButton'>
                      <label htmlFor='profileImage' className='imageIcon'>
                        {
                          isLoading ?
                            <LockResetIcon className='photoIcon photoIconDisabled ' />
                            :
                            <CenterFocusWeakIcon className='photoIcon' />
                        }
                      </label>
                      <div className='imageIcon_tweetButton'>
                        <input type='file' id='profileImage' className='imageInput' onChange={handleUploadProfileImage} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='userInfo'>
                  <div>
                    <h3 className='heading-3'>
                      {loggedInUser[0]?.name ? loggedInUser[0]?.name : user && user?.displayName}
                    </h3>
                    <p className='usernameSection'>@{username}</p>
                  </div>
                  <EditProfile user={user} loggedInUser={loggedInUser} />
                </div>
                <div className='infoContainer'>
                  {loggedInUser[0]?.bio ? loggedInUser[0]?.bio : ''}
                  <div className='locationAndLink'>
                    {loggedInUser[0]?.location ? <p className='subInfo'><MyLocationIcon />{loggedInUser[0]?.location}</p> : ''}
                    {loggedInUser[0]?.website ? <p className='subInfo link'><AddLinkIcon />{loggedInUser[0]?.website}</p> : ''}
                  </div>
                </div>
                <h4 className='tweetsText'>Tweets</h4>
                <hr />
              </div>
              {
                posts.map(p => <Post id={p._id} p={p} />)
              }
            </div>

          }
        </div>
      </div>
    </div>
  )
}
export default MainProfile;