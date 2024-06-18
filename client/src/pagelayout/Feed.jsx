
import { useEffect, useState } from 'react';
import { Sidebar } from "../components/Sidebar";
import profile from "../assets/profile.jpeg"
import Topbar from '../components/feed/Topbar';
import Rightbar from '../components/feed/Rightbar';

import logo from "../assets/insidelogo.png";
import Post from '../components/feed/Post';
import axios from 'axios';



export function Feedpage() {
    // call refreshfeed every time page opens
    
    
    console.log("refreshed");
    
   
    
   
    
    const [posts, setposts] = useState([]);
    
    
  

    // fetch all posts
    const config={
          
        headers:{
            'Content-Type': 'application/json',
            
        },

    };
    const postfetcher=()=>{axios.get("/api/feed/fetchPost",config).then((response)=>{
        // console.log(response.data);
        setposts(response.data.map((post)=>{
            return <Post id={post._id} username={post.postedby.name} userphoto={post.postedby.photo} title={post.title} text={post.text} photo={post.photo} likes={post.likes} comments={post.comments} shares={post.shares}/>
            
        }).reverse());
        
         
    }).catch((error)=>{
            console.log(error);
            console.log(error.response);
            // setMessage(error.response.data.message);
            // alert(error.response.data.message);
        
        } );
    }
    useEffect(() => {

        
        postfetcher();
        
        const interval = setInterval(() => {
            postfetcher();
          },30*1000);//page refreshes every 30 seconds
          return () => clearInterval(interval);
      
    }, [])

  return (
    <div className={"flex flex-col   bg-[#1e1e1e] text-center "}>
    <div className={"flex flex-row justify-center bg-bakc"}>
                            <img className={"w-1/6 h-1/6 -my-10"} src={logo}/>
    </div>

    
    <Topbar/>

    {/* main area */}
       <div className='flex flex-col h-full w-full items-center bg-blackish'>
              {posts}
       </div>
           
    </div>
  )
}

export function Feed() {
    const [isLogin, setisLogin] = useState(false);
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
          <aside className="w-56 fixed left-0 top-0 pb-10 h-screen bg-blackish">
                
                <Sidebar image={profile} name={(!userdata)? "please login":userdata.name }/>
          </aside>
          <main className="flex-1 ml-56 mr-56 bg-blackish h-screen">
              <Feedpage/>
             

          </main>
          <aside className="w-56 fixed right-0 top-0 pb-10 h-screen bg-[#1E1E1E]">
                
                <Rightbar/>
          </aside>
      </div>
    );
}

export default Feedpage;