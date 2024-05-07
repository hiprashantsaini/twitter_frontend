import axios from "axios";
import React, { useEffect, useState } from "react";
import Post from "./Post/Post";
import TweetBox from "./TweetBox/TweetBox";
// import Post from "./Post/Post";
// import TweetBox from "./TweetBox/TweetBox";
import "./feed.css";

function Feed() {
    const [posts, setPosts] = useState([]);
    useEffect(()=>{
       const res=axios.get('https://twitter-backend-5c72.onrender.com/post');
        res.then(result=>{
        // console.log("Feed.js data:",result.data);
        // setPosts(result.data)
        setPosts(result.data.reverse())
      })
     
    },[posts])
    // console.log("posts in feed.js:",posts);

    // useEffect(() => {
    //     fetch('https://pacific-peak-30751.herokuapp.com/post')
    //         .then(res => res.json())
    //         .then(data => {
    //             setPosts(data);
    //         })
    // }, [posts])

    return (
        <div className="feed">
             <div className="feed__header">
            <h2 style={{textAlign:'left'}}>Home</h2>
            <div className="feed__body">
            <TweetBox/>
            {
                posts.map(p=><Post key={p._id} p={p}/>)
            }
            </div>
        </div>
        </div>

    )

}

export default Feed
