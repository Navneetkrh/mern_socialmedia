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
                <input className={"flex flex-col  m-2 p-2 rounded-xl"} type="text" placeholder="Comment" onChange={(e)=>    setComment(e.target.value)}/>
                <button className={"flex flex-col bg-green-500 m-2 p-2 rounded-xl"} onClick={(e)=>onSend(e)} type="submit" >Send</button>
            </form>
        </div>
    )
}

export function PostOpenPage() {
    const navigate = useNavigate();
    const location = useLocation();
    console.log("here my son",location.state);
    let id=location.state.id;
    let username=location.state.username;
    let userphoto=location.state.userphoto;
    let title=location.state.title;
    let text=location.state.text;
    let photo=location.state.photo;
    let likes=location.state.likes;
    let comments=location.state.comments;


    // navigate to back page
    function back(){
        navigate("/feed");
    }

    return (
        <div className={"bg-greenish  m-4 p-4 "}>
            <div className="flex justify-between items-center">
                <button onClick={back} className="bg-greenish rounded-full font-bold hover:bg-yellowish p-2 m-2">Back</button>
            </div>


            <Post id={id} username={username} userphoto={userphoto} title={title} text={text} photo={photo} likes={likes} comments={comments} />

            <CommentSection postid={id}/>





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
