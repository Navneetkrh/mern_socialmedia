/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// import React from 'react'
import { Sidebar } from '../Sidebar'
import profile from "../../assets/profile.jpeg"
import { useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import {CameraOutlined } from '@ant-design/icons'; 


export  function Createpost() {
    
    const userdata = JSON.parse(localStorage.getItem('userdata'));
    console.log(userdata);

    if(!userdata){
        console.log("Not logged in");
    }
    else{
        console.log("Logged in");
        
    }
  return (
    <div className="flex">
    <aside className="w-56 fixed left-0 top-0 pb-10 h-screen bg-[#1E1E1E]">
          
          <Sidebar image={profile} name={(!userdata)? "please login":userdata.name }/>
    </aside>
    <main className="flex-1 ml-56">
        
        
        <Createpostpage userdata={userdata}/>

    </main>
</div>
  )
}

export function Createpostpage({userdata}){
    const [postdata, setPostdata] = useState({});
    // navigator

    let navigate = useNavigate();
    const [postImage, setPostImage] = useState({});

    function sendpost(e){
        e.preventDefault();
        console.log(postdata);
        const mydata={
            postedby:userdata._id,
            title:postdata.title,
            text:postdata.text,
            photo:{
                public_id:postImage.public_id,
                url:postImage.url,
            }
        };
        const config={
           
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+userdata.token+''
                
            },

        };
          
        axios.post("/api/feed/createPost",mydata,config).then((response)=>{

            console.log(response.data);


            if(response.data.message){
                alert(response.data.message);
            } 
            else{
                // alert("Login successful");
                console.log(response.data);
                  // navigate to feed page
                  navigate('/feed');
            } 
          
        
        }).catch((error)=>{
                console.log(error);
                console.log(error.response);
                // setMessage(error.response.data.message);
                // alert(error.response.data.message);
            
            } );

    }

    function handlecancel(e){
        e.preventDefault();
        navigate('/feed');
    }

    // const convertToBase64 = (file) => {
    //     return new Promise((resolve, reject) => {
    //       const fileReader = new FileReader();
    //       fileReader.readAsDataURL(file);
    //       fileReader.onload = () => {
    //         resolve(fileReader.result);
    //       };
    //       fileReader.onerror = (error) => {
    //         reject(error);
    //       };
    //     });
    //   };
    //   const handleFileUpload = async (e) => {
    //     const file = e.target.files[0];
    //     const base64 = await convertToBase64(file);
    //     setPostImage({ ...postImage, myFile: base64 });
    //   };
    const handleimage=(e)=>{
        const file=e.target.files[0];
        setFileToBase(file);
        console.log(file);
    }
    const setFileToBase=(file)=>{
        const reader=new FileReader();
        reader.readAsDataURL(file);

        const config={
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+userdata.token+''
                
            },
        };
        // get url
        // reader.onload=()=>{
        //     setPostdata({...postdata,photo:reader.result});
        // }
        // upload to cloudinary and get url 
       
        // axios.post("/api/uploadimage",{photo:reader.result},config).then((response)=>{
        //     console.log(response.data);
        //     if(response.data.message){
        //         alert(response.data.message);
        //     } 
        //     else{
        //         // alert("Login successful");
        //         console.log(response.data);
        //           // navigate to feed page

        //           setPostImage(response.data);

        //     } 
          
        
        // }).catch((error)=>{
        //         console.log(error);
        //         console.log(error.response);
        //         // setMessage(error.response.data.message);
        //         // alert(error.response.data.message);
            
        //     } );
        reader.onload=()=>{
            // upload to cloudinary and get url 

       
        axios.post("/api/uploadimage",{photo:reader.result},config).then((response)=>{
            console.log(response.data);
            if(response.data.message){
                alert(response.data.message);
            } 
            else{
                // alert("Login successful");
                console.log(response.data);
                  // navigate to feed page

                  setPostImage(response.data);

            } 
          
        
        }).catch((error)=>{
                console.log(error);
                console.log(error.response);
                // setMessage(error.response.data.message);
                // alert(error.response.data.message);
            
            } );

        }
    }
    


    return(

        <div className="flex flex-col items-center justify-center h-screen bg-[#1E1E1E]">
           <form className="flex flex-col items-center justify-center w-3/4 h-3/4 bg-[#393838] rounded-xl shadow-2xl">
           
           <input type='text' placeholder='Enter Title' className="w-3/4 h-10 px-5 py-1 my-5 text-xl text-white bg-[#1E1E1E] border-2 border-[#1E1E1E] rounded-xl focus:outline-none focus:border-[#1E1E1E]" onChange={(e) => setPostdata({...postdata,title:e.target.value})} />
            <input type='text' placeholder='Text' className="w-3/4 h-10 px-5 py-1 my-5 text-xl text-white bg-[#1E1E1E] border-2 border-[#1E1E1E] rounded-xl focus:outline-none focus:border-[#1E1E1E]" onChange={(e) => setPostdata({...postdata,text:e.target.value})} />
            <label className="w-1/4 h-10 px-5 py-1 my-5 text-xl text-white bg-red-500 hover:bg-red-300 border-2 border-[#1E1E1E] rounded-xl">
                Upload Photo
                {
                    postImage.url && <img src={postImage.url } alt="" />
                }
                {/* <img src={postImage.url } alt="" /> */}
            <input type='file' accept='image/*' hidden placeholder='Photo'  className="w-3/4 h-10 px-5 py-1 my-5 text-xl text-white bg-[#1E1E1E] border-2 border-[#1E1E1E] rounded-xl focus:outline-none focus:border-[#1E1E1E]" onChange={(e)=> handleimage(e)} />
            </label>
            
            
            {/* two buttons post and cancel */}
            <div className='flex flex-row justify-evenly w-3/4'>
            <button className="w-1/4 h-10 px-5 py-1 my-5 text-xl text-white bg-red-500 hover:bg-red-300 border-2 border-[#1E1E1E] rounded-xl focus:outline-none focus:border-[#1E1E1E]" onClick={(e)=> handlecancel(e)}>Cancel</button>
            <button className="w-1/4 h-10 px-5 py-1 my-5 text-xl text-white bg-green-500 hover:bg-green-300 border-2 border-[#1E1E1E] rounded-xl focus:outline-none focus:border-[#1E1E1E]" onClick={(e) => sendpost(e)}>Post</button>
            
            </div>

            
              
        </form>
        </div>

    );
         
    
}
