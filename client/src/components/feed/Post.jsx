import React from 'react'

export default function Post({postedby,title,text,photo,likes,comments,shares}) {
  // get image from cloudinary photo.url


  return (
    <div className={" h-1/2 w-3/4 flex flex-col bg-grayish my-10 rounded-xl "}>
        <text className={" text-lg  text-white"}>postedby:{postedby}</text>

        <text className={" text-lg  text-white"}>title:{title}</text>

        <text className={" text-lg  text-white"}>text:{text}</text>

        {/* render image from cloudinary */}
        <img src={photo.url} alt={"postimage"} className={"h-28 w-28 m-8"}/>

        <text className={" text-lg  text-white"}>likes:{likes}</text>
        <text className={" text-lg  text-white"}>comments:{comments}</text>
        <text className={" text-lg  text-white"}>shares:{shares}</text>
       

    </div>
  )
}
