/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// import React from 'react'
import { Sidebar } from '../Sidebar'
import profile from "../../assets/profile.jpeg"
import React, { useState} from 'react'
import axios from 'axios';
import { useNavigate,useLocation } from 'react-router-dom';
// import {CameraOutlined } from '@ant-design/icons';
import Post from "./Post.jsx";
import config from "tailwindcss/defaultConfig.js";
import logo from "../../assets/insidelogo.png";
export function CommentInput({sectionid,commentfetcher}) {
    const UserData = JSON.parse(localStorage.getItem('userdata'));
    // console.log("USERDATA",UserData);
    let config={
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${UserData.token}`,
        }
    }

    const [comment, setComment] = useState("");


    // onChange={(e) => setPostdata({...postdata,title:e.target.value})}
    const onSend = (e) => {
        e.preventDefault();
    //     http://localhost:8080/comment/put
    //     {
    //         "sectionid" : "653054ebd32701a34f5dd7c4",
    //         "comment" : "i'm so cool",
    //         "postedby" : "6520b371ddd4ad5e67e421b2"
    //     }
        console.log("sending comment");
        console.log("sectionid",sectionid);
        console.log("comment",comment);
        console.log("postedby",UserData._id);
        let data={
            sectionid:sectionid,
            comment:comment,
            postedby:UserData._id,

        }
        axios.post(`/api/comment/put`, data, config).then((response) => {
            console.log(response.data);
            setComment("");
            commentfetcher();
        }).catch((error) => {
            console.log(error);

        }   );
    }
    return (
        <div className={"flex flex-col bg-grayish m-2 p-2 rounded-xl"}>
            <form className={"flex flex-row"}>
                <input className={"flex flex-col  m-2 p-2 rounded-xl"} value={comment} type="text" placeholder="Comment" onChange={(e)=>    setComment(e.target.value)}/>
                <button className={"flex flex-col bg-green-500 m-2 p-2 rounded-xl"} onClick={(e)=>onSend(e)} type="submit" >Send</button>
            </form>
        </div>
    )
}

export function PostOpenPage() {
    const navigate = useNavigate();
    const location = useLocation();
    // console.log("here my son",location.state);`
    let id=location.state.id;
    let username=location.state.username;
    let userphoto=location.state.userphoto;
    let title=location.state.title;
    let text=location.state.text;
    let photo=location.state.photo;
    let likes=location.state.likes;
    let comments=location.state.comments;
    
    const userdata = JSON.parse(localStorage.getItem('userdata'));

    const config = {
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userdata.token}`
        }
    };
    // navigate to back page
    function back(){
        navigate("/feed");
    }

    function backprofile(){
        navigate("/userpost");
    }
    function deleteposthere(){
        
        console.log("deleting post");
        axios.delete(`/api/feed/deletePost/${id}`,config).then((response) => {
            console.log(response.data);
            navigate("/userpost");
        }).catch((error) => {
            console.log(error);
        });
    }
    return (
        <div className={"bg-blackish  m-4 p-4 "}>
        <div className='flex justify-between'>
        {userdata.name === username && (
            <div className='flex-col p-10'>
                <button onClick={deleteposthere} className="bg-grayish border-2 rounded-full font-bold hover:bg-yellowish p-2 m-2 text-white h-16 self-center" >Delete</button>
            </div>
        )}
            <div className='flex-col p-10'>
                <button onClick={back} className="bg-grayish border-2 rounded-full font-bold hover:bg-yellowish p-2 m-2 text-white h-16 self-center" >Back to Feed</button>
            </div>
        {userdata.name === username && (
            <div className='flex-col p-10'>
                <button onClick={backprofile} className="bg-grayish border-2 rounded-full font-bold hover:bg-yellowish p-2 m-2 text-white h-16 self-center" >Back to Profile</button>
            </div>)}
                <img src={logo} alt="logo" className="w-32 h-32" />
            <div></div>
        </div>
        <div className=' border-2 flex-col rounded-3xl border-blackish'>
    <div className={"flex flex-row justify-left mt-4 h-8 ml-4 "}>
    {  !userphoto && <img src={"https://via.placeholder.com/350x150"} alt={"profile"} className={"h-10 w-10 mx-4 rounded-full"}/>}
        {userphoto &&<img src={userphoto.url} alt={"profile"} className={"h-16 w-16 mx-4 rounded-full "}/>}
        <text className={" text-2xl  text-greenish font-semibold "}>@{username}</text>
    </div>
    <text className={" text-xl  text-white font-semibold text-left ml-32 mb-8"}>{title}</text>
    {photo &&<div className={"rounded-xl h-[32rem] mx-8 my-4 justify-center flex bg-black"}><img src={photo.url} alt={"postimage"} className={"h-[32rem]"}/></div>}
    <div className='text-base rounded-lg text-gray-300 text-left  mx-4 mb-4 my-2 '>
        <text className='ml-20 ' >{text}</text>
        </div>
        <div className={"flex flex-row justify-end mx-12 my-3"}>
        <button className={"text-white text-base font-semibold"}>
          <image src={"https://via.placeholder.com/350x150"} alt={"like"} className={"h-8 w-8 mx-4 rounded-full"}/>
          {likes} Like 
        </button>
        <button className={"text-white text-base font-semibold"}>
          <image src={"https://via.placeholder.com/350x150"} alt={"comment"} className={"h-8 w-8 mx-4 rounded-full"}/>
          {comments} Comment 
        </button>
        <button className={"text-white text-base font-semibold"}>
          <image src={"https://via.placeholder.com/350x150"} alt={"share"} className={"h-8 w-8 mx-4 rounded-full"}/>
          0 Shares
        </button>
        </div>
        <CommentSection postid={id}/>
    </div>

            {/* <Post id={id} username={username} userphoto={userphoto} title={title} text={text} photo={photo} likes={likes} comments={comments} /> */}

            

            






        </div>
    )
}
export function Comment({username,text}) {
    return (
        <div className={"flex flex-col bg-grayish m-2 p-2 rounded-xl"}>
            <div className={"flex flex-row"}>
                <div className={"flex flex-col"}>
                    <h1 className={"text-white font-bold"}>{username}</h1>
                    <h1 className={"text-white"}>{text}</h1>
                </div>
            </div>
        </div>
    )
}

export function CommentSection({postid}) {
    const [comments, setComments] = useState([]);
    const UserData = JSON.parse(localStorage.getItem('userdata'));

    const config={

        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${UserData.token}`,

        },

    };

    let data={
        postid:postid,
    }
    const [sectionid, setSectionid] = useState("");
    const commentfetcher = () => {
        axios.post(`/api/comment/fetch`, data, config).then((response) => {
            console.log(response.data);
            // sectionid=response.data.sectionid;
            setSectionid(response.data.sectionid);
            setComments(response.data.comments.map((comment) => {
                return <Comment username={comment.postedby.name}  text={comment.text} />
                // return <div className={'text-white flex-col'}><h1>{comment}</h1></div>
                // return <Comment username={comment.postedby.name} userphoto={comment.postedby.photo.url} text={comment.text} />
            }).reverse());
        }).catch((error) => {
            console.log(error);

        });
    }
    // fetch comments once

    React.useEffect(() => {

        commentfetcher();
    }, []);


    return (
        <div className={"flex-col   "}>
            {comments}
            <CommentInput sectionid={sectionid} commentfetcher={commentfetcher}/>
        </div>)
}




export  function PostOpen() {

    const userdata = JSON.parse(localStorage.getItem('userdata'));



    console.log(userdata);

    if(!userdata){
        console.log("Not logged in");
    }
    else{
        console.log("Logged in");

    }

    // use location







    return (
        <div className="flex">
            <aside className="w-56 fixed left-0 top-0 pb-10 h-screen bg-[#1E1E1E]">

                <Sidebar image={profile} name={(!userdata)? "please login":userdata.name }/>
            </aside>
            <main className="flex-1 ml-56">


                <PostOpenPage/>


            </main>
        </div>
    )
}
