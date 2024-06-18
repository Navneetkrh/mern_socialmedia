import { useEffect, useState } from 'react';
import { Sidebar } from "../components/Sidebar";
import profile from "../assets/profile.jpeg";
import Search from '../components/Search';
import { Chatdata } from '../components/chat/Chatsidebar';
import { Chatsidebar } from '../components/chat/Chatsidebar';

import logo from "../assets/insidelogo.png";
// import Post from '../components/feed/post';
import axios from 'axios';

const userdata = JSON.parse(localStorage.getItem('userdata'));

 
export function Chatpage(){
    const[check,setCheck]=useState(false);
    const[username,setUsername]=useState("");
    const[chatId,setChatId]=useState("");
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
    

    return (
        <>
            <div className="flex h-screen overflow-hidden  py-5">
                <Chatsidebar SetUsername={setUsername} SetChatId={setChatId} SetCheck={setCheck} />

                <div className="flex-1 bg-[#1E1E1E] h-full w-full">
                    {/* <div className="flex items-center justify-between px-5 py-3 border-b border-[#323232]">
                                    <h1 className="text-white text-lg font-semibold">Chat</h1>
                                    
                            </div> */}
                    {/* here to display chat */}
                    {check ? (
                        <Chatdata chatId={chatId} username={username} setCheck={setCheck}/>
                    ) : (
                        nochats()
                    )}
                </div>
            </div>
        </>
    );
}

export function nochats(){
    return(
        <div className="flex-1 overflow-y-auto">
            <div className="flex flex-col items-center justify-center h-full">
                <img src={logo} alt="" className="w-1/2"/>
                <h1 className="text-white text-lg font-semibold mt-5">No chat selected</h1>
            </div>
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