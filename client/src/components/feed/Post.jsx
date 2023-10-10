import React from 'react'

export default function Post({postedby,title,text,photo,likes,comments,shares}) {
  return (
    <div className={" h-1/2 w-3/4 flex flex-col bg-grayish my-10 rounded-xl "}>
        <text className={" text-lg  text-white"}>postedby:{postedby}</text>

        <text className={" text-lg  text-white"}>title:{title}</text>

        <text className={" text-lg  text-white"}>text:{text}</text>

        <text className={" text-lg  text-white"}>photo:{photo}</text>
        <text className={" text-lg  text-white"}>likes:{likes}</text>
        <text className={" text-lg  text-white"}>comments:{comments}</text>
        <text className={" text-lg  text-white"}>shares:{shares}</text>
       

    </div>
  )
}
