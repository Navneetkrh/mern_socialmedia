
import { useState } from 'react';
import { Sidebar } from "../components/Sidebar";
import profile from "../assets/profile.jpeg"
import Topbar from '../components/feed/Topbar';
import Rightbar from '../components/feed/rightbar';

import logo from "../assets/insidelogo.png"


export function Feedpage() {
  return (
    <div className={"flex flex-col   bg-[#1e1e1e] text-center "}>
    <div className={"flex flex-row justify-center"}>
                            <img className={"w-1/6 h-1/6 -my-10"} src={logo}/>
    </div>
    <Topbar/>
       <div className='h-screen'>

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