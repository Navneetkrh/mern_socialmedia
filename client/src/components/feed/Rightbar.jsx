import React from 'react'
import Search from '../Search'
import { useNavigate } from 'react-router-dom';
import plus from '../../assets/plus.svg'

export default function Rightbar() {
  let navigate = useNavigate();
  const handleplus=(e)=>{
    e.preventDefault();
    console.log("plus clicked");
    navigate('/createpost');
  }
  return (
    <div className={" flex flex-col rounded-2xl bg-blackish w-48  h-full pt-10 mb-10  "}>
    <div className={"flex flex-row justify-end w-full bg-blackish"}>
     <input type={"text"} className={" h-12 w-56 rounded-3xl mb-20 text-center bg-grayish border-2 border-gray-500 "} placeholder={"Type to Search"}/>
    
    </div>
    <div className={" h-1/2 bg-grayish my-10 rounded-xl "}>
        {/* new post here  using plus button*/}
        <button  className='justify-center ' onClick={(e)=>handleplus(e)}>
        <img src={plus} alt={"plus"} className={"h-28 w-28 m-8"}/>
            
        </button>
        <div className='justify-center px-4 text-center'>
            <text className={" text-lg  text-white"}>Create a post,by clicking the above icon</text>
        </div>
      
        
     
     </div>

    </div>
    
  )
}
