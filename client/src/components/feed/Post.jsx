import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Post({id,username,userphoto,title,text,photo,likes,comments,shares}) {
  // get image from cloudinary photo.url
    let navigate = useNavigate();
    function openpost(e){
        e.preventDefault();
        navigate("/postopen",{state:{id,username,userphoto,title,text,photo,likes,comments,shares}});
    }


  return (
    <div onClick={(e)=>openpost(e)} className={" h-1/2 w-3/4 flex flex-col bg-blackish mx-10 rounded-xl hover:bg-grayish"}>
         
        <div className={"flex flex-row justify-left mt-2 h-8"}>

            {  !userphoto && <img src={"https://via.placeholder.com/350x150"} alt={"profile"} className={"h-10 w-10 mx-4 rounded-full"}/>}
            {userphoto &&<img src={userphoto.url} alt={"profile"} className={"h-10 w-10 mx-4 rounded-full"}/>}
        <text className={" text-xl  text-greenish font-semibold "}>@{username}</text>
        </div>
        
       
        
        <text className={" text-xl  text-white font-semibold text-left ml-20 mb-2"}>{title}</text>

            {photo &&<div className={"h-96  rounded-xl mx-4 justify-center flex bg-black"}><img src={photo.url} alt={"postimage"} className={"h-96   "}/></div>}


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
          {shares} Shares
        </button>
        </div>
        
          {/* line  */}
          <div className={"h-1  mt-5 mx-16 bg-gray-500"}></div>
        

        


       

    </div>
  )
}
