/* eslint-disable no-unused-vars */
import { useState,useEffect } from 'react';
import Login_page from "../assets/Login_page.gif"
import bg from "../assets/bg.gif";
import axios from 'axios';
import { Link } from 'react-router-dom';
// navigator to redirect to home page

import { useNavigate } from 'react-router-dom';

// local storage


// eslint-disable-next-line react/prop-types
export const Login =({setisLogin})=> {

    const [backendData, setBackendData] = useState({}); 
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    let navigate = useNavigate();


    const handleSubmit = async (e)=> {
       
        e.preventDefault();
        let data = {
            name: username,
            password: password
        };
        const config={
          
            headers:{
                'Content-Type': 'application/json',
                
            },

        };
          
        await axios.post("/api/user/login",data,config).then((response)=>{
            console.log(response.data);
            if(response.data.message){
                alert(response.data.message);
            } 
            else{
                // alert("Login successful");
                console.log(response.data);
                  // navigate to home page
                    localStorage.setItem('userdata', JSON.stringify(response.data));
                    navigate('/');
            } 
          
        
        }).catch((error)=>{
                console.log(error);
                console.log(error.response);
                setMessage(error.response.data.message);
                // alert(error.response.data.message);
            
            } );
            
        }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-[#1E1E1E]">
           <form className="flex flex-col items-center justify-center w-96 h-96 bg-[#393838] rounded-xl shadow-2xl">
           <div className='text-red-500'>
           {message}
           </div>
           <input type='text' placeholder='Username' className="w-80 h-10 px-5 py-1 my-5 text-xl text-white bg-[#1E1E1E] border-2 border-[#1E1E1E] rounded-xl focus:outline-none focus:border-[#1E1E1E]" onChange={(e) => setUsername(e.target.value)} />
              <input type='password' placeholder='Password' className="w-80 h-10 px-5 py-1 my-5 text-xl text-white bg-[#1E1E1E] border-2 border-[#1E1E1E] rounded-xl focus:outline-none focus:border-[#1E1E1E]" onChange={(e) => setPassword(e.target.value)} />
              <button type='submit' onClick={(e)=>handleSubmit(e)} className="w-80 h-10 px-5 py-1 my-5 text-xl text-white bg-green-500 hover:bg-green-300 border-2 border-[#1E1E1E] rounded-xl focus:outline-none focus:border-[#1E1E1E]">Login</button>
           </form>
           <div className='flex text-xl gap-3 my-3'>
        
           <h1 className='text-white '> Don't have an account? </h1>
           <button type='submit' className='text-purple-500 ' onClick={()=>setisLogin(false)}> Signup</button>
           </div>
           
             
           
        </div>
    );
    

} 

// eslint-disable-next-line react/prop-types
export const Signup =({setisLogin})=> {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');   
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    let navigate = useNavigate();
    const [photo,setphoto]=useState({});


    const handleSubmit = async (e)=> {
                                                   
        e.preventDefault();
        let data = {
            name: username,
            password: password,
            email: email,
            photo: photo
        };
        const config={
          
            headers:{
                'Content-Type': 'application/json',
                
            },

        };

        axios.post("/api/user/register",data,config).then((response)=>{
            console.log(response.data);
            if(response.data.message){
                alert(response.data.message);
                console.log(response.data);
            } 
            else{
                // alert("Account created successfully");
                localStorage.setItem('userdata', JSON.stringify(response.data));
                navigate('/');

            } 
        }).catch((error)=>{
  
            console.log(error.response);
            // alert(error.response.data.message);
            setMessage(error.response.data.message);
        
        } );    
        
        }

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
                // 'Authorization': 'Bearer '+userdata.token+''

            },
        };

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

                    // setPostImage(response.data);
                    setphoto(response.data);
                }


            }).catch((error)=>{
                console.log(error);
                console.log(error.response);
                // setMessage(error.response.data.message);
                // alert(error.response.data.message);

            } );

        }
    }


    return (
        <div className="flex flex-col items-center justify-center h-screen bg-[#1E1E1E]">
            
            <form type="post" className="flex flex-col items-center justify-center w-96 h-96 bg-[#393838] rounded-xl shadow-2xl">
                <div className='flex flex-col items-center'>
                    <label className=" h-10 px-5 py-1 mb-2   text-xl text-white bg-red-500 hover:bg-red-300 border-2 border-[#1E1E1E] rounded-xl">
                        Upload Photo
                        <input type='file' accept='image/*' hidden placeholder='Photo'  className="w-3/4 h-10 px-5 py-1 my-5 text-xl text-white bg-[#1E1E1E] border-2 border-[#1E1E1E] rounded-xl focus:outline-none focus:border-[#1E1E1E]" onChange={(e)=> handleimage(e)} />
                    </label>

                    {   // if postImage.url is not null then show image else box of same size upload photo
                        //postImage.url && <img src={postImage.url } alt="" />//
                        //<img src={photo.url} alt={"postimage"} className={"h-96  rounded-xl mx-4"}/>
                        photo.url && <img src={photo.url } alt="" className=" h-96  rounded-xl border-2 border-black mx-4" />
                    }
                </div>
                <div className='text-red-500'>
           {message}
           </div>
            <input type='text' placeholder='Username' className="w-80 h-10 px-5 py-1 my-5 text-xl text-white bg-[#1E1E1E] border-2 border-[#1E1E1E] rounded-xl focus:outline-none focus:border-[#1E1E1E]" onChange={(e) => setUsername(e.target.value)} />
            
            <input type='password' placeholder='Password' className="w-80 h-10 px-5 py-1 my-5 text-xl text-white bg-[#1E1E1E] border-2 border-[#1E1E1E] rounded-xl focus:outline-none focus:border-[#1E1E1E]" onChange={(e) => setPassword(e.target.value)} />
            <input type='email' placeholder='Email' className="w-80 h-10 px-5 py-1 my-5 text-xl text-white bg-[#1E1E1E] border-2 border-[#1E1E1E] rounded-xl focus:outline-none focus:border-[#1E1E1E]" onChange={(e) => setEmail(e.target.value)} />
            <button type='submit'onClick={(e)=>handleSubmit(e)} className="w-80 h-10 px-5 py-1 my-5 text-xl text-white bg-purple-500 border-2 hover:bg-purple-300 border-[#1E1E1E] rounded-xl focus:outline-none focus:border-[#1E1E1E]">Register</button>
            </form>
        {/* button for if account already present */}
        {/* <button type='submit' className="w-80 h-10 px-5 py-1 my-5 text-xl text-white bg-[#1E1E1E] border-2 border-[#1E1E1E] rounded-xl focus:outline-none focus:border-[#1E1E1E]">Login</button> */}
        <div className='flex text-xl gap-3 my-3'>
           <h1 className='text-white '>Already have an account? </h1>
           <button type='submit' className='text-green-500 ' onClick={()=>(setisLogin(true))}> Login</button>
        </div>

        </div>
    )
    }
export const Loginsignup = () => {
    const  [isLogin, setisLogin] = useState(true);
    // if(isLogin){
    //     return(
            
    //         <Login setisLogin={setisLogin}/>
    //     )
    // }
    // else{
    //     return(
    //         <Signup setisLogin={setisLogin}/>
    //     )
    // }


    return(
        <div className="flex flex-col items-center justify-center h-screen bg-[#1E1E1E]">
        {isLogin ? <Login setisLogin={setisLogin}/> : <Signup setisLogin={setisLogin}/> }
        </div>
    );

}

export default Loginsignup;