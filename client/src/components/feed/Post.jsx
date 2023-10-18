import React from 'react'

export default function Post({postedby,title,text,photo,likes,comments,shares}) {
  // get image from cloudinary photo.url


  return (
    <div className={" h-1/2 w-3/4 flex flex-col bg-blackish my-4 mx-10 rounded-xl "}>
         
        <div className={"flex flex-row justify-left mt-2 h-8"}>
        <img src={"https://via.placeholder.com/350x150"} alt={"profile"} className={"h-8 w-8 mx-4 rounded-full"}/>
        <text className={" text-xl  text-greenish font-semibold "}>@{postedby}</text>
        </div>
        
       
        
        <text className={" text-xl  text-white font-semibold text-left mx-16 mb-4"}>{title}</text>

       {photo &&<img src={photo.url} alt={"postimage"} className={"h-96  rounded-xl mx-4"}/>} 
        
        <text className={" text-base  text-gray-300 text-left mx-8 my-4"}>{text}</text>

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
