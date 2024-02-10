import { useEffect, useState } from 'react';
import { Sidebar } from "../components/Sidebar";
import profile from "../assets/profile.jpeg";
import Search from '../components/search';

import { Chatsidebar } from '../components/chat/Chatsidebar';

import logo from "../assets/insidelogo.png";
import Post from '../components/feed/post';
import axios from 'axios';

export function Chatpage(){
    console.log("CHATPAGE DDDDDDDDDDDDDDDDDDDDDDDD");
    const [isLogin, setisLogin] = useState(false);
    const userdata = JSON.parse(localStorage.getItem('userdata'));
    console.log(userdata);

    if(!userdata){
        console.log("Not logged in");
    }
    else{
        console.log("Logged in");
        
    } 


    return(
        <div className="flex h-screen overflow-hidden  py-5">
        <Chatsidebar/>
    </div>
    )
}
export function Chat(){
    console.log("CHATPAGE D");
    return(
        <div className="flex">
        <aside className="w-56 fixed left-0 top-0 pb-10 h-screen bg-[#1E1E1E]">
              
              <Sidebar image={profile} name={"please login"}/>
        </aside>
        <main className="flex-1 ml-56">
            
            
            <Chatpage/>

        </main>
    </div>
    )
}