
import { useState } from 'react';
import { Sidebar } from "../components/Sidebar";
import profile from "../assets/profile.jpeg"
import Topbar from '../components/feed/Topbar';
import Rightbar from '../components/feed/rightbar';

import logo from "../assets/insidelogo.png";
import Post from '../components/feed/post';
import axios from 'axios';



export function Feedpage() {
    // let numberofposts = 10;
    // let posts = [];
    // for(let i=0;i<numberofposts;i++){
    //     posts.push(<Post postedby={"user1"} title={"title1"} text={"text1"} photo={"photo1"} likes={"likes1"} comments={"comments1"} shares={"shares1"}/>);
    // }

    const [posts, setposts] = useState([]);
    // fetch all posts
    const config={
          
        headers:{
            'Content-Type': 'application/json',
            
        },

    };
      
    axios.get("/api/feed/fetchPost",config).then((response)=>{
        console.log(response.data);
        setposts(response.data.map((post)=>{
            return <Post postedby={post.postedby.name} title={post.title} text={post.text} photo={post.photo} likes={post.likes} comments={post.comments} shares={post.shares}/>
        }));
    }).catch((error)=>{
            console.log(error);
            console.log(error.response);
            // setMessage(error.response.data.message);
            // alert(error.response.data.message);
        
        } );

  return (
    <div className={"flex flex-col   bg-[#1e1e1e] text-center "}>
    <div className={"flex flex-row justify-center"}>
                            <img className={"w-1/6 h-1/6 -my-10"} src={logo}/>
    </div>


    <Topbar/>

    {/* main area */}
       <div className='flex flex-col h-full w-full items-center'>
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
          <main className="flex-1 ml-56 mr-56">
              <Feedpage/>

          </main>
          <aside className="w-56 fixed right-0 top-0 pb-10 h-screen bg-[#1E1E1E]">
                
                <Rightbar/>
          </aside>
      </div>
    );
}

export default Feedpage;